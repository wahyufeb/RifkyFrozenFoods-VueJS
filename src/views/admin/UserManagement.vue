<template>
  <div class="main-content">
    <div class="main-content__title">
      Manajemen Pengguna
    </div>
    <div class="main-content__content">
      <el-row>
        <el-col :lg="5" :sm="8">          
          <el-button type="primary" @click="handleDialogVisible">
            Tambahkan Pengguna
          </el-button>
        </el-col>
      </el-row>
      <div class="users-management">
        <UserList :deleteUser="deleteUser"/>
      </div>
    </div>
    <el-dialog
      :title="titleDialog"
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <AddUser :handleDialogVisible="handleDialogVisible" :handleLoadingData="handleLoadingData"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddUser from '@/components/template/forms/AddUser.vue';
import UserList from '@/components/template/users/UserList.vue';

export default {
  name: 'UserManagement',
  title:'User Management - Admin Page',
  components: {
    UserList,
    AddUser,
  },
  data() {
    return {
      centerDialogVisible: false,
      titleDialog: '',
    }
  },
  methods: {
    ...mapActions(['getStores', 'getUsers']),
    handleDialogVisible() {
      this.titleDialog = 'Tambahkan Pengguna'
      return this.centerDialogVisible  = !this.centerDialogVisible;
    },
    deleteUser(params) {
      alert('Delete User'+ params)
    },           
    handleLoadingData(params) {
      return this.loadingData = params;
    },
  },
  created() {
    this.getStores()
    this.getUsers();
  },

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

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .main-content__content {
    height: 120vh;
  }

  .users-management {
    height: 100vh;
  }
}
</style>