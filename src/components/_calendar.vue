<template>
  <div class="dateCon">
    <!--起始日-->
    <div class="startDate clearfix"  @click="showCel('fromDay')">
      <span class="fl startDays">起始日</span>
      <span  class="fr dataInp" >{{fromDay}}</span>
      <span class="datePicture" @click="showCel"></span>
    </div>
    <!--截止日-->
    <div class="endDate clearfix" @click="showCel('toDay')">
      <span class="fl startDays">截止日</span>
      <span class="fr dataInp">{{toDay}}</span>
      <span class="datePicture"></span>
    </div>
    <div v-if="isShow" class="dateBody">
      <!--加减年月、-->
      <div class="choseMonth clearfix">
        <span @click="reduceYear" class="reduceYear fl"></span>
        <span class="reduce fl" @click="reduce"></span>
        <span class="changeYear">
            <span>{{curYear}}年</span>
            <span>{{curMonthCN}}</span>
          </span>
        <span @click="additionYear" class="additionYear fr"></span>
        <span class="addition fr" @click="addition"></span>
      </div>
      <!--日期标题-->
      <ul class="dateTitle clearfix">
        <li class="fontSize11 dateWeeks">日</li>
        <li class="fontSize11 dateWeeks">一</li>
        <li class="fontSize11 dateWeeks">二</li>
        <li class="fontSize11 dateWeeks">三</li>
        <li class="fontSize11 dateWeeks">四</li>
        <li class="fontSize11 dateWeeks">五</li>
        <li class="fontSize11 dateWeeks">六</li>
      </ul>
      <!--具体日期-->
      <ul class="dateApp  clearfix">
        <li v-for="(val,index) in date" :style="styleCla(index,val)" @click="choseDay(val)" :class="classCla(val)" class="fontSize11 dateAppLis">{{isToday(val)}}</li>
      </ul>
      <!--遮罩------日期间隔不能超过30天-->
      <transition name="fade" v-if="maskShow">
        <div class="dateMask">{{tip}}</div>
      </transition>
    </div>
    <transition name="fade" v-if="choseFirst">
      <div class="dateBody">
          <div class="choseFirst">请选择起始日期</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState,mapMutations} from "vuex"
  //点击只改变了data 未改变myData
  export default{
    data(){
      return{
        isShow:true,
        myDate:{},//年月日日期
        date:"",//当前月
        choseDate:[],//选中的日期
        today:new Date().getTime(),
        curYear:"",
        curMonth:"",
        curMonthCN:"",
        curState:"",
        //起始日期
        fromDay:"",
        //终止日期
        toDay:"",
        fromDayTime:"",
        toDayTime:"",
        maskShow:false,
        tip:"",
        choseFirst:false
      }
    },
    computed:{
      ...mapState([
      ])
    },
    methods:{
      ...mapMutations([
      ]),
      showCel:function (val) {
        let that = this;
        let _today = new Date();
        if(!this.fromDayTime && val === 'toDay'){
          this.choseFirst=true;
          setTimeout(function () {
            that.choseFirst = false
          },400)
          return false
        }
        if(val === 'fromDay'){
            this.toDay ="";
            this.toDayTime = "";
            for(let i=0;i<this.date.length;i++){
                this.date[i].canBeChose = this.date[i].time<_today;
            }
        }else if(val === 'toDay'){
          for(let i=0;i<this.date.length;i++){
            this.date[i].canBeChose =  ((this.date[i].time - this.fromDayTime) < 86400000*365 && (this.date[i].time - this.fromDayTime)>0 && this.date[i].time<_today)
          }
        }
        this.curState = val
      },
      additionYear:function () {
        this.curYear += 1;
        if(!this.myDate[this.curYear]){
          this.setYear(this.curYear);
        }
        this.update(this.curYear,this.curMonth);
        this.getMonthCN();
        //this.setData();
      },
      reduceYear:function () {
        this.curYear -= 1;
        if(!this.myDate[this.curYear]){
          this.setYear(this.curYear);
        }
        this.update(this.curYear,this.curMonth);
        this.getMonthCN();
        //this.setData();
      },
      reduce:function () {
        if(this.curMonth<1){
          this.curYear -= 1;
          this.curMonth =11;
        }else{
          this.curMonth -=1;
        }
        if(!this.myDate[this.curYear]){
          this.setYear(this.curYear);
        }
        this.update(this.curYear,this.curMonth);
        this.getMonthCN();
        //this.setData();
      },
      addition:function () {
        if(this.curMonth>10){
          this.curYear += 1;
          this.curMonth =0;
        }else{
          this.curMonth +=1;
        }
        if(!this.myDate[this.curYear]){
          this.setYear(this.curYear);
        }
        this.update(this.curYear,this.curMonth);
        this.getMonthCN();
        //this.setData();
      },
      isTomorrow:function(val){
        if(((val.time - this.today) < 86400000) &&((val.time - this.today)>0)){
          return "明天"
        }else{
          return val.dayEN
        }
      },
      isToday:function (val) {
        if(((this.today - val.time) < 86400000) &&((this.today - val.time)>0)){
          return "今天"
        }else{
          return val.dayEN
        }
      },
      styleCla:function(index,val){
        if(index === 0){
          return "margin-left:" + (val.weekNUM*0.1871)+ "rem"
        }
      },
      classCla:function(val){
        let className=[];
        if(!val.canBeChose){
          className.push("gray")
        }else{
          className.push("darkGreen")
        }
        return className;
      },
      choseDay:function(val){
          let that = this;
        if(val.canBeChose){
          val.chosen = !val.chosen;
          this[this.curState] = val.fullDate
          this[this.curState + "Time"] = val.time
          //this.setData();
        }else {
            if(val.time - this.fromDayTime < 0){
                this.tip = "请选择"+ this.fromDay +"之后的时间";
            }else{
                this.tip = "日期间隔不能超过365天"
            }
            this.maskShow=true;
            setTimeout(function () {
              that.maskShow = false
            },400)
        }
      },
      submitDay:function(val){
        if(val.chosen){
          console.log(this.choseDate);
          return true;
        }
      },
      //生成日期时检测是否大于30天
      thirtyDay:function (time) {
        console.log(this.curState)
        if(this.curState === 'fromDay'){
            return true
        }else if(this.curState === 'toDay'){
          return ((this.toDayTime - time) <  86400000*365 && (this.toDayTime - time)>0)
        }else {
            return true
        }
      },
      isNull:function(str){
        if(!str || str=="" || str=="null" || str=="undefined")
          return true;
        return false;
      },
      setYear:function (_year) {
        this.myDate[_year]= Object.create(null);
        this.myDate[_year].year=_year;
        for(let i=1;i<13;i++)
        {
          this.setMonth(_year, i);
        }
      },
      setMonth:function (_year,_month) {
        let month_day ={
          1:31,
          2:((_year % 4 === 0) && (_year % 100 !== 0 || _year % 400 === 0)) ? 29 : 28,
          3:31,
          4:30,
          5:31,
          6:30,
          7:31,
          8:31,
          9:30,
          10:31,
          11:30,
          12:31
        };
        let _monthString = (String(_month).length <2) ? ("0"+_month):(String(_month))
        if(this.isNull(this.myDate[_year].month)){
          this.myDate[_year].month=[];
        }
        this.myDate[_year].month.push({month:_monthString});
        this.setDay(_year,_month,month_day[_month],_monthString);
      },
      setDay:function (_year,_month,_days,_monthString) {
        if(this.isNull(this.myDate[_year].month[_month-1].day)){
          this.myDate[_year].month[_month-1].day = [];
        }
        for(let i=1;i<(_days+1);i++){
          var _dayString = (String(i).length <2)? ("0"+i):(String(i))
          let _newDate = (new Date(Date.parse(_year + "/" +_month+"/"+i )));
          let _today = new Date();
          this.myDate[_year].month[_month-1].day.push({
            dayCN:_dayString,
            dayEN:i,
            fullDate:_year+"-"+_monthString+"-"+_dayString,
            weekCN:this.getWeekCN(_newDate.getDay()),
            weekEN:String(_newDate).slice(0,3),
            weekNUM:_newDate.getDay(),
            canBeChose:_newDate<_today,
            time:_newDate.getTime(),
            chosen:false
          });
        }
      },
      getWeekCN:function (_date) {
        let weekCNType1 = ["日","一","二","三","四","五","六"]
        return weekCNType1[_date]
      },
      getMonthCN:function(){
        let monthARR=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        console.log(this.curMonth);
        this.curMonthCN = monthARR[this.curMonth]
      },
      //切换月份
      update:function (_year,_month) {
        let curMonth = this.myDate[_year].month[_month].day;
        let _today = new Date();
        for(let i=0;i<curMonth.length;i++){
          if(this.curState === 'toDay'){
            curMonth[i].canBeChose =  ((curMonth[i].time - this.fromDayTime) < 86400000*365 && (curMonth[i].time - this.fromDayTime)>0  && curMonth[i].time<_today)
          }else {
            curMonth[i].canBeChose = curMonth[i].time<_today;
          }
         /* //需要遍历年数据
          if(this.fromDayTime && this.curState === "fromDay"){
            curMonth[i].canBeChose =  ((curMonth[i].time - this.fromDayTime) < 86400000*365 && (curMonth[i].time - this.fromDayTime)>0);
          }else if(this.toDayTime && this.curState === "toDay"){
            curMonth[i].canBeChose =  ((this.toDayTime - curMonth[i].time) <  86400000*365 && (this.toDayTime - curMonth[i].time)>0);
          }*/
        }
        this.date =  curMonth;
      },
      changeMonth:function (chosenMonth) {
        this.curMonth =Object.create(null);
        console.log(this.myDate[2017].month[chosenMonth])
      },
      setData:function(){
        sessionStorage["dateOBJ"] = JSON.stringify(this.$data);
      },
      dataEXEC:function (val) {
        let temp = val.split("-")
        for(let i=0;i<temp.length;i++){
            if(temp[i].length <2){
                temp[i] = 0 + temp[i]
            }
        }
        return temp.join("-")
      }
    },
    mounted(){
      if(sessionStorage["dateOBJ"]){
        this.myDate = JSON.parse(sessionStorage["dateOBJ"]).myDate;
        /*this.date = JSON.parse(sessionStorage["dateOBJ"]).date;//引用类型错误*/
        this.choseDate = JSON.parse(sessionStorage["dateOBJ"]).choseDate;
        this.today = JSON.parse(sessionStorage["dateOBJ"]).today;
        this.curYear = JSON.parse(sessionStorage["dateOBJ"]).curYear;
        this.curMonth = JSON.parse(sessionStorage["dateOBJ"]).curMonth;
        this.date = this.myDate[this.curYear].month[this.curMonth].day
      }else{
        this.curYear = new Date().getFullYear();
        this.curMonth = new Date().getMonth();
      }
      this.getMonthCN();
      console.log(this.$data);
      if(!this.myDate[this.curYear]){
        this.setYear(this.curYear);
        this.update(this.curYear,this.curMonth);
      }else {

      }
      //默认选择天数
      this.fromDayTime = this.today - 86400000*31;
      this.toDayTime = this.today;
      this.fromDay = new Date(this.fromDayTime).getFullYear() + "-"+ (new Date(this.fromDayTime).getMonth()+1) + "-" + new Date(this.fromDayTime).getDate();
      this.toDay = new Date(this.toDayTime).getFullYear() + "-"+ (new Date(this.toDayTime).getMonth()+1) + "-" + new Date(this.toDayTime).getDate();
      this.fromDay =this.dataEXEC(this.fromDay);
      this.toDay = this.dataEXEC(this.toDay);
      //this.setData();
      console.log(this.$data);
    },
    watch:{
      fromDay:function () {
        if(this.fromDay){
          console.log(this.fromDay)
        }
      },
      toDay:function () {
          console.log(this.toDay)
      }
    }
  }

