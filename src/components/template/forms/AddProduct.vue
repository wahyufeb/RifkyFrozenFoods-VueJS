<template>
  <div>
    <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item class="form-item"
      prop="name"
      label="Nama Produk"
      :rules="rules.name">
        <el-input placeholder="Nama Produk" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item>
        <div v-if="productId !== 0" class="image-uploaded">
          <img :src="imageData(formData.image)" :alt="formData.name">
        </div>
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
        <img width="100%" :src="dialogImageUrl" alt="dialog">
      </el-dialog>
      <el-row>
        <el-col class="form-item" :lg="12" v-for="(categoryItem, i) in formData.priceCategory" :key="i+1">
          <el-form-item
          :label="hargaKategori(categoryItem.name)"
          prop="total_perunit">
            <el-input type="number" :placeholder="categoryItem.name" v-model="categoryItem.price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form-item" :lg="12">
          <el-form-item
          label="Jumlah produk per dus"
          prop="total_perunit">
            <el-input type="number" placeholder="Masukan Total Per Dus" v-model="formData.total_perunit"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form-item" :lg="12">
          <el-form-item
          style="width:100%"
          prop="category"
          label="Kategori produk"
          :rules="rules.category">
            <el-select v-model="formData.category" placeholder="Pilih Kategori">
            
              <el-option
                v-for="(item, i) in kategoriProduk"
                :key="i+1"
                :label="item.name"
                :value="item.id_product_category">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button v-if="productId !== 0" type="primary" @click="submitDataProduct(productId)">Update Produk</el-button>
      <el-button v-else type="primary" @click="submitDataProduct(productId)">Tambah Produk</el-button>
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
    productId: Number,
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
          {name: 'grosir', price: ''},
          {name: 'eceran', price: ''},
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
    ...mapGetters(['kategoriProduk', 'selectedProduct']),
  }, 
  methods: {
    ...mapActions(['saveProductProcess']),
    setupUpdateProduct(productId) {
      const {name, image, total_perunit, price, category } = this.selectedProduct(productId)
      this.formData.name = name;
      this.formData.image = image;
      this.formData.total_perunit = total_perunit;
      this.formData.category = category.id_product_category;
      this.formData.priceCategory = price;
    },
    // Aliases method
      imageData(img) {
        // eslint-disable-next-line no-undef
        return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${img}`
      },
      hargaKategori(name) {
        return `Harga ${name}:`;
      },
    // =============
    handleRemove(file) {
      return this.$refs['photo'].uploadFiles = this.$refs['photo'].uploadFiles.filter((item) => item.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      var link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    closeModalDialog() {
      this.handleDialogVisible();
    },
    handleLoading(params) {
      return this.handleLoadingData(params);
    },
    submitDataProduct(productId) {
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
        dataPrice,
        dataId: productId,
      }
      this.saveProductProcess(data)
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
      this.formData.name = '';
      this.formData.image = ''
      this.formData.total_perunit =  '';
      this.formData.priceCategory = [
        {name: 'eceran', price: ''},
        {name: 'grosir', price: ''},
      ];
      this.formData.category = '';
      this.closeModalDialog();
      this.$refs['photo'].uploadFiles = []
    },
  },
  watch: {
    productId: function(productId) {      
      if(productId !== 0){
        this.setupUpdateProduct(productId)
      }else{
        this.formData.name = '';
        this.formData.image = '';
        this.formData.total_perunit = '';
        this.formData.priceCategory = [
            {name: 'eceran', price: ''},
            {name: 'grosir', price: ''},
          ];
        this.formData.category = '';
      }
    }
  },
  mounted() {
    if(this.productId !== 0) {
      this.setupUpdateProduct(this.productId)
    }
  }
}
</script>

<style scoped>
.form-item {
  padding: 5px;
}

.image-uploaded {
  display:flex;
  justify-content:center;
  align-items:center;
}

.image-uploaded img {
  width:300px;
  height: 300px;
  object-fit: cover;
}

button {
  width: 100%;
}
</style>