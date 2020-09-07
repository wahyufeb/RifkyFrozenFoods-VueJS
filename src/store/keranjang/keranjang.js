const state = {
  keranjang: [
    // { id: 13232, idProduct: 1, image: 'https://ecs7.tokopedia.net/img/cache/700/attachment/2020/2/9/158126126155786/158126126155786_056c0e0d-716d-4010-a23d-6a4804509199.png', name: 'Sosis', price: 18000, qty: 1, subtotal: 0 },
  ],
  uangPembeli: 500000,
};

const getters = {
  keranjangBelanja: state => {
    state.keranjang.map((item) => item.subtotal = item.qty * item.price)
    return state.keranjang.filter((item) => item.qty !== 0)
  },
  totalCart: state => {
    let total = state.keranjang.reduce((val, elemet) => {
      return val + elemet.subtotal
    }, 0);
    return total;
  },
};

const actions = {
  addQty({ commit }, id) {
    commit('setAddQty', id);
  },
  minQty({ commit }, id) {
    commit('setMinQty', id);
  },
  addProduct({ commit }, data) {
    commit('addProduct', data);
  }
};

const mutations = {
  setAddQty(state, idCart) {
    state.keranjang.find((item) => {
      if (item.idCart === idCart) {
        return item.qty += 1;
      }
    });
  },
  setMinQty(state, idCart) {
    state.keranjang.find((item) => {
      if (item.idCart === idCart) {
        if (item.qty == 1) {
          return state.keranjang.splice(state.keranjang.findIndex(item => item.idCart == idCart), 1);
        }
        return item.qty -= 1;
      }
    });
  },
  addProduct(state, data) {
    let a = state.keranjang.filter((item) => item.idProduct === data.idProduct);
    if (a.length === 0) {
      return state.keranjang.push(data);
    } else {
      let b = state.keranjang.find(item => item.idProduct == a.idProduct);
      console.log(b)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}