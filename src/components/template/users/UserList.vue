<template>
<div class="wrapper-users">
  <div class="users" v-for="admin in penggunaDataAdmin" :key="admin.id_admin * 1">
    <div class="users__list">
      <div class="users__data">
        <div class="users__data__photo">
          <img :src="imageData(admin.photo)" :alt="admin.name">
        </div>
        <div class="users__data__name">{{ admin.name }}</div>
      </div>
    </div>
    <div class="users__data__admin">Admin</div>
  </div><br>

  <div class="users" v-for="warehouse in penggunaDataWarehouse" :key="warehouse.id_warehouse_admin * 2">
    <div class="users__list">
      <div class="users__data">
        <div class="users__data__photo">
          <img :src="imageData(warehouse.photo)" :alt="warehouse.name">
        </div>
        <div class="users__data__name">{{ warehouse.name }}</div>
      </div>
      <div class="users__store">
        {{warehouse.store.name }}, {{warehouse.store.location}}
      </div>
      <div class="users__data__warehouse">Admin Gudang</div>
    </div>
    <div class="users__actions">
      <el-button type="danger" @click="deleteDataWarehouse(warehouse.id_warehouse_admin)">
        <i class="el-icon-delete"></i>
      </el-button>
    </div>
  </div><br>

  <div class="users" v-for="cashier in penggunaDataCashier" :key="cashier.id_cashier * 3">
    <div class="users__list">
      <div class="users__data">
        <div class="users__data__photo">
          <img :src="imageData(cashier.photo)" :alt="cashier.name">
        </div>
        <div class="users__data__name">{{ cashier.name }}</div>
      </div>
      <div class="users__store">
        {{cashier.store.name }}, {{cashier.store.location}}
      </div>
      <div class="users__data__cashier">Cashier</div>
    </div>
    <div class="users__actions">
      <el-button type="danger" @click="deleteDataCashier(cashier.id_cashier)">
        <i class="el-icon-delete"></i>
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'UserList',
  props: {
    deleteUser: Function,
  },
  computed: {
    ...mapGetters(['penggunaDataAdmin', 'penggunaDataWarehouse', 'penggunaDataCashier'])
  },
  methods: {
    ...mapActions(['deleteUserCashier', 'deleteUserWarehouse']),
    imageData(photo) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/photo/${photo}`
    },
    deleteDataWarehouse(params) {
      this.deleteUserWarehouse(params)
      .then((response) => {
        if(response.code === 204){
          this.$notify({
            title: 'Success',
            message: "Berhasil Menghapus Admin Gudang",
            type: 'success'
          });
        }else{
          this.$notify.error({
            title: 'Error',
            message: "Gagal Menghapus Admin Gudang"
          });
        }
      })
    },
    deleteDataCashier(params) {
      this.deleteUserCashier(params)
      .then((response) => {
        if(response.code === 204){
          this.$notify({
            title: 'Success',
            message: "Berhasil Menghapus Kasir",
            type: 'success'
          });
        }else{
          this.$notify.error({
            title: 'Error',
            message: "Gagal Menghapus Kasir"
          });
        }
      })
    },
  }
};
</script>

<style scoped>
.wrapper-users {
  margin-top: 40px;
}

.users {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary);
  border-radius: 10px;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.users__list {
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.users__data {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.users__data__admin,
.users__data__warehouse,
.users__data__cashier {
  padding: 5px;
  border-radius: 5px;
  color: #fff;
}

.users__data__admin {
  background-color: blueviolet;
}

.users__data__warehouse {
  background-color: teal;
}

.users__data__cashier {
  background-color: tomato;
}

.users__data .users__data__photo img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.users__data .users__data__name {
  width: 200px;
  font-weight: 600;
}

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .users__store {
    font-size: 14px;
  }

  .users__data__admin,
  .users__data__warehouse,
  .users__data__cashier {
    margin: 5px;
    font-size: 12px;
  }
}
</style>