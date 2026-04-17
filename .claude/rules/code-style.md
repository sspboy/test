# 代码样式指南

## Vue 组件规范

### 组件命名
- 组件文件名使用 PascalCase：`UserProfile.vue`, `ProductList.vue`
- 组件内部 name 属性与文件名保持一致

### 模板结构
- 使用语义化的 HTML 标签
- 合理使用 v-if 和 v-show
- 列表渲染必须提供 key 属性

### 脚本组织
- 使用 Composition API（setup 语法糖）
- 按逻辑功能分组：响应式数据、计算属性、方法、生命周期
- 导入顺序：Vue 相关、第三方库、本地组件、工具函数、类型定义

### 样式规范
- 优先使用 scoped 样式
- 遵循 BEM 命名约定：`.block__element--modifier`
- 使用 CSS 变量定义主题颜色

## JavaScript/TypeScript 规范

### 命名约定
- 变量和函数使用 camelCase：`getUserData()`, `isLoading`
- 常量使用 UPPER_SNAKE_CASE：`API_BASE_URL`, `MAX_RETRY_COUNT`
- 类和组件使用 PascalCase：`UserService`, `ProductCard`

### 代码组织
- 单一职责原则：每个函数只做一件事
- 函数长度不超过 50 行
- 避免深层嵌套（最多 3 层）

### 注释规范
- 复杂业务逻辑必须添加注释
- 公共 API 需要添加 JSDoc 注释
- 避免无意义的注释

## API 调用规范

### 请求封装
- 使用 `TOOL.Http_` 方法进行 HTTP 请求
- 统一错误处理
- 合理设置超时时间

### 接口定义
- 在 `public_model.js` 的 `A_Patch` 类中集中管理
- 按业务域分组：LoginAPI、AdminAPI、BasicsAPI、AppSrtoreAPI
- 接口命名清晰表达意图

## 状态管理规范

### Vuex 模块
- 按功能划分模块：menu_state、usermessage_state、ver_state
- state、getters、mutations、actions 顺序排列
- mutations 必须是同步函数

### 组件中使用
- 优先使用 mapState、mapGetters、mapActions
- 避免直接修改 state，使用 commit 调用 mutation

## 路由规范

### 路由定义
- 在 `rute/index.ts` 中集中定义
- 使用懒加载：`() => import('../views/HomeView.vue')`
- 路由元信息包含 title：`meta: { title: '页面标题' }`

### 导航守卫
- 使用 beforeEach 设置页面标题
- 权限验证在路由守卫中处理
- 未授权访问重定向到登录页

## 文件组织规范

### 目录结构
- views/ - 页面组件
- components/ - 可复用组件
- assets/ - 静态资源和工具类
- rute/ - 路由配置
- staore/ - 状态管理

### 文件命名
- Vue 组件：PascalCase.vue
- 工具文件：kebab-case.js
- 类型文件：kebab-case.d.ts

## 导入顺序规范

```javascript
// 1. Vue 相关
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. 第三方库
import axios from 'axios'
import { message } from 'ant-design-vue'

// 3. 本地组件
import ProductCard from '@/components/ProductCard.vue'

// 4. 工具函数
import { TOOL } from '@/assets/JS_Model/tool'

// 5. 类型定义
import type { User } from '@/types'
```

## 代码格式化

- 使用一致的缩进（2 空格）
- 行尾不使用分号
- 字符串优先使用单引号
- 对象和数组末尾保留逗号
- 运算符两侧添加空格