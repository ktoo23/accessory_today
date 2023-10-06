import { Inquiries } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class InquiryService {
    async getInquiry(productId, getAll) {
      try {
        let data = {};
        if (getAll) { // 전부 가져오기
          data = await Inquiries.find({ productId }).populate('productId');
        } else { // 일부만 가져오기
          data = await Inquiries.find({ productId }).limit(2);
        }
        return data;
      } catch (error) {
        console.error('getInquiry 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 문의를 가져오는 중에 오류가 발생했습니다.'
        };
      }
    }
  
    async putInquiry(title, author, content, productId) {
      try {
        if (!title || !author || !content ) { // 하나라도 없으면 에러
          return {
            status: 400,
            errmsg: '잘못된 형식의 문의입니다!'
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
        
        await Inquiries.findOneAndUpdate({ productId, author }, data, { upsert: true });
        return {
          status: 200,
          message: 'success'
        };
      } catch (error) {
        console.error('putInquiry 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 문의를 작성 또는 수정하는 중에 오류가 발생했습니다.'
        };
      }
    }
  
    async delInquiry(Id) {
      try {
        const targetId = new ObjectId(Id);
        await Inquiries.deleteOne({ _id: targetId });
        return {
          status: 200,
          message: 'success'
        };
      } catch (error) {
        console.error('delInquiry 오류:', error);
        return {
          status: 500, // 내부 서버 오류
          message: '서버에서 문의를 삭제하는 중에 오류가 발생했습니다.'
        };
      }
    }
  }
  
  const inquiryService = new InquiryService();
  
  export { inquiryService };