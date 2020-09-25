<template>
  <div>
    <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item class="form-item"
      prop="name"
      label="Nama Kios/Gudang"
      :rules="rules.name">
        <el-input placeholder="name" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item class="form-item"
      prop="location"
      label="Lokasi Kios/Gudang"
      :rules="rules.location">
        <el-input placeholder="Nama Lengkap" v-model="formData.location"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitCreateStore">Tambah Kios/Gudang</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddStore',
  props: {
    handleDialogVisible: Function,
  },
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: '',
        location: '',
      },
      rules: {
        name: [
          { required: true, message: `Nama kios/gudang harus diisi`, trigger: 'blur' },
        ],
        location: [
          { required: true, message: `Lokasi kios/gudang harus diisi`, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['saveStoreProcess']),
    closeModalDialog() {
      this.handleDialogVisible();
    },
    submitCreateStore() {
      this.saveStoreProcess(this.formData)
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
      this.formData.name = '';
      this.formData.location = '';
      this.closeModalDialog();
    }
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