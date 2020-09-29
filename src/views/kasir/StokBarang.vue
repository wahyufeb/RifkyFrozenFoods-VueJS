<template>
  <div class="main-content">
    <div class="main-content__title">
      Stok Barang
    </div>
    <div class="main-content__content">
      <div class="detail-store">
        Barang yang ada di {{ userData.store.name }} - {{ userData.store.location }} 
      </div>
      <el-row>
        <el-col :lg="5">
          <ProductCategorySidebar :isAdmin="false" :handleLoadingData="handleLoadingData" />
        </el-col>
        <el-col :lg="18" :offset="1" v-loading="loadingData">
          <ProductListDetailStock isLevel="cashier" :handleLoadingData="handleLoadingData"/>
        </el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetailStock from '@/components/template/product/ProductListDetailStock.vue';

export default {
  name: 'StokBarang',
  title:'Stok Barang - Cashier Page',
  components: {
    ProductCategorySidebar,
    ProductListDetailStock
  },
  data() {
    return {
      loadingData: true,
    }
  },
  computed: {
    ...mapGetters(['userData']),
  },
  methods: {       
    handleLoadingData(params) {
      return this.loadingData = params;
    },
  }
}
</script>

<style scoped>
.detail-store {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
