# 项目目录结构设计

## 完整目录树

```
online-html-execution/
│
├── index.html                    # 主页面入口
│
├── css/                          # 样式文件目录
│   ├── main.css                 # 主样式文件
│   ├── editor.css               # 编辑器样式
│   ├── preview.css              # 预览区样式
│   ├── console.css              # 控制台样式
│   ├── modal.css                # 模态框样式
│   ├── responsive.css           # 响应式样式
│   └── themes/                  # 主题目录
│       ├── light.css            # 亮色主题
│       ├── dark.css             # 暗色主题
│       └── high-contrast.css    # 高对比度主题
│
├── js/                          # JavaScript文件目录
│   ├── app.js                   # 应用主入口
│   ├── config.js                # 配置文件
│   ├── modules/                 # 核心模块
│   │   ├── Editor.js           # 编辑器类
│   │   ├── Preview.js          # 预览类
│   │   ├── Storage.js          # 本地存储类
│   │   ├── Share.js            # 分享功能类
│   │   ├── Templates.js        # 模板管理类
│   │   ├── Console.js          # 控制台类
│   │   └── ThemeManager.js     # 主题管理类
│   ├── utils/                   # 工具函数
│   │   ├── dom.js              # DOM操作工具
│   │   ├── compress.js         # 压缩/解压工具
│   │   ├── format.js           # 代码格式化
│   │   ├── debounce.js         # 防抖节流
│   │   └── clipboard.js        # 剪贴板操作
│   └── constants/               # 常量定义
│       ├── templates.js        # 模板常量
│       └── shortcuts.js        # 快捷键定义
│
├── lib/                         # 第三方库（可选）
│   ├── codemirror/             # CodeMirror编辑器
│   │   ├── codemirror.min.js
│   │   ├── codemirror.min.css
│   │   └── modes/              # 语言模式
│   │       ├── htmlmixed.js
│   │       ├── css.js
│   │       └── javascript.js
│   ├── prism/                   # 语法高亮（轻量方案）
│   │   ├── prism.min.js
│   │   └── prism.min.css
│   └── lz-string/              # 字符串压缩
│       └── lz-string.min.js
│
├── assets/                      # 静态资源
│   ├── icons/                  # 图标
│   │   ├── logo.svg
│   │   ├── play.svg
│   │   ├── save.svg
│   │   ├── share.svg
│   │   ├── download.svg
│   │   ├── settings.svg
│   │   └── theme.svg
│   ├── fonts/                  # 字体文件
│   │   ├── FiraCode-Regular.woff2
│   │   └── Consolas.woff2
│   └── images/                 # 图片资源
│       ├── screenshot.png
│       └── demo.gif
│
├── templates/                   # 内置代码模板
│   ├── blank.json              # 空白模板
│   ├── html5-basic.json        # HTML5基础
│   ├── bootstrap.json          # Bootstrap模板
│   ├── canvas-animation.json   # Canvas动画
│   ├── css-grid.json           # CSS Grid布局
│   └── js-interactive.json     # JavaScript交互
│
├── docs/                        # 文档目录
│   ├── API.md                  # API文档
│   ├── FEATURES.md             # 功能说明
│   ├── DEPLOYMENT.md           # 部署指南
│   ├── CONTRIBUTING.md         # 贡献指南
│   └── CHANGELOG.md            # 更新日志
│
├── examples/                    # 示例代码
│   ├── basic/
│   │   ├── hello-world.html
│   │   └── simple-form.html
│   ├── intermediate/
│   │   ├── todo-list.html
│   │   └── modal-popup.html
│   └── advanced/
│       ├── canvas-game.html
│       └── react-component.html
│
├── tests/                       # 测试文件（可选）
│   ├── unit/
│   │   ├── editor.test.js
│   │   ├── storage.test.js
│   │   └── utils.test.js
│   └── integration/
│       └── app.test.js
│
├── .github/                     # GitHub配置
│   ├── workflows/
│   │   └── deploy.yml          # CI/CD配置
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .gitignore                   # Git忽略文件
├── .editorconfig               # 编辑器配置
├── .eslintrc.json              # ESLint配置
├── .prettierrc                 # Prettier配置
├── package.json                # npm配置（可选）
├── README.md                   # 项目说明
├── LICENSE                     # 开源协议
├── ARCHITECTURE.md             # 架构文档
├── PROJECT_STRUCTURE.md        # 本文件
└── TODO.md                     # 待办事项
```

