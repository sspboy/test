# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（运行在 http://localhost:8080）
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview
```

## 项目架构

这是一个基于 Vue 3 + Vite 的抖音电商店铺管理系统。应用采用模块化架构，清晰分离了视图、组件和工具类。

### 技术栈
- **前端框架**: Vue 3 (组合式 API)
- **构建工具**: Vite 7.x
- **UI 库**: Ant Design Vue、Arco Design、@surely-vue/table
- **状态管理**: Vuex 4 模块化结构
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios 自定义拦截器
- **Node 版本**: ^20.19.0 || >=22.12.0

### 目录结构

```
src/
├── views/              # 页面级组件
│   ├── admin/         # 后台管理（用户、菜单、功能、版本）
│   ├── BasicSetting/  # 系统设置（团队、部门、角色、品牌）
│   ├── AppMarket/     # 主要电商功能
│   │   ├── DouyinShop/     # 店铺管理、商品、订单
│   │   ├── BatchEditTask/  # 批量编辑操作
│   │   ├── TimeTask/       # 定时任务
│   │   ├── Refine/         # 质量诊断
│   │   └── FunctionSettings/ # 多店管理
│   └── otherRes/       # 错误页面（404、403、500）
├── components/        # 可复用组件
│   ├── layout/        # 布局组件（头部、侧边栏）
│   └── AppMarket/     # 业务领域组件
├── rute/             # Vue Router 配置（TypeScript）
├── staore/           # Vuex 状态管理（注意：故意拼写错误）
│   └── modules/      # Vuex 模块（菜单、用户、版本状态）
├── assets/           # 静态资源和工具类
│   ├── JS_Model/     # 核心工具类
│   └── douyinshop/   # 抖音专用工具
└── main.js           # 应用入口文件
```

### 核心架构模式

**API 层**: 所有 API 接口集中在 `src/assets/JS_Model/public_model.js` 的 `A_Patch` 类中，按业务域组织：
- `LoginAPI` - 登录认证
- `AdminAPI` - 后台管理
- `BasicsAPI` - 系统设置
- `AppSrtoreAPI` - 电商操作

**HTTP 客户端**: `src/assets/JS_Model/tool.js` 中的自定义 axios 封装提供：
- `TOOL.Http_` 方法封装 GET/POST/DELETE/PUT
- 抖音 MC token 自动刷新
- 响应拦截器处理错误和认证

**状态管理**: `src/staore/modules/` 中的 Vuex 模块处理：
- `menu_state` - 菜单结构和侧边栏状态
- `usermessage_state` - 用户信息
- `ver_state` - 版本管理

**认证流程**:
1. 登录后将用户信息存储到 Vuex
2. 抖音 MC token 存储在 localStorage 并支持自动刷新
3. 响应拦截器处理 token 过期并重定向到登录页
4. 路由守卫进行权限检查

**组件组织**:
- Views 包含页面级逻辑和布局
- Components 按业务域组织（AppMarket、admin 等）
- 编辑组件嵌套在子目录中（如 `edit_component/`）

### 开发配置

**Vite 配置** (`vite.config.js`):
- 开发服务器运行在 8080 端口，配置了 API 代理
- API 代理将 `/api` 路由到后端（当前配置为阿里云环境）
- 路径别名：`@` → `/src`，`@components` → `/src/components`
- 自定义元素 `css-doodle` 的配置

**API 代理**: 开发服务器将 `/api` 请求代理到后端。根据你的环境在 `vite.config.js` 中更新 `target`：
- 家里: `http://192.168.2.104:5000`
- 阿里云: `http://172.17.57.178:5000`
- 公司: `http://192.168.3.121:5000`

### 路由结构

路由在 `src/rute/index.ts` 中定义，使用懒加载组件。主要路由分组：
- `/` - 登录页面
- `/home` - 主仪表板
- `/user`、`/menu`、`/fun`、`/version` - 后台管理
- `/douyinproductlist`、`/douyinorder` - 电商操作
- `/quality`、`/lowcostdetection` - 诊断和质量检查
- 错误路由：`/:catchAll(.*)` (404)、`/500`、`/403`、`/pleaselogin`

### 工具类

**TOOL 类** (`tool.js`):
- `Fun_` - 工具函数（笛卡尔积、验证、消息提示、剪贴板）
- `mc_token` - 抖音 token 管理（刷新、验证、存储）
- `Http_` - HTTP 方法封装

**PublicModel 类** (`public_model.js`):
- `Verifypermiss` - 认证和权限验证
- `axios_post`、`axios_get` - 带错误处理的请求封装
- `MenuLoad` - 菜单层级构建（父子关系）

### 全局样式

全局样式定义在 `App.vue` 中：
- 自定义滚动条样式
- Ant Design 组件覆盖（字体大小、颜色）
- 布局和间距工具类
- 表单组件尺寸设置

### 重要注意事项

- store 目录故意拼写为 `staore` - 引用时请保持一致
- Vue Router 配置文件为 `rute/index.ts`（故意拼写错误）
- Day.js 全局配置为中文语言环境
- Vue 3 特性标志设置为在生产环境禁用控制台警告
- 图片使用 `vue3-lazyload` 懒加载
- 自定义元素 `<css-doodle>` 需要特殊的 Vite 配置