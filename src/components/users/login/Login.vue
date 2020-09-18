<template>
  <div class="form">
    <div class="form__data">
      <div class="form__title">Selamat Datang {{ roleName }}</div>
      <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
        <el-form-item>
          <div class="roles" >
            <div class="role-item" v-for="(role, i) in roles" :key="i+1">
              <div v-if="i === roleActive">
                <el-button type="primary" round>
                  {{ role.name }} 
                </el-button>
              </div>
              <div v-else>
                <el-button type="primary" @click="roleMode(i)" plain round>
                  {{ role.name }} 
                </el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
        prop="username"
        :rules="rules.username">
          <el-input :placeholder="usernamePlaceholder" v-model="formData.username" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item
        prop="password"
        :rules="rules.password">
          <el-input :placeholder="passwordPlaceholder" v-model="formData.password" :disabled="isDisabled" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginProcess('formData', roleId)" :loading="isLoading" :disabled="isButtonDisabled" class="form__login" size="medium" type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setDecryptCookie } from '@/helper/setCookie.js';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  computed: {
    roleName() {
      return this.roles[this.roleActive].name;
    },
    roleId() {
      return this.roles[this.roleActive].id;
    },
    usernamePlaceholder() {
      return `Username ${this.roleName}`;
    },
    passwordPlaceholder() {
      return `Password ${this.roleName}`;
    },
  },
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      roleActive: 0,
      roles: [
        { id: 'cashier', name: "Kasir" },
        { id: 'warehouse', name: "Admin Gudang" },
        { id: 'admin', name: "Admin" },
      ],
      isLoading: false,
      isDisabled: false,
      isButtonDisabled: null,
      rules: {
        username: [
          { required: true, message: `Username harus diisi`, trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password harus diisi', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['loginUserProcess']),
    roleMode(index) {
      this.roleActive = index
    },
    loginProcess(formName, id) {
      this.isLoading = true;
      this.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if(valid){
          const data = {
            username: this.formData.username,
            password: this.formData.password,
            role:id
          }
          this.loginUserProcess(data)
          .then((resApi) => {
            const { code, message } = resApi.data;
            if(code !== 200){
              this.$message({
                showClose: false, 
                message,
                type: 'error'
              });
            }else{
              this.$message({
                showClose: false,
                message,
                type: 'success'
              });
            }
            this.isLoading = false;
            this.isDisabled = false;

            let role = setDecryptCookie('ROLE');
            if(role == 'cashier'){
              this.$router.push('/kasir-app');
            }else if(role == 'warehouse'){
              this.$router.push('/kasir-gudang');
            }else if(role == 'admin'){
              this.$router.push('/dashboard-admin');
            }else{
              this.$router.push('/');
            }
          });
          
        }else{
          this.$message({
            showClose: true,
            message: 'Maaf terjadi kesalahan, silahkan coba lagi',
            type: 'error'
          });
          this.isLoading = false;
          this.isDisabled = false;
        }
      })
    },
  },
};
</script>

<style scoped>
.form__title {
  font-size: 20px;
  margin-bottom: 20px;
}

.form__data {
  width: 450px;
  background-color: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(210, 210, 210, 0.2);
}

.form__login {
  width: 100%;
}

.roles {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
