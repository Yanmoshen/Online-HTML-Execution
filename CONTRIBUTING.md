
# 贡献指南

感谢你对在线HTML代码运行平台的关注！我们欢迎任何形式的贡献。

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发设置](#开发设置)
- [提交规范](#提交规范)
- [代码规范](#代码规范)
- [测试指南](#测试指南)
- [文档贡献](#文档贡献)
- [问题报告](#问题报告)
- [功能建议](#功能建议)

## 行为准则

### 我们的承诺

为了营造一个开放且友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性暗示的语言或图像
- 人身攻击或侮辱性评论
- 骚扰行为，无论是公开的还是私下的
- 未经许可发布他人的私人信息
- 其他在专业环境中被认为不适当的行为

## 如何贡献

### 报告Bug

如果你发现了bug，请：

1. 检查[Issues](https://github.com/yourusername/online-html-execution/issues)确保问题尚未被报告
2. 如果没有找到相关issue，创建一个新的issue
3. 使用Bug报告模板，提供详细信息：
   - 问题的清晰描述
   - 重现步骤
   - 预期行为
   - 实际行为
   - 截图（如适用）
   - 浏览器和操作系统信息

### 提出新功能

如果你有新功能的想法：

1. 检查[Issues](https://github.com/yourusername/online-html-execution/issues)看是否已有类似建议
2. 创建一个Feature Request issue
3. 清楚地描述：
   - 功能的目的和用例
   - 如何实现（可选）
   - 可能的替代方案

### 提交Pull Request

1. Fork本仓库
2. 创建你的特性分支：
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 进行修改并提交：
   ```bash
   git commit -m 'feat: add some amazing feature'
   ```
4. 推送到分支：
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 开启Pull Request

## 开发设置

### 前置要求

- Git
- 现代浏览器（Chrome/Firefox/Safari/Edge）
- 文本编辑器（推荐VS Code）
- 本地HTTP服务器（可选）

### 克隆仓库

```bash
git clone https://github.com/yourusername/online-html-execution.git
cd online-html-execution
```

### 启动本地开发服务器

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve . -p 8000

# 使用PHP
php -S localhost:8000

# 使用VS Code Live Server扩展
# 右键index.html -> Open with Live Server
```

### 项目结构

```
online-html-execution/
├── index.html          # 主页面
├── css/               # 样式文件
├── js/                # JavaScript文件
│   ├── modules/       # 核心模块
│   └── utils/         # 工具函数
├── lib/               # 第三方库
├── assets/            # 静态资源
└── docs/              # 文档
```

## 提交规范

我们使用[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范。

### 提交消息格式

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

### 类型

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码运行）
- `refactor`: 重构（既不是新功能也不是bug修复）
- `perf`: 性能优化
- `test`: 添加或修改测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI配置文件和脚本的变动

### 示例

```bash
# 新功能
git commit -m "feat: add code export functionality"

# Bug修复
git commit -m "fix: resolve preview iframe loading issue"

# 文档更新
git commit -m "docs: update README with new features"

# 性能优化
git commit -m "perf: optimize code editor rendering"

# 重构
git commit -m "refactor: simplify storage module logic"
```

## 代码规范

### JavaScript规范

#### 命名约定

```javascript
// 使用camelCase命名变量和函数
const myVariable = 'value';
function myFunction() {}

// 使用PascalCase命名类
class MyClass {}

// 使用UPPER_CASE命名常量
const MAX_COUNT = 100;
const API_URL = 'https://api.example.com';

// 私有属性使用下划线前缀
class Example {
    _privateProperty = 'private';
}
```

#### 代码风格

```javascript
// 使用const和let，避免var
const value = 'constant';
let variable = 'variable';

// 使用模板字符串
const message = `Hello, ${name}!`;

// 使用箭头函数
const add = (a, b) => a + b;

// 使用解构
const { html, css, js } = code;

// 使用展开运算符
const newArray = [...oldArray, newItem];

// 使用可选链
const value = obj?.property?.nested;

// 使用空值合并
const result = value ?? defaultValue;
```

#### 注释规范

```javascript
/**
 * 函数描述
 * @param {string} param1 - 参数1描述
 * @param {number} param2 - 参数2描述
 * @returns {boolean} 返回值描述
 */
function exampleFunction(param1, param2) {
    // 单行注释
    return true;
}

/**
 * 类描述
 */
class ExampleClass {
    /**
     * 构造函数
     * @param {Object} options - 配置选项
     */
    constructor(options) {
        this.options = options;
    }
}
```

### CSS规范

```css
/* 使用BEM命名规范 */
.block {}
.block__element {}
.block--modifier {}

/* 示例 */
.editor {}
.editor__tab {}
.editor__tab--active {}
.editor__content {}

/* 使用CSS变量 */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-family: 'Arial', sans-serif;
}

/* 代码组织 */
.component {
    /* 定位 */
    position: relative;
    
    /* 盒模型 */
    display: flex;
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    
    /* 视觉 */
    background: white;
    color: black;
    
    /* 排版 */
    font-size: 16px;
    line-height: 1.5;
    
    /* 其他 */
    cursor: pointer;
}
```

### HTML规范

```html
<!-- 使用语义化标签 -->
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<aside></aside>
<footer></footer>

<!-- 正确的缩进 -->
<div class="container">
    <div class="row">
        <div class="col">
            Content
        </div>
    </div>
</div>

<!-- 使用有意义的ID和类名 -->
<div id="editor-container" class="editor editor--dark">
    <div class="editor__toolbar">
        <button class="btn btn--primary">Run</button>
    </div>
</div>

<!-- 添加必要的属性 -->
<img src="image.jpg" alt="描述" width="100" height="100">
<button type="button" aria-label="关闭">×</button>
```

## 测试指南

### 手动测试清单

在提交PR之前，请确保：

- [ ] 在Chrome中测试
- [ ] 在Firefox中测试
- [ ] 在Safari中测试（如有条件）
- [ ] 在Edge中测试
- [ ] 测试响应式布局（手机、平板）
- [ ] 测试所有新功能
- [ ] 确保没有控制台错误
- [ ] 测试边界情况

### 测试用例示例

```javascript
// 如果项目添加了测试框架
describe('Editor', () => {
    it('should create editor instance', () => {
        const editor = new Editor('container');
        expect(editor).toBeDefined();
    });

    it('should get and set code', () => {
        const editor = new Editor('container');
        editor.setValue('html', '<div>Test</div>');
        expect(editor.getValue('html')).toBe('<div>Test</div>');
    });
});
```

## 文档贡献

### 文档类型

- **README.md**: 项目概述和快速开始
- **ARCHITECTURE.md**: 技术架构说明
- **DEPLOYMENT.md**: 部署指南
- **API.md**: API文档
- **CONTRIBUTING.md**: 本文件

### 文档编写原则

1. **清晰简洁**: 使用简单的语言
2. **结构化**: 使用标题、列表、代码块
3. **示例丰富**: 提供代码示例
4. **保持更新**: 代码变更时同步更新文档

### Markdown规范

```markdown
# 一级标题

## 二级标题

### 三级标题

**粗体文本**
*斜体文本*
`行内代码`

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

[链接文本](url)
![图片描述](image-url)

```代码块
code here
```
```

## 问题报告

### Bug报告模板

```markdown
**描述bug**
清晰简洁地描述bug是什么。

**重现步骤**
1. 进入 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

**预期行为**
清晰简洁地描述你期望发生什么。

**截图**
如适用，添加截图帮助解释你的问题。

**环境信息：**
- 操作系统: [例如 Windows 11]
- 浏览器: [例如 Chrome 120]
- 版本: [例如 1.0.0]

**额外上下文**
在这里添加关于问题的任何其他上下文。
```

## 功能建议

### Feature Request模板

```markdown
**这个功能与问题相关吗？请描述。**
清晰简洁地描述问题是什么。例如：我总是在[...]时感到沮丧

**描述你想要的解决方案**
清晰简洁地描述你想要什么。

**描述你考虑过的替代方案**
清晰简洁地描述你考虑过的任何替代解决方案或特性。

**额外上下文**
在这里添加关于功能请求的任何其他上下文或截图。
```

## Pull Request检查清单

提交PR前，请确保：

- [ ] 代码遵循项目的代码风格
- [ ] 已进行自我代码审查
- [ ] 代码有适当的注释，特别是在复杂的地方
- [ ] 相应的文档已更新
- [ ] 更改不会产生新的警告
- [ ] 已添加测试证明修复有效或功能正常工作
- [ ] 新旧测试都通过
- [ ] 提交消息遵循约定式提交规范

## 代码审查流程

### 对于贡献者

1. 提交PR后等待审查
2. 及时回应审查意见
3. 根据反馈进行修改
4. 请求re-review

### 对于审查者

审查时关注：

1. **代码质量**
   - 是否遵循代码规范
   - 是否有明显的bug
   - 是否有安全问题

2. **功能性**
   - 是否实现了预期功能
   - 是否有边界情况未处理

3. **性能**
   - 是否有性能问题
   - 是否有不必要的计算

4. **可维护性**
   - 代码是否易于理解
   - 是否有足够的注释

5. **测试**
   - 是否有测试覆盖
   - 测试是否充分

## 发布流程

### 版本号规范

遵循[语义化版本](https://semver.org/lang/zh-CN/)：

- **MAJOR**: 不兼容的API修改
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修正

示例：`1.2.3`
- 1: 主版本号
- 2: 次版本号
- 3: 修订号

### 发布步骤

1. 更新版本号
2. 更新CHANGELOG.md
3. 