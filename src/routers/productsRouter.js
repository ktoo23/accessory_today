import { Router } from "express";
import { productService } from "../services/productService.js";
import { reviewService } from "../services/reviewService.js";
import { inquiryService } from "../services/inquiryService.js";
import { homeService } from "./services/productService.js";

const productRouter=Router();

//getProducts
productRouter.get("/",async (req,res)=>{  
    if(isNew&&isBest){
        const bestData= await homeService.getBest();
        const newData= await homeService.getNew();
        res.json([bestData,newData]);
    }
    else{
        const {category,word} = req.query;
        const productsData = await productService.getProducts(category,word);
        res.json(productsData);
    }
    
})


//getDetail
productRouter.get("/:productId",async (req,res)=>{
    const productId = req.params.productId;
    const productsData = await productService.getDetail(productId);
    const reviewsData= await reviewService.getReview(productId);
    const inquiryData= await inquiryService.getInquiry(productId);
    res.json([productsData,reviewsData,inquiryData]);
})

//getReview
productRouter.get("/:productId/review",async (req,res)=>{
    const productId = req.params.productId;
    const reviewData= await reviewService.getReview(productId,true);
    res.json(reviewData);
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

//getInquiry
productRouter.get("/:productId/inquiry",async (req,res)=>{
    const productId = req.params.productId;
    const inquiryData= await inquiryService.getInquiry(productId,1);
    res.json(inquiryData);
})

//uploadInquiry
productRouter.put("/:productId/inquiry",async (req,res)=>{
    const {title,author,content}=req.body;
    const productId=req.params.productId;
    const data=await inquiryService.putInquiry(title,author,content,productId);
    res.json(data);
})

//deleteInquiry
productRouter.delete("/:productId/inquiry",async(req,res)=>{
    const inquiryId = req.query.id;
    const data = await inquiryService.delInquiry(inquiryId);
    res.json(data);
})

export {productRouter};