import {
  createCollectionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/core-flows";
import {
  ExecArgs,
  ISalesChannelModuleService,
  IStoreModuleService,
} from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  ProductStatus,
} from "@medusajs/framework/utils";
import { Logger } from "@medusajs/medusa";

export default async function seedGheeProducts({ container }: ExecArgs) {
  const logger: Logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService: ISalesChannelModuleService =
    container.resolve(ModuleRegistrationName.SALES_CHANNEL);
  const storeModuleService: IStoreModuleService = container.resolve(
    ModuleRegistrationName.STORE
  );
  const regionModuleService: any = container.resolve(
    ModuleRegistrationName.REGION
  );
  const productModuleService: any = container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  logger.info("Seeding 5 Ghee products safely with INR prices...");

  const [store] = await storeModuleService.listStores();
  let salesChannels = await salesChannelModuleService.listSalesChannels();
  let defaultSalesChannel = salesChannels.find((sc: any) => sc.name === "Default Sales Channel") || salesChannels[0];

  if (!defaultSalesChannel) {
    logger.error("No Sales Channel found! Make sure backend is initialized.");
    return;
  }

  // Update store currencies to include INR & USD
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          { currency_code: "inr", is_default: true },
          { currency_code: "usd" },
          { currency_code: "eur" },
        ],
      },
    },
  });

  // Ensure Region exists
  let existingRegions = await regionModuleService.listRegions();
  let region = existingRegions[0];

  if (!region) {
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "India & Global",
            currency_code: "inr",
            countries: ["in", "us", "gb"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = result[0];
  }

  const productsToCreate = [
    {
      title: "Ghee Bottle",
      handle: "ghee-bottle",
      description:
        "Traditional Bilona Pure Cow Ghee in an airtight glass bottle preserving authentic granular texture and rich aroma.",
      status: ProductStatus.PUBLISHED,
      options: [
        {
          title: "Bottle Size",
          values: ["100g", "250g", "500g", "1kg"],
        },
      ],
      variants: [
        {
          title: "100g",
          sku: "SK-BOTTLE-100G",
          options: { "Bottle Size": "100g" },
          prices: [
            { amount: 120, currency_code: "inr" },
            { amount: 2, currency_code: "usd" },
          ],
        },
        {
          title: "250g",
          sku: "SK-BOTTLE-250G",
          options: { "Bottle Size": "250g" },
          prices: [
            { amount: 280, currency_code: "inr" },
            { amount: 4, currency_code: "usd" },
          ],
        },
        {
          title: "500g",
          sku: "SK-BOTTLE-500G",
          options: { "Bottle Size": "500g" },
          prices: [
            { amount: 520, currency_code: "inr" },
            { amount: 7, currency_code: "usd" },
          ],
        },
        {
          title: "1kg",
          sku: "SK-BOTTLE-1KG",
          options: { "Bottle Size": "1kg" },
          prices: [
            { amount: 980, currency_code: "inr" },
            { amount: 12, currency_code: "usd" },
          ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    },
    {
      title: "Ghee Pouch",
      handle: "ghee-pouch",
      description:
        "Spill-proof stand-up pouch of pure cow ghee. Easy to store, pour, and travel with.",
      status: ProductStatus.PUBLISHED,
      options: [
        {
          title: "Pouch Size",
          values: ["100g", "250g", "500g", "1kg"],
        },
      ],
      variants: [
        {
          title: "100g",
          sku: "SK-POUCH-100G",
          options: { "Pouch Size": "100g" },
          prices: [
            { amount: 120, currency_code: "inr" },
            { amount: 2, currency_code: "usd" },
          ],
        },
        {
          title: "250g",
          sku: "SK-POUCH-250G",
          options: { "Pouch Size": "250g" },
          prices: [
            { amount: 280, currency_code: "inr" },
            { amount: 4, currency_code: "usd" },
          ],
        },
        {
          title: "500g",
          sku: "SK-POUCH-500G",
          options: { "Pouch Size": "500g" },
          prices: [
            { amount: 520, currency_code: "inr" },
            { amount: 7, currency_code: "usd" },
          ],
        },
        {
          title: "1kg",
          sku: "SK-POUCH-1KG",
          options: { "Pouch Size": "1kg" },
          prices: [
            { amount: 980, currency_code: "inr" },
            { amount: 12, currency_code: "usd" },
          ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    },
    {
      title: "Ghee Bowl",
      handle: "ghee-bowl",
      description:
        "Wide-mouth container bowl designed for effortless daily cooking, sweets preparation, and sacred rituals.",
      status: ProductStatus.PUBLISHED,
      options: [
        {
          title: "Bowl Size",
          values: ["100g", "250g", "500g", "1kg"],
        },
      ],
      variants: [
        {
          title: "100g",
          sku: "SK-BOWL-100G",
          options: { "Bowl Size": "100g" },
          prices: [
            { amount: 120, currency_code: "inr" },
            { amount: 2, currency_code: "usd" },
          ],
        },
        {
          title: "250g",
          sku: "SK-BOWL-250G",
          options: { "Bowl Size": "250g" },
          prices: [
            { amount: 280, currency_code: "inr" },
            { amount: 4, currency_code: "usd" },
          ],
        },
        {
          title: "500g",
          sku: "SK-BOWL-500G",
          options: { "Bowl Size": "500g" },
          prices: [
            { amount: 520, currency_code: "inr" },
            { amount: 7, currency_code: "usd" },
          ],
        },
        {
          title: "1kg",
          sku: "SK-BOWL-1KG",
          options: { "Bowl Size": "1kg" },
          prices: [
            { amount: 980, currency_code: "inr" },
            { amount: 12, currency_code: "usd" },
          ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    },
    {
      title: "A2 Ghee",
      handle: "a2-ghee",
      description:
        "Premium A2 Gir Cow Bilona Ghee made traditionally using Vedic wooden churners. Exceptionally rich in A2 beta-casein and aroma.",
      status: ProductStatus.PUBLISHED,
      options: [
        {
          title: "A2 Size",
          values: ["100g", "250g", "500g", "1kg"],
        },
      ],
      variants: [
        {
          title: "100g",
          sku: "SK-A2-100G",
          options: { "A2 Size": "100g" },
          prices: [
            { amount: 160, currency_code: "inr" },
            { amount: 3, currency_code: "usd" },
          ],
        },
        {
          title: "250g",
          sku: "SK-A2-250G",
          options: { "A2 Size": "250g" },
          prices: [
            { amount: 380, currency_code: "inr" },
            { amount: 5, currency_code: "usd" },
          ],
        },
        {
          title: "500g",
          sku: "SK-A2-500G",
          options: { "A2 Size": "500g" },
          prices: [
            { amount: 720, currency_code: "inr" },
            { amount: 9, currency_code: "usd" },
          ],
        },
        {
          title: "1kg",
          sku: "SK-A2-1KG",
          options: { "A2 Size": "1kg" },
          prices: [
            { amount: 1350, currency_code: "inr" },
            { amount: 17, currency_code: "usd" },
          ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    },
    {
      title: "A1 Ghee",
      handle: "a1-ghee",
      description:
        "Pure dairy cow ghee refined to perfection for everyday high-heat cooking, frying, and delicious authentic Indian dishes.",
      status: ProductStatus.PUBLISHED,
      options: [
        {
          title: "A1 Size",
          values: ["100g", "250g", "500g", "1kg"],
        },
      ],
      variants: [
        {
          title: "100g",
          sku: "SK-A1-100G",
          options: { "A1 Size": "100g" },
          prices: [
            { amount: 120, currency_code: "inr" },
            { amount: 2, currency_code: "usd" },
          ],
        },
        {
          title: "250g",
          sku: "SK-A1-250G",
          options: { "A1 Size": "250g" },
          prices: [
            { amount: 280, currency_code: "inr" },
            { amount: 4, currency_code: "usd" },
          ],
        },
        {
          title: "500g",
          sku: "SK-A1-500G",
          options: { "A1 Size": "500g" },
          prices: [
            { amount: 520, currency_code: "inr" },
            { amount: 7, currency_code: "usd" },
          ],
        },
        {
          title: "1kg",
          sku: "SK-A1-1KG",
          options: { "A1 Size": "1kg" },
          prices: [
            { amount: 980, currency_code: "inr" },
            { amount: 12, currency_code: "usd" },
          ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    },
  ];

  for (const prodData of productsToCreate) {
    const existing = await productModuleService.listProducts({ handle: prodData.handle });
    if (existing && existing.length > 0) {
      logger.info(`Product ${prodData.title} already exists (${prodData.handle}), updating status to published...`);
      await productModuleService.updateProducts(existing[0].id, {
        status: ProductStatus.PUBLISHED,
      });
    } else {
      logger.info(`Creating product: ${prodData.title}...`);
      try {
        await createProductsWorkflow(container).run({
          input: {
            products: [prodData],
          },
        });
      } catch (err: any) {
        logger.error(`Error creating product ${prodData.title}: ${err.message}`);
      }
    }
  }

  logger.info("Product seeding completed!");
}
