<template>
  <div class="kasir__sidebar hidden-xs-only">
    <!-- Avatar -->
    <div class="kasir__sidebar__avatar">
      <el-avatar :src="photoData"></el-avatar>
      <h5>{{username}}</h5>
    </div>
    <!-- Links -->
    <div v-for="item in menu" :key="item.link">
      <router-link class="kasir__sidebar__link" :to="item.link">
        <i :class="item.icon"></i>
        <div class="kasir__sidebar__name">{{item.name}}</div>
      </router-link>
    </div>
    
    <el-tooltip class="item" effect="dark" content="Logout" placement="right">
      <el-button id="btn-logout" type="danger" @click="handleLogout">
        Keluar
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions } from 'vuex';
export default {
  name: 'SidebarAdmin',
  props: {
    menu: Array,
    photo: String,
    username: String,
  },
  computed: {
    photoData() {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/photo/${this.photo}`
    }
  },
  methods: {
    ...mapActions(['logoutUserProcess']),
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
.kasir__sidebar {
  width: 260px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: var(--admin-gudang-main-color);
  padding: 20px;
  padding-top: 25px;
}

.kasir__sidebar__avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.kasir__sidebar__avatar h5 {
  color: #fff;
  font-size: 20px;
  margin-left: 20px;
  font-weight: 600;
}

.kasir__sidebar__link {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* width: 35px; */
  /* height: 35px; */
  margin-top: 30px;
  /* border-radius: 50%; */
  color: #fff;
  opacity: 0.9;
}

.kasir__sidebar__name {
  margin-left: 10px;
  font-size: 16px;
}

.router-link-active {
  transition: all ease-in 0.25s;
  font-weight: 500;
  opacity: 1;
}

.kasir__sidebar__link i {
  font-size: 20px;
}

#btn-logout {
  background-color: rgb(226, 77, 92);
  color: #fff;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .kasir__main-content {
    margin-left: 0;
  }
}

@media only screen and (max-width: 970px) {
  .kasir__sidebar {
    width: 180px;
    height: 130vh;
  }
}
</style>
