import { Router } from "express";
import { userService } from "../services/userService.js";
import { User } from "../db/models/userModel.js";
import { NonMember } from "../db/models/nonMemberModel.js";

const userRouter = Router();

// 회원가입
userRouter.post("/join", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const { email, password, checkPassword, username, address, phone } = req.body;
  // 회원가입 요청 처리 결과를 받음. (상태 코드 200이면 성공)
  const joinResult = await userService.join(
    email,
    password,
    checkPassword,
    username,
    address,
    phone
  );
  return res.json(joinResult);
});

// 로그인
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResult = await userService.login(email, password);
    console.log(loginResult);
    return res.json(loginResult);
  } catch (err) {
    return res.json(err);
  }
});

// 일반 회원 마이페이지
userRouter.get("/mypage", async (req, res) => {
  const accessToken = req.header("Authorization").split("Bearer ")[1];
  try {
    const getMyPageResult = await userService.getMyPage(accessToken);
    console.log(getMyPageResult);
    return res.json(getMyPageResult);
  } catch (err) {
    res.json(err);
  }
});

// 비회원 주문 검증 및 비회원 페이지(비회원 주문조회 페이지) 이동
userRouter
  .route("/non-member-page")
  .post((req, res) => {
    res.send(userService.postNonMember());
  })
  .get((req, res) => {
    res.send(userService.getNonMemberPage());
  });

export { userRouter };
