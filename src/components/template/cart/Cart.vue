<template>
  <div class="cart">
    <div v-if="keranjangBelanja.length !== 0">
      <div class="cart-data">
        <div class="cart-items">
          <div v-for="item in keranjangBelanja" :key="item.idCart" >
              <CartItem 
              :idCart="item.idCart" 
              :idProduct="item.idProduct"
              :image="item.image" 
              :name="item.name" 
              :price="item.price" 
              :qty="item.qty" 
              :subtotal="item.subtotal"/>
          </div>
        </div>
        <div>
          <div class="buyer">
            <div class="buyer__data">
              Uang Pembeli
              <el-input type="number" style="width:140px" placeholder="Uang pembeli" v-model="uangPembeli"></el-input>
            </div>
            <div class="buyer__data">
              Uang Kembalian
              <el-input style="width:140px" v-model="uangKembalian" :disabled="true"></el-input>
            </div>
          </div>
          <div class="cart__total">
            <div>Total</div>
            <div id="total-cart">Rp{{ toRp(totalCart) }}</div>
          </div>
          <el-button id="paying" type="primary" @click="checkoutCashier">Bayar Sekarang</el-button>
        </div>    
      </div>
    </div>
    <div v-else class="cart-empty">
      Tidak ada barang
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setDecryptCookie } from '@/helper/setCookie.js';
import convertRp from '@/helper/convertRupiah.js';
import CartItem from '@/components/template/cart/CartItem';

export default {
  name: 'Cart',
  components: {
    CartItem,
  },
  data(){
    return {
      uangPembeli: '',
    };
  },
  computed: {
    ...mapGetters(['userData', 'keranjangBelanja', 'totalCart']),
    uangKembalian() {
      let kembalian = this.uangPembeli - this.totalCart
      if (kembalian < 0) {
        let totalKembalian = this.toRp(kembalian * (-1));
        return `Kurang Rp${totalKembalian}`
      } else {
        let totalKembalian = this.toRp(kembalian);
        return `Rp${totalKembalian}`;
      }
    },
  },
  methods : {
    ...mapActions(['checkoutCashier', 'saveInvoiceProcess']),
    toRp(val){
      return convertRp(val);
    },
    checkoutCashier() {
      let role = setDecryptCookie('ROLE');
      let kembalian = this.uangPembeli - this.totalCart;

      const invoiceData = {
        id_store: this.userData.id_store,
        total: this.totalCart,
        buyer_money: parseInt(this.uangPembeli),
        change_money: kembalian
      }

      if(role === 'warehouse'){
        invoiceData.id_cashier = 0
      }else{
        invoiceData.id_cashier = this.userData.id_cashier
      }
      
      if(kembalian < 0){
        this.$message.error(`Oops, Uang anda kurang Rp${this.toRp(kembalian*(-1))}`);
      }else{
        const allData = {
          invoice: invoiceData,
          keranjangBelanja: this.keranjangBelanja 
        }
        this.saveInvoiceProcess(allData)
        .then((response) => {
          if(response.code !== 201){
            this.$message.error('😥 Transaksi Gagal, Silahkan Coba Lagi');
          }else{
            this.$message({
              message: '✔ Transaksi Berhasil',
              type: 'success'
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.cart {
  padding: 10px;
}

.cart-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-items {
  overflow: auto;
}

.buyer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.buyer__data {
  color: var(--gray-typo);
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
}

.cart__total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-typo);
  margin: 5px 0;
}

.cart-empty {
  color: var(--gray-typo);
  text-align: center;
}
#total-cart {
  color: var(--kasir-main-color);
}

#paying {
  width: 100%;
  margin-top: 20px;
}

@media only screen and (max-height: 630px) {
  .cart-data {
    height: 500px;
  }
  .cart-items {
    height: 360px;
  }
}

@media only screen and (min-height: 630px) {
  .cart-data {
    height: 630px;
  }
  .cart-items {
    height: 490px;
  }
}

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .cart {
    padding: 2px;
  }
}
</style>