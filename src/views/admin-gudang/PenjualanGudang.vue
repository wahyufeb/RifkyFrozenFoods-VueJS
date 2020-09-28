<template>
  <div class="main-content">
    <div class="main-content__title">
      Data Transaksi
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="6">
          <Jumbotron title="Pendapatan Hari Ini" :data="totalIncomeToday" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Data Transaksi pada Kios 
        </div>
        <div class="sales__data">
          <SalesData isLevel="warehouse"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import SalesData from '@/components/template/sales/SalesData.vue';

export default {
  name: 'PenjualanGudang',
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
    ...mapGetters(['userData', 'totalIncomeToday'])
  },
  methods: {
    ...mapActions(['getTotalIncomeToday', 'getInvoices'])
  },
  mounted() {
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
</style>