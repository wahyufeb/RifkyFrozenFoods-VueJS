<template>
  <div class="sales">
    <div class="sales__data">
      <div class="sales__data__filter">
        <div id="picker">
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="sales__data__buttons">
        <div>
          <el-button type="danger" @click="filterReset">Reset</el-button>
        </div>
        <div>
          <el-button type="primary" @click="filterInvoice">Urutkan</el-button>
        </div>
        <div v-if="isLevel === 'warehouse' || isLevel === 'admin' ">
          <el-button type="success" @click="print">Cetak Data</el-button>
        </div>
      </div>
    </div>
    <div v-show="filterDate" id="filter-title">
      Data diurutkan dari <b>{{ dateData.startDate }}</b> ke <b>{{ dateData.endDate }} </b>
    </div>
    <div class="sales-items-data" v-loading="loadingData">
      <SalesItem/>
    </div>
      <div id="printMe" style="display:none;">
        <div class="mb-3">
          <h5 class="text-center">Laporan Data Transaksi</h5>
          <h6 class="text-center">Rifky Frozen Foods</h6>
        </div>

        <p>Totak Pendapatan Keseluruhan : Rp{{ toRp(totalIncome) }}</p>
        <p>Total Pendapatan Hari Ini : Rp{{ totalIncomeToday }}</p>

        <table class="table table-bordered" id="invoice-table" >
          <thead>
            <tr>
              <th>No</th>
              <th>Waktu</th>
              <th>Uang Pembeli </th>
              <th>Kembalian </th>
              <th>Kasir </th>
              <th>Total</th>
              <th>Detail Produk</th>
            </tr>
          </thead>
          <tbody>
              <tr class="transactions" v-for="(item, i) in dataFakur" :key="item.id_invoice">
                <td>{{ i+1 }}.</td>
                <td>
                  {{ item.date }}
                </td>
                <td>Rp{{ toRp(item.buyer_money) }}</td>
                <td>Rp{{ toRp(item.change_money) }}</td>
                <td v-if="item.cashier === null">Admin Gudang</td>
                <td v-else>{{ item.cashier.name }}</td>
                <td>Rp{{ toRp(item.total) }}</td>
                <td>
                  <table style="width:100%">
                    <thead>
                      <td>Nama</td>
                      <td>Qty</td>
                      <td>Subtotal</td>
                    </thead>
                    <tbody>
                      <tr class="transactions" v-for="(data) in item.transactions" :key="data.id_transaction">
                        <td>
                          {{ data.product.name }}
                        </td>
                        <td>{{ data.qty }}</td>
                        <td>Rp{{ toRp(data.subtotal) }}</td>
                      </tr>
                    </tbody>
                  </table>                  
                </td>
              </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';
import SalesItem from '@/components/template/sales/SalesItem';

export default {
  name: 'SalesData',
  props: {
    isLevel: String
  },
  components: {
    SalesItem,
  },
  computed: {
    ...mapGetters(['userData', 'dataFakur', 'totalIncome', 'totalIncomeToday']),
    toRp(){
      return (val) =>  convertRp(val);
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      datePickerValue: '',
      selectValue:'',
      filterDate: false,
      dateData: {
        startDate: '',
        endDate: '',
      },
      loadingData: false,
    };
  },
  methods: {
    ...mapActions(['getInvoices', 'getInvoicesByDate', 'getInvoicesStoreByDate', 'getInvoicesTodayByStoreId']),
    print() {
      this.$htmlToPaper('printMe');
    },
    filterReset() {
      this.loadingData = true;
      this.datePickerValue = '';
      this.selectValue = '';
      this.filterDate = false;
      this.dateData.startDate = '';
      this.dateData.endDate = '';

      if(this.isLevel === 'cashier'){
        this.getInvoicesTodayByStoreId(this.userData.id_store)
        .then((response) => {
          if(response.code === 200 || response.code === 404) {
            this.loadingData = false
          }
        });
      }else{
        this.getInvoices()
        .then((response) => {
          if(response.code === 200 || response.code === 404) {
            this.loadingData = false
          }
        });
      }

    },
    filterInvoice() {
      this.loadingData = true;
      if(this.datePickerValue === ''){
        this.$message({
          showClose: true,
          message: 'Start Date dan End Date Tidak Boleh Kosong',
          type: 'error'
        });
        this.loadingData = false;
      }else{
        const startDate = this.datePickerValue[0].toLocaleDateString('fr-CA');
        const endDate = this.datePickerValue[1].toLocaleDateString('fr-CA');

        this.dateData.startDate = startDate;
        this.dateData.endDate = endDate;
        this.filterDate = true;

        if(this.isLevel === 'cashier'){
          this.getInvoicesStoreByDate({
            id_store: this.userData.id_store,
            startDate,
            endDate,
          })
          .then((response) => {
            if(response.code === 200 || response.code === 404) {
              this.loadingData = false;
            }
          })
        }else{
          this.getInvoicesByDate({startDate, endDate})
          .then((response) => {
            if(response.code === 200 || response.code === 404) {
              this.loadingData = false;
            }
          })
        }
      }
    },
  },
};
</script>

<style scoped>
.sales {
  padding: 10px;
  background-color: var(--gray-color);
  border-radius: 10px;
}

.sales__data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sales__data__filter,
.sales__data__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sales__data__filter * {
  margin: 5px;
}

.sales__data__buttons * {
  margin: 5px;
}

.sales-items-data {
  overflow: auto;
}

#picker * {
  width: 100%;
}

#filter-title {
  font-size: 16px;
  text-align: center;
}

.sales-items-data {
  margin-top: 20px;
}

/* Table */
#invoice-table {
  border-collapse: collapse;
  width: 100%;
}

#invoice-table td,
#invoice-table th {
  border: 1px solid #ddd;
  padding: 12px;
}

#invoice-table tr:hover {
  background-color: var(--secondary);
}

#invoice-table th {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  background-color: var(--kasir-main-color);
  color: white;
}

button {
  width: 100%;
}

@media only screen and (max-width: 850px) {
  .sales__data {
    flex-direction: column;
  }
}

@media only screen and (max-height: 630px) {
  .sales-items-data {
    height: 230px;
  }
}

@media only screen and (min-height: 630px) {
  .sales-items-data {
    height: 330px;
  }
}
</style>