<template>
  <div class="kasir__sidebar hidden-xs-only">
    <!-- Avatar -->
    <el-avatar :src="photo"></el-avatar>
    <p id="username">{{username}}</p>
    <!-- Links -->
    <div v-for="item in menu" :key="item.link">
      <router-link class="kasir__sidebar__link" :to="item.link">
        <i :class="item.icon"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: Array,
    username: String,
    photo: String,
  },
};
</script>

<style scoped>
#username {
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
}
.kasir__sidebar {
  width: 60px;
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

@media only screen and (max-width: 768px) {
  .kasir__main-content {
    margin-left: 0;
  }
}
</style>
