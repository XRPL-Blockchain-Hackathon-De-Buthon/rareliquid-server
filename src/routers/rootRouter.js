// src/routers/rootRouter.js
import express from "express";
import { home, search } from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);

export default rootRouter;