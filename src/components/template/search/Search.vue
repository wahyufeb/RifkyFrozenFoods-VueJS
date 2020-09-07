<template>
  <el-input prefix-icon="el-icon-search" id="search" :placeholder="title" v-model="keyword"></el-input>
</template>

<script>
export default {
  name: 'Search',
  props: {
    title: String,
  },
  data() {
    return {
      keyword: '',
    };
  },
};
</script>

<style scoped>
#search {
  width: 100%;
  background-color: red;
  border-radius: 10px;
}
</style>