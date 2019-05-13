// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    try{
      //删除该文件夹下的所有文件
      db.collection('songs').where({dirId:event._id}).remove()
      //删除该文件夹
      return await  db.collection('dirs').doc(event._id).remove()
    }catch(e){
      console.log(e)
    }
    
 
}