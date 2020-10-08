<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Laporan
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="7" :sm="11">
          <Jumbotron title="Total Pendapatan Selama Ini" :data="totalIncome" :formatRupiah="true"/>
        </el-col>
        <el-col :lg="7" :sm="11" :offset="1">
          <Jumbotron title="Total Pendapatan Hari Ini" :data="totalIncomeToday" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Seluruh Data Transaksi dan Invoice
        </div>
        <div v-if="loadingData">
          <div v-loading="loadingData"></div>
        </div>
        <div v-else class="sales__data">
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
  data() {
    return {
      loadingData: true,
    }
  },
  computed: {
    ...mapGetters(['totalIncome', 'totalIncomeToday'])
  },
  methods: {
    ...mapActions(['getTotalIncome', 'getTotalIncomeToday', 'getInvoices']),
  },
  created() {
    this.getTotalIncome()
    this.getTotalIncomeToday()
    this.getInvoices()
    .then((response) => {
      if(response.code === 200 || response.code === 404) {
        this.loadingData = false
      }
    }).catch((err) => {
      console.log(err)
    });
  }
}
</script>

<style scoped>
.sales__title {
  margin-top: 30px;
  margin-bottom: 10px;
}

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .main-content__content {
    height: 100vh;
  }
}
</style>