import mongoose from "mongoose";
import { app } from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 5000;
//mongoose.connect(process.env.mongooseurl);

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://127.0.0.1:${PORT}`);
});
