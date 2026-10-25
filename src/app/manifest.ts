import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Maduka",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6f0",
    theme_color: "#0d4c5c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
