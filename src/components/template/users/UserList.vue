<template>
<div>
  <div class="users">
    <div class="users__list">
      <div class="users__data">
        <div class="users__data__photo">
          <img src="https://lh3.googleusercontent.com/proxy/wAYCT18cGHBWB6g6arOktmeFQB4CtTKhifTaqC7_zxWpkgMapjl-x5xmBXw2N1yuZX_v4NqvjRsySsmBf6cC6SMA57MXnl4YSnnNW7MYdIyhoWVJgN8B" alt="photo">
        </div>
        <div class="users__data__name">P'Orn BNK48</div>
      </div>
      <div class="users__store">
        Kios Mandiraja, Mandiraja Kulon
      </div>
    </div>
    <div class="users__actions">
      <el-button type="primary" @click="editUserData(1)">
        <i class="el-icon-edit-outline"></i>
      </el-button>
      <el-button type="danger" @click="deleteUserData(1)">
        <i class="el-icon-delete"></i>
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    editUser: Function,
    deleteUser: Function,
  },
  methods: {
    editUserData(params) {
      this.editUser(params);
    },
    deleteUserData(params) {
      this.deleteUser(params);
    },
  }
};
</script>

<style scoped>
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
  width: 500px;
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

.users__data .users__data__photo img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.users__data .users__data__name {
  font-weight: 600;
}
</style>