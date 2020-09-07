<template>
  <div class="product-category">
    <div v-for="item in kategoriProduk" :key="item.id">
      <el-button class="product-category__items">
        {{item.name}}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCategory',
  computed:{
    ...mapGetters(['kategoriProduk'])
  },
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
  width: 100px;
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