// 编辑器模块
class Editor {
    constructor(containerId) {
        this.container = document.getElementById(containerId) || document.querySelector('.editor-section');
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
        this.initCodeMirror();
        this.bindEvents();
        this.loadSavedCode();
    }

    initCodeMirror() {
        // HTML编辑器
        this.editors.html = CodeMirror(document.getElementById('html-pane'), {
            mode: 'htmlmixed',
            theme: CONFIG.DEFAULT_THEME,
            lineNumbers: CONFIG.LINE_NUMBERS,
            lineWrapping: CONFIG.LINE_WRAPPING,
            autoCloseTags: CONFIG.AUTO_CLOSE_TAGS,
            autoCloseBrackets: CONFIG.AUTO_CLOSE_BRACKETS,
            matchBrackets: CONFIG.MATCH_BRACKETS,
            indentUnit: CONFIG.TAB_SIZE,
            tabSize: CONFIG.TAB_SIZE,
            indentWithTabs: CONFIG.INDENT_WITH_TABS
        });

        // CSS编辑器
        this.editors.css = CodeMirror(document.getElementById('css-pane'), {
            mode: 'css',
            theme: CONFIG.DEFAULT_THEME,
            lineNumbers: CONFIG.LINE_NUMBERS,
            lineWrapping: CONFIG.LINE_WRAPPING,
            autoCloseBrackets: CONFIG.AUTO_CLOSE_BRACKETS,
            matchBrackets: CONFIG.MATCH_BRACKETS,
            indentUnit: CONFIG.TAB_SIZE,
            tabSize: CONFIG.TAB_SIZE,
            indentWithTabs: CONFIG.INDENT_WITH_TABS
        });

        // JavaScript编辑器
        this.editors.js = CodeMirror(document.getElementById('js-pane'), {
            mode: 'javascript',
            theme: CONFIG.DEFAULT_THEME,
            lineNumbers: CONFIG.LINE_NUMBERS,
            lineWrapping: CONFIG.LINE_WRAPPING,
            autoCloseBrackets: CONFIG.AUTO_CLOSE_BRACKETS,
            matchBrackets: CONFIG.MATCH_BRACKETS,
            indentUnit: CONFIG.TAB_SIZE,
            tabSize: CONFIG.TAB_SIZE,
            indentWithTabs: CONFIG.INDENT_WITH_TABS
        });

        // 监听变化
        Object.keys(this.editors).forEach(lang => {
            this.editors[lang].on('change', () => {
                this.handleCodeChange();
            });
        });

        // 设置初始编辑器大小
        Object.values(this.editors).forEach(editor => {
            editor.setSize('100%', '100%');
        });
    }

    bindEvents() {
        // 标签切换
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.switchTab(lang);
            });
        });

        // 快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S 保存
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveCode();
            }
            // Ctrl/Cmd + Enter 运行
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });
    }

    switchTab(lang) {
        if (this.activeTab === lang) return;

        // 更新标签状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // 更新编辑器显示
        document.querySelectorAll('.editor-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `${lang}-pane`);
        });

        this.activeTab = lang;
        
        // 刷新编辑器并聚焦
        setTimeout(() => {
            this.editors[lang].refresh();
            this.editors[lang].focus();
        }, 0);
    }

    getValue(lang) {
        return this.editors[lang]?.getValue() || '';
    }

    setValue(lang, value) {
        if (this.editors[lang]) {
            this.editors[lang].setValue(value || '');
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

    setFontSize(size) {
        const style = document.createElement('style');
        style.textContent = `.CodeMirror { font-size: ${size}px; }`;
        document.head.appendChild(style);
        
        // 刷新编辑器
        Object.values(this.editors).forEach(editor => {
            editor.refresh();
        });
    }

    saveCode() {
        if (window.storage) {
            window.storage.save(this.getAllValues());
            showNotification('代码已保存', 'success');
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
        showNotification('代码已清空', 'info');
    }

    focus() {
        this.editors[this.activeTab].focus();
    }
}