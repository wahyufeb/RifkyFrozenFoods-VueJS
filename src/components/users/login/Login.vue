<template>
  <div class="form">
    <div class="form__data">
      <div class="form__title">Selamat Datang {{category}}</div>
      <el-form label-position="top" :model="formData" :rules="rules" ref="formData">
        <el-form-item
        prop="username"
        :rules="rules.username">
          <el-input placeholder="Username" v-model="formData.username" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item
        prop="password"
        :rules="rules.password">
          <el-input placeholder="Password" v-model="formData.password" :disabled="isDisabled" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginProcess('formData')" :loading="isLoading" :disabled="isButtonDisabled" class="form__login" size="medium" type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormData',
  props: {
    category: String,
  },
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      isLoading: false,
      isDisabled: false,
      isButtonDisabled: null,
      rules: {
        username: [
          { required: true, message: 'Username harus diisi', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password harus diisi', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    loginProcess(formName) {
      this.isLoading = true;
      this.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$message({
            showClose: true,
            message: 'Login Berhasil',
            type: 'success'
          });
          
        }else{
          this.$message({
            showClose: true,
            message: 'Maaf terjadi kesalahan, silahkan coba lagi',
            type: 'error'
          });
        }
      })
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form__title {
  margin-bottom: 10px;
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
</style>
