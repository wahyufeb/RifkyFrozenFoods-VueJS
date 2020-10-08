<template>
  <div class="main-content">
      <div class="main-content__title">
        Stok Barang Gudang
      </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4" :sm="6">           
          <el-button type="primary" @click="handleDialogVisible">
            Buka Kios
          </el-button>
        </el-col>
      </el-row>
      <div class="detail-store">
        Daftar Kios  
      </div>
      <el-row>
        <el-col>
          <StoreList isLevel="warehouse"/>
        </el-col>
      </el-row>  
    </div>
    <el-dialog
      title="Buka Kios"
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <AddStore :handleDialogVisible="handleDialogVisible"/>
    </el-dialog>
  </div>
</template>

<script>
import AddStore from '@/components/template/forms/AddStore.vue';
import StoreList from '@/components/template/stores/StoreList.vue';

export default {
  name: 'DaftarKios',
  title:'Daftar Kios - Warehouse Page',
  components: {
    StoreList,
    AddStore,
  },
  data() {
    return {
      centerDialogVisible: false,
    }
  },
  methods: {
    handleDialogVisible() {
      return this.centerDialogVisible  = !this.centerDialogVisible;
    }, 
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
  },
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

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .main-content__content {
    height: 100vh;
  }
}
</style>
