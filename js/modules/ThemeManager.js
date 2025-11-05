// 主题管理模块
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.editorTheme = CONFIG.DEFAULT_THEME;
        this.init();
    }

    init() {
        this.loadTheme();
        this.bindEvents();
    }

    bindEvents() {
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
        showNotification(`已切换到${this.currentTheme === 'light' ? '亮色' : '暗色'}主题`, 'info');
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            this.editorTheme = CONFIG.THEMES.dark;
        } else {
            document.body.classList.remove('dark-theme');
            this.editorTheme = CONFIG.THEMES.light;
        }

        // 更新编辑器主题
        if (window.editor) {
            window.editor.setTheme(this.editorTheme);
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme();
        this.saveTheme();
    }

    setEditorTheme(theme) {
        this.editorTheme = theme;
        if (window.editor) {
            window.editor.setTheme(theme);
        }
        this.saveEditorTheme();
    }

    saveTheme() {
        try {
            localStorage.setItem('app-theme', this.currentTheme);
        } catch (error) {
            console.error('保存主题失败:', error);
        }
    }

    saveEditorTheme() {
        try {
            localStorage.setItem('editor-theme', this.editorTheme);
        } catch (error) {
            console.error('保存编辑器主题失败:', error);
        }
    }

    loadTheme() {
        try {
            const savedTheme = localStorage.getItem('app-theme');
            const savedEditorTheme = localStorage.getItem('editor-theme');
            
            if (savedTheme) {
                this.currentTheme = savedTheme;
            }
            
            if (savedEditorTheme) {
                this.editorTheme = savedEditorTheme;
            }
            
            this.applyTheme();
        } catch (error) {
            console.error('加载主题失败:', error);
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getEditorTheme() {
        return this.editorTheme;
    }
}