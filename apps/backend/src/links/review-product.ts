import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import GheeCustomModule from "../modules/ghee-custom";

export default defineLink(
  GheeCustomModule.linkable.productReview,
  ProductModule.linkable.product
);