## 目录说明

### 核心文件

#### index.html
主页面，包含完整的HTML结构和布局。

**主要结构：**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>在线HTML代码运行平台</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- 头部工具栏 -->
    <header id="toolbar"></header>
    
    <!-- 主内容区域 -->
    <main id="main-container">
        <!-- 编辑器区域 -->
        <section id="editor-section"></section>
        
        <!-- 预览区域 -->
        <section id="preview-section"></section>
    </main>
    
    <!-- 控制台 -->
    <aside id="console-panel"></aside>
    
    <!-- 模态框 -->
    <div id="modal-container"></div>
    
    <script src="js/app.js" type="module"></script>
</body>
</html>
```

### CSS目录

#### main.css
全局样式，包括：
- CSS变量定义（颜色、字体、间距）
- 重置样式
- 通用组件样式
- 布局样式

#### editor.css
编辑器样式，包括：
- 编辑器容器
- 标签页样式
- 代码高亮
- 行号显示

#### preview.css
预览区域样式，包括：
- iframe容器
- 加载状态
- 错误提示

#### console.css
控制台样式，包括：
- 日志显示
- 错误/警告样式
- 可折叠面板

#### responsive.css
响应式样式：
- 移动端适配
- 平板适配
- 断点定义

### JavaScript目录

#### app.js
应用入口文件，负责：
- 初始化各个模块
- 绑定全局事件
- 启动应用

```javascript
import { Editor } from './modules/Editor.js';
import { Preview } from './modules/Preview.js';
import { Storage } from './modules/Storage.js';
// ...其他导入

class App {
    constructor() {
        this.editor = new Editor();
        this.preview = new Preview();
        this.storage = new Storage();
        this.init();
    }
    
    init() {
        // 初始化逻辑
    }
}

new App();
```

#### config.js
配置文件：
```javascript
export const CONFIG = {
    AUTO_SAVE: true,
    AUTO_SAVE_DELAY: 2000,
    PREVIEW_DEBOUNCE: 300,
    MAX_HISTORY: 10,
    DEFAULT_THEME: 'light',
    STORAGE_KEY: 'online-html-editor',
    // ...更多配置
};
```

#### modules/目录
核心功能模块，每个类负责特定功能：

- **Editor.js**: 编辑器管理
- **Preview.js**: 预览窗口管理
- **Storage.js**: 本地存储
- **Share.js**: 分享功能
- **Templates.js**: 模板管理
- **Console.js**: 控制台输出
- **ThemeManager.js**: 主题切换

#### utils/目录
工具函数库：

- **dom.js**: DOM操作辅助函数
- **compress.js**: 代码压缩/解压
- **format.js**: 代码格式化
- **debounce.js**: 防抖/节流函数
- **clipboard.js**: 剪贴板操作

### 第三方库目录（lib/）

根据选择的方案，可能包含：

**轻量方案（推荐）：**
- Prism.js（9KB） - 语法高亮
- LZ-String（3KB） - 字符串压缩

**完整方案：**
- CodeMirror 6（~200KB） - 代码编辑器
- LZ-String（3KB） - 字符串压缩

**豪华方案：**
- Monaco Editor（~3MB） - VS Code编辑器
- LZ-String（3KB） - 字符串压缩

### 静态资源目录（assets/）

#### icons/
SVG图标，保持风格统一，支持主题切换

#### fonts/
等宽字体，用于代码显示：
- Fira Code（支持连字）
- Consolas（Windows经典）
- Monaco（macOS风格）

#### images/
项目截图、演示动图等

### 模板目录（templates/）

JSON格式的代码模板：

```json
{
    "name": "HTML5 基础模板",
    "description": "标准的HTML5页面结构",
    "html": "<!DOCTYPE html>\n<html>...",
    "css": "/* 样式 */",
    "js": "// JavaScript代码"
}
```

### 文档目录（docs/）

完整的项目文档：

- **API.md**: 各模块API说明
- **FEATURES.md**: 功能详细说明
- **DEPLOYMENT.md**: 各平台部署教程
- **CONTRIBUTING.md**: 如何参与贡献
- **CHANGELOG.md**: 版本更新记录

### 示例目录（examples/）

按难度分级的示例代码：
- basic/: 基础示例
- intermediate/: 中级示例
- advanced/: 高级示例

### 测试目录（tests/）

可选的测试文件：
- unit/: 单元测试
- integration/: 集成测试

## 文件大小预估

### 纯手工实现方案（最轻量）
```
index.html          ~5KB
css/                ~20KB
js/                 ~30KB
lib/prism/          ~10KB
assets/             ~15KB
------------------------
总计                ~80KB (未压缩)
压缩后              ~25KB
```

### CodeMirror方案（推荐）
```
index.html          ~5KB
css/                ~25KB
js/                 ~35KB
lib/codemirror/     ~200KB
lib/lz-string/      ~3KB
assets/             ~20KB
------------------------
总计                ~290KB (未压缩)
压缩后              ~100KB
```

### Monaco Editor方案（功能最强）
```
index.html          ~5KB
css/                ~30KB
js/                 ~40KB
lib/monaco/         ~3MB
lib/lz-string/      ~3KB
assets/             ~25KB
------------------------
总计                ~3.1MB (未压缩)
压缩后              ~1MB
```

## 版本控制策略

### .gitignore
```
# 依赖
node_modules/
package-lock.json

