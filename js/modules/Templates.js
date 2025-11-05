// 模板模块
class Templates {
    constructor() {
        this.templates = TEMPLATES;
    }

    // 获取所有模板
    getAllTemplates() {
        return this.templates;
    }

    // 根据ID获取模板
    getTemplate(id) {
        return this.templates[id] || null;
    }

    // 根据分类获取模板
    getTemplatesByCategory(category) {
        return Object.entries(this.templates)
            .filter(([, template]) => template.category === category)
            .reduce((acc, [id, template]) => {
                acc[id] = template;
                return acc;
            }, {});
    }

    // 获取模板列表
    getTemplateList() {
        return Object.entries(this.templates).map(([id, template]) => ({
            id,
            name: template.name,
            description: template.description,
            icon: template.icon,
            category: template.category
        }));
    }

    // 应用模板
    applyTemplate(id) {
        const template = this.getTemplate(id);
        if (template) {
            return {
                html: template.html || '',
                css: template.css || '',
                js: template.js || ''
            };
        }
        return null;
    }

    // 渲染模板选择界面
    renderTemplateGrid() {
        const grid = document.getElementById('templateGrid');
        if (!grid) return;

        grid.innerHTML = '';
        const templateList = this.getTemplateList();

        templateList.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.innerHTML = `
                <div class="template-card-header">
                    <span class="template-icon">${template.icon}</span>
                    <span class="template-name">${template.name}</span>
                </div>
                <p class="template-description">${template.description}</p>
                <span class="template-category">${template.category}</span>
            `;

            card.addEventListener('click', () => {
                this.selectTemplate(template.id);
            });

            grid.appendChild(card);
        });
    }

    // 选择模板
    selectTemplate(id) {
        const code = this.applyTemplate(id);
        if (code && window.editor) {
            window.editor.setAllValues(code);
            hideModal('templateModal');
            showNotification(`已加载模板: ${this.getTemplate(id).name}`, 'success');
            
            // 触发预览更新
            if (window.preview && CONFIG.AUTO_RUN) {
                window.preview.update(code.html, code.css, code.js);
            }
        }
    }
}