const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

loadEnv(process.env.NODE_ENV, process.cwd());

module.exports = defineConfig({
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },
  projectConfig: {
    fileService: {
      provider: "local",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local-next",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/static`
            },
          },
        ],
      },
    },
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.DATABASE_URL?.includes("sslmode=disable") || process.env.DATABASE_URL?.includes("ssl=false")
      ? {}
      : {
          connection: {
            ssl: { rejectUnauthorized: false },
          },
        },
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,http://localhost:7001",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001,https://sai-krishna-ghee-production.up.railway.app",
      authCors: process.env.AUTH_CORS || "http://localhost:8000,http://localhost:7000,http://localhost:7001,https://sai-krishna-ghee-production.up.railway.app",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    gheeCustomModuleService: {
      resolve: "./src/modules/ghee-custom",
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
