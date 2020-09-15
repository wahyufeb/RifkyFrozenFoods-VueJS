<template>
  <div class="main-content">
      <div class="main-content__title">
        Stok Barang Gudang
      </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4">
          <Jumbotron title="Total Produk" data="500" />
        </el-col>
        <el-col :lg="4" :offset="1">          
          <el-button type="primary" @click="open">
            Barang Masuk
          </el-button>
        </el-col>
        <el-col :lg="4" :offset="1">
          <el-button type="danger">
            Barang Keluar
          </el-button>
        </el-col>
      </el-row>
      <div class="detail-store">
        Barang yang ada di Gudang  
      </div>
      <el-row>
        <el-col :lg="5">
          <ProductCategorySidebar/>
        </el-col>
        <el-col :lg="18" :offset="1">
          <ProductListDetail/>
        </el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetail from '@/components/template/product/ProductListDetail.vue';

export default {
  name: 'StokBarangGudang',
  components: {
    Jumbotron,
    ProductCategorySidebar,
    ProductListDetail
  },
  methods: {
    open() {
      this.$confirm(<Jumbotron title="Total Produk" data="500" />, 'Input Data Barang Masuk', {
        confirmButtonText: 'Tambahkan Barang Masuk',
        cancelButtonText: 'Batal',
        type: 'warning'
      }).then(() => {
        alert("EYAY")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Barang Masuk dibatalkan'
        });          
      });
    }
  }
}
</script>

<style scoped>
.detail-store {
  margin-top: 30px;
  margin-bottom: 10px;
}

.main-content__data {
  display: flex;
  flex-direction: row;
}

button {
  width: 100%;
}
</style>
