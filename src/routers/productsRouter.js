import { Router } from "express";
import { productService } from "../services/productService.js";
import { reviewService } from "../services/reviewService.js";

const productRouter=Router();

//getProducts
productRouter.get("/",async (req,res)=>{  
    const category = req.query.category;
    const word = req.query.word;
    const productsData = await productService.getProducts(category,word);
    res.json(productsData);
})


//getDetail
productRouter.get("/:productId",async (req,res)=>{
    const productId = req.params.productId;
    const productsData = await productService.getDetail(productId);
    const reviewsData= await reviewService.getReview(productId);
    res.json([productsData,reviewsData]);
})

//getReviews
productRouter.get("/:productId/reviews",async (req,res)=>{
    const productId = req.params.productId;
    const reviewsData= await reviewService.getReview(productId,1);
    res.json(reviewsData);
})

//uploadReview
productRouter.put("/:productId/review",async (req,res)=>{
    const {title,author,content}=req.body;
    const productId=req.params.productId;
    const data=await reviewService.putReview(title,author,content,productId);
    res.json(data);
})

//deleteReview
productRouter.delete("/:productId/review",async(req,res)=>{
    const reviewId = req.query.id;
    const data = await reviewService.delReview(reviewId);
    res.json(data);
})

export {productRouter};