<template>
  <div class="dateInput">
    <input type="text" placeholder="请选择日期" class="date" v-on:focus="show" :value="dateOutput">
    <div class="dateCon" v-show="dateShow">
      <div class="choseMonth clearfix">
        <div class="" @click="reduce"><</div>
        <div class="">{{curYear +"年" + curMonthCN}}</div>
        <div class="" @click="addition">></div>
      </div>
      <ul class="dateTitle clearfix">
        <li>SUN</li>
        <li>MON</li>
        <li>TUE</li>
        <li>WED</li>
        <li>THU</li>
        <li>FRI</li>
        <li>SAT</li>
      </ul>
      <ul class="dateApp clearfix">
        <li v-for="(val,index) in date" :style="styleCla(index,val)" @click="choseDay(val)" :class="classCla(val)">{{isToday(val)}}</li>
      </ul>
      <!--<ul>
        <li v-for="val in date" v-if="submitDay(val)">{{val.fullDate}}{{val.weekCN}}</li>
      </ul>-->
    </div>
  </div>
</template>

<script>
  //点击只改变了data 未改变myData
  import {mapState, mapMutations , mapGetters} from 'vuex';
  export default{
    data(){
      return{
        myDate:{},//年月日日期
        date:"",//当前月
        choseDate:[],//选中的日期
        today:new Date().getTime(),
        curYear:"",
        curMonth:"",
        curMonthCN:"",
        dateShow:false,
        curChoose:{},
        dateOutput:""
      }
    },
    computed:{
    },
    methods:{
      ...mapMutations([
      ]),
      show:function () {
        this.dateShow = true;
      },
      reduce:function () {
        console.log(this.curMonth);
        console.log(this.curYear);
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
        this.setData();
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
        this.setData();
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
          return "margin-left:" + (val.weekNUM*3)+ "rem"
        }
      },
      classCla:function(val){
        let className=[];
        if(!val.canBeChose){
          className.push("gray")
        }else{
          className.push("darkGreen")
        }
        if(val.chosen){
          className.pop();
          className.push("chosen");
        }
        /*if(((this.today - val.time) < 86400000) &&((this.today - val.time)>0)){
          className.push("tomorrow")
        }*/
        return className;
      },
      choseDay:function(val){
        if(val.canBeChose){
          val.chosen = true;
          this.curChoose.chosen = false;
          this.curChoose = val;
          this.dateShow = false;
          this.dateOutput = val.fullDate;
          //val.chosen = !val.chosen;
          /* if(this.choseDate.indexOf(val.fullDate+val.weekCN) === -1){
             this.choseDate.push(val.fullDate+val.weekCN);
           }else {
             this.choseDate.splice(this.choseDate.indexOf(val.fullDate+val.weekCN),1);
             console.log(this.choseDate.indexOf(val.fullDate))
           }
           console.log(this.myDate);*/
          //this.setData();//存入session
        }
      },
      submitDay:function(val){
        if(val.chosen){
          console.log(this.choseDate);
          return true;
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
            canBeChose:/*(_newDate>_today || Math.abs(_today-_newDate)<86400000)*/true,
            time:_newDate.getTime(),
            chosen:false
          });
        }
      },
      getWeekCN:function (_date) {
        var monthCN = ["日","一","二","三","四","五","六"];
        return monthCN[_date];
      },
      getMonthCN:function(){
        let monthARR=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        console.log(this.curMonth);
        this.curMonthCN = monthARR[this.curMonth]
      },
      //切换月份
      update:function (_year,_month) {
        let curMonth = this.myDate[_year].month[_month].day;
        this.date =  curMonth;
      },
      changeMonth:function (chosenMonth) {
        this.curMonth =Object.create(null);
        console.log(this.myDate[2017].month[chosenMonth])
      },
      setData:function(){
        sessionStorage["dateOBJ"] = JSON.stringify(this.$data);
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
      this.$store.state.choseDate =this.choseDate;
      if(!this.myDate[this.curYear]){
        this.setYear(this.curYear);
        this.update(this.curYear,this.curMonth);
      }else {

      }
      this.setData();
      console.log(this.$store.state);
      console.log(this.$data);
    },
  }

</script>

<style>
  .date::-webkit-input-placeholder{ color: #888888; font-size: 14px}
  .date{-webkit-appearance: none;  -moz-appearance: none;  appearance: none;  background-color: #fff;  background-image: none;  border-radius: 4px;  border: 1px solid #bfcbd9;  box-sizing: border-box;  color: #1f2d3d;  font-size: inherit;  height: 36px; width: 16rem; line-height: 1;  outline: 0;  padding: 3px 10px;  transition: border-color .2s cubic-bezier(.645,.045,.355,1);}
  .date:focus{border-color: #1c8de0}
  .dateInput{display: inline-block;position: relative;z-index: 100}
  .dateCon{ padding-bottom: 1rem; width:25rem;  margin:0 auto;  position: absolute;left: -25%;top:110%;background-color: #ffffff;box-shadow: 0 0 5px #aaaaaa;border-radius: 5px;transform-origin: center top 0px;}
  ul{padding:0}
  li{list-style: none;box-sizing: border-box;}
  .dateTitle{width: 21rem;margin: 0 auto;font-size: 1rem;color:#20A0FF;position: relative}
  .dateTitle>li{float: left;width: 3rem;height:2.5rem;line-height:2.5rem;text-align: center;  font-family: Microsoft YaHei,Arial,PingFang SC,Hiragino Sans GB,STHeiti,Helvetica Neue,WenQuanYi Micro Hei,sans-serif;}
  .dateApp{width: 21rem;margin: 0 auto;
    height:calc(100% - 0.520rem);
  }
  .dateApp>li{font-size: 1rem;float: left;margin:0.1rem 0;width: 3rem;height:2.5rem;line-height:2.5rem;text-align: center;overflow: hidden}
  .gray{color: #bbbbbb}
  .chosen{background-color: #20A0FF;border-radius: 5%;color: #ffffff;cursor: pointer}
  .tomorrow{border-radius: 50%;border: 1px solid #597453}
  .darkGreen{color: #20A0FF;cursor: pointer}
  .choseMonth{text-align: center;color:#20A0FF; display: flex;justify-content: space-between;margin-top: 1rem}
  .choseMonth>div{display: inline-block;cursor: pointer}
  /*@media screen and (max-width: 1280px) {
    .dateApp>li{
      margin:0.03rem 0.198975rem;
    }
  }
  @media screen and (max-width: 1024px) {
    .dateApp>li{
      margin:0.15rem 0.198975rem;
    }
  }*/
</style>
