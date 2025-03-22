// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  googleId: { type: String, unique: true },
  avatarUrl: { type: String, trim: true },
  walletAddress: { type: String, trim: true }, // 사용자 지갑 주소 추가
  products: [{ type: String, ref: "Product" }], // 사용자가 올린 상품 토큰 배열 (Product 모델의 rwaToken 참조)
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
