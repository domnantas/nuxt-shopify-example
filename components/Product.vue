<template>
  <div class="product">
    <img 
      :src="selectedVariant ? selectedVariant.image.src : product.images[0].src"
      :alt="`${product.title} product shot`"
      v-if="product.images">
    <h5 class="title">{{ product.title }}</h5>
    <span class="price" v-if="selectedVariant">${{ selectedVariant.price }}</span>
    <VariantSelector 
      v-for="option in product.options" 
      :key="option.id" 
      :option="option" 
      v-model="selectedOptions[option.name]" />
    <label class="option">
      Quantity
      <input class="quantity" min="1" type="number" v-model="quantity" />
    </label>
    <button class="buy button" @click="addToCart" v-if="selectedVariant">Add to cart</button>
    <button class="button" v-else disabled="disabled">Unavailable</button>
  </div>
</template>

<script>
import VariantSelector from "~/components/VariantSelector";

export default {
  components: {
    VariantSelector
  },
  props: {
    product: { type: Object, required: true }
  },
  data() {
    return {
      selectedOptions: this.product.options.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur.values[0].value }),
        {}
      ),
      quantity: 1
    };
  },
  computed: {
    selectedVariant: function() {
      return this.$shopifyClient.product.helpers.variantForOptions(
        this.product,
        this.selectedOptions
      );
    }
  },
  methods: {
    addToCart: function() {
      this.$store.commit("openCart");

      const checkoutId = this.$store.state.checkout.id;
      const lineItemsToAdd = [
        {
          variantId: this.selectedVariant.id,
          quantity: parseInt(this.quantity, 10)
        }
      ];

      this.$shopifyClient.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(res => {
          this.$store.commit("updateCheckout", res);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  flex: 0 1 31%;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 3%;
}

.title {
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  opacity: 0.7;
}

.price {
  display: block;
  font-size: 1.1rem;
  opacity: 0.5;
  margin-bottom: 0.4rem;
}

.option {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.quantity {
  display: block;
  width: 15%;
  margin-bottom: 10px;
}
</style>
