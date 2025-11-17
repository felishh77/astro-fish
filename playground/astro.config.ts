import { defineConfig } from "astro/config";

import fish from "./fish.theme.ts";
import pageInsight from "astro-page-insight";
import vercel from "@astrojs/vercel";
import vercelfix from "./src/integrations/vercel-fix.ts";

export default defineConfig({
  prefetch: true,
  site: "https://astro-fish.vercel.app/",

  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  integrations: [
    fish,
    // pageInsight(),
    vercelfix(),
  ],
});
