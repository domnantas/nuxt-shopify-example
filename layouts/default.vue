<template>
  <div>
    <header class="shop-header">
      <div 
        v-if="!$store.state.cartOpen" 
        class="view-cart-wrapper">
        <button class="view-cart" @click="$store.commit('openCart')">Cart</button>
      </div>
      <div class="shop-title">
        <h1>{{ $store.state.shop.name }}: Nuxt example</h1>
        <h2>{{ $store.state.shop.description }}</h2>
      </div>
    </header>
    <nuxt/>
    <Cart />
  </div>
</template>

<script>
import Cart from "~/components/Cart.vue";
export default {
  components: {
    Cart
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700");

*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  font-size: 65%;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

h1 {
  font-weight: 300;
  margin: 0 0 15px;
  font-size: 3rem;
}

h2 {
  font-weight: 300;
  margin: 0;
  font-size: 2rem;
}

.shop-header {
  background-color: #222;
  background-image: url("https://unsplash.it/1000/300?image=823");
  background-size: cover;
  color: white;
  padding: 10px 10px;
}

.shop-title {
  padding: 80px 20px;
  text-align: center;
}

.view-cart-wrapper {
  float: right;
}

.view-cart {
  font-size: 15px;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
}

.button {
  background-color: #2752ff;
  color: white;
  border: none;
  font-size: 1.2rem;
  padding: 10px 17px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: #222222;
  }

  &:disabled {
    background: #bfbfbf;
    cursor: not-allowed;
  }
}
</style>
