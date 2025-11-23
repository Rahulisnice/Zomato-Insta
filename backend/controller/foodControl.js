import Food from "../model/food.js";
import FoodPartner from "../model/foodPartner.js";
import Like from "../model/likes.js";
import Save from "../model/Save.js";
import { uploadFile } from "../services/storage.js";
import { v4 as uuid } from "uuid";

export const createFood = async (req, res) => {
  try {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());
    const foodItem = await Food.create({
      video: fileUploadResult.url,
      name: req.body.name,
      description: req.body.description,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "create food Error", error: error.message });
  }
};

export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find({});
    res.status(200).json({
      message: "Food Items Fetched Successfully",
      foodItems,
      role: req.user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get Food Items Error", error: error.message });
  }
};

export const getFoodPartnerProfile = async (req, res) => {
  try {
    const foodPartnerId = req.params.id;
    const foodPartner = await FoodPartner.findById(foodPartnerId);
    const foodItemsByFoodPartner = await Food.find({
      foodPartner: foodPartnerId,
    });

    res.status(200).json({
      message: "Food Partner Profile Fetched Successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
        totalMeals: foodItemsByFoodPartner.length,
        customersServed: foodItemsByFoodPartner.length * 10,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Get Food Partner Profile Error",
      error: error.message,
    });
  }
};

export const likeFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const AlreadyLiked = await Like.findOne({
      user: user._id,
      food: foodId,
    });

    if (AlreadyLiked) {
      await AlreadyLiked.deleteOne({
        user: user._id,
        food: foodId,
      });
      await Food.findOneAndUpdate({ _id: foodId }, { $inc: { likeCount: -1 } });
      res.status(200).json({ message: "Unliked" });
    } else {
      const like = await Like.create({
        user: user._id,
        food: foodId,
      });
      await Food.findOneAndUpdate({ _id: foodId }, { $inc: { likeCount: 1 } });
      res.status(200).json({ message: "Liked", like });
    }
  } catch (error) {
    res.status(500).json({ message: "Like food Error", error: error.message });
  }
};

export const saveFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const AlreadySaved = await Save.findOne({
      user: user._id,
      food: foodId,
    });

    if (AlreadySaved) {
      await AlreadySaved.deleteOne({
        user: user._id,
        food: foodId,
      });
      await Food.findOneAndUpdate({ _id: foodId }, { $inc: { saveCount: -1 } });
      res.status(200).json({ message: "Unsaved" });
    } else {
      const save = await Save.create({
        user: user._id,
        food: foodId,
      });
      await Food.findOneAndUpdate({ _id: foodId }, { $inc: { saveCount: 1 } });
      res.status(200).json({ message: "Saved", save });
    }
  } catch (error) {
    res.status(500).json({ message: "Like food Error", error: error.message });
  }
};

export const getSavedFood = async (req, res) => {
  try {
    const user = req.user;

    const savedFood = await Save.find({ user: user._id }).populate("food");
    if (!savedFood || savedFood.length === 0) {
      return res.status(200).json({ message: "No Saved Food Found" });
    }
    res
      .status(200)
      .json({ message: "Saved Food Fetched Successfully", savedFood });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get Saved Food Error", error: error.message });
  }
};

export const getSingleSavedFood = async (req, res) => {
  try {
    const SavedReelId = req.params.id;
    const savedFood = await Save.findOne({ food: SavedReelId }).populate(
      "food"
    );
    if (!savedFood) {
      return res.status(200).json({ message: "No Saved Food Found" });
    }
    res
      .status(200)
      .json({ message: "Saved Food Fetched Successfully", savedFood });
  } catch (error) {
    res.status(500).json({
      message: "Getting error in fetching video",
      error: error.message,
    });
  }
};
