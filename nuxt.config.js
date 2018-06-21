module.exports = {
  head: {
    title: "nuxt-shopify",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#3B8070" },
  build: {
    analyze: false,
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    },
    vendor: ["isomorphic-fetch", "shopify-buy"]
  },
  plugins: [
    "~/plugins/shopify",
    { src: "~/plugins/localStorage.js", ssr: false }
  ],
  env: {
    shopifyAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
    shopifyDomain: "graphql.myshopify.com"
  }
};
