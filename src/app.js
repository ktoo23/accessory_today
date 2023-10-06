import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB 연결에 성공하였습니다😊"))
  .catch((err) => console.log("mongoDB 연결에 실패하였습니다😥" + err));

app.get("/", (req, res) => {
  res.send("HOME");
});

app.use("/users", userRouter);
app.use("/", categoryRouter);

export { app };
