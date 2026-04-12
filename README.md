# 个人作品集网站

## 项目简介

这是一个面向求职展示的个人作品集网站,展示前端工程和AI全栈开发能力。

## 技术栈

- **前端框架**: Vue 3.5+
- **开发语言**: TypeScript 5.0+
- **构建工具**: Vite 6.0+
- **UI框架**: UnoCSS 0.60+
- **状态管理**: Pinia 3.0+
- **路由**: Vue Router 4.5+

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
Portfolio/
├── public/                      # 静态资源
├── src/
│   ├── assets/                 # 资源文件
│   │   ├── styles/             # 全局样式
│   │   ├── data/               # 静态数据
│   │   └── images/             # 图片资源
│   ├── components/             # 公共组件
│   │   ├── layout/             # 布局组件
│   │   ├── common/             # 通用组件
│   │   └── ui/                 # UI组件
│   ├── composables/            # 组合式函数
│   ├── router/                 # 路由配置
│   ├── store/                  # 状态管理
│   ├── views/                  # 页面视图
│   ├── utils/                  # 工具函数
│   ├── types/                  # 类型定义
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── uno.config.ts               # UnoCSS配置
├── vite.config.ts              # Vite配置
├── tsconfig.json               # TypeScript配置
├── package.json                # 项目依赖
└── README.md                   # 项目说明
```

## 开发规范

详细的开发规范请参考 [开发规范.md](./开发规范.md)

## 设计方案

- [技术架构设计方案](./技术架构设计方案.md)
- [功能模块设计方案](./功能模块设计方案.md)
- [项目展示和内容组织方案](./项目展示和内容组织方案.md)

## 许可证

MIT

---

**开发者**: 罗雍来
**邮箱**: 19042637070@139.com
**GitHub**: https://github.com/WXMISUKI