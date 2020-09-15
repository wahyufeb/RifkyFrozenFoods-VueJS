<template>
  <div class="main-content">
    <div class="main-content__title">
      Stok Barang
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4">
          <Jumbotron title="Total Produk" data="500" />
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
          <ProductListDetail/>
        </el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetail from '@/components/template/product/ProductListDetail.vue';

export default {
  name: 'StokBarang',
  components: {
    Jumbotron,
    ProductCategorySidebar,
    ProductListDetail
  },
}
</script>

<style scoped>
.detail-store {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
