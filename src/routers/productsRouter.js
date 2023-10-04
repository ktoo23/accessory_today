import { Router } from "express";
import { productService } from "../services/productService.js";

const productRouter=Router();

//getCategoryProducts
productRouter.get("/",async (req,res)=>{  
    const category = req.query.category;
    const data = await productService.getProducts(category);
    res.json(data);
})

//searchProducts
productRouter.get("/search",async (req,res)=>{ 
    const word = req.query.word;
    const data = await productService.searchProducts(word);
    res.json(data);
})

//getDetail
productRouter.get("/:productId",async (req,res)=>{
    const Id = req.params.productId;
    const data = await productService.getDetail(Id);
    res.json(data);
})

export {productRouter};