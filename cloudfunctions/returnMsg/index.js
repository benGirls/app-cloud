// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var resultMsg = "0000";
  var resultCode = "success";
  //参数校验
  if(!event.send_msg){
    resultCode = "0001";
    resultMsg = "参数缺失！"
  }
  //const openid = wxContext.openid;
  const openid = "xx";
  //查询该用户选择的类型和性格
  const result = await db.collection('app_user').where({
    openid:openid,
  }).get();
  const data = result.data;
  console.log(data[0]["choose_person"]);
  var nodejieba = require("nodejieba");
  var cutdata = nodejieba.cut("帝国主义要把我们的地瓜分掉");
  console.log(cutdata);
  return {
    resultCode: resultCode,
    resultMsg: resultMsg,
  }
}