// src/controllers/rootController.js
import Product from "../models/Product.js";
import User from "../models/User.js";
import { deployRWA } from "../blockchain/deploy.js";

export const home = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: "desc" });
    return res
      .status(200)
      .render("home", { pageTitle: "RARELIQUID", products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

export const search = async (req, res) => {
  const { search_query: name } = req.query;
  try {
    let products;
    if (!name) {
      products = await Product.find({}).sort({ createdAt: "desc" });
    } else {
      products = await Product.find({
        name: {
          $regex: new RegExp(name, "ig"),
        },
      }).sort({ createdAt: "desc" });
    }
    return res
      .status(200)
      .render("search", { pageTitle: "상품 검색", products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

export const getProductDetail = async (req, res) => {
  const { id: rwaToken } = req.params;
  try {
    const product = await Product.findOne({ rwaToken });
    if (!product) {
      return res
        .status(404)
        .render("404", { pageTitle: "상품을 찾을 수 없습니다" });
    }
    return res.render("detail", { pageTitle: product.name, product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

export const getProfile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }

  try {
    const userProducts = await Product.find({ owner: req.user._id }).sort({
      createdAt: "desc",
    });
    return res.render("profile", {
      pageTitle: "내 프로필",
      userProducts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(`Error: ${error.message}`);
  }
};

export const getUploadProduct = (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }
  return res.render("upload", { pageTitle: "상품 등록" });
};

export const postUploadProduct = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }

  const { name, description, price, category } = req.body;
  const imageFile = req.file;

  try {
    // 블록체인에서 RWA 토큰 발급
    const { address, result } = await deployRWA(req.body.address, {
      name: req.body.contractName,
      symbol: req.body.symbol,
    });

    // 컨트랙트 주소를 rwaToken으로 사용
    const rwaToken = address;

    let imageUrl = null;
    if (imageFile) {
      // 이미지 파일 경로 설정
      imageUrl = `/images/${imageFile.filename}`;
    }

    // 새 상품 생성
    const newProduct = await Product.create({
      rwaToken,
      name,
      description,
      price,
      category,
      imageUrl,
      owner: req.user._id,
    });
    console.log(rwaToken);

    // 사용자 모델에 상품 토큰 추가
    await User.findByIdAndUpdate(req.user._id, {
      $push: { products: rwaToken },
    });

    return res.redirect(`/product/${rwaToken}`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).render("upload", {
      pageTitle: "상품 등록",
      errorMessage: `상품 등록 중 오류가 발생했습니다: ${error.message}`,
    });
  }
};
