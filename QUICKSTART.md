# 快速开始指南

## 🚀 在线使用

直接访问 [在线演示](https://yourusername.github.io/online-html-execution) 即可开始使用，无需任何安装。

## 💻 本地运行

### 方法1：直接打开（推荐）

1. 下载项目文件
2. 用浏览器直接打开 `index.html` 文件

**注意**：某些功能（如代码分享）需要在HTTP服务器环境下运行。

### 方法2：使用本地服务器

#### 使用Python（推荐）

```bash
# Python 3
python -m http.server 8000

# 访问 http://localhost:8000
```

#### 使用Node.js

```bash
# 安装serve（首次使用）
npm install -g serve

# 启动服务器
serve . -p 8000

# 访问 http://localhost:8000
```

#### 使用PHP

```bash
php -S localhost:8000

# 访问 http://localhost:8000
```

#### 使用VS Code

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📝 基础使用

### 1. 编写代码

- 点击顶部的 **HTML**、**CSS**、**JavaScript** 标签切换编辑器
- 在编辑器中输入你的代码
- 代码会自动保存到浏览器本地存储

### 2. 查看预览

- 右侧会实时显示代码运行结果
- 修改代码后会自动更新预览（300ms延迟）
- 点击 **运行** 按钮可立即更新预览

### 3. 使用控制台

- 底部控制台会显示 `console.log` 等输出
- 显示JavaScript运行错误
- 点击清空按钮可清除日志

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + S` | 保存代码 |
| `Ctrl/Cmd + Enter` | 运行代码 |
| `Ctrl/Cmd + /` | 注释/取消注释 |
| `Tab` | 缩进 |
| `Esc` | 关闭模态框 |

## 🎨 功能介绍

### 使用模板

1. 点击工具栏的 **模板** 按钮
2. 选择一个模板（如：HTML5基础、Bootstrap、Canvas动画等）
3. 模板代码会自动加载到编辑器

### 分享代码

1. 点击工具栏的 **分享** 按钮
2. 自动生成分享链接
3. 点击 **复制链接** 按钮
4. 将链接发送给他人

### 下载代码

1. 点击工具栏的 **下载** 按钮
2. 会下载一个包含所有代码的HTML文件
3. 可以直接在浏览器中打开运行

### 主题切换

1. 点击工具栏的 **🌓** 按钮
2. 在亮色和暗色主题之间切换

### 设置

点击 **⚙️** 按钮可以配置：

- **编辑器主题**：亮色/暗色
- **字体大小**：12-24px
- **自动保存**：开启/关闭
- **自动运行**：开启/关闭

## 📋 示例代码

### Hello World

**HTML:**
```html
<h1>Hello World!</h1>
<p>欢迎使用在线HTML编辑器</p>
```

**CSS:**
```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 50px;
}

h1 {
    color: #007bff;
}
```

**JavaScript:**
```javascript
console.log('页面加载完成！');
```

### 交互示例

**HTML:**
```html
<button id="myBtn">点击我</button>
<p id="output"></p>
```

**CSS:**
```css
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
```

**JavaScript:**
```javascript
document.getElementById('myBtn').addEventListener('click', function() {
    document.getElementById('output').textContent = '你点击了按钮！';
});
```

## 🔧 常见问题

### 预览不更新？

1. 检查代码是否有语法错误
2. 查看控制台是否有错误信息
3. 点击刷新按钮手动刷新预览

### 代码丢失了？

- 代码会自动保存到浏览器本地存储
- 刷新页面后会自动恢复
- 如果清除了浏览器数据，代码会丢失

### 无法使用某些功能？

- 确保使用的是现代浏览器（Chrome/Firefox/Safari/Edge）
- 某些功能需要HTTP服务器环境
- 检查浏览器控制台是否有错误信息

### 分享链接太长？

- 代码越多，链接越长
- 建议精简代码或使用下载功能
- 可以考虑使用短链接服务

## 📱 移动端使用

- 在移动设备上也可以使用
- 界面会自动适配小屏幕
- 编辑器和预览会上下排列
- 建议使用横屏模式以获得更好体验

## 🌐 浏览器支持

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**不支持**: Internet Explorer

## 💡 使用技巧

1. **使用模板快速开始**：不知道从哪开始？选择一个模板！
2. **经常保存**：虽然有自动保存，但手动保存更安全
3. **使用控制台调试**：`console.log()` 是你的好朋友
4. **尝试示例**：学习最好的方式是动手实践
5. **分享你的作品**：用分享功能展示你的创作

## 🆘 获取帮助

- 查看[完整文档](ARCHITECTURE.md)
- 查看[常见问题](docs/FAQ.md)
- [提交Issue](https://github.com/yourusername/online-html-execution/issues)
- [参与讨论](https://github.com/yourusername/online-html-execution/discussions)

## 🎯 下一步

- 尝试编写你的第一个网页
- 探索各种模板
- 学习HTML、CSS、JavaScript
- 分享你的作品给朋友

---

**祝你编码愉快！** 🎉