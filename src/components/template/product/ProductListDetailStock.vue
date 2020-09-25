<template>
  <div class="product-list-detail">
    <el-row v-loading="loadingData">
      <el-col class="product-list-detail__item" v-for="(produk, i) in produkList" :key="i+1">
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
    ...mapGetters(['produkList']),
  },
  methods: {
    ...mapActions(['getProducts', 'deleteProductProcess']),
    toRp(val){
      return convertRp(val);
    },
    imageData(image) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${image}`
    },
    editProductData(params) {
      this.editProduct(params)
    },
    deleteProduct(params) {
      this.deleteProductProcess(params)
      .then((response) => {
        if(response.deleteProduct.code === 204 && response.deletePriceCategory.code === 204){
          this.$notify({
            title: 'Success',
            message: 'Berhasil menghapus produk',
            type: 'success'
          });
        }else{
          this.$notify.error({
            title: 'Error',
            message: 'Gagal menghapus produk'
          });
        }
      })
    }
  },
  created() {
    this.getProducts()
    .then((response) => {
      if(response.code === 200 || response.code === 404){
        this.loadingData = false
        this.handleLoadingData(false)
      }
    })
  }
};
</script>

<style scoped>