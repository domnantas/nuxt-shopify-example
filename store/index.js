import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    },
    mutations: {
      initShop(state, payload) {
        for (let item in payload) {
          state[item] = payload[item];
        }
      },
      updateCheckout(state, payload) {
        state.checkout = payload;
      },
      openCart(state) {
        state.cartOpen = true;
      },
      closeCart(state) {
        state.cartOpen = false;
      }
    },
    actions: {
      async nuxtServerInit({ commit }, { app }) {
        let shop = {
          checkout: await app.$shopifyClient.checkout.create(),
          products: await app.$shopifyClient.product.fetchAll(),
          shop: await app.$shopifyClient.shop.fetchInfo()
        };
        commit("initShop", shop);
      }
    }
  });
};

export default createStore;
