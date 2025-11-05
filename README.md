# 在线HTML代码运行平台 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

一个功能强大、易于部署的在线HTML代码运行平台，让你可以在浏览器中实时编写和预览HTML、CSS和JavaScript代码。

[在线演示](https://Yanmoshen.github.io/online-html-execution) | [文档](docs/) | [贡献指南](CONTRIBUTING.md)

## ✨ 特性

- 🎨 **实时预览** - 代码修改后立即看到效果
- 📝 **三语言支持** - HTML、CSS、JavaScript分离编辑
- 💾 **自动保存** - 代码自动保存到本地存储
- 🔗 **代码分享** - 生成分享链接，一键分享你的代码
- 📦 **模板库** - 内置多个常用代码模板
- 🎯 **控制台输出** - 捕获并显示console日志
- 🌓 **主题切换** - 支持亮色/暗色主题
- 📱 **响应式设计** - 完美适配各种设备
- ⚡ **零依赖运行** - 纯前端实现，无需后端
- 🔒 **安全隔离** - 使用iframe沙箱隔离用户代码

## 🎬 快速开始

### 在线使用

访问 [在线演示地址](https://Yanmoshen.github.io/online-html-execution) 立即开始使用。

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/Yanmoshen/online-html-execution.git

# 进入项目目录
cd online-html-execution

# 启动本地服务器（任选其一）
python -m http.server 8000
# 或
npx serve . -p 8000

# 访问 http://localhost:8000
```

## 📸 截图

### 主界面
![主界面](assets/images/screenshot.png)

### 暗色主题
![暗色主题](assets/images/dark-theme.png)

## 🎯 使用方法

### 基础使用

1. **编写代码** - 在左侧编辑器中编写HTML、CSS、JavaScript代码
2. **实时预览** - 右侧会自动显示运行结果
3. **查看控制台** - 底部控制台显示日志和错误信息
4. **保存代码** - 使用 `Ctrl/Cmd + S` 保存代码

### 快捷键

- `Ctrl/Cmd + S` - 保存代码
- `Ctrl/Cmd + Enter` - 运行代码
- `Ctrl/Cmd + /` - 注释/取消注释
- `Tab` - 缩进

### 代码分享

1. 点击工具栏中的"分享"按钮
2. 复制生成的分享链接
3. 将链接发送给他人

### 导出代码

- **导出为HTML文件** - 点击"下载"按钮，选择"HTML文件"
- **导出为ZIP** - 下载包含分离的HTML/CSS/JS文件的压缩包

## 🏗️ 项目结构

```
online-html-execution/
├── index.html              # 主页面
├── css/                    # 样式文件
│   ├── main.css           # 主样式
│   ├── editor.css         # 编辑器样式
│   └── themes/            # 主题
├── js/                     # JavaScript文件
│   ├── app.js             # 应用入口
│   ├── modules/           # 核心模块
│   └── utils/             # 工具函数
├── lib/                    # 第三方库
├── assets/                 # 静态资源
├── templates/              # 代码模板
└── docs/                   # 文档
```

详细结构请查看 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 📚 文档

- [技术架构](ARCHITECTURE.md) - 详细的技术架构说明
- [项目结构](PROJECT_STRUCTURE.md) - 完整的目录结构设计
- [实现方案](IMPLEMENTATION.md) - 核心功能实现细节
- [部署指南](DEPLOYMENT.md) - 多平台部署教程
- [贡献指南](CONTRIBUTING.md) - 如何参与贡献
- [API文档](docs/API.md) - 模块API说明

## 🚀 部署

本项目支持多种部署方式：

### GitHub Pages（推荐）

```bash
# 推送代码到GitHub
git push origin main

# 在仓库设置中启用GitHub Pages
# Settings > Pages > Source: main branch
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/online-html-execution)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/online-html-execution)

更多部署方式请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 🛠️ 技术栈

### 核心技术
- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)

### 可选库
- CodeMirror 6 - 代码编辑器
- Prism.js - 语法高亮
- LZ-String - 字符串压缩

### 浏览器支持
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🎨 自定义

### 修改主题

编辑 `css/themes/` 目录下的CSS文件：

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #ffffff;
    --text-color: #333333;
}
```

### 添加模板

在 `templates/` 目录添加JSON文件：

```json
{
    "name": "我的模板",
    "description": "模板描述",
    "html": "HTML代码",
    "css": "CSS代码",
    "js": "JavaScript代码"
}
```

### 配置选项

修改 `js/config.js`：

```javascript
export const CONFIG = {
    AUTO_SAVE: true,
    AUTO_SAVE_DELAY: 2000,
    PREVIEW_DEBOUNCE: 300,
    MAX_HISTORY: 10,
    DEFAULT_THEME: 'light'
};
```

## 🤝 贡献

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

详细信息请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)

### 贡献者

感谢所有为本项目做出贡献的开发者！

<a href="https://github.com/yourusername/online-html-execution/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/online-html-execution" />
</a>

## 📝 开发计划

- [x] 基础编辑器功能
- [x] 实时预览
- [x] 代码保存和加载
- [x] 代码分享
- [ ] 多人协作编辑
- [ ] 代码片段库
- [ ] AI代码补全
- [ ] TypeScript支持
- [ ] 插件系统
- [ ] 移动端优化

查看完整的 [TODO.md](TODO.md)

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [CodeMirror](https://codemirror.net/) - 优秀的代码编辑器
- [Prism.js](https://prismjs.com/) - 轻量级语法高亮库
- [LZ-String](https://pieroxy.net/blog/pages/lz-string/index.html) - 字符串压缩工具

## 📞 联系方式

- 作者: Your Name
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- 项目链接: [https://github.com/yourusername/online-html-execution](https://github.com/yourusername/online-html-execution)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/online-html-execution&type=Date)](https://star-history.com/#yourusername/online-html-execution&Date)

## 💡 灵感来源

本项目受到以下优秀项目的启发：

- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [JS Bin](https://jsbin.com/)

## 🔗 相关项目

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code 编辑器
- [CodeMirror](https://codemirror.net/) - 代码编辑器
- [Ace Editor](https://ace.c9.io/) - 另一个代码编辑器

---

<p align="center">
  如果这个项目对你有帮助，请给它一个 ⭐️
</p>

<p align="center">
  用 ❤️ 制作
</p>