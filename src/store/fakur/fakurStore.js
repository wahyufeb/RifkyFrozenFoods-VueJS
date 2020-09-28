/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  fakur: []
};

const getters = {
  dataFakur: state => state.fakur.reverse(),
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
  }
};

const mutations = {
  setInvoiceLoaded(state, data) {
    console.log(data)
    state.fakur = data;
    return state.fakur;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}