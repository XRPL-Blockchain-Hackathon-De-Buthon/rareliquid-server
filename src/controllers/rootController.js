// src/controllers/rootController.js
import Product from "../models/Product.js";

export const home = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: "desc" });
    return res
      .status(200)
      .render("home", { pageTitle: "이커머스 홈", products });
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
