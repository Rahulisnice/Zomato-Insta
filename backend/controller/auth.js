import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import FoodPartner from "../model/foodPartner.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: passwordHash,
    });

    const token = generateToken(newUser._id);
    res.cookie("token", token);

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Register User Failed" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );

    const token = generateToken(existUser._id);
    res.cookie("token", token);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: existUser._id,
        fullname: existUser.fullname,
        email: existUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login User Failed" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout User Failed" });
  }
};

export const registerFoodPartner = async (req, res) => {
  try {
    const { name, email, password, phone, address, contactName } = req.body;
    const userExist = await FoodPartner.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Food Partner already exists" });
    }

    if (!name || !email || !password || !phone || !address || !contactName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newFoodPartner = await FoodPartner.create({
      name,
      email,
      password: passwordHash,
      phone,
      address,
      contactName,
    });

    const token = generateToken(newFoodPartner._id);
    res.cookie("token", token);

    await newFoodPartner.save();
    res.status(201).json({
      message: "Food Partner registered successfully",
      user: {
        _id: newFoodPartner._id,
        fullname: newFoodPartner.name,
        email: newFoodPartner.email,
        phone: newFoodPartner.phone,
        address: newFoodPartner.address,
        contactName: newFoodPartner.contactName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Food Partner Register Failed" });
  }
};

export const foodPartnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await FoodPartner.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Food Partner does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );

    const token = generateToken(existUser._id);
    res.cookie("token", token);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Food Partner logged in successfully",
      user: {
        _id: existUser._id,
        fullname: existUser.fullname,
        email: existUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: " Login Food Partner Failed" });
  }
};

export const foodPartnerLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "food partner logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout food partner Failed" });
  }
};
