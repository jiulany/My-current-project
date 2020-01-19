<template>
  <view class="span24 address">
    <view class="span24 address-ct">
      <view class="span24 address-it">
        <view class="span5">联系人</view>
        <view class="span19">
          <input v-model="name" type="text" placeholder="请输入联系人" />
        </view>
      </view>
      <view class="span24 address-it">
        <view class="span5">手机号码</view>
        <view class="span19">
          <input v-model="phone" maxlength="11" type="number" placeholder="请输入手机号码" />
        </view>
      </view>
      <view class="span24 address-it">
        <view class="span5">小区名称</view>
        <view class="span19" style="justify-content: flex-end">
          <picker
            @change="bindPickerChange"
            :value="index"
            :range="community_list"
            range-key="community_name"
          >
            <view class="picker">{{community_list[index].community_name}}</view>
          </picker>
        </view>
      </view>
      <view class="span24 address-it">
        <view class="span5">具体地址</view>
        <view class="span19">
          <input v-model="address" type="text" placeholder="请输入具体地址" />
        </view>
      </view>
      <view class="span24 address-it">
        <view class="span5">门牌号</view>
        <view class="span19" @tap="openKeyboard">
          <input  disabled v-model="loudong" type="text" placeholder="请选择" />
        </view>
      </view>
    </view>
    <view class="span24 address-sv">
      <view @tap.stop="saveAddress">保存</view>
    </view>
    <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <uni-popup ref="popup" class="cell-model" type="bottom">
		<view class="span24 cell-model-box">
      <view class="span24 cell-model-hd">
        <view :class="is_loudong==1?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(1,$event)">选择栋</view>
        <view :class="is_loudong==2?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(2,$event)">选择单元</view>
        <view :class="is_loudong==3?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(3,$event)">选择房号</view>
      </view>
      <view class="span24 cell-model-ct">
        <scroll-view  scroll-y="true" v-if="is_loudong==1">
        <view class="span24 cell-model-ct-it" v-for="item in dong_list" :key="item" @tap="tapLoudog(1,item,$event)">{{item}}栋</view>
        </scroll-view>
        <scroll-view  scroll-y="true" v-if="is_loudong==2" >
        <view class="span24 cell-model-ct-it" v-for="item in unit_list" :key="item" @tap="tapLoudog(2,item,$event)">{{item}}单元</view>
        </scroll-view>
        <scroll-view  scroll-y="true" v-if="is_loudong==3">
        <view class="span24 cell-model-ct-it" v-for="item in roomnum_list" :key="item.id" @tap="tapLoudog(3,item,$event)">{{item.number}}</view>
        </scroll-view>
      </view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
