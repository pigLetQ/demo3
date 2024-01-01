const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  try {
    // 获取 cloud 环境中的 mongoDB 数据库对象
    const db = cloud.database();
    let set_name = event.set_name
    // 获取集合对象test
    const data = await db.collection(set_name)
      // 使用where方法指定查询条件，指定Id必须等于4586
      .where({
        name: event.nickName
      })
      // 使用get获取文档数据
      .get();
    return { success: true, msg: '查询成功', data };
  } catch (err) {
    return { success: false, msg: `查询失败 - ${err.toString()}` };
  }
};