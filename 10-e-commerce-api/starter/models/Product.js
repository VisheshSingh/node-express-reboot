const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a name for the product'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please add description for the product'],
      maxlength: [1000, 'Please keep the description under 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/sample-product.jpeg',
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },
    },
    colors: {
      type: [String],
      required: true,
      default: ['#222'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 10,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

ProductSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id });
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
