const express = require("express");
const app = express();

// Express 애플리케이션 설정
app.use(express.json()); // JSON 파싱 미들웨어 설정

// 라우터 연결
const orderRouter = require("./routers/orderRouter");
const userRouter = require("./routers/userRouter");
app.use("/api/orders", orderRouter); // 주문 관련 라우터
app.use("/api/users", userRouter); // 사용자 정보 관련 라우터

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});

// 미들웨어 추가 (예: JSON 파싱)
app.use(express.json());

// 라우팅 설정
app.get("/", (req, res) => {
  res.send("안녕하세요, Express 애플리케이션!");
});
