const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
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

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  console.log('product id:', productId);
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  console.log(result);
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.pre('save', async function (next) {
  await this.constructor.calculateAverageRating(this.product);
  console.log('Pre save hook ran');
});

ReviewSchema.pre('remove', async function (next) {
  await this.constructor.calculateAverageRating(this.product);
  console.log('Pre remove hook ran');
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
