<template>
  <div class="product-list-detail">
    <el-row v-loading="loadingData">
      <el-col class="product-list-detail__item" v-for="(produk, i) in produkKeranjangData" :key="i+1">
        <div class="product-list-detail__item__image">
          <img :src="imageData(produk.image)" :alt="produk.id_product">
          <div class="product-list-detail__data">
            <div class="product-list-detail__name">
              {{ produk.name }}
            </div>
            <div class="product-list-detail__product">
              <div class="product-list-detail__category">
                Kategori : {{ produk.category.name }}
              </div>
              <div class="product-list-detail__stock">
                <!-- Stok : {{ toRp(produk.stock) }} -->
              </div>
            </div>
          </div>
        </div>
        <div v-if="isLevel === 'warehouse' " class="product-list-detail__price">
          Rp {{ toRp(produk.price[1].price) }}
        </div>
        <div v-if="isLevel === 'cashier' " class="produk-list-detail__price">
          Rp {{ toRp(produk.price[0].price) }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'ProductListDetail',
  props: {
    isLevel: String,
    editProduct: Function,
    handleLoadingData: Function,
  },
  data() {
    return {
      loadingData: true,
    }
  },
  computed: {
    ...mapGetters(['produkKeranjang', 'userData']),
    produkKeranjangData() {
      return this.produkKeranjang({type:null, data:null});
    }
  },
  methods: {
    ...mapActions(['getProductStorageByStoreId']),
    toRp(val){
      return convertRp(val);
    },
    imageData(image) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${image}`
    },
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

.popover-detail {
  margin-right: 10px;
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