<template>
  <main>
    <h1>{{ shop.name }}</h1>
    <button @click="addVariantToCart">Add test product</button>
    <pre>{{ checkout.lineItems }}</pre>
  </main>
</template>

<script>
export default {
  data() {
    return {
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };
  },
  async asyncData({ app }) {
    return {
      checkout: await app.$shopifyClient.checkout.create(),
      products: await app.$shopifyClient.product.fetchAll(),
      shop: await app.$shopifyClient.shop.fetchInfo()
    };
  },
  methods: {
    addVariantToCart: function() {
      const lineItemsToAdd = [
        { variantId: this.products[0].variants[0].id, quantity: 5 }
      ];
      const checkoutId = this.checkout.id;

      return this.$shopifyClient.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(res => {
          this.checkout = res;
        });
    }
  }
};
</script>