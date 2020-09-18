<template>
  <div class="product-list-detail">
    <el-row v-loading="loadingData">
      <div v-if="isAdmin">
        <el-col class="product-list-detail__item" v-for="produk in produkList" :key="produk.id_product">
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
                  <!-- Stok : {{ produk.stock }} -->
                </div>
              </div>
            </div>
          </div>
          <div class="product-list-detail__price">
            <el-popover class="popover-detail"
              placement="top-start"
              title="Detail Produk"
              width="250"
              trigger="hover">
              <div v-for="priceItem in produk.price" :key="priceItem.id_price_category">
                <p>Harga {{priceItem.name}} : Rp{{ toRp(priceItem.price) }}</p>
              </div>
              <el-button type="info" slot="reference">
                <i class="el-icon-info"></i>
              </el-button>
            </el-popover>
            <el-button type="primary" @click="editProduct(produk.id_product)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
            <el-button type="danger" @click="deleteProduct(produk.id_product)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-col>
      </div>
      <div v-else>
        <el-col class="product-list-detail__item" v-for="produk in produkList" :key="produk.id_product">
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
          <div class="product-list-detail__price" v-for="priceItem in produk.price" :key="priceItem.id_price_category">
            Rp {{ toRp(priceItem.price) }}
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'ProductListDetail',
  props: {
    isAdmin: Boolean,
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
    imageData(photo) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${photo}`
    },
    detailProduct(params) {
      alert(params)
      this.$alert('This is a message', 'Title', {
        confirmButtonText: 'OK',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    editProduct(params) {
      alert(params)
    },
    deleteProduct(params) {
      this.deleteProductProcess(params).
      then((response) => {
        if(response.code === 204){
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
      if(response.code === 200){
        this.loadingData = false;
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