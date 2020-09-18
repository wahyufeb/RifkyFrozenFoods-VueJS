<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Laporan
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="7">
          <Jumbotron title="Total Pendapatan Selama Ini" data="2500000" :formatRupiah="true"/>
        </el-col>
        <el-col :lg="7" :offset="1">
          <Jumbotron title="Total Pendapatan Hari Ini" data="2500000" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Data Transaksi pada ...
        </div>
        <div class="sales__data">
          <SalesData :warehouseMode="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import SalesData from '@/components/template/sales/SalesData.vue';

export default {
  name: 'ReportManagement',
  title:'Report Management - Admin Page',
  components: {
    Jumbotron,
    SalesData,
  },
}
</script>

<style scoped>
.sales__title {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>