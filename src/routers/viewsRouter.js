import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("public"));
viewsRouter.use("/join", serveStatic("join"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/mypage", serveStatic("mypage"));
viewsRouter.use("/admin", serveStatic("admin"));
viewsRouter.use("/products", serveStatic("products"));
viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/search", serveStatic("search"));


// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const __dirname=path.resolve();
  
  const resourcePath = path.join(__dirname, `./src/views/${resource}`);

  let option={};
 
  if(resource==="public") option = { index: `main.html` };
  else if(resource==="products") option = { index: `product.html` };
  else option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };