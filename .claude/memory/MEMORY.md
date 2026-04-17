# 项目记忆索引

此文件记录了项目的相关信息，供未来的 Claude Code 会话参考。

## 项目信息

- **项目名称**: mydev (抖音电商管理系统)
- **技术栈**: Vue 3 + Vite + Vuex + Ant Design Vue
- **开发环境**: Node.js ^20.19.0 || >=22.12.0
- **开发端口**: 8080

## 重要配置

### API 代理环境
- **家里**: `http://192.168.2.104:5000`
- **阿里云**: `http://172.17.57.178:5000` (当前)
- **公司**: `http://192.168.3.121:5000`

### 特殊命名约定
- `staore/` - Vuex 状态管理目录（故意拼写错误）
- `rute/` - Vue Router 配置目录（故意拼写错误）

## 目录结构

```
.claude/
├── CLAUDE.md           # 主项目指导文档
├── settings.json       # 项目配置（已启用自动记忆）
├── rules/              # 代码规范
│   ├── code-style.md   # 代码样式指南
│   ├── testing.md      # 测试约定
│   └── security.md     # 安全要求
└── memory/             # 自动记忆存储
    └── MEMORY.md       # 记忆索引（本文件）
```

## 开发命令

```bash
npm install           # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run preview      # 预览构建
```

## 核心架构

### API 层
- 位置: `src/assets/JS_Model/public_model.js`
- 类: `A_Patch`
- 模块: LoginAPI, AdminAPI, BasicsAPI, AppSrtoreAPI

### HTTP 客户端
- 位置: `src/assets/JS_Model/tool.js`
- 类: `TOOL`
- 方法: `Http_.get/post/delete/update`

### 状态管理
- 位置: `src/staore/modules/`
- 模块: menu_state, usermessage_state, ver_state

## 记忆说明

此项目已启用自动记忆功能。Claude Code 将自动：
- 记录用户偏好和工作习惯
- 保存项目特定的上下文信息
- 跟踪重要的决策和变更
- 存储常见的开发模式和解决方案

记忆文件将存储在 `.claude/memory/` 目录中。
