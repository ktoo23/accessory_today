const mongoose = require("mongoose");

// MongoDB 연결 URI
const mongoURI = "mongodb://localhost/27017";

// MongoDB 연결 설정
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// MongoDB 연결 객체
const db = mongoose.connection;

// MongoDB 연결 이벤트 핸들러
db.on("error", (err) => {
  console.error("MongoDB 연결 오류:", err);
  process.exit(1); // 애플리케이션 종료
});

db.once("open", () => {
  console.log("MongoDB에 연결되었습니다.");
});

// MongoDB 연결을 모듈 내보내기
module.exports = db;
