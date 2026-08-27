import { defineLink } from "@medusajs/framework/utils";
import OrderModule from "@medusajs/medusa/order";
import GheeCustomModule from "../modules/ghee-custom";

export default defineLink(
  GheeCustomModule.linkable.productReview,
  OrderModule.linkable.order
);
