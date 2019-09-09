<template>
  <view class="span24 bal-details">
      <view class="span24">
<!--          <view class="span24 bal-details-moth">本月</view>-->
          <view class="span24 bal-details-ct">
              <view class="span24 bal-details-itm" v-for="(item,index) in  list" :kye="index">
                  <view class="span18">
                      <view class="span24 bal-details-tt">{{item.name}}</view>
                      <view class="span24 bal-details-tm">{{item.created_at}}</view>
                  </view>
                  <view class="span6 bal-details-mny">{{item.money}}</view>
              </view>
          </view>
      </view>
  </view>
</template>
<script>
    import {UserModel} from "../../model/user";
    const  userModel = new UserModel()
export default {
  data() {
    return {
        list:[],
        pages:{
            page:1,
            size:10
        }
    };
  },
  methods: {
      _getBalance(){
          let data = this.pages
          userModel.getBalances(data).then((res)=>{
            if(res.code < 400) {
                this.list = res.data
            }
          })
      },
  },
  components: {},
  onLoad: function() {
      this._getBalance()
  },
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
  line-height: 1.8;
}
.bal-details-moth{
    padding:12rpx 24rpx
}
.bal-details-itm{
    background: white;
    padding:12rpx 24rpx
}
.bal-details-tt{
    font-size: 32rpx
}
.bal-details-tm{
    font-size: 24rpx;
    color: #999999
}
.bal-details-mny{
    justify-content: flex-end;
    align-items: center;
    font-size: 32rpx
}
</style>
