import { ContainerRegistrationKeys, ModuleRegistrationName } from "@medusajs/framework/utils";
import { ExecArgs } from "@medusajs/framework/types";

export default async function getApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService: any = container.resolve(ModuleRegistrationName.API_KEY);
  const salesChannelModuleService: any = container.resolve(ModuleRegistrationName.SALES_CHANNEL);

  const keys = await apiKeyModuleService.listApiKeys({ type: "publishable" });
  logger.info(`Found ${keys.length} publishable API keys:`);
  for (const k of keys) {
    logger.info(`KEY TITLE: ${k.title} | TOKEN: ${k.token} | ID: ${k.id}`);
  }

  const salesChannels = await salesChannelModuleService.listSalesChannels();
  for (const sc of salesChannels) {
    logger.info(`SALES CHANNEL ID: ${sc.id} | NAME: ${sc.name}`);
  }
}
