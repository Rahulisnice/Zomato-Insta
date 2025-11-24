import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDb();

app.use(
  cors({
    origin: "https://zomato-insta.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.get("/api/check-auth", (req, res) => {
  if (!req.cookies.token) return res.json({ loggedIn: false });
  return res.json({ loggedIn: true });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
