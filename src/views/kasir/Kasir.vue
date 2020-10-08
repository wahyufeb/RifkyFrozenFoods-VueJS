<template>
  <div class="main-content">
    <el-row>
      <el-col :lg="16" :sm="14">
        <div class="main-content__title">
          Aplikasi Kasir
        </div>
        <div class="main-content__content" v-loading="loadingData">
          <Search title="Cari Barang" :isAdmin="false"/>
          <ProductCategory :handleLoadingData="handleLoadingData" />
          <ProductList :handleLoadingData="handleLoadingData"/>
        </div>
      </el-col>
      <el-col :lg="7" :sm="9" :offset="1">
        <div class="main-content__title">
          Keranjang Belanja
        </div>
        <div class="main-content__cart">
          <Cart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Search from '@/components/template/search/Search.vue';
import ProductCategory from '@/components/template/product-category/ProductCategory.vue';
import ProductList from '@/components/template/product/ProductList.vue';
import Cart from '@/components/template/cart/Cart.vue';

export default {
  name: 'Kasir',
  title:'Kasir Application - Cashier Page',
  components: {
    Search,
    ProductCategory,
    ProductList,
    Cart,
  },
  data() {
    return {
      loadingData: true,
    }
  },
  methods: {
    handleLoadingData(params) {
      this.loadingData = params;
    }
  }
};
</script>

<style scoped>
.main-content__cart {
  height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 5px 5px 20px rgba(210, 210, 210, 0.2);
}

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .main-content__content {
    height: 100vh;
  }

  .main-content__cart {
    height: 100vh;
  }
}
</style>