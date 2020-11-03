<template>
  <div class="k_line" v-loading="chartLoading" element-loading-spinner="el-icon-loading">
    <div class="back-top">
      <i class="el-icon-back"></i>
      <span>
        NVT/NULS
      </span>
      <font class="shoucang">
        <i class="el-icon-star-off"></i>
      </font>
    </div>

    <div class="top">
      <div class="fl">
        <h1 class="fred">0.5689</h1>
        <p>$ 2.356 &nbsp;&nbsp;<span class="fred">-2.356</span></p>
      </div>
      <div class="fr">
        <ul>
          <li>24h高 <span>0.5689</span></li>
          <li>24h低 <span>0.5689</span></li>
          <li>24h量 <span>885689</span></li>
        </ul>
      </div>
    </div>

    <div class="tools cb">
      <ul class="times">
        <li v-for="item in timeList" :key="item.value" :class="timeValue === item.value ? 'is_li':''"
            @click="choiceTime(item)">
          {{item.label}}
        </li>
      </ul>
      <ul class="types">
        <!-- <li @click="choiceType('line')" :class="typeValue === 'line' ? 'is_li':''">{{$t('public.depth')}}</li>-->
        <li @click="choiceType('kline')" :class="typeValue === 'kline' ? 'is_li':''">深度图</li>
      </ul>
    </div>

    <div id="Kline" class="kling cb"></div>

    <div class="tab cb">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="委托订单" name="first">
          <EntrustOrders></EntrustOrders>
        </el-tab-pane>
        <el-tab-pane label="最新成交" name="second">
          最新成交
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="bottom cb">
      <el-button type="success">买 入</el-button>
      <el-button type="danger">卖 出</el-button>
    </div>
  </div>
</template>

