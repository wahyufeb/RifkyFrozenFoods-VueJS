<template>
  <div class="jumbotron">
    <div class="jumbotron__title">{{ title }} :</div>
    <div class="jumbotron__data">{{ toRp(data) }}</div>
  </div>
</template>

<script>
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'Jumbotron',
  props: {
    title: String,
    data: String,
  },
  computed: {
    toRp() {
      return (val) => convertRp(val);
    },
  },
};
</script>

<style scoped>
.jumbotron {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.jumbotron__title {
  opacity: 0.8;
  font-size: 14px;
}

.jumbotron__data {
  font-size: 18px;
  color: var(--kasir-main-color);
}
</style>