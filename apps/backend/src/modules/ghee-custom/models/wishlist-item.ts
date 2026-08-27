import { model } from "@medusajs/framework/utils";
import { Wishlist } from "./wishlist";

export const WishlistItem = model.define("wishlist_item", {
  id: model.id({ prefix: "witem" }).primaryKey(),
  wishlist: model.belongsTo(() => Wishlist, {
    mappedBy: "items",
  }),
});
