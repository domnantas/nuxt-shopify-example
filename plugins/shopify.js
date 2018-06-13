import Client from "shopify-buy";
import "isomorphic-fetch";

const config = {
  domain: process.env.shopifyDomain,
  storefrontAccessToken: process.env.shopifyAccessToken
};

export default (context, inject) => {
  inject("shopifyClient", Client.buildClient(config));
};
