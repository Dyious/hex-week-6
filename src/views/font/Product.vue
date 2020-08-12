<template>
  <div>
    <h2 class="mt-3">產品內容</h2>
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item d-flex justify-content-center"
          :class="index===0?'active':''"
          v-for="( image, index ) in product.imageUrl"
          :key="index"
        >
          <img
            :src="image"
            class="d-block"
            width="600px"
          >
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container mt-3">
      <h3>{{product.title}}</h3>
      <h4>{{product.content}}</h4>
      <h5 class="text-secondary">{{product.description}}</h5>
      <div class="row justify-content-around align-item-end mt-5">
        <span>定價: ${{product.origin_price}}</span>
        <h5>售價: ${{product.price}}</h5>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">選擇件數</label>
        <select
          class="form-control text-center"
          id="exampleFormControlSelect1"
          v-model="ownerChoice.quantity"
        >
          <option
            v-for="number in [1,2,3,4,5]"
            :key="number"
            :value="number"
          >選擇{{number}}件,總價${{number * product.price}}
          </option>
        </select>
      </div>
      <div
        class="btn btn-lg btn-success"
        @click="addCart()"
      >加入購物車</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      product: {},
      ownerChoice: {
        quantity: 0
      }
    }
  },
  methods: {
    addCart () {
      let messageAlrt = ''
      const load = this.$loading.show()
      this.$http.post(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`, {
        product: this.product.id,
        quantity: this.ownerChoice.quantity
      })
        .then((res) => {
          messageAlrt = '加入購物車成功'
          console.log(res.data.data)
        }).catch((err) => {
          messageAlrt = '加入購物車失敗'
          console.log(err)
        }).finally(() => {
          load.hide()
          alert(messageAlrt)
        })
    }
  },
  created () {
    const load = this.$loading.show()
    this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${this.$route.params.id}`)
      .then((res) => {
        this.product = res.data.data
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        load.hide()
      })
  }
}
</script>
