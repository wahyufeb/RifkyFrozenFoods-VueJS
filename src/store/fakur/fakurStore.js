/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  fakur: [],
  isPrint: false
};

const getters = {
  dataFakur: state => state.fakur.reverse(),
  printValue: state => state.isPrint,
};

const actions = {
  async getInvoices({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqInvocies = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resInvoices = await reqInvocies.data;
    commit('setInvoiceLoaded', resInvoices.data);
    return resInvoices;
  },
  async getInvoicesByDate({ commit }, date) {
    const { startDate, endDate } = date;
    let token = setDecryptCookie('TOKEN', null);
    const reqInvoicesByDate = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/${startDate}/${endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resInvoicesByDate = await reqInvoicesByDate.data;
    commit('setInvoiceLoaded', resInvoicesByDate.data);
    return resInvoicesByDate;
  },
  // cashier only ========================
  async getInvoicesTodayByStoreId({ commit }, id_store) {
    let token = setDecryptCookie('TOKEN', null);
    const reqInvoicesTodayByStoreId = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/${id_store}/today`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resInvoicesTodayByStoreId = await reqInvoicesTodayByStoreId.data;
    commit('setInvoiceLoaded', resInvoicesTodayByStoreId.data);
    return resInvoicesTodayByStoreId;
  },
  async getInvoicesStoreByDate({ commit }, data) {
    const { startDate, endDate, id_store } = data;
    let token = setDecryptCookie('TOKEN', null);
    const reqInvoicesStoreByDate = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/${id_store}/${startDate}/${endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resInvoicesStoreByDate = await reqInvoicesStoreByDate.data;
    commit('setInvoiceLoaded', resInvoicesStoreByDate.data);
    return resInvoicesStoreByDate;
  },
  // ======================================
};

const mutations = {
  setInvoiceLoaded(state, data) {
    state.fakur = data;
  },
  setPrint(state) {
    state.isPrint = !state.isPrint;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}