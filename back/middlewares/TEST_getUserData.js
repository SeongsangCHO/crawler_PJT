let db = require("./config/db_config");


exports.getUserData = async function (req, res, next){
  try{
    //res.locals.userNickName과 일치하는
    //카테고리와 이에 해당하는 링크카드, 크롤링데이터를
    //전부 전달해주어야함 더미데이터형태로 JSON으로 파싱해서
    //res.json({userData : parsedData})
  }catch(error){
    console.error(error);
    next(error);
  }
}