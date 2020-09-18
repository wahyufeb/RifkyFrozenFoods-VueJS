<template>
  <div class="wrapper-login">
    <LoginUser/>
  </div>
</template>

<script>
import LoginUser from '@/components/users/login/Login.vue';

export default {
  name: 'Login',
  components: {
    LoginUser,
  },
};
</script>

<style scoped>
.wrapper-login {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>