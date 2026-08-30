import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const gheeCustomService = req.scope.resolve("gheeCustom") as any;
    const { product_id } = req.query;

    const filters: Record<string, any> = { is_approved: true };
    if (product_id) {
      filters.product_id = product_id;
    }

    const reviews = await gheeCustomService.listProductReviews(filters);
    return res.json({ reviews });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to fetch reviews" });
  }
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const gheeCustomService = req.scope.resolve("gheeCustom") as any;
    const { customer_name, rating, title, content, product_id } = req.body as any;

    if (!customer_name || !rating || !title || !content) {
      return res.status(400).json({ message: "Missing required review fields" });
    }

    const review = await gheeCustomService.createProductReviews({
      customer_name,
      rating: Number(rating),
      title,
      content,
      is_approved: false, // Requires admin moderation
    });

    return res.status(201).json({ review, success: true, message: "Review submitted for moderation" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to submit review" });
  }
};
