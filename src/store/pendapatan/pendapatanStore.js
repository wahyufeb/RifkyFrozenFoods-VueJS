/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  totalIncome: 0,
  totalIncomeToday: 0,
};

const getters = {
  totalIncome: state => {
    return state.totalIncome;
  },
  totalIncomeToday: state => {
    return state.totalIncomeToday
  }
};

const actions = {
  async getTotalIncome({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqTotalIncome = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/total-income`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resTotalIncome = await reqTotalIncome.data;
    if (resTotalIncome.code === 200) {
      commit('setTotalIncome', resTotalIncome.data);
    }
  },
  async getTotalIncomeToday({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqTotalIncomeToday = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/total-income-today`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resTotalIncomeToday = await reqTotalIncomeToday.data;
    if (resTotalIncomeToday.code === 200) {
      commit('setTotalIncomeToday', resTotalIncomeToday.data);
    }
  },
  async getTotalIncomeTodayByStoreId({ commit }, id_store) {
    let token = setDecryptCookie('TOKEN', null);
    const reqTotalIncomeTodayStoreId = await axios.get(`${process.env.VUE_APP_BASE_API}/invoice/${id_store}/total-income-today`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resTotalIncomeTodayStoreId = await reqTotalIncomeTodayStoreId.data;
    if (resTotalIncomeTodayStoreId.code === 200) {
      commit('setTotalIncomeToday', resTotalIncomeTodayStoreId.data);
    }
  },
};

const mutations = {
  setTotalIncome(state, totalIncome) {
    return state.totalIncome = totalIncome;
  },
  setTotalIncomeToday(state, totalIncomeToday) {
    return state.totalIncomeToday = totalIncomeToday;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}