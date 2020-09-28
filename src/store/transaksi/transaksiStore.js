/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  transaksi: []
};

const getters = {
  dataTransaksi: state => state.transaksi,
};

const actions = {
  async getTransactionByInvoiceId({ commit }, id_invoice) {
    let token = setDecryptCookie('TOKEN', null);
    const reqTransactionByInvoiceData = await axios.get(`${process.env.VUE_APP_BASE_API}/transaction/${id_invoice}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resTransactionByInvoiceData = await reqTransactionByInvoiceData.data;
    commit('setTransactionByInvoiceIdLoaded', resTransactionByInvoiceData.data);
    return resTransactionByInvoiceData;
  },
  getTransaction({ commit }, data) {
    commit('setTransactionByInvoiceIdLoaded', data);
  }
};

const mutations = {
  setTransactionByInvoiceIdLoaded(state, data) {
    state.transaksi = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}