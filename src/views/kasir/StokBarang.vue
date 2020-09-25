<template>
  <div class="main-content">
    <div class="main-content__title">
      Stok Barang
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4">
          <Jumbotron title="Total Produk" :data="totalProducts" :formatRupiah="false" :isAdmin="false"/>
        </el-col>
      </el-row>
      <div class="detail-store">
        Barang yang ada di Kios Mandiraja  
      </div>
      <el-row>
        <el-col :lg="5">
          <ProductCategorySidebar/>
        </el-col>
        <el-col :lg="18" :offset="1">
          <ProductListDetailStock isLevel="cashier" :handleLoadingData="handleLoadingData"/>
        </el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetailStock from '@/components/template/product/ProductListDetailStock.vue';

export default {
  name: 'StokBarang',
  components: {
    Jumbotron,
    ProductCategorySidebar,
    ProductListDetailStock
  },
  data() {
    return {
      loadingData: true,
    }
  },
  computed: {
    ...mapGetters(['totalProducts']),
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