# 构建产物
dist/
build/

# 编辑器
.vscode/
.idea/
*.swp
*.swo

# 系统文件
.DS_Store
Thumbs.db

# 日志
*.log

# 环境变量
.env
.env.local
```

### 分支策略
- `main`: 稳定版本
- `develop`: 开发版本
- `feature/*`: 新功能分支
- `fix/*`: 修复分支

## 部署文件清单

### 最小部署（仅核心功能）
```
index.html
css/main.css
css/editor.css
css/preview.css
css/themes/light.css
js/app.js
js/modules/*.js
js/utils/*.js
assets/icons/*.svg
```

### 完整部署（包含所有功能）
```
所有文件
除了：
- tests/
- docs/（可选）
- examples/（可选）
- .github/
```

## 开发工作流

### 1. 初始设置
```bash
git clone https://github.com/yourusername/online-html-execution.git
cd online-html-execution
```

### 2. 本地开发
```bash
# 启动本地服务器
python -m http.server 8000
# 或
npx serve .
```

### 3. 测试
```bash
# 打开浏览器访问
http://localhost:8000
```

### 4. 构建（如果使用构建工具）
```bash
npm run build
```

### 5. 部署
```bash
# GitHub Pages
git push origin main

# 或使用部署工具
vercel deploy
```

## 扩展性设计

### 插件系统目录结构（未来）
```
plugins/
├── plugin-loader.js
├── plugin-api.js
└── official/
    ├── emmet/
    ├── prettier/
    └── eslint/
```

### 多语言支持（未来）
```
locales/
├── zh-CN.json
├── en-US.json
├── ja-JP.json
└── ko-KR.json
```

## 性能优化建议

1. **懒加载**: 模板和示例按需加载
2. **代码分割**: 使用动态import
3. **资源压缩**: 使用gzip/brotli
4. **CDN**: 第三方库使用CDN
5. **缓存**: 合理设置缓存策略

## 总结

本目录结构设计遵循以下原则：

1. **模块化**: 功能分离，职责明确
2. **可扩展**: 易于添加新功能
3. **可维护**: 代码组织清晰
4. **轻量化**: 核心功能保持简洁
5. **标准化**: 遵循前端最佳实践

根据项目需求，可以选择不同的实现方案，从最轻量的纯手工实现到功能强大的Monaco Editor方案。