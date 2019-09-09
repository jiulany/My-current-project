<template>
  <view class="span24 myticket">
      <view class="span24 myticket-hd">
          <view :class="cur_hd===1?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(1)">全部</view>
          <view :class="cur_hd===2?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(2)">已使用</view>
          <view :class="cur_hd===3?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(3)">未使用</view>
          <view :class="cur_hd===4?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(4)">已过期</view>
      </view>
      <view v-if="cur_hd===1" class="span24 myticket-ct">
          <view class="span24 myticket-it1">
              <view class="myticket-it-bg"><image   src='https://imgcdn.tuogouchebao.com/coupon_kapian.png'></image></view>
              <view class="span24 myticket-it1-row1">
                  <view class="span20 myticket-it1-nm">680包年卡</view>
                  <view class="span4 myticket-it1-tm">有效</view>
              </view>
              <view class="span24 myticket-it1-row2">
                  <view class="span12 myticket-it1-used">蜡洗：30/已用20</view>
                  <view class="span12 myticket-it1-used">去异味：1/已用1</view>
                  <view class="span12 myticket-it1-used">打蜡：1/已用0</view>
              </view>
              <view class="span24 myticket-it1-row3">
                  <view class="span14 myticket-it1-limit">有效期2019.01.08 - 2020.01.08</view>
                  <view class="span10 myticket-it1-carnum">绑定车牌：川A12321</view>
              </view>
          </view>
          <view class="span24 myticket-it1">
              <view class="myticket-it-bg"><image src='https://imgcdn.tuogouchebao.com/coupon_kapian.png'></image></view>
              <view class="span24 myticket-it1-row1">
                  <view class="span20 myticket-it1-nm">680包年卡</view>
                  <view class="span4 myticket-it1-tm">有效</view>
              </view>
              <view class="span24 myticket-it1-row2">
                  <view class="span12 myticket-it1-used">洗车包年：无限卡/已用30次</view>
              </view>
              <view class="span24 myticket-it1-row3">
                  <view class="span14 myticket-it1-limit">有效期2019.01.08 - 2020.01.08</view>
                  <view class="span10 myticket-it1-carnum">绑定车牌：川A12321</view>
              </view>
          </view>
          <view class="span24 myticket-it">
              <view class="span24">
                  <view class="span18 myticket-ty">简洗车身</view>
                  <view class="span6 myticket-jg">￥10</view>
              </view>
              <view class="span24">
                  <view class="span18 myticket-tm">有效日期：2019.4.1-4.30</view>
                  <view class="span6 myticket-limit">无门槛</view>
              </view>
              <view class="span24">
                  <view class="span24 myticket-adr">车辆车牌：川A13232</view>
              </view>
              <view class="span24 myticket-line"></view>
              <view class="span24">
                  <view class="span18 myticket-avl">年度会员类仅可抵扣简洗车辆订单</view>
                  <view class="span6 myticket-btn">
                      <view class="myticket-use">立即使用</view>
                  </view>
              </view>
              <view class="myticket-it-lft"></view>
              <view class="myticket-it-rht"></view>
          </view>
      </view>
      <view v-if="cur_hd===2" class="span24 myticket-ct">
          2
      </view>
      <view v-if="cur_hd===3" class="span24 myticket-ct">
          3
      </view>
      <view v-if="cur_hd===4" class="span24 myticket-ct">
          4
      </view>
  </view>
</template>

<script> 
export default {
  data() {
    return {
        cur_hd:1
    };
  },
  methods: {
      clickTap(val){
          console.log(val)
          this.cur_hd=val
      }
  },
  components: {},
  onLoad() {
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.myticket-hd{
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.myticket-hd-it{
    height: 98rpx;
    align-items: center;
    justify-content: center;
font-size:32rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,153,153,1);
}
.myticket-hd-itac{
    height: 98rpx;
    align-items: center;
    justify-content: center;
    background:rgba(255,209,0,1);
font-size:32rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
}
.myticket-ct{
    padding: 22rpx 24rpx 0 24rpx
}
.myticket-it{
    background: white;
    padding: 20rpx 12rpx 21rpx 29rpx;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    position: relative;
    margin-top: 22rpx
}
.myticket-it1{
    position: relative;
    margin-top: 22rpx;color:rgba(125,103,0,1);
    padding: 19rpx 20rpx 31rpx 29rpx;font-size:26rpx;
    height: 254rpx;
    margin-top: 22rpx
}
.myticket-it1-nm{
    font-size:32rpx;
}
.myticket-it1-used{
    font-size:26rpx;
}
.myticket-it1-tm{
    color:rgba(102,102,102,1);font-size:32rpx;
}
.myticket-it1-limit{
    font-size:26rpx;
}
.myticket-it1-carnum{
    font-size:26rpx;
}
.myticket-it1-row1{
    font-size:32rpx;
    height: 60rpx;
}
.myticket-it1-row3{
    position: absolute;
    bottom: 20rpx
}
.myticket-it1-row2{
    height: 100rpx;
    line-height: 25rpx;
    position: relative;
    bottom: 20rpx;align-items: center
}
.myticket-it-bg{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 254rpx;
    z-index: -1;
}
.myticket-it-bg image{
    width: 100%;
    height: 100%;
}
.myticket-it:first-child{
margin-top: 0
}
.myticket-ty{
font-size:28rpx;
font-weight:500;
color:rgba(51,51,51,1);
line-height:48rpx;
}
.myticket-jg{
    justify-content: flex-end;
font-size:46rpx;
font-weight:500;
color:rgba(240,59,59,1);
line-height:48rpx;
}
.myticket-limit{
    justify-content: flex-end;
font-size:22rpx;
font-weight:400;
color:rgba(149,149,149,1);
line-height:48rpx;
}
.myticket-tm{
font-size:22rpx;
font-weight:400;
color:rgba(153,153,153,1);
line-height:48rpx;
}
.myticket-adr{
font-size:22rpx;
font-weight:400;
color:rgba(153,153,153,1);
line-height:48rpx;
}
.myticket-line{
    height: 1rpx;
    border-top: 2rpx dashed rgba(233,233,233,1)
}
.myticket-avl{
font-size:22rpx;
font-weight:400;
color:rgba(153,153,153,1);
line-height:48rpx;
align-items: center
}
.myticket-btn{
    justify-content: flex-end
}
.myticket-use{
    width:168rpx;
height:50rpx;
background:rgba(223,66,66,1);
text-align: center;
line-height: 50rpx;
color:rgba(254,253,254,1);
margin-top: 19rpx
}
.myticket-used{
    width:168rpx;
height:50rpx;
background:rgba(153,153,153,1);
text-align: center;
line-height: 50rpx;
color:rgba(254,253,254,1);
margin-top: 19rpx
}
.myticket-it-lft{
    position: absolute;
    height: 28rpx;
    width: 28rpx;
    background: #f5f5f5;
    border-radius: 50rpx;
    left: -18rpx;
    top: 130rpx
}
.myticket-it-rht{
    position: absolute;
    height: 28rpx;
    width: 28rpx;
    background: #f5f5f5;
    border-radius: 50rpx;
    right: -18rpx;
    top: 130rpx
}
</style>
