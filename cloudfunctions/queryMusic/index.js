// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var resultMsg = "0000";
  var resultCode = "success";
  //const openid = wxContext.openid;
  //云端测试
  const openid = "xx";
  //查询该用户选择的类型和性格
  const result = await db.collection('app_user').where({
    openid:openid,
  }).get();
  const data = result.data;
  if(data==null||data.length==0){
    resultCode = 0001;
    resultMsg = "未选择人物和性格"
    return {
      resultMsg: resultMsg,
      resultCode: resultCode,
    }
  }
  //获取性格对应的type
  const typeResult = await db.collection('app_character').where({
    character_key:data[0]["choose_character"],
  }).get();
  const musicData = typeResult.data;
  //获取所有此type下所有的电影列表
  const musicList = await db.collection('app_music').where({
    music_type:musicData[0]["type"],
  }).get();
  return {
    resultMsg: resultMsg,
    resultCode: resultCode,
    data:musicList.data
  }
}