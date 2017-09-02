<template>
  <div  class="container">
    <div class="input_options">
      <span class="demonstration">相册名称</span>
      <el-input v-model="album_name" placeholder="输入名称" style="width: 16rem"></el-input>
    </div>
    <div class="block input_options">
      <span class="demonstration">选择日期</span>
      <el-date-picker
        v-model="album_date"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <div>
      <span>选择分组</span>

      <el-button type="primary">创建分组</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
          return{
            album_date:"",
            album_name:""
          }
        }
    }
</script>

<style scoped="">
  .container{
    padding: 1rem;
  }
  .input_options{
    margin-bottom: 0.5rem;
  }
</style>
