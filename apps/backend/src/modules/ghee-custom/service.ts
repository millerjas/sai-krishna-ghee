import { MedusaService } from "@medusajs/framework/utils";
import { Wishlist } from "./models/wishlist";
import { WishlistItem } from "./models/wishlist-item";
import { ProductReview } from "./models/product-review";
import { ContactInquiry } from "./models/contact-inquiry";

class GheeCustomModuleService extends MedusaService({
  Wishlist,
  WishlistItem,
  ProductReview,
  ContactInquiry,
}) {}

export default GheeCustomModuleService;
