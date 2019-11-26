<template>
  <view class="span24 mynopark">
      <view v-if="switchPage===1" class="span24 nocar">
        <view class="span24 nocar-ico">
          <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_bangding.png'></image>
        </view>
        <view class="span24 nocar-tt">还没有添加车位~</view>
        <view class="span24 nocar-btn">
          <view @tap="toBindCar">去添加</view>
        </view>
      </view>
      <view v-if="switchPage===2" class="span24 bindcar">
        <view class="span24 bindcar-it">
          <view class="span6">小区名称：</view>
          <view class="span18 bindcar-it-val"><input disabled :value="community_selected.community" style="width:100%;text-align:end"  type="text" /></view>
        </view>
        <view class="span24 bindcar-it">
          <view class="span6">车主姓名：</view>
          <view class="span18 bindcar-it-val"><input v-model="name" style="width:100%;text-align:end"  type="text" placeholder="请填写姓名"/></view>
        </view>
         <view class="span24 bindcar-it">
          <view class="span6">手机号：</view>
          <view class="span18 bindcar-it-val"><input v-model="phone" style="width:100%;text-align:end" maxlength="11" type="text" placeholder="请填写号码"/></view>
        </view>
        <view class="span24 bindcar-it">
          <view class="span6">车位编号：</view>
          <view class="span18 bindcar-it-val"><input @tap="openKeyboard" v-model="space" disabled style="width:100%;text-align:end"  type="text" placeholder="请填写编号"/></view>
        </view>
        <view class="span24 bindcar-it" style="border-bottom:none">
          <view class="span24"  style="align-items: center">上传身份证<span style="font-size:24rpx;color:#666">(人面和国徽面）：</span></view>
          <view class="span18 bindcar-it-sfz">
            <view class="bindcar-it-pre"><image  @tap="bindIndw('zheng',$event)"   mode="aspectFit" :src='sfz[0].src'></image></view>
            <view class="bindcar-it-back"><image @tap="bindIndw('fan',$event)"   mode="aspectFit" :src='sfz[1].src'></image></view>
          </view>
        </view>
        <view class="span24 bindcar-sure"><view @tap="save">确定</view></view>
      </view>
      <uni-popup ref="popup" class="cell-model" type="bottom">
		<view class="span24 cell-model-box">
      <view class="span24 cell-model-hd">
        <view :class="is_loudong==1?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(1,$event)">选择栋</view>
        <view :class="is_loudong==2?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(2,$event)">选择单元</view>
        <view :class="is_loudong==3?'span8 cell-model-hd-it-ac':'span8 cell-model-hd-it'" @tap="switchLoudog(3,$event)">选择房号</view>
      </view>
      <view class="span24 cell-model-ct">
        <scroll-view  scroll-y="true" v-if="is_loudong==1">
        <view class="span24 cell-model-ct-it" v-for="item in dong_list" :key="item.id" @tap="tapLoudog(1,item,$event)">{{item.park_floor}}</view>
        </scroll-view>
        <scroll-view  scroll-y="true" v-if="is_loudong==2" >
        <view class="span24 cell-model-ct-it" v-for="item in unit_list" :key="item.park_region" @tap="tapLoudog(2,item,$event)">{{item.park_region}}区</view>
        </scroll-view>
        <scroll-view  scroll-y="true" v-if="is_loudong==3">
        <view class="span24 cell-model-ct-it" v-for="item in roomnum_list" :key="item.id" @tap="tapLoudog(3,item,$event)">{{item.park_name}}</view>
        </scroll-view>
      </view>
		</view>
	</uni-popup>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import {uniPopup   } from "@dcloudio/uni-ui";
import HMmessages from "../../components/HM-messages/HM-messages.vue";
var timeout=null
export default {
  data() {
    return {
      switchPage:1,
      sfz:[{src:"https://imgcdn.tuogouchebao.com/property_add_photo.png"},{src:"https://imgcdn.tuogouchebao.com/property_add_photo.png"}],
      community_selected:null,
      is_loudong:1,
      floor_name:"",
      dong:"",
      unit:"",
      roomnum:"",
      dong_list:[],
      unit_list:[],
      roomnum_list:[],
      name:null,
      phone:null,
      space:null,
      spaces_id:null,
      bj_id:null
    }
  },
  methods: {
    switchLoudog(val,e){
      this.is_loudong=val
    },
    tapLoudog(val,item,e){
      if(val==1){
        this.dong=item.id
        this.floor_name=item.park_floor
        this.is_loudong=2
        this.$http({ url: "api/park/park_region", data: {floor_id:this.dong} })
        .then(res => {
          this.unit_list=res.data
        })
        .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });})
      }
      if(val==2){
        this.unit=item.park_region
        this.is_loudong=3
        this.$http({ url: "api/park/park_info", data: {floor_id:this.dong,park_region:this.unit} })
        .then(res => {
          this.roomnum_list=res.data
        })
        .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });})
      }
      if(val==3){
        this.roomnum=item.park_name
              this.spaces_id=item.id
              this.space=this.floor_name+this.roomnum
              console.log(this.space,this.spaces_id)
          this.$refs.popup.close()
      }
    },
    openKeyboard(){
      this.is_loudong=1
      this.$http({ url: "api/park/park_list", data: {} })
        .then(res => {
          this.dong_list=res.data
          this.$refs.popup.open()
        })
        .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });})
    },
    toBindCar(){
      this.switchPage=2
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
      this.$http({ url: `api/mine/create_spaces` ,
        data:{
          name:this.name,
          phone:this.phone,
          spaces_id:this.spaces_id,
          community_id:this.community_selected.community_id,
          just_idk:res[0].data[1],
          back_idk:res[1].data[1],
        },method:"post"}).then(res => {
             this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
              setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
          })
          .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });
          });
      }else{
        this.$http({ url: `api/mine/save_spaces` ,
        data:{
          id:this.bj_id,
          name:this.name,
          phone:this.phone,
          spaces_id:this.spaces_id,
          community_id:this.community_selected.community_id,
          just_idk:res[0].data[1],
          back_idk:res[1].data[1],
        },method:"post"}).then(res => {
             this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
              setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
          })
          .catch(res => {
            this.HMmessages.show(res.msg, { icon: "error" });
          });
      }
      })
    },
    bindIndw(pd,e){
      let _this=this
      if(pd==='zheng'){
uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
      console.log(res)
        let sfz=_this.sfz
        sfz[0].src=res.tempFilePaths[0]
        _this.sfz=sfz
    }
});
      }
      if(pd==='fan'){
        uni.chooseImage({
    count: 1, //默认9
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
  components: {HMmessages ,uniPopup},
  onLoad(opt) {
    this.community_selected=uni.getStorageSync('community_selected')
    if(opt.switchPage==="1"){
      this.switchPage=1
    }
    if(opt.switchPage==="2"){
      this.switchPage=2
      if(opt.id!==undefined){//判断是否是编辑
      this.bj_id=opt.id
      this.$http({ url: `api/mine/myspaces/${this.bj_id}` ,
        data:{
        }}).then(res => {
          this.community_selected={community_id:res.data.community_id,community:res.data.community_name}
          this.name=res.data.name
          this.phone=res.data.phone
          this.space=res.data.park_name
          this.spaces_id=res.data.spaces_id
          this.sfz=[{src:res.data.just_idk},{src:res.data.back_idk}]
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
