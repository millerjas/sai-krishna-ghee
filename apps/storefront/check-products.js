const Medusa = require("@medusajs/js-sdk").default || require("@medusajs/js-sdk");

const sdk = new Medusa({
  baseUrl: "http://localhost:9000",
  publishableKey: "pk_c15d8abe9622f2d4456d63974d784e7debb7830fb0736a616494ff8e5a5482d7",
});

async function main() {
  console.log("=== Testing Storefront SDK Query with Region ===");
  const { regions } = await sdk.store.region.list();
  console.log("Regions count:", regions.length);
  const regionId = regions[0].id;
  console.log("Using region_id:", regionId);

  const { products, count } = await sdk.store.product.list({
    region_id: regionId,
    limit: 100,
    fields: "*variants.calculated_price",
  });

  console.log("\nSuccess! Count:", count);
  console.log("Products returned:", products.length);
  products.forEach(p => {
    console.log(`- ${p.title} (ID: ${p.id}, Status: ${p.status}, Variants: ${p.variants?.length || 0})`);
  });
}

main();
