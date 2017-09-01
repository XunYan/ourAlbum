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
