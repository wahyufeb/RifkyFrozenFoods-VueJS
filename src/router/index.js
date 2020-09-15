import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// Kasir View
import Kasir from '../views/kasir/Kasir.vue';
import StokBarang from '../views/kasir/StokBarang.vue';
import Penjualan from '../views/kasir/Penjualan.vue';

// Admin Gudang View
import DaftarKios from '../views/admin-gudang/DaftarKios.vue';
import KasirGudang from '../views/admin-gudang/KasirGudang.vue';
import PenjualanGudang from '../views/admin-gudang/PenjualanGudang.vue';
import StokBarangGudang from '../views/admin-gudang/StokBarangGudang.vue';

// Layout
import LayoutKasir from '../layouts/LayoutKasir.vue';
import LayoutAdminGudang from '../layouts/LayoutAdminGudang.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/kasir-app',
    name: 'Kasir',
    component: Kasir,
    meta: { layout: LayoutKasir },
  },
  {
    path: '/kasir-stok-barang',
    component: StokBarang,
    meta: { layout: LayoutKasir },
  },
  {
    path: '/penjualan-kasir',
    component: Penjualan,
    meta: { layout: LayoutKasir },
  },
  {
    path: '/kasir-gudang',
    component: KasirGudang,
    meta: { layout: LayoutAdminGudang },
  },
  {
    path: '/stok-barang-gudang',
    component: StokBarangGudang,
    meta: { layout: LayoutAdminGudang },
  },
  {
    path: '/daftar-kios',
    component: DaftarKios,
    meta: { layout: LayoutAdminGudang },
  },
  {
    path: '/penjualan-kasir-gudang',
    component: PenjualanGudang,
    meta: { layout: LayoutAdminGudang },
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
