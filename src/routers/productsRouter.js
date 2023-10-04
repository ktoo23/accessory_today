import { productsData } from "../db/testdata.js";
import { Router } from "express";
import { productService } from "../services/service.js";

const productsRouter=Router();

productsRouter.get("/",(req,res)=>{
    res.json(productsData);
})

productsRouter.get("/search",(req,res)=>{
    const word = req.query.word;
    const data = productService.searchProduct(word);
    res.json(data);
})
export {productsRouter};