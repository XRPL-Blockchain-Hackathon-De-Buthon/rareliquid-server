// src/controllers/apiController.js
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// token에 해당하는 상품의 public_endpoint 정보를 JSON으로 반환
export const getJson = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const product = await Product.findOne({ rwaToken: token });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product.public_endpoint);
  } catch (error) {
    console.error("Error in getJson:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// 이미지 URL에 해당하는 이미지 파일 반환
export const getImage = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const imagePath = path.join(__dirname, "../../uploads/images", url);

    // 파일 존재 여부 확인
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    // 이미지 파일 전송
    return res.sendFile(imagePath);
  } catch (error) {
    console.error("Error in getImage:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
