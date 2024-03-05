const axios = require('axios');

// axios.get("http://192.168.0.116:3000/get")
//   .then(function (response) {
//     console.log('get success',response.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios.put("http://192.168.0.116:3000/update", {
//     "id": '1709631961607',
//     "name": "io",
//     "age": 88
//   })
//   .then(function (response) {
//     console.log('请求成功 response.data：', response.data);
//   })
//   .catch((err) => {
//     console.log('请求失败 err：', err);
//   });

axios.delete("http://192.168.0.116:3000/delete/1709631961603")
  .then(function (response) {
    console.log('删除请求成功 response.status：', response.status);
  })
  .catch((err) => {
    console.log(err);
  });
