// 存储模块
class Storage {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEY;
        this.historyKey = CONFIG.HISTORY_KEY;
        this.settingsKey = CONFIG.SETTINGS_KEY;
        this.maxHistory = CONFIG.MAX_HISTORY;
    }

    // 保存代码
    save(code) {
        try {
            const data = {
                html: code.html || '',
                css: code.css || '',
                js: code.js || '',
                timestamp: Date.now()
            };

            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.addToHistory(data);
            return true;
        } catch (error) {
            console.error('保存失败:', error);
            
            // 可能是存储空间已满
            if (error.name === 'QuotaExceededError') {
                this.cleanOldHistory();
                try {
                    localStorage.setItem(this.storageKey, JSON.stringify(data));
                    return true;
                } catch (retryError) {
                    console.error('重试保存失败:', retryError);
                    showNotification('存储空间已满', 'error');
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

    // 添加到历史记录
    addToHistory(data) {
        try {
            let history = this.getHistory();
            
            history.unshift({
                html: data.html,
                css: data.css,
                js: data.js,
                timestamp: data.timestamp
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

    // 导出为HTML文件
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

    // 清空所有存储
    clearAll() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.historyKey);
            return true;
        } catch (error) {
            console.error('清空存储失败:', error);
            return false;
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
        
        const usedKB = (total / 1024).toFixed(2);
        const limitKB = 5120; // 约5MB
        const percentage = ((total / (limitKB * 1024)) * 100).toFixed(2);

        return {
            used: usedKB,
            limit: limitKB,
            percentage: percentage
        };
    }
}