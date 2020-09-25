<template>
  <el-row class="product-list">
    <div v-if="loadingData" v-loading="loadingData"></div>
    <el-col v-else :xs="8" :sm="6" :md="6" :lg ="4" :xl="6" v-for="produk in produkKeranjangData" :key="produk.id_product">
      <Product :id_product="produk.id_product" :image="produk.image" :name="produk.name" :price="produk.price[0].price" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Product from '@/components/template/product/Product.vue';

export default {
  name: 'ProductList',
  props: {
    handleLoadingData: Function,
  },
  components: {
    Product,
  },
  data() {
    return {
      loadingData: true
    }
  },
  computed: {
    ...mapGetters(['produkKeranjang', 'userData']),
    produkKeranjangData() {
      return this.produkKeranjang({type:null, data:null});
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getProductStorageByStoreId']),
    handleLoading(params) {
      this.handleLoadingData(params)
    }
  },
  created() {
    let id_store = this.userData.id_store
    this.getProductStorageByStoreId(id_store)
    .then((response) => {
      if(response.code === 200 || response.code === 404){
        this.loadingData = false;
        this.handleLoading(false)
      }
    })
  }
};
</script>

<style scoped>
.product-list {
  overflow: auto;
}

@media only screen and (max-height: 630px) {
  .product-list {
    height: 280px;
  }
}

@media only screen and (min-height: 630px) {
  .product-list {
    height: 380px;
  }
}
</style>