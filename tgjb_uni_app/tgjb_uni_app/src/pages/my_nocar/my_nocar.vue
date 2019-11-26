<template>
  <view class="span24 mynopark">
      <view v-if="switchPage===1" class="span24 nocar">
        <view class="span24 nocar-ico">
          <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_bangding.png'></image>
        </view>
        <view class="span24 nocar-tt">还没有添加车辆~</view>
        <view class="span24 nocar-btn">
          <view @tap="toBindCar">去添加</view>
        </view>
      </view>
      <view v-if="switchPage===2" class="span24 bindcar">
        <view class="span24 bindcar-it">
          <view class="span6">车主姓名：</view>
          <view class="span18 bindcar-it-val"><input v-model="name" style="width:100%;text-align:end" maxlength="6" type="text" placeholder="请填写车主姓名"/></view>
        </view>
        <view class="span24 bindcar-it">
          <view class="span6">电话号码：</view>
          <view class="span18 bindcar-it-val"><input v-model="phone" style="width:100%;text-align:end" maxlength="11" type="text" placeholder="请填写电话号码"/></view>
        </view>
        <view class="span24 bindcar-it">
          <view class="span6">车辆类型：</view>
          <view class="span18 bindcar-it-val"><image class="bindcar-it-sle" @tap="seleCarType(1,$event)" mode="aspectFit" :src="type===1?'https://imgcdn.tuogouchebao.com/property_mycar_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image>小型汽车<span style="width:15rpx"></span><image @tap="seleCarType(2,$event)" class="bindcar-it-sle" mode="aspectFit" :src="type===2?'https://imgcdn.tuogouchebao.com/property_mycar_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image>大型汽车</view>
        </view>
         <view class="span24 bindcar-it" @tap="openSeleCarType">
          <view class="span6">车辆品牌：</view>
          <view class="span18 bindcar-it-val"><span>{{full_name===""?'请选择车辆品牌':full_name}}</span><image class="bindcar-it-rtr" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
        </view>
        <view class="span24 bindcar-it">
          <view class="span6">车牌号码：</view>
          <view class="span18 bindcar-it-val">
            <view class="bindcar-sle-pro">
               <picker @change="bindPickerChange" :value="province_index" :range="province">
                        <view class="uni-input">{{province[province_index]}}</view>
                </picker>
            </view>
            <input v-model="car_number" maxlength="7" type="text" placeholder="请填写车牌号码"/>
          </view>
        </view>
        <view class="span24 bindcar-it" style="border-bottom:none">
          <view class="span24"  style="align-items: center">上传身份证<span style="font-size:24rpx;color:#666">(正反面）：</span></view>
          <view class="span18 bindcar-it-sfz">
            <view class="bindcar-it-pre"><image  @tap="bindIndw('zheng',$event)"   mode="aspectFit" :src='sfz[0].src'></image></view>
            <view class="bindcar-it-back"><image @tap="bindIndw('fan',$event)"   mode="aspectFit" :src='sfz[1].src'></image></view>
          </view>
        </view>
        <view class="span24 bindcar-sure"><view @tap="save">确定</view></view>
      </view>
      <seleBrand  :openSele="openSele" @seleEnd="seleEnd" @closeModel="closeSeleBrand"></seleBrand>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
import seleBrand from "@/components/sele-brand/sele-brand.vue";
import { setTimeout } from 'timers';
import { parse } from 'path';
export default {
  data() {
    return {
      switchPage:1,
      sfz:[{src:"https://imgcdn.tuogouchebao.com/property_add_photo.png"},{src:"https://imgcdn.tuogouchebao.com/property_add_photo.png"}],
      car_brands:{},
      openSele:false,
      type:1,
      province:["京", "津", "沪", "渝", "冀", "豫", "云", "辽", "黑", "湘","皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘","晋", "蒙", "陕", "吉", "闽", "贵", "粤","青", "藏", "川", "宁", "琼"],
      province_index:0,
      phone:null,
      name:null,
      car_number:null,
      full_name:"",
      brand_id:null,
      vehicle_id:null,
      equipmen_id:null,
      bj_id:null
    }
  },
  methods: {
    toBindCar(){
      this.switchPage=2
    },
    openSeleCarType(){
      this.openSele=true
    },
    closeSeleBrand(){
      this.openSele=false
    },
    bindPickerChange(e){
      this.province_index=e.detail.value
    },
    seleCarType(val){
      this.type=val
    },
    seleEnd(val){
      this.full_name=val.ms
      this.brand_id=val.first_id
      this.vehicle_id=val.second_id
      this.equipmen_id=val.third_id
    },
    upload(i){
      return new Promise((resolve,reject)=>{
        if(this.sfz[i].src.search('tmp')!==-1){
          this.$http({ url: `api/upload` ,fileType:"image",filePath:this.sfz[i].src,name:'img',data:{}},true).then(res=>{
              resolve(res)
             }).catch(res=>{
               reject(res)
             })
        }else{
             resolve({data:["url",this.sfz[i].src]})
        }
             
      })
    },
    save(){
      Promise.all([this.upload(0),this.upload(1)]).then(res=>{ 
      if(this.bj_id===null){
      this.$http({ url: `api/mine/create_cars` ,data:{
        name:this.name,
        phone:this.phone,
        car_number:this.province[this.province_index]+this.car_number,
        brand_id:this.brand_id,
        vehicle_id:this.vehicle_id,
        equipmen_id	:this.equipmen_id,
        full_name	:this.full_name,
        type:this.type,
        just_idk:res[0].data[1],
        back_idk:res[1].data[1]
      },method:"post"}).then(res => {
              this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
              setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
          })
          .catch(res => {
             this.HMmessages.show(res.msg, { icon: "error" });
          });
      }else{
        this.$http({ url: `api/mine/save_cars` ,data:{
        id:this.bj_id,
        name:this.name,
        phone:this.phone,
        car_number:this.province[this.province_index]+this.car_number,
        brand_id:this.brand_id,
        vehicle_id:this.vehicle_id,
        equipmen_id	:this.equipmen_id,
        full_name	:this.full_name,
        type:this.type,
        just_idk:res[0].data[1],
        back_idk:res[1].data[1]
      },method:"post"}).then(res => {
              this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
              setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
          })
          .catch(res => {
             this.HMmessages.show(res.msg, { icon: "error" });
          });
      }
      }).catch(function(res){
  console.log(res)
});
     
    },
    bindIndw(pd,e){
      let _this=this
      if(pd==='zheng'){
uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
        let sfz=_this.sfz
        sfz[0].src=res.tempFilePaths[0]
        _this.sfz=sfz
    }
});
      }
      if(pd==='fan'){
        uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
        let sfz=_this.sfz
        sfz[1].src=res.tempFilePaths[0]
        _this.sfz=sfz
    }
});
      }
    }
  },
  components: { seleBrand,HMmessages},
  onLoad(opt) {
    if(opt.switchPage==="1"){
      this.switchPage=1
    }
    if(opt.switchPage==="2"){
      this.switchPage=2
      if(opt.id!==undefined){//判断是否是编辑
      this.bj_id=opt.id
      this.$http({ url: `api/mine/cars/${this.bj_id}` ,
        data:{
        }}).then(res => {
          this.name=res.data.name
          this.phone=res.data.phone
          this.type=res.data.type
          this.full_name=res.data.full_name
          this.brand_id=res.data.brand_id
          this.equipmen_id=res.data.equipmen_id
          this.vehicle_id=res.data.vehicle_id
          this.car_number=res.data.car_number.slice(1)
          this.sfz=[{src:res.data.just_idk},{src:res.data.back_idk}]
          let a=res.data.car_number.slice(0,1)
          let b=null
          for(let i in this.province){
            if(this.province[i]===a){
              b=i
            }
          }
          this.province_index=b
          })
          .catch(res => {
          });
      }
    }
  },
  onShow() {
  },
  onHide() {}
};
</script>

