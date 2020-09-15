<template>
  <div class="sales">
    <div class="sales__data">
      <div class="sales__data__filter">
        <div id="picker">
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div v-if="warehouseMode">
          <el-select v-model="select" slot="prepend" placeholder="Select">
            <el-option label="Restaurant" value="1"></el-option>
            <el-option label="Order No." value="2"></el-option>
            <el-option label="Tel" value="3"></el-option>
          </el-select>
        </div>
      </div>
      <div class="sales__data__buttons">
        <div>
          <el-button type="danger">Reset</el-button>
        </div>
        <div>
          <el-button type="primary">Urutkan</el-button>
        </div>
        <div v-if="warehouseMode">
          <el-button type="success">Cetak Data</el-button>
        </div>
      </div>
    </div>
    <div class="sales-items-data">
      <SalesItem />
    </div>
</div>
</template>

<script>
import SalesItem from '@/components/template/sales/SalesItem';

export default {
  name: 'SalesData',
  props: {
    warehouseMode: Boolean
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
      value1: '',
      select:''
    };
  }
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