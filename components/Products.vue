<template>
  <div class="product-wrapper">
    <Product 
      v-for="product in $store.state.products" 
      :key="product.id" 
      :product="product"/>
  </div>
</template>

<script>
import Product from "~/components/Product.vue";

export default {
  components: {
    Product
  }
};
</script>

<style lang="scss" scoped>
.product-wrapper {
  max-width: 900px;
  margin: 40px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