<script>
  import EntrustOrders from './EntrustOrders'
  import {init, dispose} from 'klinecharts'
  import {config} from './kLineConfig/config'
  import {WEBSOCKET_URL} from "@/config.js";
  import {listener, unListener} from "@/api/websocket.js";

  export default {
    data() {
      return {
        dealInfo: {},//交易对信息
        timeList: [
          {value: 10, label: '10min'},
          {value: 60, label: '1hour'},
          {value: 1440, label: '1day'},
          {value: 10080, label: '1week'},
        ],//时间列表
        timeValue: 10,//时间选择
        typeValue: 'kline',//图形类型

        klinecharts: null,//K线图实例
        klineData: [],  //初始数据
        resolution: '1',//分辨率
        lang: sessionStorage.hasOwnProperty('lang') ? sessionStorage.getItem('lang') : 'en', //语言
        chartLoading: true, //加载动画
        newSetTimeout: null,//延迟加载

        activeName: 'second'
      }
    },
    created() {
    },
    mounted() {
      setTimeout(() => {

        this.klinecharts = init(document.getElementById('Kline'));
        //成交量指标
        this.klinecharts.createTechnicalIndicator('VOL', 80);
        this.initData('68b627d91ba4412a1bf56c3c5311b67a34c093fc5551dc8b836e2644cad76320', this.timeValue);
        setTimeout(() => {
          this.wsMethod()
        }, 800)
      }, 1100)
    },
    computed: {
      EntrustOrders
    },
    components: {EntrustOrders},
    destroyed() {
      dispose(document.getElementById('Kline'))
    },
    watch: {},
    methods: {

      /**
       * @disc: 初始数据
       * @date: 2020-04-14 12:44
       * @author: Wave
       */
      async initData(hash, timeType) {
        let tradingData = await this.getTradingGet(hash, timeType);
        //console.log(tradingData);
        //tradingData.splice(0,1);
        if (!tradingData.success) {
          console.log("获取k线图数据失败");
          /*setTimeout(() => {
            this.initData(hash, timeType)
          }, 2000)*/
        }
        this.klineData = tradingData.data.reverse();
        //this.klineData.splice(1,0);
        // 设置样式配置
        this.klinecharts.setStyleOptions(config);
        //隐藏三根辅助线
        this.klinecharts.setTechnicalIndicatorParams("MA", [5, 10, 30]);
        // 设置精度
        //console.log(this.dealInfo);
        this.klinecharts.setPrecision(this.dealInfo.scaleBaseDecimal, this.dealInfo.scaleBaseDecimal);

        //console.log(this.klineData);
        this.klinecharts.applyNewData(this.klineData);

        let dataList = this.klinecharts.getDataList();
        //console.log(dataList);
        if (dataList.length !== 0 && dataList[0].time) {
          if (dataList.length === 500) {
            this.getMoreKlineData(dataList[0].time, hash, timeType)
          }
        }

      },

      /**
       * @disc: 获取交易对K线图
       * @params: tradingHash
       * @params: type
       * @date: 2019-12-16 10:41
       * @author: Wave
       */
      async getTradingGet(tradingHash, type) {
        //this.chartLoading = true;
        let timestamp = new Date().getTime();
        try {
          let url = '/view/kLine/list';
          let data = {
            "tradingHash": tradingHash,
            "type": type,
            "startTime": timestamp - 60000 * this.timeValue * 500,
            "endTime": timestamp,
            "limit": 500
          };
          //console.log(data);
          let tradingGetRes = await this.$dexPost(url, data);
          console.log(tradingGetRes);
          if (!tradingGetRes.success) {
            this.chartLoading = false;
            return {success: false, data: []}
          }
          for (let item of  tradingGetRes.result) {
            item.timestamp = Number((item.time));
            item.open = Number(item.open);
            item.close = Number(item.close);
            item.high = Number(item.high);
            item.low = Number(item.low);
            item.volume = Number(item.volume);
            item.turnover = 0;
          }
          this.chartLoading = false;
          return {success: true, data: tradingGetRes.result}
        } catch (err) {
          this.chartLoading = true;
          console.log(err);
          return {success: false, data: []};
        }
      },

      /**
       * @disc: 获取更多的K线图数据
       * @params:startTime 开始时间
       * @date: 2020-05-13 15:16
       * @author: Wave
       */
      async getMoreKlineData(startTime, tradingHash, type) {
        try {
          let url = '/view/kLine/list';
          let data = {
            "tradingHash": tradingHash,
            "type": type,
            "startTime": startTime - 60000 * this.timeValue * 500,
            "endTime": startTime,
            "limit": 500
          };
          //console.log(data);
          let Res = await this.$dexPost(url, data);
          //console.log(Res);
          if (!Res.success) {
            return {success: false, data: []}
          }
          for (let item of  Res.result) {
            item.timestamp = Number((item.time));
            item.open = Number(item.open);
            item.close = Number(item.close);
            item.high = Number(item.high);
            item.low = Number(item.low);
            item.volume = Number(item.volume);
            item.turnover = 0;
          }
          this.klinecharts.applyMoreData(Res.result);

          let dataList = this.klinecharts.getDataList();
          if (Res.result.length === 500) {
            this.newSetTimeout = setTimeout(() => {
              this.getMoreKlineData(dataList[0].time, tradingHash, type)
            }, 10000);
          } else {
            //console.log(dataList);
            console.log("没有更多K线图数据了")
          }
        } catch (err) {
          console.log(err);
        }
      },

      /**
       * @disc: 选择时间
       * @params: timeInfo
       * @date: 2020-04-14 15:48
       * @author: Wave
       */
      choiceTime(timeInfo) {
        this.timeValue = timeInfo.value;
        clearInterval(this.newSetTimeout);
        this.klinecharts.clearData();
        this.initData(this.dealInfo.hash, this.timeValue);
        this.wsMethod();
      },

      /**
       * @disc: 图标类型选择
       * @params: type
       * @date: 2020-04-14 15:52
       * @author: Wave
       */
      choiceType(type) {
        if (type === 'line') {
          this.klinecharts.setCandleStickChartType('real_time');
        } else {
          this.klinecharts.setCandleStickChartType('candle_stick');
        }
        this.typeValue = type
      },

      /**
       * @disc: websocket 推送
       * @date: 2020-04-14 17:22
       * @author: Wave
       */
      wsMethod() {
        //console.log(this.klineData);
        unListener(WEBSOCKET_URL(), "kLine");
        let newString = JSON.stringify({"tradingHash": this.dealInfo.hash, "type": this.timeValue});
        //console.log(newString);
        listener(WEBSOCKET_URL(), "kLine", newString,
          data => {
            let newDate = JSON.parse(data);
            //console.log(newDate);
            if (!newDate.time) {
              return;
            }
            newDate.timestamp = Number(newDate.time);
            newDate.open = Number(newDate.open);
            newDate.close = Number(newDate.close);
            newDate.high = Number(newDate.high);
            newDate.low = Number(newDate.low);
            newDate.volume = Number(newDate.volume);
            newDate.turnover = 0;
            //console.log(newDate.high);
            this.klinecharts.updateData(newDate);
          });
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }

    },

  }
