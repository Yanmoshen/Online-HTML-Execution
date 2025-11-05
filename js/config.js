// 应用配置
const CONFIG = {
    // 自动保存
    AUTO_SAVE: true,
    AUTO_SAVE_DELAY: 2000, // 毫秒
    
    // 自动运行
    AUTO_RUN: true,
    PREVIEW_DEBOUNCE: 300, // 毫秒
    
    // 存储
    STORAGE_KEY: 'online-html-editor-code',
    HISTORY_KEY: 'online-html-editor-history',
    SETTINGS_KEY: 'online-html-editor-settings',
    MAX_HISTORY: 10,
    
    // 编辑器
    DEFAULT_THEME: 'eclipse',
    THEMES: {
        light: 'eclipse',
        dark: 'monokai'
    },
    FONT_SIZE: 14,
    TAB_SIZE: 2,
    INDENT_WITH_TABS: false,
    LINE_WRAPPING: true,
    LINE_NUMBERS: true,
    AUTO_CLOSE_BRACKETS: true,
    AUTO_CLOSE_TAGS: true,
    MATCH_BRACKETS: true,
    
    // 分享
    MAX_URL_LENGTH: 2000,
    
    // 控制台
    MAX_CONSOLE_LOGS: 100,
    
    // 版本
    VERSION: '1.0.0'
};

// 导出配置（如果支持模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}