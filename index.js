import express from "express";
import "dotenv";

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(
    `${__dirname}정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`
  );
});
