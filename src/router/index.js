import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Kasir View
import Kasir from '../views/kasir/Kasir.vue';
import StokBarang from '../views/kasir/StokBarang.vue';
import Penjualan from '../views/kasir/Penjualan.vue';

// Layout
import LayoutKasir from '../layouts/LayoutKasir.vue';
import LayoutAdminGudang from '../layouts/LayoutAdminGudang.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: LayoutAdminGudang },
  },
  {
    path: '/kasir-app',
    name: 'Kasir',
    component: Kasir,
    meta: { layout: LayoutKasir },
  },
  {
    path: '/stok-barang',
    component: StokBarang,
    meta: { layout: LayoutKasir },
  },
  {
    path: '/penjualan-kasir',
    component: Penjualan,
    meta: { layout: LayoutKasir },
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
