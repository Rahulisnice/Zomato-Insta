import foodPartner from "../model/foodPartner.js";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authorizeFoodPartner = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Please Login First" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartnerData = await foodPartner.findById(decoded.id);
    req.foodPartner = foodPartnerData;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorizeUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Please Login First" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const authData = await User.findById(decoded.id);
    req.user = authData;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const dualAuthorize = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Please Login First" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET); // normal user token
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
      req.user.role = "normal";
      return next();
    }
  } catch (err) {}

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET); // partner token
    const partner = await foodPartner.findById(decoded.id);

    if (partner) {
      req.user = partner; // <── unify here
      req.user.role = "partner"; // <── set role safely
      return next();
    }
  } catch (err) {}

  return res.status(401).json({ message: "Invalid Token" });
};
