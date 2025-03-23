// src/routers/apiRouter.js
import express from "express";
import { getJson, getImage } from "../controllers/apiController.js";

const apiRouter = express.Router();

// API 라우트 설정
apiRouter.get("/getjson", getJson);
apiRouter.get("/getImage", getImage);

export default apiRouter;
