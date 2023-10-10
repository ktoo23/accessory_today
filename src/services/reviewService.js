import { Reviews } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class ReviewService {
    async getReview(productId, getAll) {
      try {
        let data = {};
        
        if (getAll) { // 전부 가져오기
          data = await Reviews.find({ productId }).populate('productId');
        } 
        else { // 일부만 가져오기
          data = await Reviews.find({ productId }).limit(2);
        }
        return data;
      } catch (error) {
        console.error('getReview 오류:', error);
        return error;
      }
    }
  
    async putReview(title, author, content, productId) {
      try {

        const data = {
          title,
          author,
          content,
          productId
        };
        
        await Reviews.findOneAndUpdate({ productId, author }, data, { upsert: true });
        
        return ;
      } catch (error) {
        console.error('putReview 오류:', error);
        return error;
      }
    }
  
    async delReview(Id) {
      try {
        
        await Reviews.deleteOne({ _id: new ObjectId(Id) });
        
        return ;
      } catch (error) {
        console.error('delReview 오류:', error);
        return error;
      }
    }
  }
  
  const reviewService = new ReviewService();
  
  export { reviewService };