const Router = require('koa-router')
const addRouter = require("./add");
const getRouter = require("./get");
const updateRouter = require("./update");
const deleteRouter = require("./delete");

const router = new Router();

router
  // 给所有后续路由统一加前缀
  // .prefix('/api')
  .redirect("/", "/get")
  .use("/add", addRouter.routes())
  .use("/get", getRouter.routes())
  .use("/update", updateRouter.routes())
  .use("/delete/:id", deleteRouter.routes())

module.exports = router