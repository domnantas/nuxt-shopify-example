<template>
  <ul class="line-items">
    <li
      v-for="item in this.$store.state.checkout.lineItems" 
      :key="item.id"
      class="item">
      <div class="image">
        <img
        :src="item.variant.image.src"
        :alt="`${item.title} product shot`"
        v-if="item.variant.image">
      </div>
      <div class="content">
        <div class="row">
          <div class="variant-title">{{ item.variant.title }}</div>
          <span class="title">{{ item.title }}</span>
        </div>
        <div class="row">
          <div class="quantity-container">
            <button class="quantity-update" @click="changeQuantity(item.id, item.quantity - 1)">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="quantity-update" @click="changeQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <span class="price">${{ (item.quantity * item.variant.price).toFixed(2) }}</span>
          <button class="remove" @click="removeItem(item.id)">×</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    changeQuantity: function(lineItemId, quantity) {
      const checkoutId = this.$store.state.checkout.id;
      const lineItemsToUpdate = [
        { id: lineItemId, quantity: parseInt(quantity, 10) }
      ];

      this.$shopifyClient.checkout
        .updateLineItems(checkoutId, lineItemsToUpdate)
        .then(res => {
          this.$store.commit("updateCheckout", res);
        });
    },
    removeItem: function(lineItemId) {
      const checkoutId = this.$store.state.checkout.id;

      this.$shopifyClient.checkout
        .removeLineItems(checkoutId, [lineItemId])
        .then(res => {
          this.$store.commit("updateCheckout", res);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.line-items {
  flex: 1 0 auto;
  margin: 0;
  padding: 20px;
}

.item {
  margin-bottom: 20px;
  overflow: hidden;
  backface-visibility: visible;
  min-height: 65px;
  position: relative;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.image {
  width: 65px;
  height: 65px;
  border-radius: 3px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #e5e5e5;
  position: absolute;
}

.content {
  width: 100%;
  padding-left: 75px;
}

.row {
  display: inline-block;
  width: 100%;
  margin-bottom: 5px;
  position: relative;
}

.variant-title {
  float: right;
  font-weight: bold;
  font-size: 11px;
  line-height: 17px;
  color: #767676;
}

.title {
  color: #4e5665;
  font-size: 15px;
  font-weight: 400;
}

.price {
  line-height: 23px;
  float: right;
  font-weight: bold;
  font-size: 15px;
  margin-right: 40px;
}

.quantity-container {
  border: 1px solid #767676;
  float: left;
  border-radius: 3px;
}

.quantity-update {
  color: #767676;
  display: block;
  float: left;
  height: 21px;
  line-height: 16px;
  font-family: monospace;
  width: 25px;
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
}

.quantity {
  color: black;
  width: 38px;
  height: 21px;
  line-height: 23px;
  font-size: 15px;
  border: none;
  text-align: center;
  -moz-appearance: textfield;
  background: transparent;
  border-left: 1px solid #767676;
  border-right: 1px solid #767676;
  display: block;
  float: left;
  padding: 0;
  border-radius: 0;
}

.remove {
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  background: 0;
  font-size: 20px;
  top: -4px;
  opacity: 0.5;
}

.remove:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
