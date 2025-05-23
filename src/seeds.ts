import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./libs/connectDB";
import Category from "./models/Category";
import Listing from "./models/Listing";

dotenv.config();

async function seed() {
  await connectDB();

  await Category.deleteMany({});
  await Listing.deleteMany({});

  const runningShoesCategory = await Category.create({
    name: "Running Shoes",
    slug: "running-shoes",
    attributeSchema: [
      { key: "size", type: "select", options: ["7", "8", "9", "10"] },
      { key: "color", type: "select", options: ["red", "blue", "black"] },
    ],
  });

  await Listing.insertMany([
    {
      title: "Nike ZoomX",
      description: "Best shoes for runners, lightweight and fast.",
      category: runningShoesCategory._id,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 5000,
      attributes: { size: "9", color: "black" },
    },
    {
      title: "Adidas Ultraboost",
      description: "Comfortable shoes for long runs.",
      category: runningShoesCategory._id,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 5000,
      attributes: { size: "8", color: "blue" },
    },
    {
      title: "Puma Deviate",
      description: "Lightweight shoes for speed and performance.",
      category: runningShoesCategory._id,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 7990,
      attributes: { size: "9", color: "red" },
    },
  ]);

  const tvCategory = await Category.create({
    name: "Televisions",
    slug: "televisions",
    attributeSchema: [
      { key: "screenSize", type: "select", options: ["32\"", "43\"", "55\"", "65\""] },
      { key: "resolution", type: "select", options: ["HD", "Full HD", "4K", "8K"] },
    ],
  });

  await Listing.insertMany([
    {
      title: "Samsung Crystal 4K",
      description: "4K UHD Smart TV with vibrant picture quality.",
      category: tvCategory._id,
      image: "https://images.pexels.com/photos/1129415/pexels-photo-1129415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 35000,
      attributes: { screenSize: "55\"", resolution: "4K" },
    },
    {
      title: "Sony Bravia HD",
      description: "High definition television with amazing audio clarity.",
      category: tvCategory._id,
      image: "https://images.pexels.com/photos/1207875/pexels-photo-1207875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 28000,
      attributes: { screenSize: "43\"", resolution: "HD" },
    },
  ]);

  const fertilizerCategory = await Category.create({
    name: "Fertilizer",
    slug: "fertilizer",
    attributeSchema: [
      { key: "type", type: "select", options: ["Organic", "Chemical", "Biofertilizer"] },
      { key: "weight", type: "select", options: ["1kg", "5kg", "10kg"] },
    ],
  });

  await Listing.insertMany([
    {
      title: "Organic Neem Fertilizer",
      description: "Natural neem-based fertilizer for all plants.",
      category: fertilizerCategory._id,
      image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 350,
      attributes: { type: "Organic", weight: "5kg" },
    },
    {
      title: "NPK Chemical Fertilizer",
      description: "Balanced NPK fertilizer for fast plant growth.",
      category: fertilizerCategory._id,
      image: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 450,
      attributes: { type: "Chemical", weight: "10kg" },
    },
  ]);

  console.log("✅ Seeding complete!");
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.connection.close();
});
