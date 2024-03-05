const fs = require("fs");
const path = require("path");
const util = require("util");
const Router = require("koa-router");

const router = new Router();

router.put("/", async (ctx, next) => {
  const filePath = path.resolve(__dirname, "../data/data.json");
  console.log("ctx.body: ", ctx.request.body);

  try {
    await updateDataFromJsonFile(filePath, ctx.request.body);
    ctx.body = { code: 200, data: ctx.request.body, message: "更新数据成功" };
    console.log("更新数据成功");
  } catch (error) {
    ctx.body = { code: 400, data: error, message: "更新数据失败" };
    console.error("出错：", error);
  }
});

// 将 fs.readFile 和 fs.writeFile 转换为 Promise 版本
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function updateDataFromJsonFile(filePath, updatedData) {
  // 1. 读取已存在的json文件
  let data;
  try {
    const fileContent = await readFileAsync(filePath, "utf8");
    data = JSON.parse(fileContent).map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });
    console.log("更新文件正确 data: ", data);
  } catch (error) {
    console.log("更新文件错误: ", error);
    throw error;
  }

  // 2. 将更新后的内容转换回JSON字符串
  const jsonToWrite = JSON.stringify(data, null, 2); // 第二个参数用于替换函数，第三个参数是缩进空格数

  // 3. 将更新的JSON字符串写入原文件
  await writeFileAsync(filePath, jsonToWrite, "utf8");
}

module.exports = router;
