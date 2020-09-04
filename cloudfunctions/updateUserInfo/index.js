// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var resultMsg = "0000";
  var resultCode = "success";
  const openid = wxContext.openid;
  //查询该用户选择的类型和性格
  try{
    await db.collection('app_user').doc(openid).update({
      data: {
        nick_name: event.nickName,
        choose_character: event.chooseCharacter,
        choose_person: event.choosePerson,
      }
    })
  }catch(e){
    var resultMsg = "9999";
    var resultCode = "诶呦~不能修改呢";
  }
  return {
    resultMsg: resultMsg,
    resultCode: resultCode,
  }
}