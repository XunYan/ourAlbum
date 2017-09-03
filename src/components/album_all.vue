<template>
  <div>
    <ul class="album_container" v-if="album_list.length !== 0">
      <li v-for="val in album_list" @click="changePage('/album_detail')"><img src="../assets/floder.jpg" alt="">{{val.name}}</li>
    </ul>
    <div class="create_album">
      <el-button type="primary" @click="changePage('/album_createAndEdit')">创建相册</el-button>
    </div>
  </div>
</template>

<script>
  import router from '../router'
    export default {
        data() {
          return {
            album_list:[
              {
                name:"123"
              },
              {
                name:"123"
              },
              {
                name:"123"
              },
              {
                name:"123"
              },
              {
                name:"123"
              },
            ]
          }
        },
        methods:{
          changePage:function (e) {
            router.push(e)
          }
        }
    }
</script>

<style scoped="">
  .album_container{
    padding: 1rem;
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
  }
  .album_container li{
    height: 10rem;
    width: 10rem;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .album_container li img{
    width: 10rem;
    height: 8rem;
  }
  .create_album{
    margin: 3rem  auto 0;
    text-align: center;
  }
</style>
