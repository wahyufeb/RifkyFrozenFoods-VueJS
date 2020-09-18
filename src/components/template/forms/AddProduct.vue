<template>
  <div>
    <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item class="form-item"
      prop="name"
      :rules="rules.name">
        <el-input placeholder="Nama Produk" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="Upload Foto Produk">
        <el-upload
          action="#"
          list-type="picture-card"
          ref="photo"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file"  slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
        Kategori Harga
      <el-row>
        <el-col class="form-item" :lg="12" v-for="(categoryItem, i) in formData.priceCategory" :key="i+1">
          <el-form-item
          prop="total_perunit">
            <el-input type="number" :placeholder="categoryItem.name" v-model="categoryItem.price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form-item" :lg="12">
          <el-form-item
          prop="total_perunit">
            <el-input type="number" placeholder="Masukan Total Per Dus" v-model="formData.total_perunit"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form-item" :lg="12">
          <el-form-item
          style="width:100%"
          prop="category"
          :rules="rules.category">
            <el-select v-model="formData.category" placeholder="Pilih Kategori">
              <el-option
                v-for="item in kategoriProduk"
                :key="item.id_product_category"
                :label="item.name"
                :value="item.id_product_category">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="submitAddProduct()">Tambah Produk</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AddProduct',
  props: {
    handleDialogVisible: Function,
    handleLoadingData: Function,
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      formData: {
        name: '',
        image: '',
        total_perunit: '',
        priceCategory: [
          {name: 'eceran', price: ''},
          {name: 'grosir', price: ''},
        ],
        category: ''
      },
      rules: {
        name: [
          { required: true, message: `Nama Produk harus diisi`, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['kategoriProduk'])
  }, 
  methods: {
    ...mapActions(['createProductProcess']),
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    closeModalDialog() {
      this.handleDialogVisible();
    },
    handleLoading(params) {
      return this.handleLoadingData(params);
    },
    submitAddProduct() {

      const dataProduct = {
        name: this.formData.name,
        image: this.$refs['photo'].uploadFiles[0].raw,
        total_perunit: this.formData.total_perunit,
        id_product_category: this.formData.category,
      }

      const dataPrice = {
        priceCategory:this.formData.priceCategory
      }

      const data = {
        dataProduct,
        dataPrice
      }

      this.createProductProcess(data)
      .then((response) => {
        if(response.code !== 201){          
          this.$notify.error({
            title: 'Error',
            message: 'Produk Gagal ditambahkan',
            offset: 100
          });
        }else{          
          this.$notify.success({
            title: 'Success',
            message: 'Produk Berhasil ditambahkan',
            offset: 100
          });
        }
        this.closeModalDialog();
        this.formData.name = '';
        this.formData.image = ''
        this.formData.total_perunit =  '';
        this.formData.priceCategory = [
          {name: 'eceran', price: ''},
          {name: 'grosir', price: ''},
        ];
        this.formData.category = '';
        this.$refs['photo'].uploadFiles[0].raw = ''
      })
    },
  },
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