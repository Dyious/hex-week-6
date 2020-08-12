<template>
  <div>
    <nav class="navbor-height bg-place">
      <ul class="nav justify-content-around">
        <li>
          <router-link to="/">返回前台</router-link>
        </li>
        <li>
          <router-link to="/dashboard/products">產品列表</router-link>
        </li>
        <li>
          <router-link to="/dashboard/coupons">優惠券列表</router-link>
        </li>
        <li>
          <router-link to="/dashboard/orders">訂單列表</router-link>
        </li>
        <li>
          <router-link to="/dashboard/imageCatch">圖片儲存列表</router-link>
        </li>
      </ul>
    </nav>
    <h2 class="p-3">後臺管理</h2>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
// import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false
    }
  }
  // components: {
  // }
}
</script>

<style>

.nav {
  text-align: center;
}
.nav a {
  width: auto;
  line-height: 45px;
  color: rgba(0, 0, 0, 0.5);
}
.nav a:hover {
  color: rgba(22, 80, 15, 0.9);
  text-decoration: none;
}
</style>
