import express from "express";
import path from "path";

const viewsRouter = express.Router();

viewsRouter.use("/", express.static(path.join(process.cwd(), "src/views")));

// 홈
viewsRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "public", "main.html"));
});

// 장바구니
viewsRouter.get("/cart", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "cart", "cart.html"));
});

// 회원가입
viewsRouter.get("/join", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "join", "join.html"));
});

// 로그인
viewsRouter.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "login", "login.html"));
});

// 주문 페이지
// tempOder는 무엇인가요?
// order가 html이 뜨지 않습니다!
viewsRouter.get("/order", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "order", "order.html"));
});

// 상품 페이지
viewsRouter.get("/products", (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "src", "views", "products", "product.html")
  );
});

// 상품 디테일 페이지
viewsRouter.get("/products/details", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "products",
      "detail",
      "product-detail.html"
    )
  );
});

// 마이페이지 첫화면
viewsRouter.get("/mypage", (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "src", "views", "user", "mypage", "mypage.html")
  );
});

// 회원 주문 조회
// 이 부분은 주문 id가 필요하므로 orderId를 추가함.
viewsRouter.get("/user/orderTracking", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "user",
      "orderTracking",
      "orderTracking.html"
    )
  );
});

// 비회원 주문 조회
viewsRouter.get("/non-member/order-tracking/:orderId", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "user",
      "nonMemberPage",
      "nonMemberPage.html"
    )
  );
});

export { viewsRouter };
