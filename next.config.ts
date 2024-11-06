import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [{ hostname: "dl-20241106-9.anilib.one" }],
  },
};

export default nextConfig;
