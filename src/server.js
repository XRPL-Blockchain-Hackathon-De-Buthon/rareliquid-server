// src/server.js
import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import rootRouter from "./routers/rootRouter.js";
import authRouter from "./routers/authRouter.js";
import configurePassport from "./oauth/passport.js";
import { localsMiddleware } from "./middlewares/auth.js";

const app = express();

// View engine setup
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// Middlewares
const logger = morgan("dev");
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

// Session 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URI || "mongodb://mongo:27017/ecommerce" 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Passport 초기화
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// 로컬 변수에 사용자 정보 추가
app.use(localsMiddleware);

// 라우트 설정
app.use("/auth", authRouter);
app.use("/", rootRouter);

// 404 에러 처리
app.get("/*", (req, res) =>
  res.status(404).render("404", { pageTitle: "Page not Found!" })
);

export default app;