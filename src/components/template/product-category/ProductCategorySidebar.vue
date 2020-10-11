<template>
  <div class="product-category">
    <Search title="Cari Barang" :isAdmin="isAdmin"/>
    <div class="product-category-data">
        <el-button class="product-category__items" @click="allProducts()">
          Semua Produk
        </el-button>
      <div v-for="item in kategoriProduk" :key="item.id" class="product-category__wrapper">
        <el-button class="product-category__items" @click="filterProduct(item.id_product_category)">
          {{item.name}}
        </el-button>
        <div v-if="isAdmin">
          <div v-if="!checkProductCategory(item.id_product_category)">
            <i class="el-icon-error product-category__items__delete" @click="deleteCategoryProduct(item.id_product_category)"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isAdmin">
      <el-input
        placeholder="Masukan kategori baru"
        v-model="kategoriBaru">
      </el-input>
      <el-button id="isAdmin" type="success" style="margin-top:10px" @click="addCategoryProduct">Tambah Kategori</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Search from '@/components/template/search/Search.vue';

export default {
  name: 'ProductCategorySidebar',
  props: {
    isAdmin: Boolean,
    handleLoadingData: Function,
  },
  components: {
    Search,
  },
  data(){
    return {
      kategoriBaru: '',
    }
  },
  computed: {
    ...mapGetters(['userData', 'produkList', 'produkKeranjang', 'kategoriProduk']),
  },
  methods: {
    ...mapActions(['productCategories', 'getProducts', 'getProductStorageByStoreId', 'getProductByCategory', 'saveCategoryProcess', 'deleteCategoryProcess']),
    // =============== Admin Level ===================
    checkProductCategory(id_product_category) {
      let check = this.produkList.filter((productItem) => productItem.id_product_category === id_product_category);
      if(check.length > 0){
        return true;
      }else{
        return false;
      }
    },
    addCategoryProduct() {
      this.saveCategoryProcess({name:this.kategoriBaru})
      .then((response) => {
        if(response.code !== 201){          
          this.$notify.error({
            title: 'Error',
            message: response.message,
            offset: 100
          });
        }else{          
          this.$notify.success({
            title: 'Success',
            message: response.message,
            offset: 100
          });
        }
      })
      this.kategoriBaru = '';
    },
    deleteCategoryProduct(id_product_category) {
      this.deleteCategoryProcess(id_product_category)
      .then((response) => {
        if(response.code !== 204){          
          this.$notify.error({
            title: 'Error',
            message: response.message,
            offset: 100
          });
        }else{          
          this.$notify.success({
            title: 'Success',
            message: response.message,
            offset: 100
          });
        }
      })
    },
    // ============= End Admin Level ===================
    allProducts() {
      this.handleLoadingData(true)
      if(this.isAdmin){
        this.getProducts()
        .then((response) => {
          if(response.code === 200 || response.code === 404) {
            this.handleLoadingData(false);
          }
        })
      }else{
        let id_store = this.userData.id_store;
        this.$store.state.produk.produkTerfilter = [];
        this.getProductStorageByStoreId(id_store)
        .then((response) => {
          if(response.code === 200 || response.code === 404){
            this.handleLoadingData(false);
          }
        })
      }
    },
    filterProduct(id_product_category) {
      this.handleLoadingData(true)
      if(this.isAdmin){
        this.getProductByCategory(id_product_category)
        .then((response) => {
          if(response.code === 200 || response.code === 404) {
            this.handleLoadingData(false);
          }
        })
      }else{
        let filteredResult = this.produkKeranjang({type:'filter', data:id_product_category});
        if(filteredResult.length !== 0){
          setTimeout(() => {
            this.handleLoadingData(false);
          }, 500);
        }else{
          this.$message({
            showClose: true,
            message: 'Produk tidak tersedia',
            type: 'warning'
          });
          this.handleLoadingData(false);
        }
      }
    }
  },
  created() {
    this.productCategories();
  },
};
</script>

<style scoped>
#isAdmin {
  width: 100%;
}

.product-category {
  background-color: var(--gray-color);
  padding: 10px;
  border-radius: 10px;
}

.product-category-data {
  overflow: scroll;
}

.product-category__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

.product-category__items__delete {
  margin-top: -10px;
  margin-left: 5px;
  color: red;
  font-size: 20px;
  cursor: pointer;
}

.product-category__items:hover,
.active {
  background-color: var(--kasir-main-color);
  color: #fff;
}

@media only screen and (max-height: 630px) {
  .product-category-data {
    height: 200px;
  }
}

@media only screen and (min-height: 630px) {
  .product-category-data {
    height: 300px;
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