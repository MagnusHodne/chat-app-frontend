import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: Object,
  created: { type: Date, default: Date.now, required: true, immutable: true },
  message: String,
});

export const Message = mongoose.model("Message", messageSchema);
