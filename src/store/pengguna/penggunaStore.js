/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  pengguna: {
    admin: [],
    warehouse: [],
    cashier: [],
  },
};

const getters = {
  penggunaDataAdmin: state => state.pengguna.admin,
  penggunaDataWarehouse: state => state.pengguna.warehouse,
  penggunaDataCashier: state => state.pengguna.cashier,
};

const actions = {
  async getUsers({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.get(`${process.env.VUE_APP_BASE_API}/users/admin`, headerConfig).then((response) => commit('setUsersLoaded', { data: response.data.data, type: 'admin' }));
    await axios.get(`${process.env.VUE_APP_BASE_API}/users/warehouse`, headerConfig).then((response) => commit('setUsersLoaded', { data: response.data.data, type: 'warehouse' }));
    await axios.get(`${process.env.VUE_APP_BASE_API}/users/cashier`, headerConfig).then((response) => commit('setUsersLoaded', { data: response.data.data, type: 'cashier' }));
  },
  async saveUserProcess({ commit }, data) {
    const { username, name, password, storeId, level } = data;
    let formUser = {
      username,
      name,
      password,
      id_product_storage: 0,
      id_store: storeId,
    }

    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (level === 'admin') {
      formUser = {
        username,
        name,
        password,
      }
    }
    const reqSaveUser = await axios.post(`${process.env.VUE_APP_BASE_API}/users/${level}/create`, formUser, headerConfig);
    const resSaveUser = await reqSaveUser.data;
    commit('setUserCreated', { type: level, data: resSaveUser.data });
    return resSaveUser;
  },
  async deleteUserCashier({ commit }, id_cashier) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteCashier = await axios.delete(`${process.env.VUE_APP_BASE_API}/users/cashier/${id_cashier}/delete`, headerConfig);
    const resDeleteCashier = await reqDeleteCashier.data;
    commit('setCashierDeleted', id_cashier);
    return resDeleteCashier;
  },
  async deleteUserWarehouse({ commit }, id_warehouse_admin) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteWarehouse = await axios.delete(`${process.env.VUE_APP_BASE_API}/users/warehouse/${id_warehouse_admin}/delete`, headerConfig);
    const resDeleteWarehouse = await reqDeleteWarehouse.data;
    commit('setWarehouseDeleted', id_warehouse_admin);
    return resDeleteWarehouse;
  },
};

const mutations = {
  setUserCreated(state, { type, data }) {
    if (type === 'admin') state.pengguna.admin.push(data);
    if (type === 'warehouse') state.pengguna.warehouse.push(data);
    if (type === 'cashier') state.pengguna.cashier.push(data);
  },
  setUsersLoaded(state, { data, type }) {
    if (type === 'admin') state.pengguna.admin = data;
    if (type === 'warehouse') state.pengguna.warehouse = data;
    if (type === 'cashier') state.pengguna.cashier = data;
  },
  setCashierDeleted(state, id_cashier) {
    state.pengguna.cashier = state.pengguna.cashier.filter((pengguna) => pengguna.id_cashier !== id_cashier)
  },
  setWarehouseDeleted(state, id_warehouse_admin) {
    state.pengguna.warehouse = state.pengguna.warehouse.filter((pengguna) => pengguna.id_warehouse_admin !== id_warehouse_admin)
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}