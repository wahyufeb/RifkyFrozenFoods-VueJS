/* eslint-disable no-undef */
import axios from 'axios';
import { setEncryptCookie, setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  userData: [],
};

const getters = {
  userData: (state) => {
    return state.userData;
  },
};

const actions = {
  async loginUserProcess({ commit }, data) {
    const reqApiLogin = await axios.post(`${process.env.VUE_APP_BASE_API}/users/${data.role}/login`, {
      username: data.username,
      password: data.password
    });
    const resApiLoginZ = await reqApiLogin.data;
    if (resApiLoginZ.code === 200) {
      commit('setAuth', resApiLoginZ.data);
    }
    return reqApiLogin;
  },
  async authorization({ commit }, cashierId) {
    let token = setDecryptCookie('TOKEN', null);
    let role = setDecryptCookie('ROLE', null);
    const reqApiAuth = await axios.get(`${process.env.VUE_APP_BASE_API}/users/${role}/${cashierId}/authorization`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resApiAuth = await reqApiAuth.data;
    commit('currentAuth', resApiAuth.data);
    return resApiAuth;
  },
  async refreshTokenProcess({ commit }, refreshToken) {
    let role = setDecryptCookie('ROLE', null);
    const reqRefreshTokenApi = await axios.post(`${process.env.VUE_APP_BASE_API}/users/${role}/refresh-token`, {
      refresh_token: refreshToken,
    });
    const resRefreshTokenApi = await reqRefreshTokenApi.data;
    if (resRefreshTokenApi.code === 200) {
      commit('setAuth', resRefreshTokenApi.data);
    }
    return reqRefreshTokenApi;

  }
};

const mutations = {
  setAuth(state, data) {
    setEncryptCookie('TOKEN', data.token);
    setEncryptCookie('REFRESH_TOKEN', data.refresh);
    setEncryptCookie('ROLE', data.role);
    if (data.role == 'cashier') setEncryptCookie('ID', data.id_cashier);
    if (data.role == 'warehouse') setEncryptCookie('ID', data.id_warehouse_admin);
    if (data.role == 'admin') setEncryptCookie('ID', data.id_admin);
    state.userData = data;
  },
  currentAuth(state, data) {
    state.userData = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}