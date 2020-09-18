import Vue from 'vue';
import VueRouter from 'vue-router';
import { setDecryptCookie } from '@/helper/setCookie.js';

// Kasir View
import Kasir from '../views/kasir/Kasir.vue';
import StokBarang from '../views/kasir/StokBarang.vue';
import Penjualan from '../views/kasir/Penjualan.vue';

// Admin Gudang View
import DaftarKios from '../views/admin-gudang/DaftarKios.vue';
import KasirGudang from '../views/admin-gudang/KasirGudang.vue';
import PenjualanGudang from '../views/admin-gudang/PenjualanGudang.vue';
import StokBarangGudang from '../views/admin-gudang/StokBarangGudang.vue';

// Admin View
import Dashboard from '../views/admin/Dashboard.vue';
import ProductManagement from '../views/admin/ProductManagement.vue';
import UserManagement from '../views/admin/UserManagement.vue';
import ReportManagement from '../views/admin/ReportManagement.vue';

// Accounts View
import Login from '../views/accounts/Login.vue';

// Layout
import LayoutLogin from '../layouts/LayoutLogin.vue';
import LayoutKasir from '../layouts/LayoutKasir.vue';
import LayoutAdminGudang from '../layouts/LayoutAdminGudang.vue';
import LayoutAdmin from '../layouts/LayoutAdmin.vue';

Vue.use(VueRouter);

const routes = [
  // Login
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: LayoutLogin },
    beforeEnter: (to, from, next) => {
      if (to.path === '/') {
        let token = setDecryptCookie('TOKEN');
        let role = setDecryptCookie('ROLE');
        if (token.length !== 0) {
          if (role == 'cashier') {
            next('/kasir-app');
          } else if (role == 'warehouse') {
            next('/kasir-gudang');
          } else if (role == 'admin') {
            next('/dashboard-admin');
          } else {
            next();
          }
        } else {
          next()
        }
      }
    }
  },

  // Kasir Routes
  {
    path: '/kasir-app',
    name: 'Kasir',
    component: Kasir,
    meta: { auth: true, role: 'cashier', layout: LayoutKasir },
  },
  {
    path: '/kasir-stok-barang',
    component: StokBarang,
    meta: { auth: true, role: 'cashier', layout: LayoutKasir },
  },
  {
    path: '/penjualan-kasir',
    component: Penjualan,
    meta: { auth: true, role: 'cashier', layout: LayoutKasir },
  },

  // Admin Gudang Routes
  {
    path: '/kasir-gudang',
    component: KasirGudang,
    meta: { auth: true, role: 'warehouse', layout: LayoutAdminGudang },
  },
  {
    path: '/stok-barang-gudang',
    component: StokBarangGudang,
    meta: { auth: true, role: 'warehouse', layout: LayoutAdminGudang },
  },
  {
    path: '/daftar-kios',
    component: DaftarKios,
    meta: { auth: true, role: 'warehouse', layout: LayoutAdminGudang },
  },
  {
    path: '/penjualan-kasir-gudang',
    component: PenjualanGudang,
    meta: { auth: true, role: 'warehouse', layout: LayoutAdminGudang },
  },

  // Admin Routes
  {
    path: '/dashboard-admin',
    component: Dashboard,
    meta: { auth: true, role: 'admin', layout: LayoutAdmin },
  },
  {
    path: '/manajemen-produk',
    component: ProductManagement,
    meta: { auth: true, role: 'admin', layout: LayoutAdmin },
  },
  {
    path: '/manajemen-pengguna',
    component: UserManagement,
    meta: { auth: true, role: 'admin', layout: LayoutAdmin },
  },
  {
    path: '/manajemen-laporan',
    component: ReportManagement,
    meta: { auth: true, role: 'admin', layout: LayoutAdmin },
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    let token = setDecryptCookie('TOKEN');
    let refresh = setDecryptCookie('REFRESH_TOKEN')
    let role = setDecryptCookie('ROLE')
    let dataId = setDecryptCookie('ID');
    if (token.length === 0 || refresh.length === 0 || role.length === 0 || dataId.length === 0) {
      next('/');
    } else {
      if (to.matched.some(record => record.meta.role)) {
        if (role !== to.meta.role) {
          next('/')
        } else {
          next();
        }
      } else {
        next('/');
      }
    }
  } else {
    next();
  }
});

export default router;
