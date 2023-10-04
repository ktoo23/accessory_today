import express from "express";
import { productRouter } from "./routers/productsRouter.js";

const app = express();


app.get("/", (req, res) => {
  res.send("HOME");
});

app.use("/products",productRouter);

export {app};