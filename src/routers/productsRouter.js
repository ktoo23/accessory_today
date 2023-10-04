import { Router } from "express";
import { productService } from "../services/productService.js";

const productRouter=Router();

productRouter.get("/",(req,res)=>{
    const category = req.query.category;
    const data = productService.getProducts(category);
    res.json(data);
})

productRouter.get("/search",(req,res)=>{
    const word = req.query.word;
    const data = productService.searchProducts(word);
    res.json(data);
})
export {productRouter};