// 사용자 정보를 다루는 로직을 작성
// 예를 들어, 사용자 정보는 users 컬렉션과 관련이 있다고 가정

// 모델을 불러와서 MongoDB와 상호 작용
const User = require("../db/userModel");

// 사용자 정보 조회 함수
async function getUserInfo(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserInfo,
};
