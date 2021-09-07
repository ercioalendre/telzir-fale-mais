import express from "express";
import UsersController from "@modules/users/controllers/Users.controller";
import isAuthenticated from "@middlewares/isAuthenticated";
import isUserLoggedIn from "@middlewares/isUserLoggedIn";
import checkNewUserForm from "@middlewares/checkNewUserForm";

const router = express.Router();

router.get("/", isUserLoggedIn, (req, res) => res.redirect("/login"));
router.get("/signup", isUserLoggedIn, UsersController.signup);
router.post("/signup", checkNewUserForm, UsersController.create);
router.get("/login", isUserLoggedIn, UsersController.login);
router.post("/login", UsersController.createUserSession);
router.get("/logout", UsersController.logout);
router.get("/my-account", isAuthenticated, UsersController.index);

export default router;
