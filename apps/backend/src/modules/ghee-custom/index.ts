import GheeCustomModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const GHEE_CUSTOM_MODULE = "gheeCustomModuleService";

export default Module(GHEE_CUSTOM_MODULE, {
  service: GheeCustomModuleService,
});
