<template>
  <main>
    <h1>{{ shop.name }}</h1>
    <button @click="addVariantToCart">Add test product</button>
  </main>
</template>

<script>
import "isomorphic-fetch";
import shopifyClient from "shopify-buy";

export default {
  data() {
    return {
      client: {},
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };
  },
  async asyncData({ env }) {
    const client = shopifyClient.buildClient({
      storefrontAccessToken: env.shopifyAccessToken,
      domain: env.shopifyDomain
    });

    return {
      client: client,
      checkout: await client.checkout.create(),
      products: await client.product.fetchAll(),
      shop: await client.shop.fetchInfo()
    };
  },
  methods: {
    addVariantToCart: function() {
      const lineItemsToAdd = [
        { variantId: this.products[0].variants[0].id, quantity: 5 }
      ];
      const checkoutId = this.checkout.id;

      console.log("this.client:");
      console.log(this.client);
      console.log("this.client.checkout:");
      console.log(this.client.checkout);
      console.log(
        "this.client.checkout.addLineItems(checkoutId, lineItemsToAdd):"
      );
      console.log(
        this.client.checkout.addLineItems(checkoutId, lineItemsToAdd)
      );

      return this.client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(res => {
          this.checkout = res;
        });
    }
  }
};
</script>