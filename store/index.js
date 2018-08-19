import Vuex from "vuex";

const createStore = () => {
  const store = new Vuex.Store({
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
        const shopCheckoutID = app.$cookies.get("shopCheckoutID");
        let checkout = {};
        if (shopCheckoutID) {
          checkout = await app.$shopifyClient.checkout.fetch(shopCheckoutID);
          if (checkout.completedAt) {
            checkout = await app.$shopifyClient.checkout.create();
          }
        } else {
          checkout = await app.$shopifyClient.checkout.create();
        }

        let shop = {
          checkout: await checkout,
          products: await app.$shopifyClient.product.fetchAll(),
          shop: await app.$shopifyClient.shop.fetchInfo()
        };

        await app.$cookies.set("shopCheckoutID", shop.checkout.id);

        commit("initShop", shop);
      }
    }
  });

  return store;
};

export default createStore;
