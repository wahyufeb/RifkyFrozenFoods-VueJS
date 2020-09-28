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
        <div v-if="isLevel === 'warehouse' || isLevel === 'admin' ">
          <el-select v-model="selectValue" slot="prepend" placeholder="Select">
            <el-option label="Restaurant" value="1"></el-option>
            <el-option label="Order No." value="2"></el-option>
            <el-option label="Tel" value="3"></el-option>
          </el-select>
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
          <el-button type="success">Cetak Data</el-button>
        </div>
      </div>
    </div>
    <div v-show="filterDate" id="filter-title">
      Data diurutkan dari <b>{{ dateData.startDate }}</b> ke <b>{{ dateData.endDate }} </b>
    </div>
    <div class="sales-items-data" v-loading="loadingData">
      <SalesItem/>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import SalesItem from '@/components/template/sales/SalesItem';

export default {
  name: 'SalesData',
  props: {
    isLevel: String
  },
  components: {
    SalesItem,
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
    ...mapActions(['getInvoices', 'getInvoicesByDate']),
    filterReset() {
      this.loadingData = true;
      this.datePickerValue = '';
      this.selectValue = '';
      this.filterDate = false;
      this.dateData.startDate = ''
      this.dateData.endDate = ''
      this.getInvoices()
      .then((response) => {
        if(response.code === 200 || response.code === 404) {
          this.loadingData = false
        }
      })
    },
    filterInvoice() {
      this.loadingData = true;
      const startDate = this.datePickerValue[0].toLocaleDateString('fr-CA');
      const endDate = this.datePickerValue[1].toLocaleDateString('fr-CA');
      
      this.dateData.startDate = startDate;
      this.dateData.endDate = endDate;
      this.filterDate = true;

      this.getInvoicesByDate({startDate, endDate})
      .then((response) => {
        if(response.code === 200 || response.code === 404) {
          this.loadingData = false;
        }
      })
    }
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