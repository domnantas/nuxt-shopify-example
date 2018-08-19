<template>
  <aside class="cart" :class="{open: $store.state.cartOpen}">
    <header>
      <h2>Your cart</h2>
      <button class="close" @click="$store.commit('closeCart')">×</button>
    </header>
    <LineItems />
    <footer>
      <div class="info">
        <div class="info__total info--small">Subtotal</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.subtotalPrice }}</span>
        </div>
      </div>
      <div class="info">
        <div class="info__total info--small">Taxes</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.totalTax }}</span>
        </div>
      </div>
      <div class="info">
        <div class="info__total info--small">Total</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.totalPrice }}</span>
        </div>
      </div>
      <a :href="$store.state.checkout.webUrl" class="checkout button">Checkout</a>
    </footer>
  </aside>
</template>

<script>
import LineItems from "~/components/LineItems";

export default {
  components: {
    LineItems
  }
};
</script>

<style lang="scss" scoped>
.cart {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 350px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e5e5e5;
  transform: translateX(100%);
  transition: transform 0.15s ease-in-out;

  &.open {
    transform: translateX(0);
  }
}

.close {
  position: absolute;
  right: 9px;
  top: 8px;
  font-size: 35px;
  color: #999;
  border: none;
  background: transparent;
  transition: transform 100ms ease;
  cursor: pointer;
}

header {
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  flex: 0 0 auto;
  display: inline-block;
}

footer {
  padding: 20px;
  border-top: 1px solid #e5e5e5;
  flex: 0 0 auto;
}

.info {
  padding: 15px 20px 10px;

  &__total {
    float: left;
    text-transform: uppercase;
  }

  &__pricing {
    float: right;
  }

  &--small {
    font-size: 11px;
  }
}

.pricing {
  margin-left: 5px;
  font-size: 16px;
  color: black;
}

.checkout {
  margin-top: 20px;
  display: block;
  width: 100%;
}
</style>
