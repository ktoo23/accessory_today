import express from "express";
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
app.use("/", categoryRouter);
app.use("/api", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

export { app };
