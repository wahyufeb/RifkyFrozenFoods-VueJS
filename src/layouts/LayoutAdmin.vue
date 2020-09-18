<template>
  <div class="wrapper">
    <div v-if="fullscreenLoading">
      <div v-loading.fullscreen.lock="fullscreenLoading"></div>
    </div>
    <el-row v-else>
      <el-col :sm="5" :md="5" :lg="5" :xl="5">
        <!-- sidebar -->
        <SidebarAdmin :menu="adminMenu" :photo="userData.photo" :username="userData.username"/>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <slot/> 
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setDecryptCookie } from '@/helper/setCookie.js';
import SidebarAdmin from '@/components/template/sidebar/SidebarAdmin.vue';

export default {
  name: 'LayoutAdminGudang',
  data() {
    return {
      fullscreenLoading: true,
    }
  },
  components: {
    SidebarAdmin,
  },
  computed: {
    ...mapGetters(['adminMenu', 'userData'])
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