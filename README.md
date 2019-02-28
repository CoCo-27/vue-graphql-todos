# todos

## Project setup

```bash
// for client
npm install
npm run serve

// for server
cd server
npm install
npm run dev
```

## Iteration

### 1.0.0

- client 采用在 Vue 组件中注入 apollo 选项进行查询
- server type和resolve文件对应
- 使用 mongoose 来连接[mongoDB 的云服务](https://docs.mlab.com/)
- 功能：创建一条新的todo（但是要刷新查看） partners的todo展示面板并且能切换当前user

### 2.0.0

...

## TODO

- type怎么交叉融合
- 当前用户删除当前用户的todo
- 增加新的todo之后刷新当前todo列表
- 左上角展示user列表 可以切换全部的用户
- 创建todo时可以选择type
- 登录系统 后续可以添加todo的关注人 更新之后推送 subscription（graphQL）
