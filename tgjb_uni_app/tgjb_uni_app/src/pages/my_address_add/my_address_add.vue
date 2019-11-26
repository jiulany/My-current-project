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
        <view class="span19">
          <input v-model="number" type="text" placeholder="请输入门牌号" />
        </view>
      </view>
    </view>
    <view class="span24 address-sv">
      <view @tap="save">保存</view>
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
import { setTimeout } from "timers";
export default {
  data() {
    return {
      community_list: null,
      page_type: null,
      xiugai_id: null,
      index: 0,
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
    save() {
      if (this.page_type == "1") {
        this.$http({
          url: "api/mine/create_address ",
          method: "POST",
          data: {
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
          .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });
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
  components: { HMmessages },
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
</style>
