<template>
  <div class="product-category">
    <el-button class="product-category__items" @click="allProducts()">
      Semua Produk
    </el-button>
    <div v-for="item in kategoriProduk" :key="item.id">
      <el-button class="product-category__items" @click="filterProduct(item.id_product_category)">
        {{item.name}}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCategory',
  props: {
    handleLoadingData: Function,
  },
  computed:{
    ...mapGetters(['userData', 'kategoriProduk', 'produkKeranjang'])
  },
  methods: {
    ...mapActions(['productCategories', 'getProductStorageByStoreId']),
    allProducts() {
      this.handleLoading(true);
      let id_store = this.userData.id_store;
      this.$store.state.produk.produkTerfilter = []
      this.getProductStorageByStoreId(id_store)
      .then((response) => {
        if(response.code === 200 || response.code === 404){
          this.handleLoading(false);
        }
      })
    },
    filterProduct(id_product_category) {
      this.handleLoading(true);
      let filteredResult = this.produkKeranjang({type:'filter', data:id_product_category});
      if(filteredResult.length !== 0){
        setTimeout(() => {
          this.handleLoading(false);
        }, 500);
      }else{
        alert("Gagal, silahkan reload halaman")
      }
    },
    handleLoading(params) {
      this.handleLoadingData(params);
    }
  },
  created() {
    this.productCategories();
  }
}
</script>

<style scoped>
.product-category {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  margin: 5px 0;
  height: 100px;
}

.product-category__items {
  width: 150px;
  text-align: center;
  padding: 10px;
  margin-right: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: var(--secondary);
  color: var(--kasir-main-color);
}

.product-category__items:hover,
.active {
  background-color: var(--kasir-main-color);
  color: #fff;
  border: none;
}

/* Scollbar */
/* width */
::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: transparent;
}
</style>