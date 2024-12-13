
# Cloudflare Worker 开发模板

本模板是基于Cloudflare Worker 和 Cloudflare D1 的开发模板， 使用VS Code 开发， 支持本地断点单步调试， 支持UI操作D1数据库。
**本地开发时使用的是本地D1数据库。**


## 技术栈
- Cloudflare Worker
- Cloudflare D1
- hono
- Drizzle ORM
- 使用VS Code

## How to Use

1. git clone 项目
2. 安装依赖
```
pnpm install 
```
2. 创建D1数据库
```
npx wrangler d1 create your-database-name
```
把创建的D1数据库ID填入wrangler.toml

随便执行一个Sql语句，把本地D1数据库生成出来, 本地开发用的是本地的模拟D1数据库
```
npx wrangler d1 execute your-database-name--local --command "SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;"
```
3. 操作本地数据库
数据库表结构信息，在db/schemas/ 目录下，可以按需修改
```
#生成迁移文件
pnpm run db-generate
#执行迁移
pnpm run db-migrate
#预览数据库
pnpm run db-ui
```

![alt text](image-1.png)

4. 断点调试
> 参考 https://blog.cloudflare.com/debugging-cloudflare-workers/
```
#先启动服务
pnpm run dev

#执行另外一个程序, attach 附加进去。 已经在.vscode/launch.json 中配置了
F5 启动Wrangler
```

这时候可以打个断点，收到请求后，就可以愉快的单步调试了。
需要注意的是，断点调试只能使用本地D1, 如果使用--remote 参数， 断点调试不可用


5. 部署到Cloudflare
[先获取一个CF的账号ID和Token](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit)
将获取的CLOUDFLARE_ACCOUNT_ID 和 CLOUDFLARE_D1_TOKEN 填入.env 文件,并将.env 文件中的NODE_ENV 改为prod

```
#数据库同步到线上
pnpm run db-migrate
#部署到线上
pnpm run deploy
```

