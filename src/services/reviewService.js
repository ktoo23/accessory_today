import { Reviews } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class ReviewService {
    async getReview(productId) {
      try{
        let data = {};
        
        data = await Reviews.find({ productId });

        return data;
      }catch(err){
        console.error("getReview 오류:");
        throw err;
    }
    }
  
    async putReview(title, author, content, productId) {

      try{
        const data = {
          title,
          author,
          content,
          productId
        };
        
        await Reviews.findOneAndUpdate({ productId, author }, data, { upsert: true });
        
        return ;
      }catch(err){
        console.error("putReview 오류:");
        throw err;
    }
    }
  
    async delReview(Id) {

      try{
        await Reviews.deleteOne({ _id: new ObjectId(Id) });
        
        return ;
      }catch(err){
        console.error("delReview 오류:");
        throw err;
    }
    }
  }
  
  const reviewService = new ReviewService();
  
  export { reviewService };