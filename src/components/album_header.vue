<template>
  <div class="album_header">
    <ul class="nav">
      <li>
        <router-link to="/album_all">全部相册</router-link>
      </li>
      <li>
        <router-link to="/album_management">分组管理</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data() {
          return {

          }
        }
    }
</script>

<style scoped="">
  .nav{
    display: flex;
    flex-flow: nowrap;
    justify-content: space-around;
    background-color: #20A0FF;
    height: 4rem;
    line-height: 4rem;
  }
  .nav li{
    color: #ffffff;
  }
</style>
