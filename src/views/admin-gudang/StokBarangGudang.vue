<template>
  <div class="main-content">
      <div class="main-content__title">
        Stok Barang Gudang
      </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="4">          
          <el-button type="primary" @click="productStorageModal('incomingGoods')">
            Barang Masuk
          </el-button>
        </el-col>
        <el-col :lg="4" :offset="1">
          <el-button type="danger" @click="productStorageModal('exitItem')">
            Barang Keluar
          </el-button>
        </el-col>
      </el-row>
      <div class="detail-store">
        Barang yang ada di {{ userData.store.name }} - {{ userData.store.location }}
      </div>
      <el-row>
        <el-col :lg="5">
          <ProductCategorySidebar :isAdmin="false" :handleLoadingData="handleLoadingData" />
        </el-col>
        <el-col :lg="18" :offset="1" v-loading="loadingData">
          <ProductListDetailStock isLevel="warehouse" :handleLoadingData="handleLoadingData"/>
        </el-col>
      </el-row>  
    </div>
    
    <el-dialog
      :title="titleModal"
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <div v-if="mode === 'incomingGoods' ">
        <IncomingGoods :handleDialogVisible="handleDialogVisible" />
      </div>
      <div v-else>
        <ExitItem :handleDialogVisible="handleDialogVisible" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IncomingGoods from '@/components/template/forms/IncomingGoods.vue';
import ExitItem from '@/components/template/forms/ExitItem.vue';
import ProductCategorySidebar from '@/components/template/product-category/ProductCategorySidebar.vue';
import ProductListDetailStock from '@/components/template/product/ProductListDetailStock.vue';

export default {
  name: 'StokBarangGudang',
  components: {
    ProductCategorySidebar,
    ProductListDetailStock,
    IncomingGoods, 
    ExitItem
  },
  data() {
    return {
      loadingData: true,
      titleModal: '',
      mode: '',
      centerDialogVisible: false,
    }
  },
  computed: {
    ...mapGetters(['userData']),
  },
  methods: {
    handleLoadingData(params) {
      return this.loadingData = params;
    },
    handleDialogVisible() {
      return this.centerDialogVisible  = !this.centerDialogVisible;
    }, 
    productStorageModal(params) {
      this.mode = params
      if(params === 'incomingGoods'){
        this.titleModal = 'Tambah Barang Masuk';
        this.handleDialogVisible()
      }else{
        this.titleModal = 'Tambah Barang Keluar'
        this.handleDialogVisible()
      }

    },         
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
