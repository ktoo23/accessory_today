import express from "express";
import path from "path";
import { userRouter } from "./routers/userRouter.js";
import { orderRouter } from "./routers/orderRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
import { productRouter } from "./routers/productsRouter.js";
import { adminRouter } from "./routers/adminRouter.js";
import { viewsRouter } from "./routers/viewRouter.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(viewsRouter);

app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.use("/api", categoryRouter);
app.use("/api", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// 에러 핸들러 미들웨어
app.use((err, req, res, next) => {
  // 에러 처리 로직을 여기에 작성합니다.
  console.error(err); // 에러를 콘솔에 기록하거나 로깅할 수 있습니다.

  // 클라이언트에게 에러 응답을 보내거나 다른 에러 처리 작업을 수행합니다.
  res.status(500).json({ error: "서버 에러 발생" });
});

export { app };
