<template>
  <div class="main-content">
    <div class="main-content__title">
      Penjualan Hari Ini
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="5">
          <Jumbotron title="Pendapatan Hari Ini" data="2500000" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Data Transaksi pada Kios Mandiraja
        </div>
        <div class="sales__data">
          <SalesData/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import SalesData from '@/components/template/sales/SalesData.vue';

export default {
  name: 'Penjualan',
  components: {
    Jumbotron,
    SalesData,
  },
};
</script>

<style scoped>
.sales__title {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
