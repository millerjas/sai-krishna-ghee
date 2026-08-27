import { model } from "@medusajs/framework/utils";

export const ContactInquiry = model.define("contact_inquiry", {
  id: model.id({ prefix: "inq" }).primaryKey(),
  name: model.text(),
  email: model.text(),
  phone: model.text().nullable(),
  subject: model.text(),
  message: model.text(),
  status: model.enum(["pending", "read", "resolved"]).default("pending"),
});
