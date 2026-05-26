import type { BrandConfig, AcademyBrand } from "./types";
import turbo from "./turbo";
import duo from "./duo";

const BRAND = (process.env.NEXT_PUBLIC_ACADEMY_BRAND || "turbo") as AcademyBrand;

const brands: Record<AcademyBrand, BrandConfig> = { turbo, duo };

export function getBrand(): BrandConfig {
  return brands[BRAND] || brands.turbo;
}

export function getBrandKey(): AcademyBrand {
  return BRAND;
}

// Re-export for convenience
export type { BrandConfig };
