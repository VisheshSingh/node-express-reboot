const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Please leave a comment'],
      maxlength: [500, 'Please do not exceed 500 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);
// A user can leave only one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
