<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Pengguna
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="5">          
          <el-button type="primary" @click="open">
            Tambahkan Pengguna
          </el-button>
        </el-col>
      </el-row>
      <h4 id="users-title">Daftar Pengguna</h4>
      <div class="users-management">
        <UserList :editUser="editUser" :deleteUser="deleteUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from '@/components/template/users/UserList.vue';

export default {
  name: 'UserManagement',
  title:'User Management - Admin Page',
  components: {
    UserList,
  },
  methods: {
    open() {
      this.$confirm(<Jumbotron title="Total Produk" data="500" />, 'Input Data Barang Masuk', {
        confirmButtonText: 'Tambahkan Barang Masuk',
        cancelButtonText: 'Batal',
        type: 'warning'
      }).then(() => {
        alert("EYAY")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Barang Masuk dibatalkan'
        });          
      });
    },
    editUser(params) {
      alert('Edit User'+ params)
    },
    deleteUser(params) {
      alert('Delete User'+ params)
    }
  }
}
</script>

<style scoped>
.detail-store {
  margin-top: 20px;
  margin-bottom: 10px;
}

.main-content__data {
  display: flex;
  flex-direction: row;
}

.users-management {
  margin-top: 10px;
  overflow: auto;
}

#users-title {
  color: var(--gray-typo);
  font-weight: normal;
  margin-top: 20px;
}

button {
  width: 100%;
}

@media only screen and (max-height: 630px) {
  .users-management {
    height: 370px;
  }
}

@media only screen and (min-height: 630px) {
  .users-management {
    height: 470px;
  }
}
</style>