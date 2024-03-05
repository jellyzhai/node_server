const fs = require('fs');
const path = require('path');
const util = require('util');
const Router = require("koa-router");

const router = new Router();

router.post("/", (ctx, next) => {
    const filePath = path.resolve(__dirname, '../data/data.json');
    appendDataToJsonFile(filePath, ctx.request.body)
      .then(() => {
        ctx.body = { code: 200, data: ctx.request.body, message: '成功追加数据到JSON文件' };
        console.log('成功追加数据到JSON文件')
      })
      .catch((error) => {
        ctx.body = { code: 400, data: error, message: '追加数据到JSON文件失败' };
        console.error('出错：', error)
      });


});

// 将 fs.readFile 和 fs.writeFile 转换为 Promise 版本
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function appendDataToJsonFile(filePath, newData) {
  // 1. 读取已存在的json文件
  let data;
  try {
    const fileContent = await readFileAsync(filePath, 'utf8');
    data = JSON.parse(fileContent);
    
    // 如果原始数据是数组
    if (Array.isArray(data)) {
      // 追加新数据
      data.push(newData);
    } 

    else {
      throw new Error('Invalid data format in the JSON file.');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // 文件不存在，则创建一个包含新数据的新文件
      data = [newData];
    } else {
      throw error;
    }
  }

  // 2. 将更新后的内容转换回JSON字符串
  const jsonToWrite = JSON.stringify(data, null, 2); // 第二个参数用于替换函数，第三个参数是缩进空格数

  // 3. 将更新的JSON字符串写入原文件
  await writeFileAsync(filePath, jsonToWrite, 'utf8');
}

module.exports = router;
