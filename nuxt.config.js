module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "nuxt-shop-example",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ["isomorphic-fetch", "shopify-buy"]
  },
  plugins: ["~/plugins/shopify"],
  env: {
    shopifyAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
    shopifyDomain: "graphql.myshopify.com"
  }
};
