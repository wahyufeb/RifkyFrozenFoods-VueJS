<template>
  <div class="store-list">
    <el-row >
      <el-col v-for="kios in kiosData" :key="kios.id_store" :lg="8" class="store-item-wrapper">
        <div class="store-item">
          <div class="store-item__image">
            <i class="el-icon-s-shop"></i>
          </div>
          <div class="store-item__description">
            <h4>{{ kios.name }}</h4>
            <p>
              <i class="el-icon-location"></i>
              {{ kios.location }}
            </p>
          </div>
          <div v-if="isLevel === 'warehouse' " class="delete" @click="deleteStore(kios.id_store)">
            x
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'StoreList',
  props: {
    isLevel: String,
  },
  computed: {
    ...mapGetters(['kiosData']),
  },
  methods: {
    ...mapActions(['getStores', 'deleteStoreProcess']),
    deleteStore(id_store) {
      this.deleteStoreProcess(id_store)
      .then((response) => {
        if(response.code !== 204){          
          this.$notify.error({
            title: 'Error',
            message: response.message,
            offset: 100
          });
        }else{          
          this.$notify.success({
            title: 'Success',
            message: response.message,
            offset: 100
          });
        }
      });
    }
  },
  created() {
    this.getStores();
  }
}
</script>

<style scoped>
.store-list {
  background-color: var(--gray-color);
  padding: 10px;
  border-radius: 10px;
  height: 350px;
  overflow: auto;
}

.store-item-wrapper {
  padding: 5px;
  position: relative;
}

.store-item {
  display: flex;
  flex-direction: row;
  background-color: var(--kasir-main-color);
  border-radius: 10px;
  color: #fff;
  padding: 10px;
}

.store-item__image {
  font-size: 50px;
  margin-right: 20px;
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
}

.delete {
  cursor: pointer;
  position: absolute;
  background-color: red;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}

/* .store-item__description {
  display: flex;
} */
</style>