import express from "express";
import {
  authorizeFoodPartner,
  authorizeUser,
  dualAuthorize,
} from "../middleware/authoriz.js";
import {
  createFood,
  getFoodItems,
  getFoodPartnerProfile,
  likeFood,
  saveFood,
  getSavedFood,
  getSingleSavedFood,
} from "../controller/foodControl.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", authorizeFoodPartner, upload.single("video"), createFood);

router.get("/", dualAuthorize, getFoodItems);

router.get("/food-partner/:id", authorizeUser, getFoodPartnerProfile);

router.post("/like", dualAuthorize, likeFood);

router.post("/save", dualAuthorize, saveFood);

router.get("/save", dualAuthorize, getSavedFood);

router.get("/save/:id", dualAuthorize, getSingleSavedFood);

export default router;
