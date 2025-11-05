
# 部署指南

本文档提供了在线HTML代码运行平台的详细部署说明，涵盖多个流行的托管平台。

## 目录

1. [GitHub Pages部署](#github-pages部署)
2. [Vercel部署](#vercel部署)
3. [Netlify部署](#netlify部署)
4. [Cloudflare Pages部署](#cloudflare-pages部署)
5. [自托管部署](#自托管部署)
6. [Docker部署](#docker部署)
7. [CDN配置](#cdn配置)
8. [域名配置](#域名配置)

---

## GitHub Pages部署

GitHub Pages是完全免费的静态网站托管服务，非常适合本项目。

### 方法一：使用gh-pages分支

#### 步骤1：创建GitHub仓库

```bash
# 在本地项目目录中初始化Git
git init
git add .
git commit -m "Initial commit"

# 创建GitHub仓库后，关联远程仓库
git remote add origin https://github.com/yourusername/online-html-execution.git
git branch -M main
git push -u origin main
```

#### 步骤2：创建gh-pages分支

```bash
# 创建并切换到gh-pages分支
git checkout --orphan gh-pages

# 删除所有文件（保留.git）
git rm -rf .

# 复制需要部署的文件
git checkout main -- index.html css js lib assets templates

# 提交并推送
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

#### 步骤3：配置GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Source** 中选择 `gh-pages` 分支
3. 点击 **Save**
4. 等待几分钟后，访问 `https://yourusername.github.io/online-html-execution`

### 方法二：使用GitHub Actions自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

配置仓库：
1. **Settings** > **Pages** > **Source** 选择 **GitHub Actions**
2. 推送代码到main分支即可自动部署

### 自定义域名

1. 在仓库根目录创建 `CNAME` 文件：
```
yourdomain.com
```

2. 在域名DNS设置中添加：
```
Type: CNAME
Name: www (或 @)
Value: yourusername.github.io
```

---

## Vercel部署

Vercel提供极速的全球CDN和自动化部署。

### 方法一：使用Vercel CLI

#### 步骤1：安装Vercel CLI

```bash
npm install -g vercel
```

#### 步骤2：登录并部署

```bash
# 登录Vercel
vercel login

# 在项目目录中运行
vercel

# 首次部署会提示配置
# ? Set up and deploy "~/online-html-execution"? [Y/n] y
# ? Which scope do you want to deploy to? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? online-html-execution
# ? In which directory is your code located? ./

# 生产部署
vercel --prod
```

### 方法二：通过Vercel网站部署

1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 **New Project**
4. 导入你的GitHub仓库
5. 配置项目：
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: 留空
   - **Output Directory**: ./
6. 点击 **Deploy**

### vercel.json 配置（可选）

创建 `vercel.json` 进行高级配置：

```json
{
  "version": 2,
  "name": "online-html-execution",
  "builds": [
    {
      "src": "**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 自定义域名

1. 在Vercel项目设置中点击 **Domains**
2. 添加你的域名
3. 按照提示配置DNS记录

---

## Netlify部署

Netlify提供持续部署和强大的边缘网络。

### 方法一：拖拽部署

1. 访问 [netlify.com](https://www.netlify.com)
2. 注册/登录账号
3. 将项目文件夹直接拖到 **Deploy** 区域
4. 等待部署完成

### 方法二：Git集成部署

1. 登录Netlify
2. 点击 **New site from Git**
3. 选择GitHub并授权
4. 选择你的仓库
5. 配置构建设置：
   - **Base directory**: 留空
   - **Build command**: 留空
   - **Publish directory**: .
6. 点击 **Deploy site**

### 方法三：使用Netlify CLI

```bash
# 安装CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy

# 生产部署
netlify deploy --prod
```

### netlify.toml 配置

创建 `netlify.toml`：

```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## Cloudflare Pages部署

Cloudflare Pages提供免费的全球CDN和无限带宽。

### 部署步骤

1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 登录Cloudflare账号
3. 点击 **Create a project**
4. 连接GitHub仓库
5. 配置构建：
   - **Production branch**: main
   - **Build command**: 留空
   - **Build output directory**: /
6. 点击 **Save and Deploy**

### 环境变量（如果需要）

在 **Settings** > **Environment variables** 中添加：

```
NODE_VERSION=18
```

### 自定义域名

1. 在项目设置中选择 **Custom domains**
2. 添加域名
3. 配置DNS（Cloudflare会自动处理）

---

## 自托管部署

如果你有自己的服务器，可以使用以下方法部署。

### 使用Nginx

#### 步骤1：安装Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 步骤2：配置Nginx

创建配置文件 `/etc/nginx/sites-available/online-html-execution`：

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/online-html-execution;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 主路由
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 步骤3：启用站点

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/online-html-execution /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

#### 步骤4：上传文件

```bash
# 使用rsync
rsync -avz --delete ./ user@yourserver:/var/www/online-html-execution/

# 或使用scp
scp -r ./* user@yourserver:/var/www/online-html-execution/
```

### 使用Apache

创建配置文件 `/etc/apache2/sites-available/online-html-execution.conf`：

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/online-html-execution

    <Directory /var/www/online-html-execution>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # 启用重写
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ index.html [L]
    </Directory>

    # 启用压缩
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>

    # 缓存控制
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/html "access plus 0 seconds"
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
    </IfModule>
</VirtualHost>
```

启用站点：

```bash
sudo a2ensite online-html-execution
sudo systemctl reload apache2
```

### 使用简单HTTP服务器（开发/测试）

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve . -p 8000

# PHP
php -S localhost:8000
```

---

## Docker部署

使用Docker可以实现一致的部署环境。

### Dockerfile

创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine

# 复制项目文件
COPY . /usr/share/nginx/html

# 复制自定义nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t online-html-execution .

# 运行容器
docker run -d -p 8080:80 --name html-editor online-html-execution

# 访问
# http://localhost:8080
```

### Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    volumes:
      - ./:/usr/share/nginx/html:ro
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80
```

运行：

```bash
docker-compose up -d
```

---

## CDN配置

### 使用jsDelivr加速第三方库

修改HTML中的库引用：

```html
<!-- CodeMirror -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.min.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.min.js"></script>

<!-- Prism.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>

<!-- LZ-String -->
<script src="https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js"></script>
```

### 使用unpkg

```html
<script src="https://unpkg.com/codemirror@5.65.2/lib/codemirror.min.js"></script>
```

### 配置Cloudflare CDN

1. 将域名添加到Cloudflare
2. 更新DNS服务器
3. 启用CDN（橙色云朵图标）
4. 配置缓存规则

---

## 域名配置

### 购买域名

推荐域名注册商：
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [阿里云](https://wanwang.aliyun.com)
- [腾讯云](https://dnspod.cloud.tencent.com)

### DNS配置示例

#### A记录（指向IP）

```
Type: A
Name: @
Value: 123.456.789.0
TTL: Auto
```

#### CNAME记录（指向域名）

```
Type: CNAME
Name: www
Value: yourusername.github.io
TTL: Auto
```

### HTTPS配置

#### 使用Let's Encrypt（免费）

```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自动续期
sudo certbot renew --dry-run
```

#### Cloudflare SSL

1. 在Cloudflare中启用 **SSL/TLS**
2. 选择 **Full** 或 **Full (strict)** 模式
3. 等待证书自动配置

---

## 性能优化建议

### 1. 启用缓存

```nginx
# Nginx缓存配置
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. 启用压缩

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
