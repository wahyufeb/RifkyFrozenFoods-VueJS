<template>
  <div class="product" >
    <img :src="image" alt="name" @click="addToCart">
    <div class="product__detail">
      {{ name }}
      <h4>Rp{{ toRp }}</h4>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapActions } from 'vuex';
import convertRp from '@/helper/convertRupiah.js';

export default {
  name: 'Product',
  props: {
    idProduct: Number,
    image: String,
    name: String,
    price: Number,
  },
  computed: {
    toRp(){
      return convertRp(this.price)
    },
  },
  methods: {
    ...mapActions(['addProduct']),
    addToCart(){
      const data = {
        idCart: uuidv4(),
        idProduct: this.idProduct,
        image: this.image,
        name: this.name,
        price: this.price,
        qty: 1,
        subtotal: 0,
      };
      this.addProduct(data);
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

.product img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.product__detail {
  margin-top: 10px;
  font-size: 12px;
  font-weight: normal;
  color: var(--gray-typo);
}

.product__detail h4 {
  font-weight: 600;
}

@media only screen and (max-width: 768px) {
  .product img {
    width: 120px;
    height: 120px;
  }
}
</style>