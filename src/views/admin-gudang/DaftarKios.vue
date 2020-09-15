<template>
  <div class="main-content">
      <div class="main-content__title">
        Stok Barang Gudang
      </div>
    <div class="main-content__content">
      <!-- <el-row>
        <el-col :lg="4">          
          <el-button type="primary" @click="open">
            Barang Masuk
          </el-button>
        </el-col>
        <el-col :lg="4" :offset="1">
          <el-button type="danger">
            Barang Keluar
          </el-button>
        </el-col>
      </el-row> -->
      <div class="detail-store">
        Daftar Kios  
      </div>
      <el-row>
        <el-col>
          <StoreList/>
        </el-col>
      </el-row>  
    </div>
  </div>
</template>

<script>
import StoreList from '@/components/template/stores/StoreList.vue';

export default {
  name: 'DaftarKios',
  components: {
    StoreList,
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
