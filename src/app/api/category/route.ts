import { connectDB } from "@/libs/connectDB";
import Category from "@/models/Category";

export async function GET(req: Request) {
  await connectDB();

  try {
    const result = await Category.find();
    return new Response(JSON.stringify({ msg: "ok", category: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/categories failed:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
