import express from "express";
import { productsRouter } from "./routers/productsRouter.js";

const app = express();


app.get("/", (req, res) => {
  res.send("HOME");
});

app.use("/products",productsRouter);

export {app};