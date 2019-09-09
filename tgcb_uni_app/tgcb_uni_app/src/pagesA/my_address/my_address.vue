<template>
  <view class="span24 address">
      <view class="span24 address-hd">
          <view :class="cur_hd===1?'span12 address-hd-itac':'span12 address-hd-it'" @tap="clickTap(1)">通讯地址</view>
          <view :class="cur_hd===2?'span12 address-hd-itac':'span12 address-hd-it'" @tap="clickTap(2)">停车位地址</view>
      </view>
      <view v-if="cur_hd===1" class="span24 address-ct">
          <view class="span24 address-tx-it">
               <view class="span24 address-tx-row1">
                   <view class="span12 address-tx-nm">姓名：万潇</view>
                   <view class="span12 address-tx-call">电话：15648944564</view>
               </view>
               <view class="span24 address-tx-row2">
                   <view class="span18 address-tx-address">（默认）四川省成都市青羊区狮马路98号 太升南路
                        </view>
                   <view class="span6 address-bj">  <i class="iconfont iconicon_xie"></i></view>
               </view>
          </view>
          <view class="span24 address-tx-it">
               <view class="span24 address-tx-row1">
                   <view class="span12 address-tx-nm">姓名：万潇</view>
                   <view class="span12 address-tx-call">电话：15648944564</view>
               </view>
               <view class="span24 address-tx-row2">
                   <view class="span18 address-tx-address">四川省成都市青羊区狮马路98号太升南路
                        </view>
                   <view class="span6 address-bj">  <i class="iconfont iconicon_xie"></i></view>
               </view>
          </view>
          <view class="span24 address-add" @tap="toAddTxAddress">+新建地址</view>
      </view>
      <view v-if="cur_hd===2" class="span24 address-ct">
          <view class="span24 address-tc-it">
              <view class="span24 address-tc-row">
                  <view class="span20">四川省成都市青羊区狮马路98号太升南路</view>
                  <view class="span4"><i class="iconfont iconicon_xie"></i></view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">小区名字</view>
                  <view class="span18 address-tc-val">服务器废弃物方法</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">单元号</view>
                  <view class="span18 address-tc-val">1-1-1</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">停车楼层</view>
                  <view class="span18 address-tc-val">负一</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">车位号</view>
                  <view class="span18 address-tc-val">A5-1-1</view>
              </view>
          </view>
           <view class="span24 address-tc-it">
              <view class="span24 address-tc-row">
                  <view class="span20">四川省成都市青羊区狮马路98号太升南路</view>
                  <view class="span4"><i class="iconfont iconicon_xie"></i></view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">小区名字</view>
                  <view class="span18 address-tc-val">服务器废弃物方法</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">单元号</view>
                  <view class="span18 address-tc-val">1-1-1</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">停车楼层</view>
                  <view class="span18 address-tc-val">负一</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">车位号</view>
                  <view class="span18 address-tc-val">A5-1-1</view>
              </view>
          </view>
          <view class="span24 address-add" @tap="toAddTcAddress">+新建地址</view>
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
          this.cur_hd=val
      },
      toAddTxAddress(){
          uni.navigateTo({
              url:'/pagesA/my_address_addtx/my_address_addtx'
          })
      },
      toAddTcAddress(){
          uni.navigateTo({
              url:'/pagesA/my_address_addtc/my_address_addtc'
          })
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
.address-ct{
padding-bottom: 200rpx
}
.address-hd{
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}
.address-hd-it{
    height: 98rpx;
    align-items: center;
    justify-content: center;
font-size:32rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,153,153,1);
}
.address-hd-itac{
    height: 98rpx;
    align-items: center;
    justify-content: center;
    background:rgba(255,209,0,1);
font-size:32rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
}
.address-tx-it{
    padding: 28rpx 44rpx 35rpx 33rpx ;
    border-bottom: 1rpx solid #f5f5f5;
    background: white;
    box-shadow: 0px 2px 5px 0px rgba(51,51,51,0.06);
}
.address-bj{
    justify-content: flex-end
}
.address-bj image{
    width: 30rpx;
    height: 30rpx;
}
.address-tx-call{
    font-size: 32rpx;font-weight:500;
}
.address-tx-nm{
    font-size: 32rpx;font-weight:500;
}
.address-tx-address{
    font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
}
.address-tx-row2{
    margin-top: 30rpx
}
.address-add{
    position: fixed;
height:98rpx;
background:rgba(253,208,0,1);
align-items: center;
justify-content: center;
font-size:36rpx;
font-weight:bold;
color:rgba(71,71,71,1);
line-height:48rpx;
bottom: 0
}
.address-tc-it{
    margin-bottom: 20rpx;
    background: white;box-shadow: 0px 2px 5px 0px rgba(51,51,51,0.06)
}
.address-tc-tt{
font-size:30rpx;
font-weight:400;
color:rgba(51,51,51,1);
}
.address-tc-row{
    padding: 27rpx 44rpx 38rpx 24rpx ;
    border-bottom: 1rpx solid rgba(240,240,240,1);
    margin-bottom: 20rpx;
}
.address-tc-row:last-child{
    border-bottom:none
}
.address-tc-val{
font-size:30rpx;
font-weight:400;
color:rgba(51,51,51,1);
justify-content: flex-end
}
</style>
