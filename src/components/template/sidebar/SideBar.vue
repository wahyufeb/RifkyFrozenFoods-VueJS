<template>
  <div class="kasir__sidebar hidden-xs-only">
    <!-- Avatar -->
    <el-tooltip class="item" effect="light" :content="username" placement="right">
      <el-avatar :src="photoData(photo)"></el-avatar>
      <!-- <el-button>right</el-button> -->
    </el-tooltip>
    <!-- Links -->
    <div v-for="item in menu" :key="item.link">
      <router-link class="kasir__sidebar__link" :to="item.link">
        <i :class="item.icon"></i>
      </router-link>
    </div>
    
    <el-tooltip class="item" effect="dark" content="Logout" placement="right">
      <el-button circle id="btn-logout" type="danger" @click="handleLogout">
        <i class="el-icon-warning-outline"></i>
      </el-button>
    </el-tooltip>

    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions } from 'vuex';
export default {
  props: {
    menu: Array,
    username: String,
    photo: String,
  },
  methods: {
    ...mapActions(['logoutUserProcess']),
    photoData(photo) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/photo/${photo}`
    },
    handleLogout() {
      Cookies.remove('ID')
      Cookies.remove('ROILE')
      Cookies.remove('REFRESH_TOKEN')
      Cookies.remove('TOKEN')
      document.location.reload();
    }
  }
};
</script>

<style scoped>
#username {
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
}
.kasir__sidebar {
  width: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--kasir-main-color);
  box-shadow: 2px 0px 5px rgba(64, 158, 255, 0.39);
  border-radius: 0px 20px 20px 0px;
  padding: 5px;
  padding-top: 25px;
}

.kasir__sidebar__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  margin-top: 30px;
  border-radius: 50%;
  color: #fff;
}

.router-link-active {
  background-color: #fff;
  color: var(--kasir-main-color);
  transition: all ease-in 0.25s;
}

.kasir__sidebar__link i {
  font-size: 20px;
}

#btn-logout {
  background-color: rgb(226, 77, 92);
  color: #fff;
  margin-top: 20px;
}

#btn-logout:hover {
  border: 2px solid var(--kasir-main-color);
  background-color: var(--secondary);
  color: var(--kasir-main-color);
}

@media only screen and (max-width: 768px) {
  .kasir__main-content {
    margin-left: 0;
  }

  .kasir__sidebar {
    width: 60px;
  }
}

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .kasir__sidebar {
    width: 60px;
    height: 110vh;
  }
}
</style>
