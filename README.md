# Whikiss 的博客

使用 Hugo Extended 0.157.0 与 AIOVTUE 主题，发布到 https://blog.whikiss.cn/ 。

## 本地预览

安装 Hugo Extended 0.157.0 后运行 `hugo server`，打开 http://localhost:1313/ 。
也可使用 Node.js 运行 `npm run server`；Windows 下优先使用 `.tools/hugo-bin/hugo.exe`。
无需安装 npm 依赖。`npm run dev` 同时预览草稿。

## 写文章

文章位于 `content/posts/`，独立页面位于 `content/page/`。
新建文章运行 `hugo new content posts/文章标识.md`，发布前将 `draft` 改为 `false`。
文章地址为 `/posts/slug/`，迁移文章保留旧 Hexo 地址跳转。图床链接保持原样。

## 构建与发布

运行 `npm run build`（或 `hugo --gc --minify`）生成 `public/`，再运行 `npm run check`。
推送到 GitHub 的 `main` 分支触发 `.github/workflows/hugo.yml`，自动构建并发布到 GitHub Pages。
仓库 Settings → Pages 的 Source 应选择 GitHub Actions，自定义域名为 `blog.whikiss.cn`。
`static/CNAME` 与 `hugo.toml` 中域名保持一致。发布是否成功以 Actions 和线上核验为准。

## 目录

- `hugo.toml`、`config/`：站点配置。
- `content/`：文章与页面。
- `layouts/`：主题模板覆盖。
- `themes/aiovtue/`：主题源码。
- `assets/`、`static/`：资源和原样发布的文件。
- `legacy/hexo/`：原 Hexo 源码归档，不参与当前构建。
- `public/`、`public-hugo/`、`resources/_gen/`：生成文件。

旧 Hexo 依赖、缓存和部署目录不再用于发布，请勿使用旧 Hexo 部署命令。

## 主题来源

使用 [AIOVTUE](https://github.com/AIOVTUE/hugo-theme-aiovtue) 主题，版本记录在 `themes/aiovtue/UPSTREAM.md`。
首页背景位于 `static/hero/`，个人信息与菜单在 `hugo.toml`，链接列表在 `data/links.yaml`。
旧 Stack 配置和模板保存在 `legacy/stack/`。
