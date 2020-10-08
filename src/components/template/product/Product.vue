<template>
  <div class="product" >
    <img :src="imageData(image)" alt="name" @click="addToCart">
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
    id_product: Number,
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
        id_product: this.id_product,
        image: this.image,
        name: this.name,
        price: this.price,
        qty: 1,
        subtotal: 0,
      };
      this.addProduct(data);
    },
    imageData(image) {
      // eslint-disable-next-line no-undef
      return `${process.env.VUE_APP_API_RESOURCE}/uploads/products/${image}`
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.product:hover {
  cursor: pointer;
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

/*  For Tab with 8 inch */
@media only screen and (max-width: 970px) {
  .product {
    margin: 5px;
  }

  .product img {
    width: 80px;
    height: 80px;
  }
}
</style>