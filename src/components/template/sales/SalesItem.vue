<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Waktu">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
        <span style="margin-left: 10px">Rp{{ toRp(scope.row.buyer_money) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Kembalian">
      <template slot-scope="scope">
        <span style="margin-left: 10px">Rp{{ toRp(scope.row.change_money) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Kios/Gudang">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.store.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Detail">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-button type="primary" @click="detailInvoice(scope.row.id_invoice)">Detail</el-button>
          </div>
      </template>
    </el-table-column>

    </el-table>
    <el-dialog
      title="Detail Invoice"
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <table v-if="centerDialogVisible" id="invoice-table" >
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Subtotal </th>
          </tr>
        </thead>
        <tbody>
            <tr class="transactions" v-for="(item, i) in dataTransaksi" :key="item.id_transaction">
              <td>{{ i+1 }}.</td>
              <td>
                {{ item.product.name }}
              </td>
              <td>{{ item.qty }}</td>
              <td>Rp{{ toRp(item.subtotal) }}</td>
            </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'SalesItem',
  data() {
    return {
      centerDialogVisible: false,
    }
  },
  computed: {      
    ...mapGetters(['dataTransaksi', 'dataFakur']),
    tableData() {
      return this.dataFakur
    },
    toRp(){
      return (val) =>  convertRp(val);
    }
  },
  methods: {
    ...mapActions(['getTransactionByInvoiceId', 'getTransaction']),
    imageData(image) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${image}`
    },
    detailInvoice(params) {
      this.centerDialogVisible = !this.centerDialogVisible;
      let data = this.$store.getters.dataFakur.find((item) => item.id_invoice === params);
      this.getTransaction(data.transactions);
    }
  },
}
</script>

<style scoped>
.transactions {
  text-align: left;
}

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
</style>