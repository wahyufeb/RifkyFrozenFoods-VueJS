/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  kios: [],
};

const getters = {
  kiosData: state => state.kios,
};

const actions = {
  async getStores({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqStores = await axios.get(`${process.env.VUE_APP_BASE_API}/stores`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resStores = await reqStores.data;
    commit('setStoreLoaded', resStores.data);
    return resStores;
  },
  async saveStoreProcess({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const reqSaveStore = await axios.post(`${process.env.VUE_APP_BASE_API}/stores/create`, data, headerConfig);
    const resSaveStore = await reqSaveStore.data;
    if (resSaveStore.code === 201) {
      commit('setStoreCreated', resSaveStore.data);
    }
    return resSaveStore;
  },
  async deleteStoreProcess({ commit }, id_store) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteStore = await axios.delete(`${process.env.VUE_APP_BASE_API}/stores/${id_store}/delete`, headerConfig);
    const resDeleteStore = await reqDeleteStore.data;
    commit('setStoreDeleted', id_store);
    return resDeleteStore;
  }
};

const mutations = {
  setStoreLoaded(state, data) {
    state.kios = data;
  },
  setStoreCreated(state, data) {
    state.kios.push(data);
  },
  setStoreDeleted(state, id_store) {
    state.kios = state.kios.filter((kiosItem) => kiosItem.id_store !== id_store);
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}