<style>
page {
		background-color: #fff;
		font-size: 28rpx;
		line-height: 1.8;
    height: 100%;
	}
  .mynopark{
    background: #fff;
  }
.nocar-ico{
justify-content: center;
margin-top: 123rpx
}
.nocar-ico image{
width: 326rpx;
height: 316rpx;
}
.nocar-tt{
font-size:30rpx;
color:rgba(51,51,51,1);
justify-content: center;
padding: 41rpx 0
}
.nocar-btn{
  justify-content: center
}
.nocar-btn view{
  width:395rpx;
height:70rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:35rpx;
font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 70rpx;
margin-top: 40rpx
}
.bindcar{
  background: white;
  padding: 0 30rpx;
  height: 100%;
}
.bindcar-it{
padding: 30rpx 30rpx 26rpx  0;
font-size: 30rpx;
border-bottom:1rpx solid rgba(240,240,240,1);
position: relative;
}
.bindcar-it-val{
  justify-content: flex-end;
align-items: center
}
.bindcar-it-sle{
  height: 32rpx;
  width: 32rpx;
  margin-right: 10rpx
}
.bindcar-it-rtr{
  position: absolute;
  right: -5rpx;
  height: 28rpx;
  width: 16rpx
}
.bindcar-it span{
  color: #999999
}
.bindcar-it input{
  width:160rpx;
}
.bindcar-sle-pro{
  width:84rpx;
height:41rpx;
border:1rpx solid rgba(253,208,0,1);
color: rgba(253,208,0,1);
position: relative;
padding-left: 15rpx;
line-height: 41rpx;
margin-right: 28rpx
}
.bindcar-sle-pro::after{
  content: '';
   width: 0; 
 height: 0;
 position: absolute;
 right: 13rpx;
 top: 17rpx;
 border-width: 13rpx;
 border-style: solid;
 border-color:rgba(253,208,0,1) transparent transparent transparent;
}
.bindcar-it-pre,.bindcar-it-back{
  width: 165rpx;
  height: 165rpx;
}
.bindcar-it-pre image,.bindcar-it-back image{
  height: 100%;
  width: 100%;
  border-radius:20rpx;
}
.bindcar-it-back{
  margin-left:39rpx 
}
.bindcar-sure{
  margin-top: 64rpx;
  justify-content: center
}
.bindcar-sure view{
  width:395rpx;
height:70rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:35rpx;font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 70rpx
}
</style>
