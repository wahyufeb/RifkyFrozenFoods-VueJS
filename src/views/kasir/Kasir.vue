<template>
  <div class="main-content">
    <el-row>
      <el-col :lg="16">
        <div class="main-content__title">
          Aplikasi Kasir
        </div>
        <div class="main-content__content">
          <Search title="Cari Barang" />
          <ProductCategory />
          <ProductList/>
        </div>
      </el-col>
      <el-col :lg="7" :offset="1">
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
  name: "Kasir",
  components: {
    Search,
    ProductCategory,
    ProductList,
    Cart,
  },
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
</style>