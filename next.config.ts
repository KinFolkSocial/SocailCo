import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    // Only serves the locally generated gradient placeholders in
    // /public/placeholders — never a user- or CMS-supplied SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
