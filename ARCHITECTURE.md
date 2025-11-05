
# 在线HTML代码运行平台 - 技术架构文档

## 项目概述

本项目是一个开源的在线HTML代码运行平台，允许用户在浏览器中编写和实时预览HTML、CSS和JavaScript代码。项目采用纯前端架构，无需后端服务器，可轻松部署到任何静态网站托管平台。

## 核心特性

### 1. 代码编辑功能
- **多语言支持**：HTML、CSS、JavaScript三种语言分别编辑
- **语法高亮**：基于Prism.js或自定义实现
- **代码格式化**：自动缩进和代码美化
- **行号显示**：便于定位和调试
- **快捷键支持**：
  - `Ctrl/Cmd + S`：保存代码
  - `Ctrl/Cmd + Enter`：运行代码
  - `Ctrl/Cmd + /`：注释/取消注释

### 2. 实时预览功能
- **即时渲染**：代码修改后自动更新预览（300ms防抖）
- **iframe隔离**：使用sandbox iframe确保安全性
- **控制台捕获**：拦截并显示console.log等输出
- **错误提示**：捕获并显示JavaScript运行时错误
- **响应式预览**：支持不同屏幕尺寸预览

### 3. 布局设计
- **分栏布局**：
  - 左侧：代码编辑区域（可切换HTML/CSS/JS标签页）
  - 右侧：实时预览区域
- **可调整尺寸**：拖拽中间分隔条调整编辑器和预览窗口大小
- **全屏模式**：编辑器和预览均支持全屏
- **响应式设计**：移动端自动切换为上下布局

### 4. 数据持久化
- **本地存储**：使用localStorage自动保存代码
- **历史记录**：保存最近10次编辑记录
- **恢复功能**：页面刷新后自动恢复上次编辑内容
- **清空功能**：一键清空所有代码和存储

### 5. 代码分享
- **URL编码**：将代码编码到URL参数中
- **短链接支持**：使用base64压缩（可选集成短链接服务）
- **一键复制**：复制分享链接到剪贴板
- **导入导出**：
  - 导出为单个HTML文件
  - 导出为压缩包（分离的HTML/CSS/JS文件）
  - 导入HTML文件解析

### 6. 模板库
- **内置模板**：
  - 空白模板
  - HTML5基础模板
  - Bootstrap响应式模板
  - Canvas动画模板
  - CSS Grid布局模板
  - JavaScript交互模板
- **自定义模板**：用户可保存常用代码为模板

### 7. 主题和外观
- **编辑器主题**：
  - 亮色主题（默认）
  - 暗色主题（护眼）
  - 高对比度主题
- **界面自定义**：
  - 字体大小调整
  - 字体选择（等宽字体）
  - 行高调整

## 技术栈

### 核心技术
- **HTML5**：页面结构和语义化
- **CSS3**：样式和布局（Flexbox/Grid）
- **原生JavaScript (ES6+)**：核心逻辑实现

### 可选增强库
- **编辑器方案（三选一）**：
  1. **纯手工实现**：使用`<textarea>`+语法高亮（最轻量）
  2. **CodeMirror 6**：约200KB，功能强大（推荐）
  3. **Monaco Editor**：约3MB，VS Code同款（功能最全）

- **语法高亮**：
  - Prism.js（轻量，9KB）
  - Highlight.js（较重，23KB）

- **UI组件**（可选）：
  - Split.js：分栏拖拽（2KB）
  - 纯CSS实现（推荐，0依赖）

### 浏览器兼容性
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 不支持IE11

## 系统架构

### 目录结构
```
online-html-execution/
├── index.html              # 主页面
├── css/
│   ├── main.css           # 主样式
│   ├── editor.css         # 编辑器样式
│   ├── preview.css        # 预览区域样式
│   └── themes/
│       ├── light.css      # 亮色主题
│       └── dark.css       # 暗色主题
├── js/
│   ├── app.js             # 应用入口
│   ├── editor.js          # 编辑器逻辑
│   ├── preview.js         # 预览逻辑
│   ├── storage.js         # 本地存储
│   ├── share.js           # 分享功能
│   ├── templates.js       # 模板管理
│   └── utils.js           # 工具函数
├── lib/                   # 第三方库（可选）
│   ├── codemirror/        # CodeMirror编辑器
│   └── prism/             # 语法高亮
├── assets/
│   ├── icons/             # 图标资源
│   └── fonts/             # 字体文件
├── docs/
│   ├── API.md             # API文档
│   └── CONTRIBUTING.md    # 贡献指南
├── README.md              # 项目说明
├── LICENSE                # 开源协议
└── .gitignore             # Git忽略文件
```

### 核心模块设计

