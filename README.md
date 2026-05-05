# 个人作品集网站

面向求职展示的个人作品集站点，重点展示前端工程、复杂业务系统交付、GIS、视频流低延迟优化，以及 AI 智能体全栈开发能力。

线上地址：`https://portfolio-beta-ruddy-39.vercel.app/`

## 当前状态

- 主页面已完成：`首页 / 关于我 / 项目经验 / 技术栈 / 联系我`
- 项目展示已完成：AI 项目优先排序、筛选、搜索、详情弹层、在线访问、GitHub 跳转
- 上线基础已完成：Vercel 部署、`robots.txt`、`sitemap.xml`、基础 SEO、简历访问
- 质量门禁已具备：`format:check + typecheck + build`

## 核心展示内容

- 政企复杂业务项目：GIS、视频流、预警平台、性能优化、大数据渲染
- AI 项目：MyPrivateAgent、番剧智能体、旅行规划智能体、TTS Pro
- 简历与联系信息：PDF 简历、邮箱、电话、GitHub

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- UnoCSS

## 本地开发

```bash
pnpm install
pnpm run dev
```

## 质量检查

```bash
pnpm run format:check
pnpm run typecheck
pnpm run build
pnpm run quality
```

## 项目结构

```text
Portfolio/
├── public/                     # 静态资源、简历、SEO 文件
├── src/
│   ├── assets/
│   │   ├── data/              # 项目、技能、个人信息
│   │   ├── images/            # 项目截图
│   │   └── styles/            # 全局样式
│   ├── components/
│   │   ├── common/            # 业务组件
│   │   ├── layout/            # 布局组件
│   │   └── ui/                # 基础 UI 组件
│   ├── composables/           # 组合式逻辑
│   ├── config/                # 站点配置
│   ├── router/                # 路由与页面 meta
│   ├── store/                 # Pinia 状态
│   ├── types/                 # 类型定义
│   └── views/                 # 页面视图
├── docs/                      # 设计文档与内容方案
├── .github/workflows/ci.yml   # CI 质量检查
└── vercel.json                # Vercel 部署配置
```

## 环境变量

参考 `.env.example`：

```bash
VITE_APP_TITLE=个人作品集
VITE_SITE_URL=https://portfolio-beta-ruddy-39.vercel.app
```

当前站点为展示页，不依赖后端表单服务即可正常使用。

## 部署说明

- 平台：Vercel
- 构建命令：`pnpm run build`
- 输出目录：`dist`
- CI：GitHub Actions 自动执行 `format:check + typecheck + build`

## 相关文档

- [个人项目集设计文档](./docs/个人项目集设计文档.md)
- [项目展示和内容组织方案](./docs/项目展示和内容组织方案.md)
- [开发规范](./docs/开发规范.md)

## 联系方式

- 开发者：罗雍来
- 邮箱：`19042637070@139.com`
- GitHub：`https://github.com/WXMISUKI`
