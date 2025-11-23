import mongoose from "mongoose";

const SaveSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  },
  { timestamps: true }
);

const Save = mongoose.model("Save", SaveSchema);
export default Save;
