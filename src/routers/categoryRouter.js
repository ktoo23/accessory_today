import { Router } from "express";
import { categoryService } from "../services/categoryService.js";
import { hash } from "bcrypt";

const categoryRouter = Router();

// 새 카테고리
categoryRouter.post("/categorys", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const { Category } = req.body;
  try {
    // 카테고리 개설 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const newCategoryResult = await categoryService.newCategory(Category);
    return res.json(newCategoryResult);
  } catch (err) {
    return res.json(err);
  }
});

export { categoryRouter };
