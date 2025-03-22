// src/controllers/authController.js
export const getLoginPage = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
  };
  
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
  
  export const getProfile = (req, res) => {
    if (!req.user) {
      return res.redirect("/auth/login");
    }
    return res.render("profile", { 
      pageTitle: "사용자 프로필",
      user: req.user 
    });
  };