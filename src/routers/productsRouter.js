import { Router } from "express";
import { productService } from "../services/service.js";

const productsRouter=Router();

productsRouter.get("/",(req,res)=>{
    const category = req.query.category;
    const data = productService.getProducts(category);
    res.json(data);
})

productsRouter.get("/search",(req,res)=>{
    const word = req.query.word;
    const data = productService.searchProducts(word);
    res.json(data);
})
export {productsRouter};