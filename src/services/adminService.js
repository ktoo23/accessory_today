import { Products } from "../db/models/productModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

class AdminService {
  // 새 상품 생성
  async newProduct(
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg
  ) {
    // 중복되는 제품이 존재하는지 검사
    const productExsist = await Products.find({ productName: productName });
    // 중복되는 카테고리가 있을 경우 이미 존재하는 카테고리라고 알리기
    if (productExsist.length) {
      return {
        status: 400,
        errMsg: "이미 존재하는 상품입니다.",
      };
    }
    // db에 저장하기
    const newProduct = new Products({
      productName,
      price,
      category,
      description,
      isNew,
      isBest,
      productImg,
    });
    await Products.create(newProduct);
    // 성공 메시지
    return {
      status: 200,
      message: "상품이 생성되었습니다",
      productName: productName,
    };
  }

  //관리자 상품 삭제
  async deleteProduct(
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg
  ) {
    // 중복되는 제품이 존재하는지 검사
    const productExsist = await Products.find({ productName: productName });
    // 중복되는 카테고리가 있을 경우 존재하지 않는 상품이라고 알리기
    if (productExsist.length === 0) {
      return {
        status: 400,
        errMsg: "존재하지 않는 상품입니다.",
      };
    }
    // db에 저장하기

    await Products.deleteOne({ productName: productName });
    // 성공 메시지
    return {
      status: 200,
      message: "상품이 삭제되었습니다",
      productName: productName,
    };
  }

  //관리자 상품 수정
  async patchProduct(
    id,
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg
  ) {
    // 중복되는 제품이 존재하는지 검사
    // Convert the id to ObjectId
    const targetId = new ObjectId(id); // ObjectId형태로 변환

    // Check if the product exists
    const productExsist = await Products.findById(targetId); // id로 찾기
    //중복되는 상품이 없을 경우 존재하지 않는 상품이라고 알리기
    if (!productExsist) {
      return {
        status: 404,
        errMsg: "존재하지 않는 상품입니다.",
      };
    }
    // db에 저장하기
    await Products.findOneAndUpdate(
      { _id: targetId },
      {
        productName,
        price,
        category,
        description,
        isNew,
        isBest,
        productImg,
      }
    );
    // 성공 메시지
    return {
      status: 200,
      message: "상품 정보를 수정했습니다",
    };
  }
}

//
const adminService = new AdminService();

export { adminService };
