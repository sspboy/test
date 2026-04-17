# 测试约定

## 测试策略

### 测试层次
- **单元测试** - 测试独立的函数和组件
- **集成测试** - 测试模块间的交互
- **端到端测试** - 测试完整的用户流程

### 测试优先级
1. 核心业务逻辑
2. 公共工具函数
3. 复杂组件
4. 关键用户流程

## 单元测试

### 工具函数测试
- 测试边界情况
- 测试错误处理
- 测试各种输入组合

```javascript
// 示例：测试 TOOL.Fun_.isEmpty
describe('TOOL.Fun_.isEmpty', () => {
  it('应该返回 true 对于 null', () => {
    expect(TOOL.Fun_.isEmpty(null)).toBe(true)
  })

  it('应该返回 true 对于空字符串', () => {
    expect(TOOL.Fun_.isEmpty('')).toBe(true)
  })

  it('应该返回 false 对于有效字符串', () => {
    expect(TOOL.Fun_.isEmpty('hello')).toBe(false)
  })
})
```

### 组件测试
- 测试组件渲染
- 测试用户交互
- 测试 props 和 emits
- 测试插槽内容

```javascript
// 示例：测试组件
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard', () => {
  it('应该渲染产品信息', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: {
          name: '测试商品',
          price: 99.99
        }
      }
    })
    expect(wrapper.text()).toContain('测试商品')
    expect(wrapper.text()).toContain('99.99')
  })
})
```

## 集成测试

### API 测试
- 测试 API 请求和响应
- 测试错误处理
- 测试 token 管理

```javascript
// 示例：测试 API 调用
describe('API 调用', () => {
  it('应该成功获取用户列表', async () => {
    const response = await TOOL.Http_.get(API.AdminAPI.user.list, {})
    expect(response.data.code).toBe(200)
  })
})
```

### 状态管理测试
- 测试 state 变化
- 测试 getters
- 测试 mutations 和 actions

```javascript
// 示例：测试 Vuex store
describe('menu_state', () => {
  it('应该正确设置菜单', () => {
    const store = createStore({
      modules: { menu: menu_state }
    })
    store.commit('menu/SET_MENU', testMenu)
    expect(store.state.menu.menuList).toEqual(testMenu)
  })
})
```

## 端到端测试

### 关键流程
- 用户登录流程
- 商品管理流程
- 订单处理流程
- 权限验证流程

```javascript
// 示例：端到端测试
describe('登录流程', () => {
  it('用户应该能够成功登录', () => {
    cy.visit('/')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })
})
```

## 测试覆盖要求

### 代码覆盖率
- 核心业务逻辑：≥ 90%
- 公共工具函数：≥ 80%
- 组件逻辑：≥ 70%
- 整体项目：≥ 60%

### 覆盖报告
```bash
# 生成覆盖率报告
npm run test:coverage

# 查看覆盖率报告
open coverage/index.html
```

## 测试最佳实践

### 测试命名
- 使用描述性的测试名称
- 格式：`应该 [预期行为] 当 [条件]`

```javascript
// 好的测试名称
it('应该返回错误信息当 token 过期时', () => {})

// 不好的测试名称
it('测试 token', () => {})
```

### 测试隔离
- 每个测试应该独立运行
- 使用 beforeEach 和 afterEach 清理状态
- 避免测试之间的依赖

### Mock 和 Stub
- 合理使用 mock 隔离外部依赖
- Mock API 响应
- Stub 时间和随机函数

```javascript
// 示例：Mock API
jest.mock('axios')

describe('API 调用', () => {
  it('应该处理 API 错误', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))
    // 测试错误处理逻辑
  })
})
```

## 测试命令

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm run test -- path/to/test.spec.js

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage

# 端到端测试
npm run test:e2e
```

## 测试环境配置

### 单元测试环境
- 使用 jsdom 模拟浏览器环境
- 配置测试全局变量
- 设置测试超时时间

### E2E 测试环境
- 使用真实的浏览器环境
- 配置测试数据库
- 设置测试用户和数据

## 持续集成

### CI/CD 集成
- 每次提交自动运行测试
- 测试失败阻止合并
- 生成覆盖率报告并上传

### 测试报告
- 测试结果通知
- 覆盖率趋势跟踪
- 失败测试分析