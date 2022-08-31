import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  sub: String,
  picture: String,
  bio: String,
});

export const User = mongoose.model("User", userSchema);
