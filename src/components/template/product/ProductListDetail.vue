<template>
  <div class="product-list-detail">
    <el-row>
      <el-col class="product-list-detail__item" v-for="produk in produkList" :key="produk.idProduct">
        <div class="product-list-detail__item__image">
          <img :src="produk.image" :alt="produk.name">
          <div class="product-list-detail__data">
            <div class="product-list-detail__name">
              {{ produk.name }}
            </div>
            <div class="product-list-detail__product">
              <div class="product-list-detail__category">
                Kategori : {{ produk.category }}
              </div>
              <div class="product-list-detail__stock">
                Stok : {{ toRp(produk.stock) }}
              </div>
            </div>
          </div>
        </div>
        <div class="product-list-detail__price">
          Rp{{ toRp(produk.price) }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'ProductListDetail',
  computed: {
    ...mapGetters(['produkList']),
    toRp(){
      return (val) =>  convertRp(val);
    }
  },
};
</script>

<style scoped>
.product-list-detail {
  overflow: auto;
  padding: 10px;
}

.product-list-detail__item {
  background-color: var(--secondary);
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10px;
}

.product-list-detail__item__image {
  display: flex;
  flex-direction: row;
}

.product-list-detail__item__image img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  object-fit: cover;
}

.product-list-detail__data {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
}

.product-list-detail__product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.product-list-detail__stock {
  margin-left: 20px;
}

.product-list-detail__price {
  align-self: flex-end;
}

@media only screen and (max-height: 630px) {
  .product-list-detail {
    height: 335px;
  }
}

@media only screen and (min-height: 630px) {
  .product-list-detail {
    height: 435px;
  }
}
</style>