const state = {
  produk: [
    { idProduct: 1, image: 'https://ecs7.tokopedia.net/img/cache/700/attachment/2020/2/9/158126126155786/158126126155786_056c0e0d-716d-4010-a23d-6a4804509199.png', name: 'Sosis Okay 500g', price: 18000, category: 'sosis', stock: 120 },
    { idProduct: 2, image: 'https://cf.shopee.co.id/file/f6703b9648d78fdfe5f0dc4b1210994e', name: 'Nugget Okay 500g', price: 18000, category: 'nugget', stock: 20 },
    { idProduct: 3, image: 'https://cf.shopee.co.id/file/d3186b3268464f9dfeba2ce1c278f348', name: 'Bakso Ikan ILM', price: 10000, category: 'bakso', stock: 10 },
    { idProduct: 4, image: 'https://img-global.cpcdn.com/recipes/ae70e8de875e933f/1200x630cq70/photo.jpg', name: 'Otak Otak', price: 3500, category: 'gorengan', stock: 10 },
    { idProduct: 5, image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/12/26/1397674/1397674_cfa4dedf-07db-452d-91a3-0f6f1dd98e0a.jpg', name: 'Isi Burger', price: 10000, category: 'burger', stock: 60 },
    { idProduct: 6, image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/14/82691765/82691765_8d7c44cf-0fe3-4992-abec-2a61d676588f_640_640', name: 'Roti Burger', price: 30000, category: 'burger', stock: 90 },
    { idProduct: 7, image: 'https://cf.shopee.co.id/file/78b9f0a4144fa17b19f9ec8925596c83', name: 'Kecap Bangau', price: 3000, category: 'kecap', stock: 300 },
    { idProduct: 8, image: 'https://s4.bukalapak.com/img/4705004903/large/IMG_20180821_174009_460_scaled.jpg', name: 'Saus Nikisari', price: 3500, category: 'saus', stock: 300 },
    { idProduct: 9, image: 'https://cf.shopee.co.id/file/a4f801b7ec3233a3e3ae42039b74432c', name: 'Mayonaise', price: 8000, category: 'mayonaise', stock: 400 },
    { idProduct: 10, image: 'https://cf.shopee.co.id/file/d5db5c42424601e9b42bc36b5cf808ca', name: 'Marimas', price: 30000, category: 'marimas', stock: 80 },
  ],
  loadingProduk: false,
};

const getters = {
  produkList: state => state.produk,
  kodeProduk: state => {
    let filteredProduk = []
    state.produk.filter((data) => {
      filteredProduk.push({ idProduct: data.idProduct, value: data.name });
    });
    return filteredProduk;
  }
};

const actions = {
  findCategory({ commit }, category) {
    commit('setCategory', category)
  },
  findProduct({ commit }, keyword) {
    commit('setProduct', keyword);
  },
  activateLoading({ commit }) {
    commit('setActivateLoading');
  }
};

const mutations = {
  setCategory(state, category) {
    return state.produk.filter((data) => data.category === category);
  },
  setProduct(getters, keyword) {
    // console.log(state)
    console.log(keyword)
    console.log(this.$store)

    // CALL API PENCARIAN

    // getters.produkList = state.produk.filter((data) => data.idProduct == keyword);
    // return state.loadingProduk = !state.loadingProduk;
    // state.produk = state.produk.find((data) => data.idProduct === keyword);
  },
  setActivateLoading(state) {
    return state.loadingProduk = !state.loadingProduk;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}