</script>

<style>
  .dateCon{
    width:100%;
    position: relative;
  }
  .startDate{font-size: 0.083333rem;cursor: pointer}
  .dateTitle{width: 5.03125rem;margin: 0 auto;font-size: 0.1458rem;color:#666;position: relative}
  .dateTitle>li{float: left;width: 0.71875rem;height:0.1771875rem;line-height:0.1771875rem;text-align: center;  font-family: Microsoft YaHei,Arial,PingFang SC,Hiragino Sans GB,STHeiti,Helvetica Neue,WenQuanYi Micro Hei,sans-serif;}

  .gray{color: #bbbbbb}
  .chosen{background-color: #597453;border-radius: 50%;color: #ffffff;cursor: pointer}
  .tomorrow{border-radius: 50%;border: 1px solid #597453}
  .darkGreen{color: #000;cursor: pointer}

  /*起始截止日*/
  .dataInp{
    height:0.15625rem;
    width:0.9rem;
    padding-left:0.1041rem;
    border-radius:0.04166rem;
    border:1px solid #999;
    background-color: #fff;
  }
  .datePicture{
    position: absolute;
    right:0.0625rem;
    top:0.02083rem;
    width:0.13020rem;
    height:0.125rem;
    background:url("../../static/image/date.png") no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  /*日期标题*/
  .dateBody{
    width:100%;
    height:0.9895rem;
    background-color: #fff;
    margin-top:0.04rem;
    border: 1px solid #ccc;
    border-radius:0.04166rem;
    position: absolute;
    z-index: 999;
    font-size:0.0833rem;
  }
  /*加减年月*/
  .dateBody .choseMonth{
    width: calc(100% - 0.1041rem);
    font-size: 0.0833rem;
    text-align: center;
    height:0.1575rem;
    line-height:0.1575rem;
    padding:0 0.0520rem;
  }
  .reduceYear{
    background: url("../../static/image/reduceYear.png") no-repeat center;
  }
  .reduce{
    background: url("../../static/image/reduceMonth.png") no-repeat center;
  }
  .addition{
    background: url("../../static/image/addMonth.png") no-repeat center;
  }
  .additionYear{
    background: url("../../static/image/addYear.png") no-repeat center;
  }
  .startDate,.endDate{
    height:0.15625rem;
    line-height:0.15625rem;
    margin-top:0.0833rem;
    position: relative;
    cursor: pointer;
    font-size:0.0833rem;
  }
  .reduceYear,.reduce,.addition,.additionYear{
    display: inline-block;
    width:0.1041rem;
    height:100%;
    cursor: pointer;
  }

  .changeYear{
    color: #666;
    font-weight:bold;
    font-family:"Microsoft YaHei";
    font-size:0.0833rem;
  }
  /*星期标题*/
  .dateCon .dateBody .dateTitle{
    width: calc(100% - 0.1041rem);
    height:0.1145rem;
    line-height: 0.1145rem;
  }
  .dateBody .dateTitle .dateWeeks{
    width:0.1871rem;
    height:0.1145rem;
    text-align: center;
    line-height: 0.1145rem;
    font-size:0.05729rem;
  }
  /*具体日期、*/
  .dateCon .dateBody .dateApp{
    width: calc(100% - 0.1041rem);
    height: calc(100% - 0.272rem);
    padding:0 0.0520rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .dateBody .dateApp .dateAppLis{
    height: 0.1145rem;
    line-height: 0.1145rem;
    width: 0.1871rem;
    text-align: center;
    letter-spacing: -1px;
    font-size:0.05729rem;
  }
/*日期选择遮罩层*/
.dateMask{
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  text-align: center;
  font-size:0.0833rem;
  line-height:0.9895rem;
  border-radius:0.04166rem;
}
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-leave-active {
    opacity: 0
  }

  /*先选择一个日期遮罩层*/
  .choseFirst{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    color: #666;
    text-align: center;
    font-size:0.0833rem;
    line-height:0.9895rem;
    border-radius:0.04166rem;
  }
</style>
