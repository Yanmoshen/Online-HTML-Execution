// 主应用
class App {
    constructor() {
        this.editor = null;
        this.preview = null;
        this.storage = null;
        this.share = null;
        this.templates = null;
        this.consolePanel = null;
        this.themeManager = null;
        this.updatePreview = null;
        this.autoSaveTimer = null;
        
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // 初始化模块
        this.initModules();
        
        // 绑定事件
        this.bindEvents();
        
        // 加载分享的代码
        this.loadSharedCode();
        
        // 设置调整大小功能
        this.setupResizer();
        
        console.log('应用初始化完成');
    }

    initModules() {
        // 初始化存储
        this.storage = new Storage();
        window.storage = this.storage;

        // 初始化编辑器
        this.editor = new Editor();
        window.editor = this.editor;

        // 初始化预览
        this.preview = new Preview();
        window.preview = this.preview;

        // 初始化控制台
        this.consolePanel = new Console('consolePanel');
        window.consolePanel = this.consolePanel;

        // 初始化分享
        this.share = new Share();
        window.share = this.share;

        // 初始化模板
        this.templates = new Templates();
        window.templates = this.templates;

        // 初始化主题管理
        this.themeManager = new ThemeManager();
        window.themeManager = this.themeManager;

        // 设置编辑器变化监听
        this.setupEditorChangeListener();
    }

    setupEditorChangeListener() {
        // 创建防抖的预览更新函数
        this.updatePreview = debounce((code, force = false) => {
            if (CONFIG.AUTO_RUN || force) {
                this.preview.update(code.html, code.css, code.js);
            }
            
            // 自动保存
            if (CONFIG.AUTO_SAVE) {
                this.autoSave(code);
            }
        }, CONFIG.PREVIEW_DEBOUNCE);

        // 监听编辑器变化
        this.editor.onChange((code, force) => {
            this.updatePreview(code, force);
        });
    }

    autoSave(code) {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = setTimeout(() => {
            this.storage.save(code);
        }, CONFIG.AUTO_SAVE_DELAY);
    }

    bindEvents() {
        // 运行按钮
        const runBtn = document.getElementById('runBtn');
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runCode();
            });
        }

        // 保存按钮
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCode();
            });
        }

        // 清空按钮
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearCode();
            });
        }

        // 模板按钮
        const templateBtn = document.getElementById('templateBtn');
        if (templateBtn) {
            templateBtn.addEventListener('click', () => {
                this.showTemplates();
            });
        }

        // 分享按钮
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.showShareModal();
            });
        }

        // 下载按钮
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadCode();
            });
        }

        // 设置按钮
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }

        // 模态框关闭
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.dataset.modal;
                if (modalId) {
                    hideModal(modalId);
                }
            });
        });

        // 点击遮罩关闭模态框
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    hideAllModals();
                }
            });
        }

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideAllModals();
            }
        });
    }

    runCode() {
        const code = this.editor.getAllValues();
        this.preview.update(code.html, code.css, code.js);
        showNotification('代码已运行', 'success');
    }

    saveCode() {
        const code = this.editor.getAllValues();
        this.storage.save(code);
        showNotification('代码已保存', 'success');
    }

    clearCode() {
        if (confirm('确定要清空所有代码吗？')) {
            this.editor.clear();
            this.preview.clear();
            this.consolePanel.clear();
            showNotification('代码已清空', 'info');
        }
    }

    showTemplates() {
        this.templates.renderTemplateGrid();
        showModal('templateModal');
    }

    showShareModal() {
        const code = this.editor.getAllValues();
        const shareUrl = document.getElementById('shareUrl');
        const copyLinkBtn = document.getElementById('copyLinkBtn');

        try {
            const link = this.share.generateLink(code);
            if (shareUrl) {
                shareUrl.value = link;
            }

            if (copyLinkBtn) {
                copyLinkBtn.onclick = async () => {
                    const success = await copyToClipboard(link);
                    if (success) {
                        showNotification('链接已复制', 'success');
                    } else {
                        showNotification('复制失败', 'error');
                    }
                };
            }

            showModal('shareModal');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    downloadCode() {
        const code = this.editor.getAllValues();
        const html = this.storage.exportAsHTML(code);
        const filename = `code_${Date.now()}.html`;
        downloadFile(html, filename, 'text/html');
        showNotification('代码已下载', 'success');
    }

    showSettings() {
        // 加载当前设置
        const editorThemeSelect = document.getElementById('editorThemeSelect');
        const fontSizeRange = document.getElementById('fontSizeRange');
        const fontSizeValue = document.getElementById('fontSizeValue');
        const autoSaveCheck = document.getElementById('autoSaveCheck');
        const autoRunCheck = document.getElementById('autoRunCheck');

        if (editorThemeSelect) {
            editorThemeSelect.value = this.themeManager.getEditorTheme();
            editorThemeSelect.onchange = (e) => {
                this.themeManager.setEditorTheme(e.target.value);
            };
        }

        if (fontSizeRange && fontSizeValue) {
            fontSizeRange.oninput = (e) => {
                const size = e.target.value;
                fontSizeValue.textContent = size + 'px';
                this.editor.setFontSize(size);
            };
        }

        if (autoSaveCheck) {
            autoSaveCheck.checked = CONFIG.AUTO_SAVE;
            autoSaveCheck.onchange = (e) => {
                CONFIG.AUTO_SAVE = e.target.checked;
            };
        }

        if (autoRunCheck) {
            autoRunCheck.checked = CONFIG.AUTO_RUN;
            autoRunCheck.onchange = (e) => {
                CONFIG.AUTO_RUN = e.target.checked;
            };
        }

        showModal('settingsModal');
    }

    loadSharedCode() {
        const sharedCode = this.share.loadFromURL();
        if (sharedCode) {
            this.editor.setAllValues(sharedCode);
            showNotification('已加载分享的代码', 'success');
            
            // 运行代码
            if (CONFIG.AUTO_RUN) {
                this.preview.update(sharedCode.html, sharedCode.css, sharedCode.js);
            }
        }
    }

    setupResizer() {
        const resizer = document.getElementById('resizer');
        const editorSection = document.querySelector('.editor-section');
        const previewSection = document.querySelector('.preview-section');
        const mainContainer = document.querySelector('.main-container');

        if (!resizer || !editorSection || !previewSection || !mainContainer) return;

        let isResizing = false;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const containerRect = mainContainer.getBoundingClientRect();
            const offsetX = e.clientX - containerRect.left;
            const percentage = (offsetX / containerRect.width) * 100;

            if (percentage > 20 && percentage < 80) {
                editorSection.style.flex = `0 0 ${percentage}%`;
                previewSection.style.flex = `0 0 ${100 - percentage}%`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                
                // 刷新编辑器
                Object.values(this.editor.editors).forEach(editor => {
                    editor.refresh();
                });
            }
        });
    }
}

// 启动应用
const app = new App();