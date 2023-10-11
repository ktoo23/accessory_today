import { Reviews } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class ReviewService {
    async getReview(productId, getAll) {

        let data = {};
        
        if (getAll) { // 전부 가져오기
          data = await Reviews.find({ productId }).populate('productId');
        } 
        else { // 일부만 가져오기
          data = await Reviews.find({ productId }).limit(2);
        }
        return data;

    }
  
    async putReview(title, author, content, productId) {


        const data = {
          title,
          author,
          content,
          productId
        };
        
        await Reviews.findOneAndUpdate({ productId, author }, data, { upsert: true });
        
        return ;

    }
  
    async delReview(Id) {

        
        await Reviews.deleteOne({ _id: new ObjectId(Id) });
        
        return ;

    }
  }
  
  const reviewService = new ReviewService();
  
  export { reviewService };