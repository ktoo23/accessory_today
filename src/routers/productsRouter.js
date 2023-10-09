import { Router } from "express";
import { productService } from "../services/productService.js";
import { reviewService } from "../services/reviewService.js";
import { inquiryService } from "../services/inquiryService.js";

const productRouter=Router();

//getProducts
productRouter.get("/",async (req,res)=>{  
    const {category,word,isBest,isNew} = req.query;
    const productsData = await productService.getProducts(category,word,isBest,isNew);
    res.status(200).json(productsData);    
})


//getDetail
productRouter.get("/:productId",async (req,res)=>{
    const productId = req.params.productId;
    const productsData = await productService.getDetail(productId);
    res.status(200).json(productsData);
})

//getReview
productRouter.get("/:productId/review",async (req,res)=>{
    const productId = req.params.productId;
    const {getAll} = req.query
    const reviewData= await reviewService.getReview(productId,getAll);
    res.status(200).json(reviewData);
})

//uploadReview
productRouter.put("/:productId/review",async (req,res)=>{
    const {title,author,content}=req.body;
    const productId=req.params.productId;
    await reviewService.putReview(title,author,content,productId);
    res.status(201);
})

//deleteReview
productRouter.delete("/:productId/review",async(req,res)=>{
    const reviewId = req.query.id;
    await reviewService.delReview(reviewId);
    res.status(204);
})

//getInquiry
productRouter.get("/:productId/inquiry",async (req,res)=>{
    const productId = req.params.productId;
    const {getAll}=req.query;
    const inquiryData=await inquiryService.getInquiry(productId,getAll);
    res.status(200).json(inquiryData);
})

//uploadInquiry
productRouter.put("/:productId/inquiry",async (req,res)=>{
    const {title,author,content}=req.body;
    const productId=req.params.productId;
    await inquiryService.putInquiry(title,author,content,productId);
    res.status(201);
})

//deleteInquiry
productRouter.delete("/:productId/inquiry",async(req,res)=>{
    const inquiryId = req.query.id;
    await inquiryService.delInquiry(inquiryId);
    res.status(204);
})

productRouter.use((err, req, res, next) => {
    res.status(500).send(err);
});

export {productRouter};