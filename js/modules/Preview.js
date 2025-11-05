// 预览模块
class Preview {
    constructor(iframeId) {
        this.iframe = document.getElementById(iframeId) || document.getElementById('preview-iframe');
        this.loading = document.querySelector('.preview-loading');
        this.consoleOutput = [];
        this.errorHandler = null;
        this.init();
    }

    init() {
        this.setupMessageListener();
        this.bindEvents();
    }

    setupMessageListener() {
        // 监听来自iframe的消息
        window.addEventListener('message', (event) => {
            if (event.data.type === 'console') {
                this.handleConsoleMessage(event.data);
            } else if (event.data.type === 'error') {
                this.handleError(event.data);
            }
        });
    }

    bindEvents() {
        // 刷新按钮
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refresh();
            });
        }

        // 全屏按钮
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
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
            };
        } catch (error) {
            this.hideLoading();
            this.handleError(error);
        }
    }

    buildDocument(html, css, js) {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
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
                column: colno,
                stack: error ? error.stack : ''
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

        // 拦截console方法
        (function() {
            const originalLog = console.log;
            const originalWarn = console.warn;
            const originalError = console.error;
            const originalInfo = console.info;

            console.log = function(...args) {
                originalLog.apply(console, args);
                window.parent.postMessage({
                    type: 'console',
                    method: 'log',
                    args: args.map(arg => {
                        try {
                            if (typeof arg === 'object') {
                                return JSON.stringify(arg, null, 2);
                            }
                            return String(arg);
                        } catch (e) {
                            return '[无法序列化]';
                        }
                    })
                }, '*');
            };

            console.warn = function(...args) {
                originalWarn.apply(console, args);
                window.parent.postMessage({
                    type: 'console',
                    method: 'warn',
                    args: args.map(arg => String(arg))
                }, '*');
            };

            console.error = function(...args) {
                originalError.apply(console, args);
                window.parent.postMessage({
                    type: 'console',
                    method: 'error',
                    args: args.map(arg => String(arg))
                }, '*');
            };

            console.info = function(...args) {
                originalInfo.apply(console, args);
                window.parent.postMessage({
                    type: 'console',
                    method: 'info',
                    args: args.map(arg => String(arg))
                }, '*');
            };
        })();

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
</html>`;
    }

    handleConsoleMessage(data) {
        this.consoleOutput.push(data);
        
        // 触发控制台更新
        if (window.consolePanel) {
            window.consolePanel.addLog(data.method, data.args);
        }
    }

    handleError(error) {
        console.error('预览错误:', error);
        
        if (window.consolePanel) {
            window.consolePanel.addLog('error', [error.message || error]);
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
        showNotification('预览已刷新', 'info');
    }

    clear() {
        this.iframe.srcdoc = '';
        this.consoleOutput = [];
    }

    showLoading() {
        if (this.loading) {
            this.loading.classList.add('show');
        }
    }

    hideLoading() {
        if (this.loading) {
            this.loading.classList.remove('show');
        }
    }

    toggleFullscreen() {
        const previewSection = document.querySelector('.preview-section');
        if (!previewSection) return;

        if (!document.fullscreenElement) {
            previewSection.requestFullscreen().catch(err => {
                console.error('全屏失败:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    getConsoleOutput() {
        return this.consoleOutput;
    }
}