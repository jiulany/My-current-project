<template>
  <view class="span24 bdcar">
      <view class="span24 bdcar-it">
          <view class="span2 bdcar-sle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image></view>
          <view class="span22">
              <view class="span24 bdcar-rw">
                  <view class="span20 bdcar-chepai">川A123456</view>
                  <view class="span4 bdcar-dele" ><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
              </view>
              <view class="span24  bdcar-rw">
              <view class="span5"><image class="bdcar-chebiao" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_baoxiu.png'></image></view>
              <view class="span13">
                            宝马 4系 2014款 420i GranCoupe 时尚型 2.0T
              </view>
              <view class="span6 bdcar-bj">编辑</view>
              </view>
          </view>
      </view>
      <view class="span24 bdcar-it">
          <view class="span2 bdcar-sle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'></image></view>
          <view class="span22">
              <view class="span24 bdcar-rw">
                  <view class="span20 bdcar-chepai">川A123456</view>
                  <view class="span4 bdcar-dele" ><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
              </view>
              <view class="span24  bdcar-rw">
              <view class="span5"><image class="bdcar-chebiao" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_my_baoxiu.png'></image></view>
              <view class="span13">
                            宝马 4系 2014款 420i GranCoupe 时尚型 2.0T
              </view>
              <view class="span6 bdcar-bj">编辑</view>
              </view>
          </view>
      </view>
      <view class="span24 bdcar-sure"><view>确定</view></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
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
.bdcar-it{
margin:  25rpx 25rpx 0 25rpx;
background: white;
border-radius:10rpx;
padding: 25rpx 0  15rpx 0
}
.bdcar-chebiao{
    width:103rpx;
height:101rpx;
}
.bdcar-dele image{
    width: 30rpx;
    height:32rpx;
}
.bdcar-dele{
    justify-content: flex-end;
    align-items: center
}
.bdcar-chepai{
    font-size: 32rpx
}
.bdcar-rw{
    padding: 0 31rpx;
    margin-bottom: 24rpx
}
.bdcar-bdpark{
    padding:12rpx 31rpx 0 31rpx;
    font-size: 30rpx
}
.bdcar-bd{
    justify-content: flex-end;color:rgba(102,102,102,1);font-size:32rpx;
    padding: 0 21rpx 0 0;
    color: #fdd000
}
.bdcar-bj{
    justify-content: flex-end;font-size:26rpx;
}
.bdcar-line{
    width: 100%;
    height: 1rpx;
    background: rgba(240,240,240,1)
}
.bdcar-clbd{
    justify-content: flex-end
}
.bdcar-sle{
    align-items: center;
    justify-content: center;
    padding-left: 20rpx
}
.bdcar-sle image{
    height: 36rpx;
    width: 36rpx;
}
.bdcar-sure {
    justify-content: center;
    margin-top: 119rpx
}
.bdcar-sure view{
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
