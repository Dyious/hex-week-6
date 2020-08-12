<template>
  <div>
    <h2 class="mt-3">產品列表</h2>
    <div class="card-part">
      <div
        class="card-self border "
        v-for="(product,index) in products"
        :key="index"
      >
        <img
          :src="product.imageUrl[0]"
          class="img-fluid product-img"
          height="150px"
        >
        <h5 class="text-title">{{product.title}}</h5>
        <div class="text-body">
          <span>{{product.content}}</span>
        </div>
        <div class="btn-group btn-sm  btn-block my-3">
          <button
            class="btn btn-outline-success"
            @click="openDetail(product.id)"
          >查看詳情</button>
          <button
            class="btn btn-outline-warning"
            @click="newCart(product)"
          >加入購物車</button>
        </div>
      </div>
    </div>
    <!-- <router-link :to="`/product/123123`">link</router-link> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    openDetail (id) {
      // 跳轉product
      this.$router.push(`/product/${id}`)
    },
    newCart (item) {
      const loader = this.$loading.show()
      const newItem = { product: item.id, quantity: 1 }
      this.$http.post(
        `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`, newItem)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          loader.hide()
        })
    }
  },
  created () {
    // loading
    const loader = this.$loading.show()
    // ajax catch all products
    this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`)
      .then((res) => {
        this.products = res.data.data
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        loader.hide()
      })
  }
}
</script>
<style>
.card-part {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 45px 0 45px;
  text-align: left;
}
.card-part > div {
  flex: 0 0 250px;
}
.card-self {
  margin: 15px;
}
.product-img {
  opacity: 0.85;
  box-shadow: 1px 1px 1px 1px #cccccc;
}
.text-title {
  padding: 15px 15px 0 15px;
}
.text-body {
  padding: 15px;
  margin: 0 0 5px 0;
  height: 100px;
  overflow: auto;
}
</style>
