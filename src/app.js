import express from "express";
import { userRouter } from "./routers/userRouter.js";
import { orderRouter } from "./routers/orderRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
import { productRouter } from "./routers/productsRouter.js";
import { adminRouter } from "./routers/adminRouter.js";
import { viewsRouter } from "./routers/viewsRouter.js";

const app = express();

app.use(express.json());


app.use(viewsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

export { app };
