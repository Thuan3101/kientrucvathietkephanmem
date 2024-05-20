const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  attributes: [
    {
      key: String,
      value: String,
    },
  ],
  images: [String],
});

const inquirySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    maker: {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      firstName: String,
      lastName: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "inprogress", "done"],
      default: "inprogress",
    },
    isMoneyReturned: {
      type: Boolean,
      default: false,
    },
    product: productSchema,
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("inquiry", inquirySchema);
module.exports = Inquiry;
