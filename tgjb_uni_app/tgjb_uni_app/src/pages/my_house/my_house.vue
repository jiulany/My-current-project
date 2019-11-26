<template>
  <view class="span24 myhouse">
      <view class="span24 myhouse-it" v-for="item in  list" :key="item.id">
          <view class="span24 myhouse-head">
              <view class="span18 myhouse-name" v-if="item.status===1">{{item.community_name}}</view>
              <view class="span18 myhouse-shenhe" v-if="item.status===0">审核中</view>
              <view class="span6 myhouse-ctrol">
                  <!-- <span @tap="bj(item,$event)">编辑</span> -->
                  <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
          </view>
          <view class="span24 myhouse-ct">
              <view class="span24 myhouse-ct-it">
                  <view class="span5">姓名</view>
                  <view class="span19 myhouse-ct-val">{{item.name}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">电话</view>
                  <view class="span19 myhouse-ct-val">{{item.phone}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">小区名称</view>
                  <view class="span19 myhouse-ct-val">{{item.community_name}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">单元楼</view>
                  <view class="span19 myhouse-ct-val">{{item.house_number}}</view>
              </view>
          </view>
      </view>
       <!-- <view class="span24 myhouse-it">
          <view class="span24 myhouse-head">
              <view class="span18 myhouse-name">脱狗家宝</view>
              <view class="span18 myhouse-shenhe">审核中</view>
              <view class="span6 myhouse-ctrol"><span>编辑</span><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
          </view>
          <view class="span24 myhouse-ct">
              <view class="span24 myhouse-ct-it">
                  <view class="span5">姓名</view>
                  <view class="span19 myhouse-ct-val">万潇</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">电话</view>
                  <view class="span19 myhouse-ct-val">18723739871</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">小区名称</view>
                  <view class="span19 myhouse-ct-val">脱狗家宝</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">单元楼</view>
                  <view class="span19 myhouse-ct-val">九栋905</view>
              </view>
          </view> 
     </view> -->
      <view class="span24 myhouse-sv">
          <view @tap="toCell">添加房屋</view>
      </view>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        list:null
    };
  },
  methods: {
      toCell(){
          uni.navigateTo({url: `/pages/cell_bind/cell_bind`});
      },
      bj(val){
          uni.navigateTo({url: `/pages/cell_bind/cell_bind?id=${val.id}`});
      },
  },
  components: { HMmessages  },
  onLoad() {
      this.$http({ url: `api/mine/houses` ,data:{}}).then(res => {
          this.list=res.data
          })
          .catch(res => {
              this.HMmessages.show(res.msg, { icon: "error" });
          });
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.myhouse-it{
    font-size:28rpx;
    padding: 0 23rpx
}
.myhouse-ctrol image{
    width: 30rpx;
    height: 32rpx;
}
.myhouse-shenhe{
    color:rgba(153,153,153,1);
}
.myhouse-name{
    color: #FDD000
}
.myhouse-ct-val{
    justify-content: flex-end
}
.myhouse-head{
    padding: 36rpx 39rpx 16rpx 6rpx
}
.myhouse-ctrol span{
    margin-right: 29rpx
}
.myhouse-ctrol{
    justify-content: flex-end
}
.myhouse-ct{
    background: white;
}
.myhouse-ct-it{
    padding: 22rpx 38rpx 32rpx 41rpx;
    border-bottom: 1rpx solid rgba(240,240,240,1)
}
.myhouse-ct-it:last-child{
    border-bottom: none
}
.myhouse-sv{
    justify-content: center;
    margin-top: 86rpx
}
.myhouse-sv view{
    width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37rpx;
text-align: center;
line-height: 73rpx;

font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);
}
</style>
