import { Router } from "express";
import { productService } from "../services/productService.js";

const productRouter=Router();

//getProducts
productRouter.get("/",async (req,res)=>{  
    const category = req.query.category;
    const word = req.query.word;
    const data = await productService.getProducts(category,word);
    res.json(data);
})


//getDetail
productRouter.get("/:productId",async (req,res)=>{
    const Id = req.params.productId;
    const data = await productService.getDetail(Id);
    res.json(data);
})

export {productRouter};