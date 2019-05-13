// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let newDirName = event.newDirName;
  try{
   return await db.collection('dirs').add({
      data: {
        name: newDirName,
        openId: wxContext.OPENID
      }
    })
  }catch(e){
     console.log(e)
    
  }

 
}