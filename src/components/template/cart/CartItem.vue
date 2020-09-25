<template>
  <div class="cart-item">
    <div class="cart-item__data">
      <img :src="imageData(image)" :alt="name">
      <div class="cart-item__detail">
        <div class="cart-item__nama">
          {{ name }}
        </div>
        <div class="cart-item__harga">
          Rp{{ toRp(price) }}
        </div>
        <div class="cart-item__qty">
          <div class="cart-item__qty__button btn-minus" @click='minQty(idCart)'>
            <i class="el-icon-minus"></i>
          </div>
          <div class="cart-item__qty__value">{{ toRp(qty) }}</div>
          <div class="cart-item__qty__button btn-plus" @click='addQty(idCart)'>
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-item__subtotal">
      Rp{{ toRp(subtotal) }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'CartItem',
  props: {
    idCart: String,
    idProduct: Number,
    image: String,
    name: String,
    price: Number,
    qty: Number,
    subtotal: Number,
  },
  methods: {
    ...mapActions(['addQty', 'minQty']),
    toRp(val){
      return convertRp(val);
    },
    imageData(image) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${image}`
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--secondary);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.cart-item__data {
  display: flex;
  flex-direction: row;
}

.cart-item__data img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item__detail {
  margin-left: 10px;
  font-size: 12px;
  color: var(--gray-typo);
}

.cart-item__harga {
  font-weight: 500;
}

.cart-item__qty {
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
}

.cart-item__qty__button {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
}

.btn-minus {
  background-color: #f56c6c;
}

.btn-plus {
  background-color: #67c23a;
}

.cart-item__subtotal {
  font-weight: 500;
  align-self: flex-end;
  font-size: 14px;
  color: var(--gray-typo);
}
</style>