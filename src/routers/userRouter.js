const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// 사용자 정보 조회 엔드포인트
router.get("/userinfo/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userInfo = await userService.getUserInfo(userId);
    if (!userInfo) {
      return res.status(404).json({ error: "사용자 정보를 찾을 수 없습니다." });
    }
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "사용자 정보 조회에 실패했습니다." });
  }
});

module.exports = router;
