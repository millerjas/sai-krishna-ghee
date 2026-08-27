import { model } from "@medusajs/framework/utils";
import { WishlistItem } from "./wishlist-item";

export const Wishlist = model.define("wishlist", {
  id: model.id({ prefix: "wish" }).primaryKey(),
  items: model.hasMany(() => WishlistItem),
});
