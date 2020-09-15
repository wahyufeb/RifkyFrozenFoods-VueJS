<template>
  <div class="product-category">
    <Search title="Cari Barang"/>
    <div class="product-category-data">
      <div v-for="item in kategoriProduk" :key="item.id">
        <el-button class="product-category__items">
          {{item.name}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from '@/components/template/search/Search.vue';

export default {
  name: 'ProductCategorySidebar',
  components: {
    Search,
  },
  computed: {
    ...mapGetters(['kategoriProduk'])
  },
};
</script>

<style scoped>
.product-category {
  background-color: var(--gray-color);
  padding: 10px;
  border-radius: 10px;
}

.product-category-data {
  overflow: scroll;
}

.product-category__items {
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-bottom: 15px;
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

@media only screen and (max-height: 630px) {
  .product-category-data {
    height: 270px;
  }
}

@media only screen and (min-height: 630px) {
  .product-category-data {
    height: 370px;
  }
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