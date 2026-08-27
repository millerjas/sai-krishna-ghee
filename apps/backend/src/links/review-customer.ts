import { defineLink } from "@medusajs/framework/utils";
import CustomerModule from "@medusajs/medusa/customer";
import GheeCustomModule from "../modules/ghee-custom";

export default defineLink(
  GheeCustomModule.linkable.productReview,
  CustomerModule.linkable.customer
);
