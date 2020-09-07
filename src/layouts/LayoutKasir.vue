<template>
  <div class="kasir">
    <el-row>
      <el-col :sm="2" :md="2" :lg="2" :xl="2">
        <!-- sidebar -->
        <NavBar :kasirMenu="kasirMenu"/>
      </el-col>
      <el-col :xs="24" :sm="20" :md="21" :lg="21" :xl="21">
        <slot/> 
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NavBar from '@/components/template/sidebar/SideBar.vue';

export default {
  name: 'LayoutKasir',
  computed:{
    ...mapGetters(['kasirMenu']),
  },
  components: {
    NavBar,
  }
};
</script>

<style>
.kasir {
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
