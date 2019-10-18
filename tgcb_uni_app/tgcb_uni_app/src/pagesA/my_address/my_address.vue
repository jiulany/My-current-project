<template>
  <view class="span24 address">
      <view class="span24 address-hd">
          <view :class="cur_hd===1?'span12 address-hd-itac':'span12 address-hd-it'" @tap="clickTap(1)">通讯地址</view>
          <view :class="cur_hd===2?'span12 address-hd-itac':'span12 address-hd-it'" @tap="clickTap(2)">停车位地址</view>
      </view>
      <view v-if="cur_hd===1" class="span24 address-ct">
          
          <no-data title="暂无通讯地址" v-if="list1.length <=0 "></no-data>

          <view class="span24 address-tx-it" v-for="(item,index) in list1" :key="index" v-else @tap="toTxDetails(item.id)">
               <view class="span24 address-tx-row1">
                   <view class="span12 address-tx-nm">姓名：{{item.contacts}}</view>
                   <view class="span12 address-tx-call">电话：{{item.phone}}</view>
               </view>
               <view class="span24 address-tx-row2">
                   <view class="span18 address-tx-address">{{item.full_address}}
                        </view>
                   <view class="span6 address-bj">  <i class="iconfont icon-lajitong" ></i></view>
               </view>
          </view>
        
          <view class="span24 address-add" @tap="toAddTxAddress">+新建地址</view>
      </view>

      <view v-if="cur_hd===2" class="span24 address-ct">
          
          <no-data title="暂无停车地址" v-if="list2.length <= 0"></no-data>
          <view class="span24 address-tc-it"  v-else v-for="(item,index) in list2" :key="index" @tap="toTcDetails(item.id)">
              <view class="span24 address-tc-row">
                  <view class="span20">{{item.full_address}}</view>
                  <view class="span4"><i class="iconfont icon-lajitong" ></i></view>
              </view>
            
               <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">姓名</view>
                  <view class="span18 address-tc-val">{{item.contacts}}</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">电话</view>
                  <view class="span18 address-tc-val">{{item.phone}}</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">小区名字</view>
                  <view class="span18 address-tc-val">{{item.community_name}}</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">单元号</view>
                  <view class="span18 address-tc-val">{{item.unit}}</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">停车楼层</view>
                  <view class="span18 address-tc-val">{{item.ground}}</view>
              </view>
              <view class="span24 address-tc-row">
                  <view class="span6 address-tc-tt">车位号</view>
                  <view class="span18 address-tc-val">{{item.parking_number}}</view>
              </view>
          </view>
           
          <view class="span24 address-add" @tap="toAddTcAddress">+新建地址</view>
      </view>
  </view>
</template>

<script> 
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
import noData from "../../components/noData/noData"
export default {
  data() {
    return {
        cur_hd:1,
        list1:[],
        list2:[]
    };
  },
  methods: {
      clickTap(val){
          this.cur_hd=val
          this.getAddress()
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
      },
      getAddress()
      {
          console.log(this.cur_hd)
          let params = {
              type : this.cur_hd
          }
          userModel.getAddress(params).then((res) => {
              switch(this.cur_hd){
                  case 1:
                      this.list1 = res.data
                      break;
                  case 2:
                      this.list2 = res.data
                      break;
              }
          })
      },
      toTxDetails(id){
          uni.navigateTo({
              url:`/pagesA/my_address_addtx/my_address_addtx?id=${id}`
          })
      },
      toTcDetails(id){
          uni.navigateTo({
              url:`/pagesA/my_address_addtc/my_address_addtc?id=${id}`
          })
      },
  },
  components: {
      noData
  },
  onLoad() {
      
  },
  onShow() {
      this.getAddress()
  },
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.icon-lajitong{
    font-size: 60rpx;
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
/* font-weight:400; */
color:rgba(153,153,153,1);
}
.address-hd-itac{
    height: 98rpx;
    align-items: center;
    justify-content: center;
    background:rgba(255,209,0,1);
font-size:32rpx;
font-family:PingFang SC;
/* font-weight:400; */
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
    font-size: 32rpx;
}
.address-tx-nm{
    font-size: 32rpx;
}
.address-tx-address{
    font-size:28rpx;
font-family:PingFang SC;

color:#333333;
}
.address-tx-row2{
    margin-top: 30rpx;
}
.address-add{
    position: fixed;
height:98rpx;
background:rgba(253,208,0,1);
align-items: center;
justify-content: center;
font-size:36rpx;
/* font-weight:bold; */
color:#333333;
line-height:48rpx;
bottom: 0
}
.address-tc-it{
    margin-bottom: 20rpx;
    background: white;box-shadow: 0px 2px 5px 0px rgba(51,51,51,0.06)
}
.address-tc-tt{
font-size:30rpx;
/* font-weight:400; */
color:#333333;
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
/* font-weight:400; */
color:#333333;
justify-content: flex-end
}
</style>
