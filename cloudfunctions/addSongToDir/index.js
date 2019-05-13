// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('songs').add({
      data: {
        songName: event.songName,
        singer: event.singer,
        src: event.src,
        dirId: event.dirId
      }
    })
  }catch(e){
    console.log(e)
  }

 
}