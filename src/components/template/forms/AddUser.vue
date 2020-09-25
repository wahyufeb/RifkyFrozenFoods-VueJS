<template>
  <div>
    <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item class="form-item"
      prop="username"
      label="Username"
      :rules="rules.username">
        <el-input placeholder="Username" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item class="form-item"
      prop="name"
      label="Nama Lengkap"
      :rules="rules.name">
        <el-input placeholder="Nama Lengkap" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item class="form-item"
      prop="password"
      label="Password"
      :rules="rules.password">
        <el-input placeholder="Password" v-model="formData.password" show-password></el-input>
      </el-form-item>
      <el-row>
        <el-col class="form-item" :lg="14">
          <el-form-item
          style="width:100%"
          prop="storeid"
          label="Kios"
          :rules="rules.toko">
            <el-select v-model="formData.storeId" placeholder="Pilih Kios">
              <el-option
                v-for="(item, i) in kiosData"
                :key="i+1"
                :label="detailkios(item.name, item.location)"
                :value="item.id_store">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="form-item" :lg="10">
          <el-form-item
          style="width:100%"
          prop="level"
          label="Level Pengguna"
          :rules="rules.level">
            <el-select v-model="formData.level" placeholder="Pilih Level Pengguna">
            
              <el-option
                v-for="(levelData, i) in levelPengguna"
                :key="i+1"
                :label="levelData.name"
                :value="levelData.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="submitCreateUser">Tambah Pengguna</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AddUser',
  props: {
    handleDialogVisible: Function,
    handleLoadingData: Function,
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      formData: {
        username: '',
        name: '',
        password: '',
        storeId:'',
        level:''
      },
      levelPengguna: [
        {name: 'Kasir', value:'cashier'},
        {name: 'Admin Gudang', value:'warehouse'},
        {name: 'Admin', value:'admin'},
      ],
      rules: {
        username: [
          { required: true, message: `Username harus diisi`, trigger: 'blur' },
        ],
        name: [
          { required: true, message: `Nama harus diisi`, trigger: 'blur' },
        ],
        password: [
          { required: true, message: `Password harus diisi`, trigger: 'blur' },
        ],
        toko: [
          { required: true, message: `Toko harus diisi`, trigger: 'blur' },
        ],
        level: [
          { required: true, message: `level harus diisi`, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['kiosData']),
  }, 
  methods: {
    ...mapActions(['saveUserProcess']),
    closeModalDialog() {
      this.handleDialogVisible();
    },
    handleLoading(params) {
      return this.handleLoadingData(params);
    },
    detailkios(name, location) {
      return `${name} - ${location}`;
    },
    submitCreateUser() {
      this.saveUserProcess(this.formData)
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
            message: err.response.data.username[0],
            offset: 100
          });
        }
      })
      this.formData.username = '';
      this.formData.name = '';
      this.formData.password = '';
      this.formData.storeId = '';
      this.formData.level = '';
      this.closeModalDialog();
    }
  },
}
</script>

<style scoped>
.form-item {
  padding: 5px;
}

.image-uploaded {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-uploaded img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

button {
  width: 100%;
}
</style>