</script>

<style lang="less">
  .k_line {
    height: auto;
    width: 100%;
    background-color: #090A17;
    .back-top {
      background-color: #141627;
      color: #ffffff;
      height: 3rem;
      width: 100%;
      line-height: 3rem;
      padding: 0 0.5rem;
      font-size: 1.6rem;
      position: fixed;
      z-index: 99;
      top: 0;
      .shoucang {
        display: block;
        float: right;
        position: relative;
        right: 0.5rem;
        top: 0.2rem;
        i {
          color: #168FDE;
          font-size: 1.4rem;
        }
      }
    }
    .top {
      padding: 0 0.5rem;
      background-color: #141627;
      height: 6rem;
      position: relative;
      margin: 3rem 0 0 0;
      .fl {
        h1 {
          font-size: 1.6rem;
          margin: 0.7rem 0 0 0;
        }
        p {
          font-size: 0.8rem;
          margin: 0.5rem 0 0 0;
        }
      }
      .fr {
        width: 8rem;
        ul {
          li {
            font-size: 0.8rem;
            font-weight: bold;
            color: #767c9c;
            line-height: 1.8rem;
            span {
              color: #ffffff;
              font-weight: 550;
              display: block;
              float: right;
              margin: 0 0.5rem 0 0;
            }
          }
        }
      }
    }
    .tools {
      height: 1.6rem;
      width: 100%;
      background-color: #141627;
      margin: 0.2rem 0 0 0;
      .font12 {
        padding: 3px 5px 0 5px;
        color: #7d7f93;
        height: 25px;
        border-right: 1px solid #0b0c14;
      }
      .times, .types {
        li {
          float: left;
          font-size: 12px;
          padding: 2px 5px;
          color: #7d7f93;
          &:hover {
            cursor: pointer;
            color: #608FFF;
          }
        }
        .is_li {
          color: #608FFF;
        }
      }
      .times {
        float: left;
        margin: 2px 0 0 10px;
      }
      .types {
        float: right;
        margin: 2px 10px 0 0;
      }
    }
    .kling {
      height: 16rem;
      width: 100%;
      background-color: #141627;
    }
    .tab {
      height: 25rem;
      width: 100%;
      background-color: #141627;
      margin: 0.2rem 0 0 0;
      padding: 0 0.5rem;
      .el-tabs{
        .el-tabs__header{
          margin: 0 0 5px;
        }
      }
    }
    .bottom {
      height: 4rem;
      width: 100%;
      background-color: #090A17;
      position: fixed;
      z-index: 99;
      bottom: 0;
      text-align: center;
      line-height: 4rem;
      .el-button {
        width: 10rem;
      }
    }
  }
</style>
