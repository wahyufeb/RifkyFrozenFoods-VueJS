<template>
  <!-- <el-input    ></el-input> -->
  <div id="search">
  <el-input
    :placeholder="title"
    v-model="keyword" @change="searchDataProduct">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Search',
  props: {
    title: String,
  },
  data() {
    return {
      keyword: ''
    };
  },
  computed: {
    ...mapGetters(['produkList']),
    searchDataProduct() {
      return this.searchProduct(this.keyword);
    }
  },
  methods: {
    ...mapActions(['findProduct', 'activateLoading', 'searchProduct']),
  },
};
</script>

<style scoped>
#search * {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>