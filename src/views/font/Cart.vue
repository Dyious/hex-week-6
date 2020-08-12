<template>
  <div>
    <div class="d-flex justify-content-around">
      <div class=""></div>
      <h3 class="mt-3">購物車列表</h3>
      <div class="d-flex align-items-end">
        <button
          type="button"
          class="btn btn-outline-info"
          @click="removeAll()"
        >清除全部</button>
      </div>

    </div>
    <div class="row mx-2">
      <div class="col-2">#</div>
      <div class="col-3">內容</div>
      <div class="col-2">圖片</div>
      <div class="col-2">數量</div>
      <div class="col-1">單位</div>
      <div class="col-2">小計</div>
    </div>
    <div
      class="row mt-3 mx-2"
      v-for="(cart,index) in carts"
      :key="index"
    >
      <div class="col-2">
        <button
          class="btn btn-sm btn-danger"
          @click="removeOne(cart.product.id)"
        > 刪除 </button>
      </div>
      <div class="col-3">{{ cart.product.title }}</div>
      <div class="col-2">
        <img
          :src=" cart.product.imageUrl "
          width="50px"
        ></div>
      <div class="col-2">
        <button
          type="button"
          class="btn"
          @click="addQuantity(false,index)"
        > - </button>
        {{ cart.quantity }}
        <button
          type="button"
          class="btn"
          @click="addQuantity(true,index)"
        > + </button>
      </div>
      <div class="col-1">{{ cart.product.unit }}</div>
      <div class="col-2">{{ parseInt(cart.quantity) * parseInt(cart.product.price) }}</div>
    </div>
    <div class="row mt-3">
      <div class="col-10 text-right">總計:$</div>
      <div class="col-2 text-left">{{totalCost}}</div>
    </div>
    <!--資料 -->
    <div class="container">
      <!-- 表單送出改為使用 form submit 的方法 -->
      <form class="row">
        <!-- 輸入框 -->
        <div class="form-group col-sm-6">
          <label for="name">姓名</label>
          <input
            id="name"
            type="text"
            name="name"
            v-model="orderOwn.require.name"
            class="form-control"
            required
          >
        </div>
        <!-- 輸入框 -->
        <div class="form-group col-sm-6">
          <label for="tel">電話</label>
          <input
            id="tel"
            type="tel"
            name="tel"
            v-model="orderOwn.require.tel"
            class="form-control"
            required
          >
        </div>
        <!-- 輸入框 -->
        <div class="form-group col-sm-6">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            v-model="orderOwn.require.email"
            class="form-control"
            required
          >
        </div>
        <!-- 輸入框 -->
        <div class="form-group col-sm-6">
          <label for="address">地址</label>
          <input
            id=" address"
            type="address"
            name="address"
            v-model="orderOwn.require.address"
            class="form-control"
            required
          >
        </div>
        <!-- SELECT -->
        <div class="form-group col-12">
          <label for="payment">付款方式</label>
          <select
            name="payment"
            id="payment"
            class="form-control"
            v-model="orderOwn.require.payment"
            required
          >
            <option value="WebATM">WebATM</option>
            <option value="Barcode">Barcode</option>
            <option value="Credit">Credit</option>
            <option value="ApplePay">ApplePay</option>
            <option value="GooglePay">GooglePay</option>
          </select>
        </div>
        <!-- message  -->
        <div class="col-12 pb-3">
          <label for="message">留言</label>
          <textarea
            id="message"
            style="resize:none"
            name="message"
            v-model="orderOwn.message"
            class=" form-control"
            cols="50"
            rows="5"
          >
                            </textarea>
        </div>
        <div class="col-sm-6">
        </div>
        <div class="col-12 col-sm-6 pb-5">
          <button
            ref="active"
            type="submit"
            class="btn btn-primary float-right w-100"
            @click.prevent="submitCart()"
            disabled
          >送出表單</button>
        </div>
      </form>
    </div>
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="orderModal"
    >
      <finish-modal></finish-modal>
    </div>
  </div>
</template>
<script type="modul">
import FinishModal from '@/components/FinishModal.vue'

export default {
  data () {
    return {
      carts: [],
      orderOwn: {
        require: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: ''
        },
        message: ''
      }
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FinishModal
  },
  methods: {
    getCartList () {
      const load = this.$loading.show()
      this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then((res) => {
          this.carts = res.data.data
        })
        .catch((err) => {
          console.log(err)
        }).finally(() => {
          load.hide()
        })
    },
    submitCart () {
      // submit
      const load = this.$loading.show()
      this.$http.post(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`,
        Object.assign(this.orderOwn.require, { message: this.orderOwn.message })
      ).then((res) => {
        this.removeAll()
        this.getCartList()
        this.$(this.$refs.orderModal).modal('show')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        load.hide()
      })
    },
    addQuantity (plus, index) {
      let currQiantity = this.carts[index].quantity
      const load = this.$loading.show()
      if (currQiantity === 1 && !plus) return

      plus ? currQiantity++ : currQiantity--

      this.$http.patch(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`, {
        product: this.carts[index].product.id,
        quantity: currQiantity
      }).then((res) => {
        this.getCartList()
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        load.hide()
      })
    },
    removeOne (id) {
      const load = this.$loading.show()
      this.$http.delete(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`)
        .then((res) => {
          this.getCartList()
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          load.hide()
        })
    },
    removeAll () {
      const load = this.$loading.show()
      this.$http.delete(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`)
        .then((res) => {
          this.getCartList()
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          load.hide()
        })
    }
  },
  created () {
    this.getCartList()
  },
  computed: {
    totalCost: function () {
      let total = 0
      this.carts.map((item) => {
        total += item.product.price * item.quantity
      })
      return total
    }
  },
  watch: {
    // myself validate
    orderOwn: {
      handler: function () {
        this.$refs.active.disabled = Object.values(this.orderOwn.require).filter((item) => item === '').length !== 0
      },
      deep: true
    }
  }

}

</script>
