import { Reviews } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class ReviewService {
    async getReview(productId, getAll) {
      try {
        let data = {};
        if (getAll) { // 전부 가져오기
          data = await Reviews.find({ productId }).populate('productId');
        } else { // 일부만 가져오기
          data = await Reviews.find({ productId }).limit(2);
        }
        return data;
      } catch (error) {
        console.error('getReview 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 리뷰를 가져오는 중에 오류가 발생했습니다.'
        };
      }
    }
  
    async putReview(title, author, content, productId) {
      try {
        if (!title || !author || !content ) { // 하나라도 없으면 에러
          return {
            status: 400,
            errmsg: '잘못된 형식의 리뷰입니다!'
          };
        }

        if(!productId){
            return {
                status:404,
                errmsg:'상품을 찾을 수 없습니다.'
            }
        }

        const data = {
          title,
          author,
          content,
          productId
        };
        
        await Reviews.findOneAndUpdate({ productId, author }, data, { upsert: true });
        return {
          status: 200,
          message: 'success'
        };
      } catch (error) {
        console.error('putReview 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 리뷰를 작성 또는 수정하는 중에 오류가 발생했습니다.'
        };
      }
    }
  
    async delReview(Id) {
      try {
        const targetId = new ObjectId(Id);
        await Reviews.deleteOne({ _id: targetId });
        return {
          status: 200,
          message: 'success'
        };
      } catch (error) {
        console.error('delReview 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 리뷰를 삭제하는 중에 오류가 발생했습니다.'
        };
      }
    }
  }
  
  const reviewService = new ReviewService();
  
  export { reviewService };