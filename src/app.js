import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://yso682879:Su3tFGAEv2AuMxf@cluster0.yqs3pfu.mongodb.net/accessory__today?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongoDB 연결에 성공하였습니다😊"))
  .catch((err) => console.log("mongoDB 연결에 실패하였습니다😥" + err));

app.get("/", (req, res) => {
  res.send("HOME");
});

app.use("/api/users", userRouter);

export { app };
