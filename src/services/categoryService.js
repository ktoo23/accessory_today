import { categoryModel } from "../db/models/categoryModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

class CategoryService {
  // 새 카테고리 생성
  async newCategory(category) {
    // 중복되는 카테고리가 존재하는지 검사
    
    const categoryExsist = await categoryModel.findOne({ category: category });
    // 중복되는 카테고리가 있을 경우 이미 존재하는 카테고리라고 알리기
    if (categoryExsist) {
      return {
        status: 404,
        errMsg: "이미 존재하는 카테고리입니다.",
      };
    }
    // db에 저장하기
    await categoryModel.create({ category });
    // 성공 메시지와 새로 가입한 유저 정보 반환
    return {
      status: 201,
      message: "카테고리가 생성되었습니다",
    };
  }

  //카테고리 삭제

  async deleteCategory(category) {
    //중복되는 카테고리가 있는지 검사

    const categoryExsist = await categoryModel.find({ category: category });
    // 중복되는 카테고리가 있을 경우 존재하지 않는 카테고리라고 알리기

    if (categoryExsist.length === 0) {
      return {
        status: 400,
        errMsg: "존재하지 않는 카테고리입니다.",
      };
    }
    // db에서 삭제

    await categoryModel.deleteOne({ category: category });
    // 성공 메시지와 카테고리 삭제
    return {
      status: 200,
      message: "카테고리가 삭제되었습니다",
      category: category,
    };
  }
}

//
const categoryService = new CategoryService();

export { categoryService };
