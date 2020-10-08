<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Produk
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4" :sm="6">
          <Jumbotron title="Total Produk" :data="totalProducts" :formatRupiah="false" :isAdmin="true"/>
        </el-col>
        <el-col :lg="4" :sm="6" :offset="1">          
          <el-button type="primary" @click="handleDialogVisible">
            Tambah Produk
          </el-button>
        </el-col>
      </el-row>
      <div class="detail-store">
        Daftar Produk  
      </div>
      <el-row >
        <el-col :lg="5" :sm="6" class="product-category">
          <ProductCategorySidebar :isAdmin="true" :handleLoadingData="handleLoadingData"/>
        </el-col>
        <el-col :lg="18" :sm="17" :offset="1" v-loading="loadingData" class="product-list-detail">
          <ProductListDetail :editProduct="editProduct" :handleLoadingData="handleLoadingData"/>
        </el-col>
      </el-row>  
    </div>
    <el-dialog
      :title="titleDialog"
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <AddProduct :handleDialogVisible="handleDialogVisible" :handleLoadingData="handleLoadingData" :productId="productId"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import AddProduct from '@/components/template/forms/AddProduct.vue';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetail from '@/components/template/product/ProductListDetail.vue';

export default {
  name: 'ProductManagement',
  title:'Product Management - Admin Page',
  components: {
    Jumbotron,
    ProductCategorySidebar,
    ProductListDetail,
    AddProduct,
  },
  data() {
    return {
      centerDialogVisible: false,
      productId: '',
      titleDialog:'',
      loadingData: true,
    }
  },
  computed: {
    ...mapGetters(['totalProducts']),
  },
  methods: {
    editProduct(params) {
      this.productId = params;
      this.titleDialog = 'Edit Data Produk'
      return this.centerDialogVisible  = !this.centerDialogVisible;
    },
    handleDialogVisible() {
      this.titleDialog = 'Tambahkan Produk'
      this.productId = 0;
      return this.centerDialogVisible  = !this.centerDialogVisible;
    },           
    handleLoadingData(params) {
      return this.loadingData = params;
    },
  },
}
</script>

<style scoped>
.detail-store {
  margin-top: 20px;
  margin-bottom: 10px;
}

.main-content__data {
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 970px) {
  .main-content__content {
    height: 120vh;
  }

  .product-list-detail,
  .product-category {
    height: 430px;
  }
}
</style>