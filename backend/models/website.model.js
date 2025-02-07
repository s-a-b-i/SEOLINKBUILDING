import mongoose, { Schema, model } from "mongoose";
import Cart from './cart.model.js';
import Favourite from './favourite.model.js';
import Promo from './promo.model.js';
import Stats from './stats.model.js';

const websiteSchema = new Schema(
  {
    country : {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    nofollow: {
      type: Boolean,
      default: false,
    },
    followLinks : {
      type: Boolean,
      default: false,
    },
    sponsoredTags: {
      type: Boolean,
      default: false,
    },
    noSponsoredTags: {
      type: Boolean,
      default: false,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    webDomain: {
      type: String,
      trim: true,
    },
    mediaName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationGuidelines: {
      type: String,
      required: true,
    },
    publicationDuration: {
      type: String,
      required: true,
    },
    averagePublicationTime: {
      type: String,
      required: true,
    },
    socialMedia: {
      facebook: [String],
      instagram: [String],
      tiktok: [String],
      reddit: [String],
      telegram: [String],
    },
    sensitiveTopics: [
      {
        type: String,
      },
    ],
    googleNews: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    slots: {
      type: Number,
      default: 0,
    },
    pricePerPublication: {
      type: Number,
      default: 0,
    },
    highlightMonths: {
      type: Number,
      default: 0,
    },
    highlightMonthsEndDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "flagged", "rejected"],
      default: "pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


// Middleware to delete related documents when a website is deleted
websiteSchema.pre('findOneAndDelete', async function(next) {
  const websiteId = this.getQuery()._id;
  try {
    await Cart.deleteMany({ websiteId });
    await Favourite.deleteMany({ websiteId });
    await Promo.updateMany(
      { products: websiteId },
      { $pull: { products: websiteId } }
    );
    await Stats.deleteMany({ websiteId });
    next();
  } catch (error) {
    next(error);
  }
});

export default model("Website", websiteSchema);
