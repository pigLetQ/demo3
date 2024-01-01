const cloud = require('@alipay/faas-server-sdk');
cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {

  let set_name = event.action;

  //测试代码会自动创建集合，真实项目应该提前创建好
  try {
    await db.createCollection(set_name);  
  } catch (error) {
     console.log("users 结合已经存在，无需再进行创建");
  }
  //添加用户，如果逻辑比较复杂，可以单独再写一个 addUser 函数
  await db.collection(set_name).add({
      data: event.ifo
  });
  //添加用户成功
  return {"message": "创建用户成功!", success:true};
};