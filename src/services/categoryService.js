import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { categoryModel } from "../db/models/categoryModel.js";
import { NonMember } from "../db/models/nonMemberModel.js";
import { Order } from "../db/models/orderModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

class CategoryService {
  // 중복 카테고리 검사
  async newCategory(Category) {
    // 중복되는 카테고리가 존재하는지 검사
    const categoryExsist = await categoryModel.find({ Category: Category });
    // 중복되는 카테고리가 있을 경우 이미 존재하는 카테고리라고 알리기
    if (categoryExsist.length) {
      return {
        status: 400,
        errMsg: "이미 존재하는 카테고리입니다.",
      };
    }
    // db에 저장하기
    const newCategory = new categoryModel({
      Category,
    });
    await categoryModel.create(newCategory);
    // 성공 메시지와 새로 가입한 유저 정보 반환
    return {
      status: 200,
      message: "카테고리가 생성되었습니다",
      newCategory: newCategory,
    };
  }
}

const categoryService = new CategoryService();

export { categoryService };
