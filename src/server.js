import express from "express";
import morgan from "morgan";
import path from "path";
import rootRouter from "./routers/rootRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

const logger = morgan("dev");
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", rootRouter);

app.get("/*", (req, res) =>
  res.status(404).render("404", { pageTitle: "Page not Found!" })
);

export default app;