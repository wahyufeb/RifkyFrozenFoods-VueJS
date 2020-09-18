<template>
  <div class="main-content">
    <div class="main-content__title">
      Penjualan Hari Ini
    </div>
    <div class="main-content__content">
      <div class="main-content__content__data">
        <div class="main-content__jumbotron">
          <h4>Pendapatan</h4>
          <div class="main-content__jumbotron__data">
            <Jumbotron title="Pendapatan Selama Ini" :data="totalIncome" :formatRupiah="true" :isAdmin="true"/>
            <Jumbotron title="Pendapatan Hari Ini" :data="totalIncomeToday" :formatRupiah="true" :isAdmin="true"/>
          </div>
        </div>
        <div class="main-content__jumbotron">
          <h4>Barang</h4>
          <div class="main-content__jumbotron__data">
            <Jumbotron title="Total Seluruh Barang" :data="500" :formatRupiah="false" :isAdmin="true"/>
          </div>
        </div>
      </div>
      <h4 id="kios">Kios</h4>
      <StoreList/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Jumbotron from '@/components/template/jumbotron/Jumbotron.vue';
import StoreList from '@/components/template/stores/StoreList.vue';

export default {
  name:'Dashboard',
  title:'Dashboard - Admin Page',
  components: {
    Jumbotron,
    StoreList,
  },
  computed: {
    ...mapGetters(['totalIncome', 'totalIncomeToday'])
  },
  methods: {
    ...mapActions(['getTotalIncome', 'getTotalIncomeToday'])
  },
  created() {
    this.getTotalIncome();
    this.getTotalIncomeToday();
  }
}
</script>

<style scoped>
.main-content__content__data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.main-content__jumbotron__data {
  display: flex;
  flex-direction: row;
}

.main-content__jumbotron__data * {
  margin: 5px;
  width: 300px;
}

h4 {
  margin-left: 5px;
  font-size: 16px;
  font-weight: normal;
  color: var(--gray-typo);
}

#kios {
  margin-top: 20px;
}

@media only screen and (max-width: 1300px) {
  .main-content__content__data {
    flex-direction: column;
  }
}
</style>