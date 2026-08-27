import { model } from "@medusajs/framework/utils";

export const ProductReview = model.define("product_review", {
  id: model.id({ prefix: "prev" }).primaryKey(),
  customer_name: model.text(),
  rating: model.bigNumber(),
  title: model.text(),
  content: model.text(),
  is_approved: model.boolean().default(false),
});
