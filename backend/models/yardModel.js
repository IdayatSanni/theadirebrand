import mongoose from "mongoose";

const yardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Yard", yardSchema);
