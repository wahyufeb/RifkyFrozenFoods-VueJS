<template>
  <div class="wrapper">
    <div v-if="fullscreenLoading">
      <div v-loading.fullscreen.lock="fullscreenLoading"></div>
    </div>
    <el-row v-else>
      <el-col :sm="2" :md="2" :lg="2" :xl="2">
        <!-- sidebar -->
        <Sidebar :menu="adminGudangMenu" :photo="userData.photo" :username="userData.username"/>
      </el-col>
      <el-col :xs="24" :sm="20" :md="21" :lg="21" :xl="21">
        <slot/> 
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setDecryptCookie } from '@/helper/setCookie.js';
import Sidebar from '@/components/template/sidebar/SideBar.vue';

export default {
  name: 'LayoutAdminGudang',
  data() {
    return {
      fullscreenLoading: true,
    }
  },
  components: {
    Sidebar,
  },
  computed:{
    ...mapGetters(['adminGudangMenu', 'userData']),
  },
  methods: {
    ...mapActions(['authorization', 'refreshTokenProcess'])
  },
  mounted(){
    if(this.userData.length === 0){
      let dataId = setDecryptCookie('ID', null);
      let refreshToken = setDecryptCookie('REFRESH_TOKEN', null);
      this.authorization(dataId)
      .then((data) => {
        if(data.code !== 200){
          this.refreshTokenProcess(refreshToken)
        }else{
          this.fullscreenLoading = false
        }
      })
    }else{
      this.fullscreenLoading = false;
    }
  },
};
</script>

<style>
.wrapper {
  box-sizing: border-box;
  /* overflow-x: hidden; */
}

/* Global CSS for Main Content */
.main-content {
  padding: 25px 0;
}

.main-content__title {
  margin-bottom: 10px;
  font-size: 18px;
  opacity: 0.7;
}

.main-content__content {
  height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 35px;
  box-shadow: 5px 5px 20px rgba(210, 210, 210, 0.2);
}
</style>