import express from "express";
import UsersController from "@modules/users/controllers/Users.controller";
import isAuthenticated from "@middlewares/isAuthenticated";
import isUserLoggedIn from "@middlewares/isUserLoggedIn";
import checkNewUserForm from "@middlewares/checkNewUserForm";
import checkLoginUserForm from "@middlewares/checkLoginUserForm";

const router = express.Router();

router.get("/", isUserLoggedIn, (req, res) => res.redirect("/login"));
router.get("/signup", isUserLoggedIn, UsersController.signup);
router.post("/signup", checkNewUserForm, UsersController.create);
router.get("/login", isUserLoggedIn, UsersController.login);
router.post("/login", checkLoginUserForm, UsersController.createUserSession);
router.get("/logout", UsersController.logout);
router.get("/my-account", isAuthenticated, UsersController.index);
router.post("/my-account/calcular", isAuthenticated, UsersController.calculate);
router.get("/my-account/calcular", isAuthenticated, (req, res) => res.redirect("/my-account"));
router.get("*", (req, res) => {
  res.status(404).render("main", {
    page: "page-not-found",
  });
});

export default router;
