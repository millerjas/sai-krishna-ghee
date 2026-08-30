import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const gheeCustomService = req.scope.resolve("gheeCustom") as any;
    const { name, email, phone, subject, message } = req.body as any;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const inquiry = await gheeCustomService.createContactInquiries({
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: "pending",
    });

    return res.status(201).json({ inquiry, success: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Failed to submit inquiry" });
  }
};
