// src/middlewares/auth.js

// Middleware to check if user is logged in
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/login");
};

// Middleware to check if user is not logged in
export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

// Middleware to add user to res.locals
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.user);
  res.locals.user = req.user || null;
  next();
};
