// src/routers/rootRouter.js
import express from "express";
import {
  home,
  search,
  getProductDetail,
  getProfile,
  getUploadProduct,
  postUploadProduct,
} from "../controllers/rootController.js";
import { isLoggedIn } from "../middlewares/auth.js";
import multer from "multer";
import path from "path";

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.get("/auth/profile", isLoggedIn, getProfile);
// 구체적인 경로를 먼저 배치
rootRouter.get("/product/upload", isLoggedIn, getUploadProduct);
rootRouter.post(
  "/product/upload",
  isLoggedIn,
  upload.single("image"),
  postUploadProduct
);
// 와일드카드 경로를 나중에 배치
rootRouter.get("/product/:id", getProductDetail);

export default rootRouter;
