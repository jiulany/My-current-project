<template>
  <view class="span24 mycar">
      <view class="span24 mycar-it" v-for="item in car_list" :key="item.id">
        <view class="span24" >
          <!-- <view class="span24 mycar-bd" @tap="toBdPark">绑定车位</view> -->
          <view class="span24">
              <view class="span24 mycar-rw">
                  <view class="span20 mycar-chepai">{{item.car_number}}</view>
                  <view class="span4 mycar-dele" ><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png' @tap="openDeleModel(item,$event)"></image></view>
              </view>
              <view class="span24  mycar-rw">
              <view class="span5"><image class="mycar-chebiao" mode="aspectFit" :src="item.brand_url"></image></view>
              <view class="span14">
                            {{item.full_name}}
              </view>
              <view class="span5 mycar-bj" @tap="toBj(item,$event)">编辑</view>
              </view>
          </view>
        </view>
        <!-- <view class="span24" v-else>
              <view class="span24 mycar-rw">
                  <view class="span20 mycar-chepai">{{item.car_number}}</view>
                  <view class="span4 mycar-dele" ><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png' @tap="openDeleModel(item,$event)"></image></view>
              </view>
              <view class="span24  mycar-rw">
              <view class="span5"><image class="mycar-chebiao" mode="aspectFit" :src="item.brand_url"></image></view>
              <view class="span14">
                            {{item.full_name}}
              </view>
              <view class="span5 mycar-bj" @tap="toBj(item,$event)">编辑</view>
              </view>
              <view class="span24 mycar-line"></view>
              <view class="span24 mycar-bdpark">
                  <view class="span18 mycar-parkbh">车位编号：{{item.space.park_name}}</view>
                  <view class="span6 mycar-clbd" >取消绑定</view>
              </view>
          </view> -->
      </view>
      <view class="span24 mycar-tj" @tap="toAddCar">添加</view>
      <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该车辆吗？' @cancel='cancelModel' @confirm='confirmModel'/>
    <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import Modal from '../../components/x-modal/x-modal'
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        car_list:null,
        showModel:false
    }
  },
  methods: {
      toBdPark(){
          uni.navigateTo({url: '/pages/my_car_bdpark/my_car_bdpark'});
      },
      toAddCar(){
          uni.navigateTo({url: '/pages/my_nocar/my_nocar?switchPage=2'});
      },
      reLoadList(){
      this.$http({ url: `api/mine/cars` ,data:{}}).then(res => {
          this.car_list=res.data
          })
          .catch(res => {});
      },
      toBj(item,e){
          uni.navigateTo({url: `/pages/my_nocar/my_nocar?switchPage=2&id=${item.id}`});
      },
      openDeleModel(item,e){
          this.showModel=true
          this.curClickItem=item
      },
      confirmModel(e){
          let _this=this
          this.$http({
        url: "api/mine/del_car",
        method: "POST",
        data: {
          id:this.curClickItem.id
        }
      })
        .then(res => {
            _this.reLoadList()
            _this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            _this.HMmessages.show(res.msg, { icon: "error" });
        });
      }
  },
  components: { Modal,HMmessages},
  onLoad() {
  },
  onShow() {
      this.reLoadList()
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
.mycar{
    padding-bottom: 200rpx
}
.mycar-it{
margin:  25rpx 25rpx 0 25rpx;
background: white;
border-radius:10rpx;
padding: 25rpx 0  15rpx 0
}
.mycar-chebiao{
    width:103rpx;
height:101rpx;
}
.mycar-dele image{
    width: 30rpx;
    height:32rpx;
}
.mycar-dele{
    justify-content: flex-end;
    align-items: center
}
.mycar-chepai{
    font-size: 32rpx
}
.mycar-rw{
    padding: 0 31rpx;
    margin-bottom: 24rpx
}
.mycar-bdpark{
    padding:12rpx 31rpx 0 31rpx;
    font-size: 30rpx
}
.mycar-bd{
    justify-content: flex-end;color:rgba(102,102,102,1);font-size:32rpx;
    padding: 0 21rpx 0 0;
    color: #fdd000
}
.mycar-bj{
    justify-content: flex-end;font-size:26rpx;
}
.mycar-line{
    width: 100%;
    height: 2rpx;
    background: rgba(240,240,240,1)
}
.mycar-clbd{
    justify-content: flex-end
}
.mycar-tj{
        position: fixed;
        bottom: 0;
        height: 96rpx;
        justify-content: center;
        align-items: center;
        background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);color:rgba(173,102,1,1);
}
</style>
