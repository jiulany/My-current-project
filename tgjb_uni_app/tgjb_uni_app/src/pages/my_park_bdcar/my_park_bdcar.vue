<template>
  <view class="span24 bdcar">
      <view class="span24 bdcar-it" v-for="(item,inx) in car_list" :key="item.id" @tap="sleCar(inx,$event)">
          <view class="span2 bdcar-sle"><image  mode="aspectFit" :src="item.sle?'https://imgcdn.tuogouchebao.com/property_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image></view>
          <view class="span22">
              <view class="span24 bdcar-rw">
                  <view class="span20 bdcar-chepai">{{item.car_number}}</view>
                  <view class="span4 bdcar-dele" ><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png' @tap.stop="openDeleModel(item,$event)"></image></view>
              </view>
              <view class="span24  bdcar-rw">
              <view class="span5"><image class="bdcar-chebiao" mode="aspectFit" :src='item.brand_url'></image></view>
              <view class="span13">
                           {{item.full_name}}
              </view>
              <view class="span6 bdcar-bj" @tap.stop="toBj(item,$event)">编辑</view>
              </view>
          </view>
      </view>
      <!-- <view class="span24 bdcar-it">
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
      </view> -->
      <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该车辆吗？'   @confirm='confirmModel'/>
      <Modal v-model="showModel_0" confirm-style="color:#fdd000" title='确认绑定' text='确认绑定该车辆吗？'   @confirm='confirmModelBd'/>
      <view class="span24 bdcar-sure" @tap="bdCar"><view>确定</view></view>
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
        car_list:[],
        showModel:false,
        curSle:'',
        showModel_0:false,
        space_id:'',
    }
  },
  methods: {
      reLoadList(){
      this.$http({ url: `api/mine/cars` ,data:{}}).then(res => {
          let list=res.data
          for(let i in list){
              list[i].sle=false
          }
          this.car_list=list
          })
          .catch(res => {});
      },
      sleCar(ix,e){
          let list=this.car_list
          for(let i in list){
              list[i].sle=false
          }
          list[ix].sle=true
          this.curSle= list[ix]
          this.car_list=list
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
      }).then(res => {
            _this.reLoadList()
            _this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            _this.HMmessages.show(res.msg, { icon: "error" });
        });
      },
      bdCar(){
          this.showModel_0=true
      },
      confirmModelBd(){
          uni.showLoading({
            title: '绑定中'
          });
          let _this=this
          this.$http({
        url: "api/mine/bind",
        method: "POST",
        data: {
          space_id:parseInt(this.space_id),
          car_id:this.curSle.id
        }
      }).then(res => {

          uni.hideLoading();
          uni.showToast({
    title: res.msg,
    duration: 2000,
});
setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
        })
        .catch(res => {
          uni.hideLoading();
          uni.showToast({
    title: res.msg,
    duration: 2000,
    icon:'none'
});
        });
      }
  },
  components: {Modal,HMmessages},
  onLoad(opt) {
      this.space_id=opt.space_id
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