import {uniPopup   } from "@dcloudio/uni-ui";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      community_list: null,
      page_type: null,
      xiugai_id: null,
      index: 0,
      dong:"",
      unit:"",
      roomnum:"",
      dong_list:[],
      unit_list:[],
      roomnum_list:[],
      is_loudong:1,
      loudong:null,
      name: null,
      phone: null,
      address: null,
      number: null
    };
  },
  methods: {
    bindPickerChange(e) {
      this.index = e.target.value;
      this.address = this.community_list[e.target.value].community_address;
    },
     switchLoudog(val,e){
      this.is_loudong=val
    },
     openKeyboard(){
      this.is_loudong=1
      this.dong=""
      this.unit=""
      this.roomnum=""
      this.dong_list=[]
      this.unit_list=[]
      this.roomnum_list=[]
      this.$http({ url: "api/floor/floor_list", data: {community_id:uni.getStorageSync('community_selected').community_id} })
        .then(res => {
          this.dong_list=res.data
          this.$refs.popup.open()
        })
        .catch(res => {
           uni.showToast({
    title: res.msg,
    icon:'none',
    duration: 2000
});
            // this.HMmessages.show(res.msg, { icon: "error" });
            })
    },
    tapLoudog(val,item,e){
      if(val==1){
        this.dong=item
        this.is_loudong=2
        this.$http({ url: "api/floor/floor_get_unit", data: {foller:this.dong,community_id:this.community_id} })
        .then(res => {
          this.unit_list=res.data
        })
        .catch(res => {
          uni.showToast({
    title: res.msg,
    icon:'none',
    duration: 2000
});
            // this.HMmessages.show(res.msg, { icon: "error" });
            })
      }
      if(val==2){
        this.unit=item
        this.is_loudong=3
        this.$http({ url: "api/floor/floor_list_info", data: {foller:this.dong,unit:this.unit,community_id:this.community_id} })
        .then(res => {
          this.roomnum_list=res.data
        })
        .catch(res => {
          uni.showToast({
    title: res.msg,
    icon:'none',
    duration: 2000
});
            // this.HMmessages.show(res.msg, { icon: "error" });
            })
      }
      if(val==3){
        this.roomnum=item.number
        this.$http({ url: "api/home/find_house", data: {house_number:this.dong+this.unit+this.roomnum ,community_id:this.community_id} })
          .then(res => {
            this.house_id=res.data.id
            this.loudong=this.dong+'-'+this.unit+'-'+this.roomnum
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
          })
          .catch(res => {
            uni.showToast({
    title: res.msg,
    icon:'none',
    duration: 2000
});
            // this.HMmessages.show(res.msg, { icon: "error" });
          });
          this.$refs.popup.close()
      }
    },
    saveAddress() {
      if (this.page_type == "1") {
        console.log("address")
        this.$http({
          url: "api/mine/create_address",
          method: "POST",
          data: {
            name: this.name,
            phone: this.phone,
            address: this.address,
            number: this.loudong,
            house_id:this.house_id,
            community_id: this.community_list[this.index].id
          }
        })
          .then(res => {
            this.HMmessages.show(res.message, { icon: "success" ,iconColor:"#fdd000"});
            this.name = null;
            this.phone = null;
            this.address = null;
            this.number = null;
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1500);
          })
          .catch(res => {
            this.HMmessages.show(res.message, { icon: "error" });
          });
      }
      if(this.page_type == "2"){
        this.$http({
          url: "api/mine/save_address",
          method: "POST",
          data: {
              id:this.xiugai_id,
            name: this.name,
            phone: this.phone,
            address: this.address,
            number: this.number,
            community_id: this.community_list[this.index].id
          }
        })
          .then(res => {
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
            this.name = null;
            this.phone = null;
            this.address = null;
            this.number = null;
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1500);
          })
          .catch(res => {});
      }
    }
  },
  components: { HMmessages,uniPopup },
  onLoad(option) {
    console.log(option);
    this.page_type = option.type;
    this.xiugai_id = option.id;
    if (this.page_type == "1") {  //1为添加
      this.$http({ url: "api/home/community", data: {} })
        .then(res => {
          this.community_list = res.data;
          this.address = res.data[0].community_address;
        })
        .catch(res => {});
    }
    if (this.page_type == "2") { //2为修改
      this.$http({ url: `api/mine/address/${this.xiugai_id}`, data: {} })
        .then(res => {
          let data = res.data;
          this.$http({ url: "api/home/community", data: {} })
            .then(res => {
              this.community_list = res.data;
              let index=null
              for(let i in res.data){
                  if(data.community_id==res.data[i].id){
                      index=i
                      break
                  }
              }
              this.index=index
              this.address = res.data[index].community_address;
              this.name=data.name
              this.number=data.number
              this.phone=data.phone
            })
            .catch(res => {});
        })
        .catch(res => {});
    }
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  height: 100%;
  background: #f5f5f5;
}
.address-ct {
  background: white;
  margin-top: 19rpx;
}
.address-it {
  padding: 25rpx 30rpx;
  font-size: 28rpx;
  align-items: center;
}
.address-it input {
  font-size: 28rpx;
  width: 100%;
  text-align: end;
}
.address-sv {
  justify-content: center;
  margin-top: 101rpx;
}
.address-sv view {
  width: 395rpx;
  height: 70rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 195, 110, 1) 0%,
    rgba(252, 238, 191, 1) 100%
  );
  border-radius: 35rpx;
  color: #ad6601;
  text-align: center;
  line-height: 70rpx;
}
.cell-model-box{
box-shadow:0 -1px 2px rgba(0,0,0,.1);
}
.cell-model-hd-it{
  padding: 18rpx 51rpx 18rpx 51rpx;
  color: #FFC571FF;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,197,113,1);
justify-content: center;
  border-bottom: 2rpx solid rgba(245,245,245,1);
}
.cell-model-hd-it-ac{
  padding: 18rpx 51rpx 18rpx 51rpx;
  color: #FFC571FF;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,197,113,1);
justify-content: center;
  border-bottom: 2rpx solid #FFC573FF;
}
.cell-model-ct{
  height: 500rpx;
  overflow-y: scroll
}
.cell-model-ct-it{
  justify-content: center;
  border-bottom: 2rpx solid rgba(245,245,245,1);
  padding: 30rpx 0;
  height: 100rpx;
}
</style>
