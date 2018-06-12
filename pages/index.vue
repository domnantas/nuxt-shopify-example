<template>
  <main>
    <h1>{{ shop.name }}</h1>
    <Products :client="client" :products="products" :addVariantToCart="addVariantToCart" />
    <button @click="addVariantToCart">Add test product</button>
  </main>
</template>

<script>
import "isomorphic-fetch";
import shopifyClient from "shopify-buy";
import Products from "~/components/Products.vue";

export default {
  components: {
    Products
  },
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

      console.log(this.client);
      console.log(this.client.checkout);
      console.log(this.client.checkout.addLineItems());

      return this.client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(res => {
          this.checkout = res;
        });
    }
  }
};
</script>