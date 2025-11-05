
# 核心功能实现方案

本文档详细说明各核心模块的具体实现方案和代码示例。

## 目录

1. [编辑器模块](#编辑器模块)
2. [预览模块](#预览模块)
3. [存储模块](#存储模块)
4. [分享模块](#分享模块)
5. [模板模块](#模板模块)
6. [控制台模块](#控制台模块)
7. [主题管理](#主题管理)
8. [工具函数](#工具函数)

---

## 编辑器模块

### Editor.js 实现方案

#### 方案A：纯Textarea实现（最轻量）

```javascript
// js/modules/Editor.js
export class Editor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.editors = {
            html: null,
            css: null,
            js: null
        };
        this.activeTab = 'html';
        this.onChangeCallback = null;
        this.init();
    }

    init() {
        this.createUI();
        this.bindEvents();
        this.loadSavedCode();
    }

    createUI() {
        this.container.innerHTML = `
            <div class="editor-tabs">
                <button class="tab-btn active" data-lang="html">HTML</button>
                <button class="tab-btn" data-lang="css">CSS</button>
                <button class="tab-btn" data-lang="js">JavaScript</button>
            </div>
            <div class="editor-content">
                <div class="editor-pane active" data-lang="html">
                    <textarea class="code-editor" id="html-editor" 
                              spellcheck="false" autocomplete="off"></textarea>
                </div>
                <div class="editor-pane" data-lang="css">
                    <textarea class="code-editor" id="css-editor" 
                              spellcheck="false" autocomplete="off"></textarea>
                </div>
                <div class="editor-pane" data-lang="js">
                    <textarea class="code-editor" id="js-editor" 
                              spellcheck="false" autocomplete="off"></textarea>
                </div>
            </div>
        `;

        // 保存编辑器引用
        this.editors.html = document.getElementById('html-editor');
        this.editors.css = document.getElementById('css-editor');
        this.editors.js = document.getElementById('js-editor');
    }

    bindEvents() {
        // 标签切换
        const tabs = this.container.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.lang);
            });
        });

        // 代码变化监听
        Object.keys(this.editors).forEach(lang => {
            this.editors[lang].addEventListener('input', () => {
                this.handleCodeChange();
            });
        });

        // Tab键缩进
        Object.values(this.editors).forEach(editor => {
            editor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.insertTab(editor);
                }
            });
        });

        // 快捷键支持
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveCode();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });
    }

    switchTab(lang) {
        // 更新标签状态
        this.container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // 更新编辑器显示
        this.container.querySelectorAll('.editor-pane').forEach(pane => {
            pane.classList.toggle('active', pane.dataset.lang === lang);
        });

        this.activeTab = lang;
        this.editors[lang].focus();
    }

    insertTab(editor) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;

        // 插入4个空格
        editor.value = value.substring(0, start) + '    ' + value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
    }

    getValue(lang) {
        return this.editors[lang]?.value || '';
    }

    setValue(lang, value) {
        if (this.editors[lang]) {
            this.editors[lang].value = value;
        }
    }

    getAllValues() {
        return {
            html: this.getValue('html'),
            css: this.getValue('css'),
            js: this.getValue('js')
        };
    }

    setAllValues(code) {
        this.setValue('html', code.html || '');
        this.setValue('css', code.css || '');
        this.setValue('js', code.js || '');
    }

    handleCodeChange() {
        if (this.onChangeCallback) {
            this.onChangeCallback(this.getAllValues());
        }
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }

    saveCode() {
        if (window.storage) {
            window.storage.save(this.getAllValues());
            this.showNotification('代码已保存');
        }
    }

    loadSavedCode() {
        if (window.storage) {
            const saved = window.storage.load();
            if (saved) {
                this.setAllValues(saved);
            }
        }
    }

    runCode() {
        if (this.onChangeCallback) {
            this.onChangeCallback(this.getAllValues(), true);
        }
    }

    clear() {
        this.setAllValues({ html: '', css: '', js: '' });
    }

    showNotification(message) {
        // 简单的通知实现
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}
```

#### 方案B：集成CodeMirror（推荐）

```javascript
// js/modules/Editor.js
import CodeMirror from '../lib/codemirror/codemirror.js';

export class Editor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.editors = {};
        this.activeTab = 'html';
        this.onChangeCallback = null;
        this.init();
    }

    init() {
        this.createUI();
        this.initCodeMirror();
        this.bindEvents();
        this.loadSavedCode();
    }

    createUI() {
        this.container.innerHTML = `
            <div class="editor-tabs">
                <button class="tab-btn active" data-lang="html">
                    <span class="icon">📄</span> HTML
                </button>
                <button class="tab-btn" data-lang="css">
                    <span class="icon">🎨</span> CSS
                </button>
                <button class="tab-btn" data-lang="js">
                    <span class="icon">⚡</span> JavaScript
                </button>
            </div>
            <div class="editor-content">
                <div class="editor-pane active" id="html-pane"></div>
                <div class="editor-pane" id="css-pane"></div>
                <div class="editor-pane" id="js-pane"></div>
            </div>
        `;
    }

    initCodeMirror() {
        // HTML编辑器
        this.editors.html = CodeMirror(document.getElementById('html-pane'), {
            mode: 'htmlmixed',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2,
            indentWithTabs: false
        });

        // CSS编辑器
        this.editors.css = CodeMirror(document.getElementById('css-pane'), {
            mode: 'css',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2
        });

        // JavaScript编辑器
        this.editors.js = CodeMirror(document.getElementById('js-pane'), {
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2
        });

        // 监听变化
        Object.keys(this.editors).forEach(lang => {
            this.editors[lang].on('change', () => {
                this.handleCodeChange();
            });
        });
    }

    bindEvents() {
        // 标签切换
        const tabs = this.container.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget.dataset.lang);
            });
        });

        // 快捷键
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveCode();
            }
        });
    }

    switchTab(lang) {
        this.container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        this.container.querySelectorAll('.editor-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `${lang}-pane`);
        });

        this.activeTab = lang;
        this.editors[lang].refresh();
        this.editors[lang].focus();
    }

    getValue(lang) {
        return this.editors[lang]?.getValue() || '';
    }

    setValue(lang, value) {
        if (this.editors[lang]) {
            this.editors[lang].setValue(value);
        }
    }

    getAllValues() {
        return {
            html: this.getValue('html'),
            css: this.getValue('css'),
            js: this.getValue('js')
        };
    }

    setAllValues(code) {
        this.setValue('html', code.html || '');
        this.setValue('css', code.css || '');
        this.setValue('js', code.js || '');
    }

    handleCodeChange() {
        if (this.onChangeCallback) {
            this.onChangeCallback(this.getAllValues());
        }
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }

    setTheme(theme) {
        Object.values(this.editors).forEach(editor => {
            editor.setOption('theme', theme);
        });
    }
}
```

---

## 预览模块

### Preview.js 实现

```javascript
// js/modules/Preview.js
export class Preview {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.iframe = null;
        this.consoleOutput = [];
        this.errorHandler = null;
        this.init();
    }

    init() {
        this.createIframe();
        this.setupConsoleCapture();
    }

    createIframe() {
        this.container.innerHTML = `
            <div class="preview-header">
                <span class="preview-title">预览</span>
                <button class="btn-refresh" title="刷新">🔄</button>
                <button class="btn-fullscreen" title="全屏">⛶</button>
            </div>
            <iframe 
                id="preview-iframe" 
                sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
                frameborder="0"
            ></iframe>
            <div class="preview-loading">
                <div class="spinner"></div>
            </div>
        `;

        this.iframe = document.getElementById('preview-iframe');
        
        // 绑定按钮事件
        this.container.querySelector('.btn-refresh').addEventListener('click', () => {
            this.refresh();
        });

        this.container.querySelector('.btn-fullscreen').addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    update(html, css, js) {
        const content = this.buildDocument(html, css, js);
        
        // 显示加载状态
        this.showLoading();

        try {
            // 使用srcdoc安全地注入内容
            this.iframe.srcdoc = content;

            // 等待加载完成
            this.iframe.onload = () => {
                this.hideLoading();
                this.injectConsoleCapture();
            };
        } catch (error) {
            this.hideLoading();
            this.handleError(error);
        }
    }

    buildDocument(html, css, js) {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* 重置样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        /* 用户CSS */
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        // 错误捕获
        window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({
                type: 'error',
                message: message,
                line: lineno,
                column: colno
            }, '*');
            return false;
        };

        // Promise错误捕获
        window.addEventListener('unhandledrejection', function(event) {
            window.parent.postMessage({
                type: 'error',
                message: 'Unhandled Promise Rejection: ' + event.reason
            }, '*');
        });

        // 用户JavaScript
        try {
            ${js}
        } catch (error) {
            window.parent.postMessage({
                type: 'error',
                message: error.message,
                stack: error.stack
            }, '*');
        }
    </script>
</body>
</html>
        `;
    }

    setupConsoleCapture() {
        // 监听来自iframe的消息
        window.addEventListener('message', (event) => {
            if (event.data.type === 'console') {
                this.handleConsoleMessage(event.data);
            } else if (event.data.type === 'error') {
                this.handleError(event.data);
            }
        });
    }

    injectConsoleCapture() {
        try {
            const iframeWindow = this.iframe.contentWindow;
            
            // 保存原始console方法
            const originalConsole = {
                log: iframeWindow.console.log,
                warn: iframeWindow.console.warn,
                error: iframeWindow.console.error,
                info: iframeWindow.console.info
            };

            // 重写console方法
            ['log', 'warn', 'error', 'info'].forEach(method => {
                iframeWindow.console[method] = (...args) => {
                    // 调用原始方法
                    originalConsole[method].apply(iframeWindow.console, args);
                    
                    // 发送消息到父窗口
                    window.postMessage({
                        type: 'console',
                        method: method,
                        args: args.map(arg => this.serializeArg(arg))
                    }, '*');
                };
            });
        } catch (error) {
            console.warn('无法注入console捕获:', error);
        }
    }

    serializeArg(arg) {
        try {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'function') return arg.toString();
            if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
            return String(arg);
        } catch (error) {
            return '[无法序列化]';
        }
    }

    handleConsoleMessage(data) {
        this.consoleOutput.push(data);
        
        // 触发控制台更新事件
        if (window.consolePanel) {
            window.consolePanel.addLog(data.method, data.args);
        }
    }

    handleError(error) {
        console.error('预览错误:', error);
        
        if (window.consolePanel) {
            window.consolePanel.addLog('error', [error.message]);
        }

        if (this.errorHandler) {
            this.errorHandler(error);
        }
    }

    onError(callback) {
        this.errorHandler = callback;
    }

    refresh() {
        if (this.iframe.srcdoc) {
            const content = this.iframe.srcdoc;
            this.iframe.srcdoc = '';
            setTimeout(() => {
                this.iframe.srcdoc = content;
            }, 50);
        }
    }

    clear() {
        this.iframe.srcdoc = '';
        this.consoleOutput = [];
    }

    showLoading() {
        this.container.querySelector('.preview-loading')?.classList.add('show');
    }

    hideLoading() {
        this.container.querySelector('.preview-loading')?.classList.remove('show');
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    getConsoleOutput() {
        return this.consoleOutput;
    }
}
```

---

## 存储模块

### Storage.js 实现

```javascript
// js/modules/Storage.js
export class Storage {
    constructor() {
        this.storageKey = 'online-html-editor-code';
        this.historyKey = 'online-html-editor-history';
        this.settingsKey = 'online-html-editor-settings';
        this.maxHistory = 10;
        this.autoSaveEnabled = true;
        this.autoSaveDelay = 2000;
        this.autoSaveTimer = null;
    }

    // 保存代码
    save(code, options = {}) {
        try {
            const data = {
                html: code.html || '',
                css: code.css || '',
                js: code.js || '',
                timestamp: Date.now(),
                ...options
            };

            localStorage.setItem(this.storageKey, JSON.stringify(data));

            // 添加到历史记录
            if (options.addToHistory !== false) {
                this.addToHistory(data);
            }

            return true;
        } catch (error) {
            console.error('保存失败:', error);
            
            // 可能是存储空间已满
            if (error.name === 'QuotaExceededError') {
                this.cleanOldHistory();
                // 重试
                try {
                    localStorage.setItem(this.storageKey, JSON.stringify(data));
                    return true;
                } catch (retryError) {
                    console.error('重试保存失败:', retryError);
                }
            }
            
            return false;
        }
    }

    // 加载代码
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('加载失败:', error);
        }
        return null;
    }

    // 自动保存
    autoSave(code) {
        if (!this.autoSaveEnabled) return;

        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = setTimeout(() => {
            this.save(code, { addToHistory: false });
        }, this.autoSaveDelay);
    }

    // 

添加到历史记录
    addToHistory(data) {
        try {
            let history = this.getHistory();
            
            // 添加到历史记录开头
            history.unshift({
                html: data.html,
                css: data.css,
                js: data.js,
                timestamp: data.timestamp,
                title: data.title || this.generateTitle(data)
            });

            // 限制历史记录数量
            if (history.length > this.maxHistory) {
                history = history.slice(0, this.maxHistory);
            }

            localStorage.setItem(this.historyKey, JSON.stringify(history));
        } catch (error) {
            console.error('添加历史记录失败:', error);
        }
    }

    // 获取历史记录
    getHistory() {
        try {
            const history = localStorage.getItem(this.historyKey);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('获取历史记录失败:', error);
            return [];
        }
    }

    // 从历史记录恢复
    restoreFromHistory(index) {
        const history = this.getHistory();
        if (index >= 0 && index < history.length) {
            return history[index];
        }
        return null;
    }

    // 清空历史记录
    clearHistory() {
        try {
            localStorage.removeItem(this.historyKey);
            return true;
        } catch (error) {
            console.error('清空历史记录失败:', error);
            return false;
        }
    }

    // 清理旧的历史记录
    cleanOldHistory() {
        try {
            let history = this.getHistory();
            history = history.slice(0, Math.floor(this.maxHistory / 2));
            localStorage.setItem(this.historyKey, JSON.stringify(history));
        } catch (error) {
            console.error('清理历史记录失败:', error);
        }
    }

    // 生成标题
    generateTitle(data) {
        const date = new Date(data.timestamp);
        const dateStr = date.toLocaleString('zh-CN');
        
        // 尝试从HTML中提取title
        const titleMatch = data.html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
            return `${titleMatch[1]} - ${dateStr}`;
        }
        
        return `代码 - ${dateStr}`;
    }

    // 保存设置
    saveSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('保存设置失败:', error);
            return false;
        }
    }

    // 加载设置
    loadSettings() {
        try {
            const settings = localStorage.getItem(this.settingsKey);
            return settings ? JSON.parse(settings) : null;
        } catch (error) {
            console.error('加载设置失败:', error);
            return null;
        }
    }

    // 导出代码
    export(code, format = 'html') {
        if (format === 'html') {
            return this.exportAsHTML(code);
        } else if (format === 'json') {
            return this.exportAsJSON(code);
        }
    }

    exportAsHTML(code) {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>导出的页面</title>
    <style>
${code.css}
    </style>
</head>
<body>
${code.html}
    <script>
${code.js}
    </script>
</body>
</html>`;
    }

    exportAsJSON(code) {
        return JSON.stringify(code, null, 2);
    }

    // 导入代码
    import(content, format = 'html') {
        if (format === 'html') {
            return this.importFromHTML(content);
        } else if (format === 'json') {
            return this.importFromJSON(content);
        }
        return null;
    }

    importFromHTML(html) {
        const code = {
            html: '',
            css: '',
            js: ''
        };

        // 提取CSS
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) {
            code.css = styleMatch[1].trim();
        }

        // 提取JavaScript
        const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) {
            code.js = scriptMatch[1].trim();
        }

        // 提取body内容
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
            let bodyContent = bodyMatch[1];
            // 移除script标签
            bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
            code.html = bodyContent.trim();
        } else {
            // 如果没有body标签，使用整个内容
            code.html = html;
        }

        return code;
    }

    importFromJSON(json) {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error('JSON解析失败:', error);
            return null;
        }
    }

    // 获取存储使用情况
    getStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        
        // 转换为KB
        const usedKB = (total / 1024).toFixed(2);
        const limitKB = 5120; // 大约5MB
        const percentage = ((total / (limitKB * 1024)) * 100).toFixed(2);

        return {
            used: usedKB,
            limit: limitKB,
            percentage: percentage
        };
    }

    // 清空所有存储
    clearAll() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.historyKey);
            localStorage.removeItem(this.settingsKey);
            return true;
        } catch (error) {
            console.error('清空存储失败:', error);
            return false;
        }
    }
}
```

---

## 分享模块

### Share.js 实现

```javascript
// js/modules/Share.js
import LZString from '../lib/lz-string/lz-string.min.js';

export class Share {
    constructor() {
        this.maxUrlLength = 2000;
        this.baseUrl = window.location.origin + window.location.pathname;
    }

    // 生成分享链接
    generateLink(code) {
        try {
            // 压缩代码
            const compressed = this.compress(code);
            
            // 检查URL长度
            const url = `${this.baseUrl}?code=${compressed}`;
            
            if (url.length > this.maxUrlLength) {
                throw new Error('代码太长，无法生成分享链接');
            }

            return url;
        } catch (error) {
            console.error('生成分享链接失败:', error);
            throw error;
        }
    }

    // 压缩代码
    compress(code) {
        const json = JSON.stringify(code);
        const compressed = LZString.compressToEncodedURIComponent(json);
        return compressed;
    }

    // 解压代码
    decompress(compressed) {
        try {
            const json = LZString.decompressFromEncodedURIComponent(compressed);
            return JSON.parse(json);
        } catch (error) {
            console.error('解压失败:', error);
            return null;
        }
    }

    // 从URL加载代码
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
            return this.decompress(code);
        }
        
        return null;
    }

    // 复制到剪贴板
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // 降级方案
                return this.fallbackCopyToClipboard(text);
            }
        } catch (error) {
            console.error('复制失败:', error);
            return false;
        }
    }

    // 降级的复制方法
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (error) {
            console.error('降级复制失败:', error);
            document.body.removeChild(textArea);
            return false;
        }
    }

    // 生成二维码（可选，需要qrcode库）
    generateQRCode(url, containerId) {
        // 这里可以集成qrcode.js库
        // new QRCode(document.getElementById(containerId), url);
        console.log('生成二维码:', url);
    }

    // 分享到社交媒体
    shareToSocial(platform, url, title = '我的代码') {
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            weibo: `http://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }
}
```

---

## 模板模块

### Templates.js 实现

```javascript
// js/modules/Templates.js
export class Templates {
    constructor() {
        this.templates = this.getBuiltInTemplates();
        this.customTemplates = this.loadCustomTemplates();
    }

    // 内置模板
    getBuiltInTemplates() {
        return {
            blank: {
                name: '空白模板',
                description: '从零开始',
                html: '',
                css: '',
                js: '',
                category: 'basic'
            },
            html5: {
                name: 'HTML5 基础',
                description: '标准的HTML5页面结构',
                html: `<div class="container">
    <h1>Hello World</h1>
    <p>这是一个HTML5基础模板</p>
</div>`,
                css: `.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
}`,
                js: `console.log('页面加载完成');`,
                category: 'basic'
            },
            bootstrap: {
                name: 'Bootstrap 响应式',
                description: '使用Bootstrap的响应式布局',
                html: `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container mt-5">
    <div class="row">
        <div class="col-md-6">
            <h1>Bootstrap 模板</h1>
            <p class="lead">响应式设计</p>
        </div>
        <div class="col-md-6">
            <button class="btn btn-primary">点击我</button>
        </div>
    </div>
</div>`,
                css: `body {
    background: #f8f9fa;
}`,
                js: `document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Hello Bootstrap!');
});`,
                category: 'framework'
            },
            canvas: {
                name: 'Canvas 动画',
                description: '基础的Canvas动画示例',
                html: `<canvas id="myCanvas"></canvas>`,
                css: `body {
    margin: 0;
    overflow: hidden;
    background: #000;
}

canvas {
    display: block;
}`,
                js: `const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
const radius = 20;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
    if (x + dx > canvas.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - radius || y + dy < radius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
    
    requestAnimationFrame(draw);
}

draw();`,
                category: 'animation'
            },
            todolist: {
                name: 'Todo List',
                description: '简单的待办事项应用',
                html: `<div class="todo-container">
    <h1>📝 待办事项</h1>
    <div class="input-group">
        <input type="text" id="todoInput" placeholder="添加新任务...">
        <button id="addBtn">添加</button>
    </div>
    <ul id="todoList"></ul>
</div>`,
                css: `.todo-container {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    text-align: center;
    color: #333;
}

.input-group {
    display: flex;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
}

#addBtn {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

#todoList {
    list-style: none;
    padding: 0;
}

.todo-item {
    padding: 12px;
    background: #f9f9f9;
    margin-bottom: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-item.completed {
    text-decoration: line-through;
    opacity: 0.6;
}

.delete-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}`,
                js: `const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = \`
        <span>\${text}</span>
        <button class="delete-btn">删除</button>
    \`;
    
    li.querySelector('span').addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });
    
    todoList.appendChild(li);
    todoInput.value = '';
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});`,
                category: 'interactive'
            }
        };
    }

    // 获取所有模板
    getAllTemplates() {
        return {
            ...this.templates,
            ...this.customTemplates
        };
    }

    // 根据ID获取模板
    getTemplate(id) {
        return this.templates[id] || this.customTemplates[id] || null;
    }

    // 根据分类获取模板
    getTemplatesByCategory(category) {
        const all = this.getAllTemplates();
        return Object.entries(all)
            .filter(([, template]) => template.category === category)
            .reduce((acc, [id, template]) => {
                acc[id] = template;
                return acc;
            }, {});
    }

    // 保存自定义模板
    saveCustomTemplate(id, template) {
        this.customTemplates[id] = {
            ...template,
            custom: true,
            timestamp: Date.now()
        };
        
        try {
            localStorage.setItem(
                'custom-templates',
                JSON.stringify(this.customTemplates)
            );
            return true;
        } catch (error) {
            console.error('保存自定义模板失败:', error);
            return false;
        }
    }

    // 加载自定义模板
    loadCustomTemplates() {
        try {
            const data = localStorage.getItem('custom-templates');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('加载自定义模板失败:', error);
            return {};
        }
    }

    // 删除自定义模板
    deleteCustomTemplate(id) {
        if (this.customTemplates[id]) {
            delete this.customTemplates[id];
            
            try {
                localStorage.setItem(
                    'custom-templates',
                    JSON.stringify(this.customTemplates)
                );
                return true;
            } catch (error) {
                console.error('删除自定义模板失败:', error);
                return false;
            }
        }
        return false;
    }

    // 获取模板列表（用于UI显示）
    getTemplateList() {
        const all = this.getAllTemplates();
        return Object.entries(all).map(([id, template]) => ({
            id,
            name: template.name,
            description: template.description,
            category: template.category,
            custom: template.custom || false
        }));
    }
}
```

---

## 控制台模块

### Console.js 实现

```javascript
// js/modules/Console.js
export class Console {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.logs = [];
        this.isVisible = false;
        this.maxLogs = 100;
        this.init();
    }

    init() {
        this.createUI();
        this.bindEvents();
    }

    createUI() {
        this.container.innerHTML = `
            <div class="console-header">
                <span class="console-title">控制台</span>
                <div class="console-actions">
                    <button class="btn-console-clear" title="清空">🗑️</button>
                    <button class="btn-console-toggle" title="收起">▼</button>
                </div>
            </div>
            <div class="console-content">
                <div class="console-logs"></div>
            </div>
        `;

        this.logsContainer = this.container.querySelector('.console-logs');
    }

    bindEvents() 