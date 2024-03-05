const fs = require("fs");
const path = require("path");
const util = require("util");
const Router = require("koa-router");

const router = new Router();

router.get("/", async (ctx, next) => {
  const filePath = path.resolve(__dirname, "../data/data.json");

  try {
    const data = await getDataFromJsonFIle(filePath);
    ctx.body = {
      code: 200,
      data,
      message: "成功获取数据",
    };
    console.log("成功获取数据: ", data, ctx.request.url);
  } catch (error) {
    ctx.body = { code: 400, data: error, message: "失败获取数据" };
    console.error("出错：", error);
  }
});

// 将 fs.readFile 和 fs.writeFile 转换为 Promise 版本
const readFileAsync = util.promisify(fs.readFile);

async function getDataFromJsonFIle(filePath) {
  // 1. 读取已存在的json文件
  try {
    const fileContent = await readFileAsync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

module.exports = router;
