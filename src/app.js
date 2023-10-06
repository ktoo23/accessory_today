import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
import { productRouter } from "./routers/productsRouter.js";
import bodyParser from "body-parser";
import { homeService } from "./services/productService.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB 연결에 성공하였습니다😊"))
  .catch((err) => console.log("mongoDB 연결에 실패하였습니다😥" + err));

app.get("/api", async (req, res) => {
  const bestData = await homeService.getBest();
  const newData = await homeService.getNew();
  res.json([bestData, newData]);
});

app.use("/api/users", userRouter);
app.use("/", categoryRouter);
app.use("/api/products", productRouter);
export { app };
