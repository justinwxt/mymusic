// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection('songs').where({
      dirId:event.dirId
    }).get()
  }catch(e){

  }

}