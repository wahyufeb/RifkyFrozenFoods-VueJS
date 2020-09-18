<template>
  <div class="store-list">
    <el-row >
      <el-col :lg="6" class="store-item-wrapper">
        <div class="store-item">
          <div class="store-item__image">
            <i class="el-icon-s-shop"></i>
          </div>
          <div class="store-item__description">
            <h4>Kios Mandiraja</h4>
            <p>
              <i class="el-icon-location"></i>
              Mandiraja
            </p>
        </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'StoreList',
}
</script>

<style scoped>
.store-list {
  background-color: var(--gray-color);
  padding: 10px;
  border-radius: 10px;
}

.store-item-wrapper {
  padding: 5px;
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

/* .store-item__description {
  display: flex;
} */
</style>