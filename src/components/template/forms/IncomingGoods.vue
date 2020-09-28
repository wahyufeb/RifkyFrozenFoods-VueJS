<template>
  <div>
    <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item
      prop="product"
      label="Pilih Produk yang akan dimasukan">
      <el-autocomplete
        style="width:100%"
        class="inline-input"
        v-model="name"
        :fetch-suggestions="querySearch"
        placeholder="Pilih Produk"
        @select="handleSelect"
      ></el-autocomplete>
      </el-form-item>
      <el-form-item
      prop="kios"
      label="Pilih Kios / Gudang yang dituju">
        <el-select style="width:100%" v-model="formData.id_store" placeholder="Pilih Kios/Gudang">
          <el-option
            v-for="(item, i) in kiosData"
            :key="i+1"
            :label="labelStore(item.name, item.location)"
            :value="item.id_store">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item"
      prop="stock"
      label="Stok produk yang akan dimasukan"
      :rules="rules.stock">
        <el-input placeholder="Stok produk" v-model="formData.stock"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitIncomingGoods">Tambahkan Barang Masuk</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'IncomingGoods',
  props: {
    handleDialogVisible: Function,
  },
  data() {
    return {
      dialogVisible: false,
      products: [],
      stores: [],
      formData: {
        id_product: '',
        id_store: '',
        stock: '',
      },
      name: '',
      rules: {
        stock: [
          { required: true, message: `Stok harus diisi`, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['produkKeranjang', 'kiosData']),
  },
  methods: {
    ...mapActions(['saveStoreProcess', 'getStores', 'saveIncomingGoodsProcess']),
    labelStore(name, location) {
      return `${name} - ${location}`
    },
    querySearch(queryString, cb) {
      const produkData = this.products;
      // add value property every produkKeranjang Item
      produkData.map((item) => {
        item.value = item.name;
      })

      const results = queryString ? produkData.filter(this.createFilter(queryString)) : produkData;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (data) => {
        return (data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.formData.id_product = item.id_product;
      console.log(this.formData)
    },
    closeModalDialog() {
      this.handleDialogVisible();
    },
    submitIncomingGoods() {
      this.saveIncomingGoodsProcess(this.formData)
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
      .catch((err) => {
        if(err.response.status === 422) {        
          this.$notify.error({
            title: 'Error',
            message: err.response.data.name[0],
            offset: 100
          });
        }
      })
      this.formData.id_product = '';
      this.formData.id_store = '';
      this.formData.stock = '';
      this.closeModalDialog();
    },
    async getProductsData() {
      let token = setDecryptCookie('TOKEN', null);
      // eslint-disable-next-line no-undef
      const reqProducts = await axios.get(`${process.env.VUE_APP_BASE_API}/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resProducts = await reqProducts.data;
      return resProducts;
    },
  },
  mounted() {
    this.getStores()
    this.getProductsData()
    .then((response) => {
      if(response.code === 200 || response.code === 404){
        this.products = response.data;
      }else{
        this.$message({
          showClose: true,
          message: 'Warning, this is a warning message.',
          type: 'warning'
        });
        document.location.reload();
      }
    })
  }
}
</script>

<style scoped>
.form-item {
  padding: 5px;
}

button {
  width: 100%;
}
</style>