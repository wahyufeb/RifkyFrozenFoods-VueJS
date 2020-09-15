<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Waktu">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.waktu }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Total">
      <template slot-scope="scope">
        <span style="margin-left: 10px">Rp{{ toRp(scope.row.total) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Uang Pembeli">
      <template slot-scope="scope">
        <span style="margin-left: 10px">Rp{{ toRp(scope.row.buyerMoney) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Kembalian">
      <template slot-scope="scope">
        <span style="margin-left: 10px">Rp{{ toRp(scope.row.change) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Detail">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Total : Rp{{ toRp(scope.row.total) }}</p>
          <p>Kembalian : Rp{{ toRp(scope.row.change) }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">Detail</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import convertRp from '@/helper/convertRupiah.js';

export default {
  data() {
    return {
      tableData: [
        {
          waktu: '2016-05-03',
          total: 100000,
          buyerMoney: 200000,
          change: 100000
        },
        {
          waktu: '2016-05-02',
          total: 50000,
          buyerMoney: 60000,
          change: 0
        },
        {
          waktu: '2016-05-02',
          total: 50000,
          buyerMoney: 60000,
          change: 0
        },
        {
          waktu: '2016-05-02',
          total: 50000,
          buyerMoney: 60000,
          change: 0
        },
      ]
    }
  },
  computed: {      
    toRp(){
      return (val) =>  convertRp(val);
    }
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>