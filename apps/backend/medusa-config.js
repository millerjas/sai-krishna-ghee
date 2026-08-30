const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

loadEnv(process.env.NODE_ENV, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    fileService: {
      provider: "local",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local-next",
            id: "local",
            options: {
              upload_dir: "static", // Katalog, w którym będą przechowywane pliki
              backend_url: "http://localhost:9000/static" // Adres, pod którym pliki będą dostępne
            },
          },
        ],
      },
    },
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: { rejectUnauthorized: false },
      },
    },
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    gheeCustomModuleService: {
      resolve: "./modules/ghee-custom",
    },
    [Modules.AUTH]: {
      resolve: "@medusajs/medusa/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
            options: {},
          },
          {
            resolve: "@medusajs/medusa/auth-google",
            id: "google",
            options: {
              clientId: process.env.MEDUSA_AUTH_GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
              clientSecret: process.env.MEDUSA_AUTH_GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
              callbackUrl: process.env.MEDUSA_AUTH_GOOGLE_CALLBACK_URL || "http://localhost:9000/auth/customer/google/callback",
            },
          },
        ],
      },
    },
    [Modules.CACHE]: {
      resolve: "@medusajs/medusa/cache-inmemory",
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: "@medusajs/medusa/workflow-engine-inmemory",
    },
  },
});
