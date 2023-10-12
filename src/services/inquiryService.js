import { Inquiries } from "../db/models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId; //ObjectId 형식으로 변환

class InquiryService {
    async getInquiry(productId) {
      try{
        let data = {};

        data = await Inquiries.find({ productId });

        return data;
      }catch(err){
        console.error("getInquiry 오류:");
        throw err;
    }
    }
  
    async putInquiry(title, author, content, productId) {

      try{
        const data = {
          title,
          author,
          content,
          productId
        };
        
        await Inquiries.findOneAndUpdate({ productId, author }, data, { upsert: true });
        return ;
      }catch(err){
        console.error("putInquiry 오류:");
        throw err;
    }
    }
  
    async delInquiry(Id) {

      try{
        await Inquiries.deleteOne({ _id: new ObjectId(Id) });

        return ;
      }catch(err){
        console.error("delInquiry 오류:");
        throw err;
    }
    }
  }
  
  const inquiryService = new InquiryService();
  
  export { inquiryService };