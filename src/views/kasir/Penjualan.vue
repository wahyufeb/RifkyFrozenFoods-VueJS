<template>
  <div class="main-content">
    <div class="main-content__title">
      Penjualan Hari Ini
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="5">
          <Jumbotron title="Pendapatan Hari Ini" :data="totalIncomeToday" :formatRupiah="true"/>
        </el-col>
      </el-row>
      <div class="sales">
        <div class="sales__title">
          Data Transaksi pada {{this.userData.store.name}} - {{this.userData.store.location}} Hari Ini
        </div>
        <div v-if="loadingData">
          <div v-loading="loadingData"></div>
        </div>
        <div v-else class="sales__data">
          <SalesData isLevel="cashier"/>
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
  name: 'Penjualan',
  title:'Penjualan Hari Ini - Cashier Page',
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
    ...mapActions(['getTotalIncomeTodayByStoreId', 'getInvoicesTodayByStoreId'])
  },
  mounted() {
    let id_store = this.userData.id_store;
    this.getTotalIncomeTodayByStoreId(id_store)
    this.getInvoicesTodayByStoreId(id_store)
    .then((response) => {
      if(response.code === 200 || response.code === 404) {
        this.loadingData = false
      }
    }).catch((err) => {
      console.log(err)
    });
  }
};
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
