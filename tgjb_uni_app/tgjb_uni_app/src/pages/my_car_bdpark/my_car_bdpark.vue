<template>
  <view class="span24 bdpark">
      <view class="span24 bdpark-it">
          <view class="span2 bdpark-sle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image></view>
          <view class="span22">
          <view class="span24 bdpark-hd">
              <view class="span3 bdpark-ico">
                   <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
              </view>
              <view class="span17 bdpark-xq">脱狗小区</view>
          </view>
          <view class="span24 bdpark-ct">
              <view class="span13">
                  <view class="span24 bdpark-ct-it">姓名：万潇</view>
                  <view class="span24 bdpark-ct-it">电话：18254695781</view>
                  <view class="span24 bdpark-ct-it">车位编号：2324</view>
              </view>
              <view class="span8 bdpark-bg"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_cheliang.png'></image></view>
              <view class="span3">
                  <view class="span24 bdpark-delete"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
                  <view class="span24 bdpark-edit">编辑</view>
              </view>
          </view>
          </view>
      </view>
      <view class="span24 bdpark-it">
          <view class="span2 bdpark-sle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'></image></view>
          <view class="span22">
          <view class="span24 bdpark-hd">
              <view class="span3 bdpark-ico">
                   <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
              </view>
              <view class="span17 bdpark-xq">脱狗小区</view>
          </view>
          <view class="span24 bdpark-ct">
              <view class="span13">
                  <view class="span24 bdpark-ct-it">姓名：万潇</view>
                  <view class="span24 bdpark-ct-it">电话：18254695781</view>
                  <view class="span24 bdpark-ct-it">车位编号：2324</view>
              </view>
              <view class="span8 bdpark-bg"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_cheliang.png'></image></view>
              <view class="span3">
                  <view class="span24 bdpark-delete"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
                  <view class="span24 bdpark-edit">编辑</view>
              </view>
          </view>
          </view>
      </view>
      <view class="span24 bdpark-sure"><view>确定</view></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
      toBdCar(){
          uni.navigateTo({url: '/pages/my_park_bdcar/my_park_bdcar'});
      }
  },
  components: { },
  onLoad() {
  },
  onShow() {
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
    .bdpark-hd{
        padding:0 10rpx 
    }
    .bdpark-ico image{
        height: 49rpx;
        width: 49rpx
    }
    .bdpark-it{
        padding: 29rpx 25rpx 0 25rpx;
        margin-top: 20rpx;
    }
    .bdpark-delete{
        justify-content: center 
    }
    .bdpark-delete image{
        height: 35rpx;
        width: 35rpx;

    }
    .bdpark-edit{
        justify-content: center;
        font-size: 26rpx
    }
    .bdpark-bg{
        align-items: flex-end
    }
    .bdpark-bg image{
        width: 180rpx;
        height: 140rpx;
        position: relative;
        bottom: 20rpx
    }
    .bdpark-ct{
        background:rgba(255,255,255,1);
border-radius:10rpx;
padding: 22rpx 28rpx 8rpx 23rpx;
margin-top: 16rpx
    }
    .bdpark-ct-it{
        margin-bottom: 15rpx;
        font-size: 30rpx
    }
    /* .bdpark-ct-it:last-child{
        margin-bottom: 0
    } */
    .bdpark-xq{
        color: #fdd000
    }
    .bdpark-bd{
        padding: 15rpx 0 0 0
    }
    .bdpark-quxbd{
        justify-content: flex-end
    }
    .bdpark-sle{
    align-items: center;
    justify-content: center;
    padding-right: 20rpx
}
.bdpark-sle image{
    height: 36rpx;
    width: 36rpx;
}
.bdpark-sure {
    justify-content: center;
    margin-top: 119rpx
}
.bdpark-sure view{
width:395rpx;
height:70rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:35rpx;
font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 70rpx
}
</style>
