const path = require("path");
const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const routerAll = require("./routers");

const router = new Router();
const app = new Koa();

// 设置静态目录
app.use(static(path.join(__dirname, "public")));

// 使 ctx.request.body 中可获取 请求体
app.use(bodyParser());

// 通过 token 信息，统一判断登录状态
// 调用 next 时，需要等待 next 返回的promise 执行完成后，再继续执行当前函数
app.use(async (ctx, next) => {
  if (
    ["/", "/add", "/get", "/update", "/delete"].some((url) =>
    ctx.url.startsWith(url)
    )
  ) {
    await next();
    return;
  }

  ctx.body = { code: 401, data: null, message: "路径不在允许范围内" };
});

// 配置路由
router.use(routerAll.routes());

/*
  router.allowedMethods() 中间件 在客户端 以错误请求方法 发起请求时，给出正确请求方法的响应
  会在响应头中 添加 Allow: POST (DELETE, GET, PUT...)
*/
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("http://192.168.0.116:3000 启动成功");
});
