<template>
  <view class="span24 myticket">
      <view class="span24 myticket-hd">
          <view :class="cur_hd===1?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(1)">全部</view>
          <view :class="cur_hd===2?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(2)">未使用</view>
          <view :class="cur_hd===3?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(3)">已使用</view>
          <view :class="cur_hd===4?'span6 myticket-hd-itac':'span6 myticket-hd-it'" @tap="clickTap(4)">已过期</view>
      </view>
      <view v-if="cur_hd===1" class="span24">
        <my_ticket :list="list1" />
      </view>
      <view v-if="cur_hd===2" class="span24 myticket-ct">
          <my_ticket :list="list2" />
      </view>
      <view v-if="cur_hd===3" class="span24 myticket-ct">
          <my_ticket :list="list3" />
      </view>
      <view v-if="cur_hd===4" class="span24 myticket-ct">
          <my_ticket :list="list4" />
      </view>
  </view>
</template>

<script> 
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
import my_ticket from "../../components/my_ticket/my_ticket"
export default {
  data() {
    return {
        cur_hd:1,
        list1:[],
        list2:[],
        list3:[],
        list4:[],
    };
  },
  components:{
      my_ticket
  },
  methods: {
      clickTap(val){
          console.log(val)
          this.cur_hd=val
          this.getUserCoupons(val)
      },
      getUserCoupons(status){
          let params = {
              confirm : '',
              status : status
          }
          userModel.getUserCoupons(params).then((res) => {
              switch(status){
                  case 1:
                      this.list1 = res.data
                      break;
                  case 2:
                      this.list2 = res.data
                      break;
                  case 3:
                      this.list3 = res.data
                      break;
                  case 4:
                      this.list4 = res.data
                      break;
              }
              
          })
      }
  },
  components: {},
  onLoad() {
      this.getUserCoupons(1)
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
