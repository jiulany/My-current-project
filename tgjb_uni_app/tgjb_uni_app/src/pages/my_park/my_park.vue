<template>
  <view class="span24 mypark">
      <view class="span24 mypark-it" v-for="item in park_list" :key="item.id">
          <view class="span24" v-if="item.car===null">
          <view class="span24 mypark-hd">
              <view class="span3 mypark-ico">
                   <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
              </view>
              <view class="span17 mypark-xq">{{item.community_name}}</view>
              <view class="span4" @tap="toBdCar">绑定车辆</view>
          </view>
          <view class="span24 mypark-ct">
              <view class="span13">
                  <view class="span24 mypark-ct-it">姓名：{{item.name}}</view>
                  <view class="span24 mypark-ct-it">电话：{{item.phone}}</view>
                  <view class="span24 mypark-ct-it">车位编号：{{item.park_name}}</view>
              </view>
              <view class="span8 mypark-bg"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_cheliang.png'></image></view>
              <view class="span3">
                  <view class="span24 mypark-delete"><image @tap="openDeleModel(item,$event)" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
                  <view class="span24 mypark-edit" @tap="toBj(item,$event)">编辑</view>
              </view>
          </view>
          </view>
          <view class="span24" v-else>
              <view class="span24 mypark-hd">
              <view class="span3 mypark-ico">
                   <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
              </view>
              <view class="span17 mypark-xq">{{item.community_name}}</view>
              <!-- <view class="span4">绑定车辆</view> -->
          </view>
          <view class="span24 mypark-ct">
              <view class="span13">
                  <view class="span24 mypark-ct-it">姓名：{{item.name}}</view>
                  <view class="span24 mypark-ct-it">电话：{{item.phone}}</view>
                  <view class="span24 mypark-ct-it">车位编号：{{item.park_name}}</view>
              </view>
              <view class="span8 mypark-bg"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_cheliang.png'></image></view>
              <view class="span3">
                  <view class="span24 mypark-delete"><image @tap="openDeleModel(item,$event)" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
                  <view class="span24 mypark-edit" @tap="toBj(item,$event)">编辑</view>
              </view>
              <view style="height:1px;width:100%;background:rgba(240,240,240,1)"></view>
              <view class="span24 mypark-bd">
                  <view class="span18">车辆：{{item.car.car_number}}</view>
                  <view class="span6 mypark-quxbd">取消绑定</view>
              </view>
          </view>
          </view>
      </view>
      <view class="span24 mypark-tj" @tap="toAddPark">添加</view>
      <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该车位吗？' @cancel='cancelModel' @confirm='confirmModel'/>
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
        park_list:null,
        showModel:null
    }
  },
  methods: {
      toBdCar(){
          uni.navigateTo({url: '/pages/my_park_bdcar/my_park_bdcar'});
      },
      reLoadList(){
      this.$http({ url: `api/mine/myspaces` ,data:{
      }}).then(res => {
          this.park_list=res.data
          })
          .catch(res => {});
      },
      toAddPark(){
          uni.navigateTo({url: '/pages/my_nopark/my_nopark?switchPage=2'});
      },
      openDeleModel(item,e){
          console.log(item)
          this.showModel=true
          this.curClickItem=item
      },
      toBj(item,e){
          uni.navigateTo({url: `/pages/my_nopark/my_nopark?switchPage=2&id=${item.id}`});
      },
      confirmModel(e){
          let _this=this
          this.$http({
        url: "api/mine/del_spaces",
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
    .mypark{
        padding-bottom: 200rpx
    }
    .mypark-hd{
        padding:0 10rpx 
    }
    .mypark-ico image{
        height: 49rpx;
        width: 49rpx
    }
    .mypark-it{
        padding: 29rpx 25rpx 0 25rpx
    }
    .mypark-delete{
        justify-content: center 
    }
    .mypark-delete image{
        height: 35rpx;
        width: 35rpx;

    }
    .mypark-edit{
        justify-content: center;
        font-size: 26rpx
    }
    .mypark-bg{
        align-items: flex-end
    }
    .mypark-bg image{
        width: 180rpx;
        height: 140rpx;
        position: relative;
        bottom: 20rpx
    }
    .mypark-ct{
        background:rgba(255,255,255,1);
border-radius:10rpx;
padding: 28rpx 28rpx 15rpx 23rpx;
margin-top: 16rpx
    }
    .mypark-ct-it{
        margin-bottom: 15rpx;
        font-size: 30rpx
    }
    /* .mypark-ct-it:last-child{
        margin-bottom: 0
    } */
    .mypark-xq{
        color: #fdd000
    }
    .mypark-bd{
        padding: 15rpx 0 0 0
    }
    .mypark-quxbd{
        justify-content: flex-end
    }
    .mypark-tj{
        position: fixed;
        bottom: 0;
        height: 96rpx;
        justify-content: center;
        align-items: center;
        background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);color:rgba(173,102,1,1);
}
</style>
