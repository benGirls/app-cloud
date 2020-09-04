// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection("user_judge").add({
      data: {
        openid: wxContext.OPENID,//获取操作者_openid的方法
      }
    })
  }catch(e){
    console.log(e)
  }
  
}