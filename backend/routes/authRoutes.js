import express from "express";
import {
  foodPartnerLogin,
  foodPartnerLogout,
  Login,
  Logout,
  Register,
  registerFoodPartner,
} from "../controller/auth.js";

const router = express.Router();

//user authntication routes
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

//food partners authntication routes
router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", foodPartnerLogin);
router.post("/food-partner/logout", foodPartnerLogout);

export default router;
