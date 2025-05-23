import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    attributes: Object,
    image:String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", description: "text" });

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
export default Listing;
