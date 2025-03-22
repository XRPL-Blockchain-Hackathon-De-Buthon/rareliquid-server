// src/controllers/authController.js

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const googleCallback = (req, res) => {
  // Successful authentication, redirect home
  res.redirect("/");
};
