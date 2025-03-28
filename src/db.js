// src/db.js
import mongoose from "mongoose";

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

export default db;
