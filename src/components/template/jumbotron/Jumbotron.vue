<template>
  <div class="jumbotron">
    <div class="jumbotron__title">{{ title }} :</div>
    <div class="jumbotron__data">
      <div v-if="formatRupiah" :class="{adminColor:isAdmin}">
        Rp{{ toRp(data) }}
      </div>
      <div v-else :class="{adminColor:isAdmin}">
        {{ toRp(data) }}
      </div>
    </div>
  </div>
</template>

<script>
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'Jumbotron',
  props: {
    title: String,
    data: Number,
    formatRupiah: Boolean,
    isAdmin: Boolean
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
  text-align: left;
}

.adminColor {
  color: var(--admin-gudang-main-color);
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