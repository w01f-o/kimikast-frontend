import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [{ hostname: "dl-20241107-5.anilib.moe" }],
  },
};

export default nextConfig;
