// src/middlewares/auth.js
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.user);
  res.locals.user = req.user || {};
  next();
};

export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/google");
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};
