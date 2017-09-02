/**
 * Created by pc16 on 2017/6/5.
 */

export default {
  fontSize:function(){
    window.addEventListener("resize",Wresize(320,736))
    function Wresize(min,max){
      return function(){
        var size = parseInt(window.innerWidth);
        var html = document.getElementsByTagName("html")[0];
        if(size>max){
          size = max;
        }else if(size<min){
          size = min;
        }
        html.style.fontSize =size/32+"px"
      }
    }
    Wresize(320,736)()
  }(),
}

export const uploadImgCommon = {
  methods:{
    upload:function (img) {
      let that = this
      let reader = new FileReader();
      if((img.type).indexOf("image") === -1){
        alert("请上传图片!");
        return false;
      }
      reader.readAsDataURL(img)
      reader.onload = function (e) {
        document.getElementById("imgReview").style.background=`url(${e.target.result}) no-repeat left 0 top 0/100%`;
      }
    }
  }
}
