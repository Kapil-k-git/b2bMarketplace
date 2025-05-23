import { connectDB } from "@/libs/connectDB";
import Category from "@/models/Category";
import Listing from "@/models/Listing";
import { Types, ObjectId } from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const filters = searchParams.get("filters");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    console.log({ q, category, filters, page, limit });

    const query: any[] = [];

    if (q) {
      query.push({ $text: { $search: q } });
    }

    if (category) {
      const cat = await Category.findOne({
        _id: new Types.ObjectId(category),
      });

      if (!cat)
        return Response.json({ error: "Invalid category" }, { status: 400 });

      query.push({ category: cat._id });
    }


    let parsedFilters = {};
    if (filters) {
      try {
        parsedFilters = JSON.parse(filters);
      } catch (err) {
        console.error("Invalid filters JSON:", err);
        return Response.json(
          { error: "Invalid filters format" },
          { status: 400 }
        );
      }
    }

    Object.entries(parsedFilters).forEach(([key, value]) => {
      query.push({ [`attributes.${key}`]: value });
    });

    const finalQuery = query.length > 0 ? { $and: query } : {};

    const listings = await Listing.find(finalQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const facets = await Listing.aggregate([
      { $match: finalQuery },
      {
        $group: {
          _id: "$attributes.size",
          count: { $sum: 1 },
        },
      },
    ]);

    return Response.json({ listings, facets }, { status: 200 });
  } catch (error) {
    console.error("GET /api/search failed:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
