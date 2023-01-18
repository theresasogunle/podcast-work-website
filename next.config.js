const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");

/** @type {import('next/dist/server/config').NextConfig} */
const nextConfig = {
  // https://reactjs.org/docs/strict-mode.html
  reactStrictMode: true,

  // The pre-commit hook takes care of linting.
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    // https://react-svgr.com/
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  i18n,
};

module.exports = withBundleAnalyzer(nextConfig);
