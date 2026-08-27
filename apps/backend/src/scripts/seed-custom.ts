import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function seedCustomData({ container }: ExecArgs) {
  const logger = container.resolve("logger");
  const remoteLink = container.resolve("remoteLink");
  const productModule = container.resolve(Modules.PRODUCT);
  const gheeCustomService: any = container.resolve("gheeCustomModuleService");

  logger.info("Seeding custom B2C data (Reviews & Inquiries)...");

  // 1. Fetch existing products to link reviews to
  const products = await productModule.listProducts({});
  if (products.length === 0) {
    logger.warn("No products found in database. Skipping product reviews seeding.");
  } else {
    const targetProduct = products[0];
    logger.info(`Seeding review for product: ${targetProduct.title}`);

    // Create a product review
    const review = await gheeCustomService.createProductReviews({
      customer_name: "Amit Patel",
      rating: 5,
      title: "Authentic taste and rich aroma!",
      content: "This ghee has the perfect danedar texture and smells amazing. Takes me back to my childhood. Highly recommended!",
      is_approved: true,
    });

    // Link review to product
    await remoteLink.create({
      gheeCustomModuleService: {
        product_review_id: review.id,
      },
      [Modules.PRODUCT]: {
        product_id: targetProduct.id,
      },
    });

    logger.info("Successfully seeded product review and created link.");
  }

  // 2. Seed contact inquiries
  const existingInquiries = await gheeCustomService.listContactInquiries({});
  if (existingInquiries.length === 0) {
    logger.info("Seeding contact inquiries...");
    await gheeCustomService.createContactInquiries([
      {
        name: "Suresh Sharma",
        email: "suresh@example.com",
        phone: "+919876543210",
        subject: "Bulk commercial query",
        message: "Hello, we are looking to buy 50L buckets of Pure Cow Ghee monthly for our sweet shop. Please send us your wholesale price list.",
        status: "pending",
      },
      {
        name: "Meera Nair",
        email: "meera@example.com",
        phone: "+919812345678",
        subject: "Delivery to Kerala",
        message: "Do you ship your A2 Vedic Bilona Ghee to Cochin? If yes, what are the shipping charges?",
        status: "pending",
      },
    ]);
    logger.info("Successfully seeded contact inquiries.");
  }

  logger.info("Finished seeding custom B2C data.");
}
