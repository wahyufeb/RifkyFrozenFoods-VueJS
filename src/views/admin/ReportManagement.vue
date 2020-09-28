<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Laporan
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="7">
          <Jumbotron title="Total Pendapatan Selama Ini" :data="totalIncome" :formatRupiah="true"/>
        </el-col>
        <el-col :lg="7" :offset="1">
          <Jumbotron title="Total Pendapatan Hari Ini" :data="totalIncomeToday" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Data Transaksi pada ...
        </div>
        <div class="sales__data">
          <SalesData isLevel="admin"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import SalesData from '@/components/template/sales/SalesData.vue';

export default {
  name: 'ReportManagement',
  title:'Report Management - Admin Page',
  components: {
    Jumbotron,
    SalesData,
  },
  computed: {
    ...mapGetters(['totalIncome', 'totalIncomeToday'])
  },
  methods: {
    ...mapActions(['getTotalIncome', 'getTotalIncomeToday']),
  },
  created() {
    this.getTotalIncome()
    this.getTotalIncomeToday()
  }
}
</script>

<style scoped>
.sales__title {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>