#### 1. Editor Module（编辑器模块）
```javascript
class Editor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.editors = {
      html: null,
      css: null,
      js: null
    };
    this.activeTab = 'html';
    this.init();
  }

  init() {
    // 初始化编辑器
    // 设置语法高亮
    // 绑定事件监听
  }

  getValue(type) {
    // 获取指定类型的代码
  }

  setValue(type, value) {
    // 设置指定类型的代码
  }

  switchTab(tab) {
    // 切换编辑器标签页
  }

  formatCode() {
    // 格式化当前代码
  }
}
```

#### 2. Preview Module（预览模块）
```javascript
class Preview {
  constructor(iframeId) {
    this.iframe = document.getElementById(iframeId);
    this.consoleOutput = [];
    this.init();
  }

  init() {
    // 初始化iframe
    // 设置sandbox属性
    // 拦截console方法
  }

  update(html, css, js) {
    // 更新预览内容
    // 组合HTML/CSS/JS
    // 注入到iframe
  }

  captureConsole() {
    // 捕获console输出
  }

  handleError(error) {
    // 处理运行时错误
  }

  refresh() {
    // 刷新预览
  }
}
```

#### 3. Storage Module（存储模块）
```javascript
class Storage {
  constructor() {
    this.storageKey = 'online-html-editor';
    this.historyKey = 'editor-history';
    this.maxHistory = 10;
  }

  save(data) {
    // 保存代码到localStorage
    // 添加到历史记录
  }

  load() {
    // 从localStorage加载代码
  }

  getHistory() {
    // 获取历史记录列表
  }

  clear() {
    // 清空存储
  }

  export(format) {
    // 导出为文件
    // 支持单文件HTML或ZIP
  }
}
```

#### 4. Share Module（分享模块）
```javascript
class Share {
  constructor() {
    this.maxUrlLength = 2000; // URL长度限制
  }

  encode(html, css, js) {
    // 将代码编码为URL参数
    // 使用LZString压缩
    // 或base64编码
  }

  decode(urlParams) {
    // 从URL参数解码代码
  }

  generateShareLink() {
    // 生成分享链接
  }

  copyToClipboard(text) {
    // 复制到剪贴板
  }
}
```

## 安全设计

### 1. Iframe沙箱
```html
<iframe 
  sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
  id="preview"
></iframe>
```

### 2. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';">
```

### 3. XSS防护
- 对用户输入进行HTML转义
- 限制iframe访问父页面
- 使用srcdoc而非src加载内容

### 4. 代码注入防护
- 过滤危险标签（`<script src>`外部脚本）
- 限制某些API访问（可选）
- 用户代码与编辑器代码完全隔离

## 性能优化

### 1. 代码更新防抖
```javascript
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 使用300ms防抖优化预览更新
const updatePreview = debounce(() => {
  preview.update(
    editor.getValue('html'),
    editor.getValue('css'),
    editor.getValue('js')
  );
}, 300);
```

### 2. 懒加载
- 模板内容按需加载
- 编辑器库按需引入
- 图片资源懒加载

### 3. 代码压缩
- HTML/CSS/JS文件压缩
- 使用gzip/brotli压缩传输

### 4. 缓存策略
- localStorage缓存用户代码
- Service Worker缓存静态资源（PWA）

## 部署方案

### 1. GitHub Pages（推荐）
```bash
# 直接推送到gh-pages分支
git checkout -b gh-pages
git push origin gh-pages
```

访问地址：`https://username.github.io/online-html-execution`

### 2. Vercel
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 3. Netlify
- 拖拽部署：直接将项目文件夹拖到Netlify
- Git集成：连接GitHub仓库自动部署

### 4. Cloudflare Pages
```bash
# 推送到GitHub后在Cloudflare Pages连接仓库
```

### 5. 自托管
```bash
# 使用任何HTTP服务器
python -m http.server 8000
# 或
npx serve .
```

### 6. Docker部署
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t online-html-editor .
docker run -p 8080:80 online-html-editor
```

## 开源协议

### MIT License（推荐）
- 允许商业使用
- 允许修改和分发
- 仅需保留版权声明

### 协议文本
```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 贡献指南

### 如何贡献
1. Fork本仓库
2. 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 开启Pull Request

### 代码规范
- 使用ES6+语法
- 遵循ESLint规则
- 添加必要的注释
- 保持代码简洁可读

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链更新
```

## 扩展功能（可选实现）

### 1. 多人协作
- 使用WebRTC或WebSocket实现实时协作
- 集成Firebase或Supabase作为后端

### 2. 代码片段库
- 用户可保存和分享代码片段
- 社区代码片段浏览

### 3. AI辅助
- 集成ChatGPT API进行代码补全
- 代码错误诊断和修复建议

### 4. 更多语言支持
- TypeScript
- Sass/Less
- Markdown预览

### 5. 版本控制
- 本地Git集成
- 代码版本历史
- Diff对比

### 6. 插件系统
- 允许第三方开发插件
- 插件市场

## 测试计划

### 单元测试
- 编辑器模块测试
- 存储模块测试
- 工具函数测试

### 集成测试
- 编辑器与预览联动测试
- 分享功能端到端测试

### 浏览器兼容性测试
- 