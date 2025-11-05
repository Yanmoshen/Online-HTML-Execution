# GitHub Pages 部署指南

## 📋 前提条件

- 已有GitHub账号
- 项目已推送到GitHub仓库

## 🚀 部署步骤

### 方法一：使用GitHub Actions自动部署（推荐）

#### 1. 推送代码到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Online HTML Execution Platform"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/online-html-execution.git

# 推送到main分支
git branch -M main
git push -u origin main
```

#### 2. 启用GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分，选择 **GitHub Actions**
5. 保存设置

#### 3. 自动部署

现在每次你推送代码到main分支时，GitHub Actions会自动部署：

```bash
git add .
git commit -m "Update code"
git push origin main
```

部署完成后，你的网站将在：
```
https://你的用户名.github.io/online-html-execution/
```

### 方法二：使用gh-pages分支（传统方法）

#### 1. 创建gh-pages分支

```bash
# 创建gh-pages分支
git checkout --orphan gh-pages

# 添加所有文件
git add .

# 提交
git commit -m "Deploy to GitHub Pages"

# 推送到gh-pages分支
git push origin gh-pages

# 切回main分支
git checkout main
```

#### 2. 配置GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Source** 中选择 `gh-pages` 分支
3. 点击 **Save**

#### 3. 访问网站

等待几分钟后，访问：
```
https://你的用户名.github.io/online-html-execution/
```

## 🔧 自定义域名（可选）

### 1. 添加CNAME文件

在项目根目录创建 `CNAME` 文件：

```
your-domain.com
```

### 2. 配置DNS

在你的域名提供商处添加DNS记录：

**使用A记录：**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
TTL: 3600
```

**使用CNAME记录（推荐）：**
```
Type: CNAME
Name: www
Value: 你的用户名.github.io
TTL: 3600
```

### 3. 在GitHub设置自定义域名

1. 进入 **Settings** > **Pages**
2. 在 **Custom domain** 输入你的域名
3. 点击 **Save**
4. 等待DNS验证完成
5. 勾选 **Enforce HTTPS**

## 📝 更新README链接

更新 `README.md` 中的演示链接：

```markdown
[在线演示](https://你的用户名.github.io/online-html-execution)
```

## 🐛 常见问题

### 1. 404错误

**原因：** 部署未完成或路径错误

**解决：**
- 等待3-5分钟让部署完成
- 检查仓库名称是否正确
- 确保index.html在根目录

### 2. 资源加载失败

**原因：** 相对路径问题

**解决：**
- 确保所有资源使用相对路径
- CSS: `href="css/main.css"` ✅
- JS: `src="js/app.js"` ✅
- 避免使用绝对路径如 `/css/main.css` ❌

### 3. GitHub Actions失败

**原因：** 权限不足

**解决：**
1. 进入 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 中选择 **Read and write permissions**
3. 保存并重新运行workflow

### 4. CSS/JS不生效

**原因：** 浏览器缓存

**解决：**
- 按 `Ctrl + F5` 强制刷新
- 清除浏览器缓存
- 使用隐私/无痕模式测试

## ✅ 验证部署

访问以下URL确认部署成功：

```
https://你的用户名.github.io/online-html-execution/
```

你应该能看到：
- ✅ 编辑器界面正常显示
- ✅ 可以切换HTML/CSS/JS标签
- ✅ 预览窗口可以显示内容
- ✅ 所有按钮都可以点击

## 🔄 更新网站

每次更新代码后：

```bash
git add .
git commit -m "描述你的更改"
git push origin main
```

GitHub Actions会自动重新部署（约1-2分钟）

## 📊 查看部署状态

1. 进入仓库的 **Actions** 标签
2. 查看最新的workflow运行状态
3. 绿色✅表示成功，红色❌表示失败
4. 点击可查看详细日志

## 🎯 完整示例

假设你的GitHub用户名是 `zhangsan`，仓库名是 `online-html-execution`：

1. **仓库地址：** `https://github.com/zhangsan/online-html-execution`
2. **在线演示：** `https://zhangsan.github.io/online-html-execution/`
3. **自定义域名：** `https://html-editor.com` （如果配置了）

## 💡 提示

- GitHub Pages是完全免费的
- 支持自定义域名和HTTPS
- 每个仓库100MB大小限制
- 每月100GB带宽限制（通常足够）
- 部署通常在1-5分钟内完成

## 📞 需要帮助？

如果遇到问题：
1. 查看[GitHub Pages文档](https://docs.github.com/pages)
2. 检查Actions日志查找错误
3. 在仓库issues中提问

---

**祝你部署成功！🎉**