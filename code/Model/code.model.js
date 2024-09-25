import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  diffcuilt: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
  },
  companyname: {
    type: String,
  },
  rule: {
    type: String,
  },
  info: {
    type: String,
  },
});

export const Code = mongoose.models.Code || mongoose.model("Code", codeSchema);
