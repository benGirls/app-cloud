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
    const result = await db.collection('app_user').where({
      openid: openid,
    }).get();
    var nickName = result[0]["nick_name"];
    var chooseCharacter = result[0]["choose_character"];
    var choosePerson = result[0]["choose_person"];
  }catch(e){
    var resultMsg = "9999";
    var resultCode = "暂时无法显示哦~";
  }
  return {
    resultMsg: resultMsg,
    resultCode: resultCode,
    nickName:nickName,
    chooseCharacter:chooseCharacter,
    choosePerson:choosePerson
  }
}