<template>
  <div>
    <ul class="container">
      <li><img src="" alt=""></li>
    </ul>
    <div @click="uploadIMG"><i class="el-icon-plus"></i><input type="file" id="imgUpload" class="imgUpload"></div>
    <!--<el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>-->
  </div>
</template>

<script>
  import {uploadImgCommon} from "../../src/common/public"
    export default {
      data() {
        return {

        }
      },
      mixins:[uploadImgCommon],
      methods:{
        uploadIMG:function () {
          setTimeout("document.getElementById('imgUpload').focus();",50)
          //this.upload()
        }
      },
      mounted(){
        [...document.querySelectorAll(".el-icon-plus")].map( (e)=>{
          console.log(1);
        });
        let that = this;
        let dom = document.getElementById("imgUpload");
        dom.addEventListener("change",function () {
          that.upload(this.files[0])
        })
        //document.getElementById("imgReview").style.background=`url(${this.choosedApp.icon_url}) no-repeat left 0 top 0/100%`;
      },
    }
</script>

<style scoped="">
  .container{
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
  }
  .container li{
    width: 8rem;
    height: 8rem;
    font-size: 8rem;
  }
  .imgUpload{
    width: 0;
    height: 0;
    outline: none;
    border: none;
  }
</style>
