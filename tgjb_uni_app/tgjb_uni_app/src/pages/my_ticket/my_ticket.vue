<template>
  <view class="span24 myticket">
      <view class="span24 myticket-hd">
          <view :class="cur_hd===1?'span6 myticket-hd-itac':'span6 myticket-hd-it'">全部</view>
          <view :class="cur_hd===2?'span6 myticket-hd-itac':'span6 myticket-hd-it'">已使用</view>
          <view :class="cur_hd===3?'span6 myticket-hd-itac':'span6 myticket-hd-it'">未使用</view>
          <view :class="cur_hd===4?'span6 myticket-hd-itac':'span6 myticket-hd-it'">已过期</view>
      </view>
      <view class="span24 myticket-ct">
          <view class="span24 myticket-it">
              <view class="span24">
                  <view class="span18 myticket-ty">电卡缴费</view>
                  <view class="span6 myticket-jg">￥10</view>
              </view>
              <view class="span24">
                  <view class="span18 myticket-tm">有效日期：2019.4.1-4.30</view>
                  <view class="span6 myticket-limit">无门槛</view>
              </view>
              <view class="span24">
                  <view class="span24 myticket-adr">房屋地址：脱狗家宝9栋905</view>
              </view>
              <view class="span24 myticket-line"></view>
              <view class="span24">
                  <view class="span18 myticket-avl">脱狗家宝住户均可抵扣</view>
                  <view class="span6 myticket-btn">
                      <view class="myticket-use">立即使用</view>
                  </view>
              </view>
              <view class="myticket-it-lft"></view>
              <view class="myticket-it-rht"></view>
          </view>
          <view class="span24 myticket-it">
              <view class="span24">
                  <view class="span18 myticket-ty">电卡缴费</view>
                  <view class="span6 myticket-jg">￥10</view>
              </view>
              <view class="span24">
                  <view class="span18 myticket-tm">有效日期：2019.4.1-4.30</view>
                  <view class="span6 myticket-limit">无门槛</view>
              </view>
              <view class="span24">
                  <view class="span24 myticket-adr">房屋地址：脱狗家宝9栋905</view>
              </view>
              <view class="span24 myticket-line"></view>
              <view class="span24">
                  <view class="span18 myticket-avl">脱狗家宝住户均可抵扣</view>
                  <view class="span6 myticket-btn">
                      <view class="myticket-used">已使用</view>
                  </view>
              </view>
              <view class="myticket-it-lft"></view>
              <view class="myticket-it-rht"></view>
          </view>
          <view class="span24 myticket-it">
              <view class="span24">
                  <view class="span18 myticket-ty">电卡缴费</view>
                  <view class="span6 myticket-jg">￥10</view>
              </view>
              <view class="span24">
                  <view class="span18 myticket-tm">有效日期：2019.4.1-4.30</view>
                  <view class="span6 myticket-limit">无门槛</view>
              </view>
              <view class="span24">
                  <view class="span24 myticket-adr">房屋地址：脱狗家宝9栋905</view>
              </view>
              <view class="span24 myticket-line"></view>
              <view class="span24">
                  <view class="span18 myticket-avl">脱狗家宝住户均可抵扣</view>
                  <view class="span6 myticket-btn">
                      <view class="myticket-used">已过期</view>
                  </view>
              </view>
              <view class="myticket-it-lft"></view>
              <view class="myticket-it-rht"></view>
          </view>
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
