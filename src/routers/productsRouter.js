import { Router } from "express";
import { productService } from "../services/productService.js";
import { reviewService } from "../services/reviewService.js";
import { inquiryService } from "../services/inquiryService.js";
import { putwrongReview } from "../middlewares/errorMiddleware.js";

const productRouter=Router();

//getProducts
productRouter.get("/",async (req,res,next)=>{  
    try{
        const {category,word,isBest,isNew} = req.query;
        const productsData = await productService.getProducts(category,word,isBest,isNew);
        res.status(200).json(productsData);   
    }catch(err){
        next(err);
    } 
})


//getDetail
productRouter.get("/:productId",async (req,res,next)=>{
    try{
        const productId = req.params.productId;
        const productsData = await productService.getDetail(productId);

        if(!productsData){
            res.status(404).send("해당 상품이 없습니다!");
        }

        res.status(200).json(productsData);
    }catch(err){
        next(err);
    }
})

//getReview
productRouter.get("/:productId/review",async (req,res,next)=>{
    try{
        const productId = req.params.productId;
        const {getAll} = req.query
        const reviewData= await reviewService.getReview(productId,getAll);
        res.status(200).json(reviewData);
    }catch(err){
        next(err);
    }
})

//uploadReview
productRouter.put("/:productId/review",putwrongReview,async (req,res,next)=>{
    try{
        const {title,author,content}=req.body;
        const productId=req.params.productId;
        await reviewService.putReview(title,author,content,productId);
        res.status(201).send("success");
    }catch(err){
        next(err);
    }
})

//deleteReview
productRouter.delete("/:productId/review",async(req,res,next)=>{
    try{
        const reviewId = req.query.id;
        await reviewService.delReview(reviewId);
        res.status(204).send("success");
    }catch(err){
        next(err);
    }
})

//getInquiry
productRouter.get("/:productId/inquiry",async (req,res,next)=>{
    try{
        const productId = req.params.productId;
        const {getAll}=req.query;
        const inquiryData=await inquiryService.getInquiry(productId,getAll);
        res.status(200).json(inquiryData);
    }catch(err){
        next(err);
    }
})

//uploadInquiry
productRouter.put("/:productId/inquiry",putwrongReview,async (req,res,next)=>{
    try{
        const {title,author,content}=req.body;
        const productId=req.params.productId;
        await inquiryService.putInquiry(title,author,content,productId);
        res.status(201).send("success");
    }catch(err){
        next(err);
    }
})

//deleteInquiry
productRouter.delete("/:productId/inquiry",async(req,res,next)=>{
    try{
        const inquiryId = req.query.id;
        await inquiryService.delInquiry(inquiryId);
        res.status(204).send("success");
    }catch(err){
        next(err);
}
})

export {productRouter};