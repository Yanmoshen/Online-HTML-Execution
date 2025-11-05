# 如何重新运行GitHub Actions部署

如果你在启用GitHub Pages之前就推送了代码，导致workflow失败，可以用以下方法重新运行：

## 方法1：通过GitHub网页重新运行（最简单）

### 步骤：

1. **进入仓库页面**
   - 打开 `https://github.com/你的用户名/online-html-execution`

2. **进入Actions标签**
   - 点击顶部的 **Actions** 标签

3. **找到失败的workflow**
   - 你会看到一个红色❌的workflow运行记录
   - 点击这个失败的workflow

4. **重新运行**
   - 点击右上角的 **Re-run all jobs** 按钮
   - 或者点击 **Re-run failed jobs** 按钮

5. **等待部署完成**
   - 刷新页面查看进度
   - 绿色✅表示成功

## 方法2：启用Pages后再推送一次代码（推荐）

### 步骤：

1. **先启用GitHub Pages**
   ```
   仓库 → Settings → Pages → Source: GitHub Actions → Save
   ```

2. **然后推送任意更改触发重新部署**
   ```bash
   # 修改任意文件（比如在README添加一个空格）
   git add .
   git commit -m "Trigger deployment"
   git push origin main
   ```

3. **自动触发新的部署**
   - GitHub Actions会自动开始新的部署
   - 进入Actions标签查看进度

## 方法3：创建一个空提交触发部署

如果你不想修改任何文件：

```bash
# 创建一个空提交
git commit --allow-empty -m "Trigger GitHub Pages deployment"

# 推送到GitHub
git push origin main
```

这会触发GitHub Actions重新运行，而不需要修改任何代码。

## 方法4：手动触发workflow

如果你的workflow配置了 `workflow_dispatch`（我们的配置已经包含了）：

### 步骤：

1. 进入 **Actions** 标签
2. 在左侧选择 **Deploy to GitHub Pages** workflow
3. 点击右侧的 **Run workflow** 下拉按钮
4. 选择 `main` 分支
5. 点击绿色的 **Run workflow** 按钮

## 验证部署成功

部署成功后（通常1-2分钟），访问：
```
https://你的用户名.github.io/online-html-execution/
```

你应该能看到完整的网站界面。

## 常见错误和解决方法

### ❌ 错误：权限不足

**错误信息：** `Error: Process completed with exit code 1`

**解决：**
1. 进入 **Settings** → **Actions** → **General**
2. 滚动到 **Workflow permissions**
3. 选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 点击 **Save**
6. 重新运行workflow

### ❌ 错误：Pages未启用

**错误信息：** `Error: No Pages site found`

**解决：**
1. 进入 **Settings** → **Pages**
2. 在 **Source** 中选择 **GitHub Actions**
3. 点击 **Save**
4. 重新运行workflow

### ❌ 错误：资源404

**可能原因：** 路径问题

**解决：**
- 确保所有资源使用相对路径
- 检查文件名大小写是否正确
- 确保index.html在根目录

## 快速检查清单

在重新运行之前，确认：

- ✅ GitHub Pages已启用（Settings → Pages → Source: GitHub Actions）
- ✅ Workflow权限设置正确（Settings → Actions → Read and write permissions）
- ✅ 仓库是公开的（或者有GitHub Pro/Team账号）
- ✅ index.html文件在根目录
- ✅ 所有CSS/JS文件路径正确

## 推荐流程

**首次部署的正确顺序：**

1️⃣ 推送代码到GitHub
```bash
git push origin main
```

2️⃣ 启用GitHub Pages
```
Settings → Pages → Source: GitHub Actions
```

3️⃣ 配置权限
```
Settings → Actions → Read and write permissions
```

4️⃣ 重新运行workflow
```
Actions → 选择失败的workflow → Re-run all jobs
```

5️⃣ 等待部署完成并访问网站

---

**记住：** 一旦正确配置完成，以后每次推送代码都会自动部署，无需手动操作！✨