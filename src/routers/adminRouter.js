import { Router } from "express";
import { productService } from "../services/productService.js";
import { reviewService } from "../services/reviewService.js";
import { inquiryService } from "../services/inquiryService.js";
import { adminService } from "../services/adminService.js";

const adminRouter = Router();

// 새 상품 등록
adminRouter.post("/products", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const {
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg,
  } = req.body;
  try {
    // 상품 개설 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const newProductResult = await adminService.newProduct(
      productName,
      price,
      category,
      description,
      isNew,
      isBest,
      productImg
    );
    return res.json(newProductResult);
  } catch (err) {
    return res.json(err);
  }
});

//관리자 상품 삭제
adminRouter.delete("/products", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const {
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg,
  } = req.body;
  try {
    // 상품 삭제 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const deleteProductResult = await adminService.deleteProduct(
      productName,
      price,
      category,
      description,
      isNew,
      isBest,
      productImg
    );
    return res.json(deleteProductResult);
  } catch (err) {
    return res.json(err);
  }
});

// 관리자 상품 수정
adminRouter.patch("/products", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const {
    id,
    productName,
    price,
    category,
    description,
    isNew,
    isBest,
    productImg,
  } = req.body;
  try {
    // 상품 개설 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const patchProductResult = await adminService.patchProduct(
      id,
      productName,
      price,
      category,
      description,
      isNew,
      isBest,
      productImg
    );
    return res.json(patchProductResult);
  } catch (err) {
    return res.json(err);
  }
});

//const targetId = new ObjectId(Id);//ObjectId형태로 변환

export { adminRouter };
