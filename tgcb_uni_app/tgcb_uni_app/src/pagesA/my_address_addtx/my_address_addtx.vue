<template>
  <view class="span24 addresstx">
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">收货人</view>
          <input type="text" class="span18 addresstx-val" v-model="contacts" placeholder="输入收货人名字">
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">手机号码</view>
          <input type="text" class="span18 addresstx-val" v-model="phone" placeholder="输入手机号码" @change="phoneChange">
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">所在地区</view>
          <view id="picker" class="span18 addresstx-val"  @click="showMulLinkageThreePicker" style="color:#999">{{ pickerText.label }}</view>
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">详细地址</view>
          <input type="text" class="span18 addresstx-val" v-model="full_address" placeholder="输入详细地址">
      </view>
      <view class="span24 addresstx-it">
          <view class="span6 addresstx-key">补充地址</view>
           <input type="text" class="span18 addresstx-val" v-model="supply_address" placeholder="输入需要补充的地址">
      </view>
      <view class="span24 addresstx-it">
          <view class="span10 addresstx-key">是否设为默认地址</view>
          <view class="span14 addresstx-val">
              <switch :disabled="disabled" :checked="isDefault" @change="onSwitchChange" />
          </view>
      </view>
      <view class="span24 addresstx-save" @tap="update" v-if='options'>保存修改</view>
      <view class="span24 addresstx-save" @tap="save" v-else>保存</view>

      <mpvue-city-picker
      :themeColor="themeColor"
      ref="mpvueCityPicker"
      :pickerValueDefault="cityPickerValueDefault"
      @onCancel="onCancel"
      @onConfirm="onConfirm"
    ></mpvue-city-picker>
  </view>
</template>

<script> 
import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue";
import cityData from "../../common/city.data.js";
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
export default {
  components: {
    mpvueCityPicker
  },
  data() {
    return {
        cur_hd:1,
        contacts:'',
        full_address:'',
        supply_address:'',
        phone:'',
        moren: true,
        isDefault:0,
        title: "picker",
        array: ["中国", "美国", "巴西", "日本"],
        index: 0,
        time: "12:01",
        themeColor: "#007AFF",
        cityPickerValueDefault: [0, 0, 1],
        pickerText: { label: "请选择城市", value: [], cityCode: "" },
        options:{}
    };
  },
  methods: {
    phoneChange(e) {
      this.phone = e.detail.value;
    },
       // 三级联动选择
    showMulLinkageThreePicker() {
      this.$refs.mpvueCityPicker.show();
    },
    onConfirm(e) {
      this.pickerText = e;
      console.log(e)
    },
    onCancel(){

    },
    onSwitchChange(e){
        console.log(this.isDefault)
        if (this.isDefault == 1) {
            this.isDefault = 0
        } else {
            this.isDefault = 1
        }
    },
    getDetails(id)
    {
        let params = {
            id:id
        }
        userModel.getAddressDetails(params).then((res)=>{
            let data = res.data
            this.contacts = data.contacts
            this.phone = data.phone
            this.full_address = data.full_address
            this.supply_address = data.supply_address
            this.isDefault = data.is_default
            this.pickerText = {
              label:data.province + '-' + data.city + '-' + data.area,
              cityCode:data.area_code
            }
        })
    },
    save(){
      if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).test(this.phone)) {
        uni.showToast({
          title: '输入正确的手机号',
          icon: 'none'
        });
      }else {
        let params = this.params()
        userModel.createAddress(params).then((res) => {
        uni.showToast({
          title:res.message,
          icon:'none'
        })
        if (res.code == 201) {
          uni.navigateBack()
        }
      })
      }
      
    },
    update(){
      console.log(this.phone);
      if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).test(this.phone)) {
        uni.showToast({
          title: '输入正确的手机号',
          icon: 'none'
        });
      }else {
        let params = this.params()
      userModel.updateAddress(params,this.options).then((res) => {
        uni.showToast({
          title:res.message,
          icon:'none'
        })
        if (res.code == 200) {
          uni.navigateBack()
        }
      })
      }
      
    },
    params(){
      let label = this.pickerText.label
      let labelArr = label.split('-')
      let params = {
        contacts:this.contacts,
        phone:this.phone,
        full_address:this.full_address,
        supply_address:this.supply_address,
        is_default:this.isDefault,
        area_code:this.pickerText.cityCode,
        province:labelArr[0],
        city:labelArr[1],
        area:labelArr[2],
        type:1
      }
      return params
    }
  },
  onLoad(options) {
    if (options.id) {
        
        this.options = options
        console.log(options)
        this.getDetails(options.id)
    } 
  },
  onShow() {},
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.addresstx{
    background: white;
    margin-top: 20rpx
}
.addresstx-it{
    padding: 30rpx 28rpx 30rpx 21rpx ;
    border-bottom:1rpx solid rgba(240,240,240,1);
}
.addresstx-key{
    font-size: 30rpx
}
.addresstx-val{
    font-size: 30rpx;
    justify-content: flex-end;
    text-align: right;
}
.addresstx-val radio-group{
    text-align: end
}
.addresstx-save{
    position: fixed;
    bottom: 0;
height:98rpx;
background:rgba(253,208,0,1);
font-size:36rpx;
font-weight:bold;
color:rgba(71,71,71,1);
line-height:48rpx;
align-items: center;
justify-content: center
}
</style>
