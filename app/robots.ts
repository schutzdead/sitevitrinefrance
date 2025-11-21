import type { MetadataRoute } from "next";
import { standardShowcaseRobots, developmentRobots } from "../utils/robots"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
const isProduction = process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return developmentRobots();
  }

  return standardShowcaseRobots(baseUrl);
}
