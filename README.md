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

- client VueApollo
- server type和resolve文件对应 并用merge-graphql-schemas进行merge
- 使用 mongoose 来连接[mongoDB 的云服务](https://docs.mlab.com/) 使用mongoose操作数据库
- 功能：添加/删除当前用户的todo 切换当前用户 局部刷新当前用户todo
- 创建todo时可以选择type 后端自动记录创建时间 

### 2.0.0
- 使用DataLoader 批量处理数据（进行中）

...

## TODO
- todo的分页展示
- 新建/删除/编辑 用户
- 左上角展示user面板 可以展示全部的用户
- 登录系统 后续可以添加todo的关注人 更新之后推送
