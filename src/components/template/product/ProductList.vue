<template>
  <el-row class="product-list">
    <el-col :xs="8" :sm="6" :md="6" :lg ="4" :xl="6" v-for="produk in produkList" :key="produk.id">
      <Product :idProduct="produk.idProduct" :image="produk.image" :name="produk.name" :price="produk.price" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
import Product from '@/components/template/product/Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  computed: {
    ...mapGetters(['produkList']),
  },
}
</script>

<style scoped>
.product-list {
  overflow: scroll;
}

@media only screen and (max-height: 630px) {
  .product-list {
    height: 320px;
  }
}

@media only screen and (min-height: 630px) {
  .product-list {
    height: 420px;
  }
}
</style>