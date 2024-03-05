const fs = require("fs");
const path = require("path");
const util = require("util");
const Router = require("koa-router");

const router = new Router();

router.delete("/", async (ctx, next) => {
  const filePath = path.resolve(__dirname, "../data/data.json");
  console.log("ctx.request.search: ", ctx.params.id);

  try {
    await deleteDataFromJsonFile(filePath, ctx.params.id);
    ctx.status = 204;
    console.log("删除数据成功");
  } catch (error) {
    ctx.status = 400;
    console.error("出错：", error);
  }
});

// 将 fs.readFile 和 fs.writeFile 转换为 Promise 版本
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function deleteDataFromJsonFile(filePath, id) {
  // 1. 读取已存在的json文件
  let data;
  try {
    const fileContent = await readFileAsync(filePath, "utf8");
    data = JSON.parse(fileContent).filter(
      (item) => item.id.toString() !== id.toString()
    );
    console.log("filter data: ", data);
  } catch (error) {
    throw error;
  }

  // 2. 将更新后的内容转换回JSON字符串
  const jsonToWrite = JSON.stringify(data, null, 2); // 第二个参数用于替换函数，第三个参数是缩进空格数

  // 3. 将更新的JSON字符串写入原文件
  await writeFileAsync(filePath, jsonToWrite, "utf8");
}

module.exports = router;
