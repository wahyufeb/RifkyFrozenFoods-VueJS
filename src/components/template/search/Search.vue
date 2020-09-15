<template>
  <!-- <el-input    ></el-input> -->
  <div id="search">
    <el-autocomplete
    prefix-icon="el-icon-search"
    :placeholder="title"
    v-model="keyword"
    class="inline-input"
    :fetch-suggestions="querySearch"
    @select="handleSelect"
    :trigger-on-focus="false"
  ></el-autocomplete>
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
      keyword: '',
      produk:[],
    };
  },
  computed: {
    ...mapGetters(['kodeProduk']),
  },
  methods: {
    ...mapActions(['findProduct', 'activateLoading']),
    querySearch(queryString, cb) {
      let produk = this.produk;
      let results = queryString ? produk.filter(this.createFilter(queryString)) : produk;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (dataProduk) => {
        return (dataProduk.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    async handleSelect(item) {
      await this.activateLoading()
      await this.findProduct(item.idProduct)
    },
    loadAll() {
      return this.kodeProduk;
    }
  },
  mounted() {
    this.produk = this.loadAll()
  }
};
</script>

<style scoped>
#search * {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>