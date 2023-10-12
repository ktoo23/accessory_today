import express from "express";
import path from "path";

const viewsRouter = express.Router();

viewsRouter.use("/", express.static(path.join(process.cwd(), "src/views")));

// 홈
viewsRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "views", "public", "main.html"));
});

// About
viewsRouter.get("/about", (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "src", "views", "public", "about.html")
  );
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
    path.join(process.cwd(), "src", "views", "products", "products.html")
  );
});

// 유저 정보 변경 페이지
viewsRouter.get("/user/userinfo/:userId", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "user",
      "userInfo",
      "userInfo.html"
    )
  );
});

// 상품 디테일 페이지
viewsRouter.get("/products/details/:productId", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "products",
      "details",
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
// 이 부분은 주문 id가 필요하므로 userId를 추가함.
viewsRouter.get("/user/orderTracking/:userId", (req, res) => {
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

// 관리자 주문 관리
viewsRouter.get("/admin/order-setting", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "admin",
      "orderSetting",
      "adminOrderSetting.html"
    )
  );
});

// 리뷰, 문의 작성
viewsRouter.get("/products/details/:productId/:uploadType", (req, res) => {
  res.sendFile(
    path.join(
      process.cwd(),
      "src",
      "views",
      "products",
      "details",
      "products-detail-form.html"
    )
  );
});

export { viewsRouter };
