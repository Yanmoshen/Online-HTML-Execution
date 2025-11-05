// 控制台模块
class Console {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.logsContainer = document.getElementById('consoleLogs');
        this.logs = [];
        this.isCollapsed = false;
        this.maxLogs = CONFIG.MAX_CONSOLE_LOGS;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 清空按钮
        const clearBtn = document.getElementById('clearConsoleBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clear();
            });
        }

        // 切换显示/隐藏
        const toggleBtn = document.getElementById('toggleConsoleBtn');
        const header = this.container?.querySelector('.console-header');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggle();
            });
        }
        
        if (header) {
            header.addEventListener('click', (e) => {
                if (e.target === header || e.target.closest('.console-title')) {
                    this.toggle();
                }
            });
        }
    }

    addLog(method, args) {
        const log = {
            method: method || 'log',
            args: args || [],
            timestamp: new Date()
        };

        this.logs.push(log);

        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        this.renderLog(log);
    }

    renderLog(log) {
        if (!this.logsContainer) return;

        const logEl = document.createElement('div');
        logEl.className = `console-log ${log.method}`;
        
        const iconEl = document.createElement('span');
        iconEl.className = 'log-icon';
        
        const contentEl = document.createElement('span');
        contentEl.className = 'log-content';
        
        // 格式化日志内容
        const content = log.args.map(arg => {
            if (typeof arg === 'string') {
                return arg;
            }
            return String(arg);
        }).join(' ');
        
        contentEl.textContent = content;
        
        const timeEl = document.createElement('span');
        timeEl.className = 'log-time';
        timeEl.textContent = formatTime(log.timestamp);
        
        logEl.appendChild(iconEl);
        logEl.appendChild(contentEl);
        logEl.appendChild(timeEl);
        
        this.logsContainer.appendChild(logEl);
        
        // 自动滚动到底部
        this.logsContainer.scrollTop = this.logsContainer.scrollHeight;
    }

    clear() {
        this.logs = [];
        if (this.logsContainer) {
            this.logsContainer.innerHTML = '';
        }
        showNotification('控制台已清空', 'info');
    }

    toggle() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.container) {
            this.container.classList.toggle('collapsed', this.isCollapsed);
        }
        
        const toggleBtn = document.getElementById('toggleConsoleBtn');
        if (toggleBtn) {
            toggleBtn.textContent = this.isCollapsed ? '▲' : '▼';
        }
    }

    show() {
        this.isCollapsed = false;
        if (this.container) {
            this.container.classList.remove('collapsed');
        }
    }

    hide() {
        this.isCollapsed = true;
        if (this.container) {
            this.container.classList.add('collapsed');
        }
    }

    getLogs() {
        return this.logs;
    }
}