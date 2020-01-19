<template>
  <view class="span24 cellbind">
    <view class="span24 cellbind-tt">房屋信息</view>
    <view class="span24 cellbind-fw">
      <view class="span24 cellbind-it">
        <view class="span5">小区</view>
        <view class="span19 cellbind-inp"><picker
            @change="bindPickerChange"
            :value="index"
            :range="community_list"
            range-key="community_name"
          >
            <view class="picker">{{community_list[community_index].community_name}}</view>
          </picker></view>
      </view>
      <view class="span24 cellbind-it">
        <view class="span5">楼栋房号</view>
        <view class="span19 cellbind-txt" @tap="openKeyboard"><input type="text" disabled v-model="loudong" placeholder="请选择"></view>
      </view>
      <view class="span24 cellbind-it" style="position:relative" @tap="sleShenFen">
        <view class="span5">身份</view>
        <view class="span19 cellbind-txt">{{obj_list[type-1]}}</view>
			  <view class="cellbind-rtr"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
      </view>
      <view class="span24 cellbind-it">
        <view class="span5">认证方式</view>
        <view class="span19 cellbind-txt">物业认证</view>
      </view>
    </view>
    <view class="span24 cellbind-tt">个人信息</view>
    <view class="span24 cellbind-fw">
      <view class="span24 cellbind-it">
        <view class="span5">姓名</view>
        <view class="span19 cellbind-inp"><input v-model="name" type="text" placeholder="请输入入住人全名"></view>
      </view>
      <view class="span24 cellbind-it">
        <view class="span5">手机号码</view>
        <view class="span19 cellbind-inp"><input v-model="phone" type="text" placeholder="请输入手机号" maxlength="11"></view>
      </view>
      <view class="span24 cellbind-it">
        <view class="span5">身份证号</view>
        <view class="span19 cellbind-inp"><input v-model="idcard"  type="text" placeholder="请输入身份证号"></view>
      </view>
    </view>
    <view class="span24 cellbind-form-it">
             <view class="span24 cellbind-form-lf">身份证正反面</view>
             <view class="span24 cellbind-form-upimg">
                 <view class="cellbind-form-addpt"><image @tap="seleTp(0,$event)" mode="aspectFit" :src="just_idk==''?'https://imgcdn.tuogouchebao.com/property/zhengmian.png':just_idk"></image><view>头像面</view></view>
                 <view class="cellbind-form-addpt"><image @tap="seleTp(1,$event)" mode="aspectFit" :src="back_idk==''?'https://imgcdn.tuogouchebao.com/property/fanmian.png':back_idk"></image><view>国徽面</view></view>
             </view>
         </view>
    <view class="span24 cellbind-ok">
      <view class="cellbind-ok-btn" @tap="save">确定</view>
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
export default {
  data() {
    return {
      id:null,
      community_index: 0,
      community_list: null,
      community_id:null,
      key_step:0,
      dong:"",
      unit:"",
      roomnum:"",
      dong_list:[],
      unit_list:[],
      roomnum_list:[],
      loudong:null,
      is_loudong:1,
      house_id:null,
      type:1,
      name:null,
      phone:null,
      idcard:null,
      just_idk:'',
      back_idk:'',
      obj_list:['业主', '家属', '租客']
    };
  },
  methods: {
    switchLoudog(val,e){
      this.is_loudong=val
    },
    seleTp(val,e){
          let _this=this
          uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                success: function (res) {
                    _this.$http({ url: `api/upload` ,fileType:"image",filePath:res.tempFilePaths[0],name:'img',data:{}},true).then(res => {
                       if(val==0){
                         _this.just_idk=res.data[1]
                       }
                       if(val==1){
                         _this.back_idk=res.data[1]
                       }
                   })
                    .catch(res => {
                        console.log(res)
                    });
                    }
          });
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
    save(){
      if(this.name==null){
            uni.showToast({
    title: '姓名不能为空',
    icon:'none',
    duration: 2000
});
      }else if(this.phone==null){
            uni.showToast({
    title: '手机不能为空',
    icon:'none',
    duration: 2000
});
      }else if(this.idcard==null){
            uni.showToast({
    title: '身份证不能为空',
    icon:'none',
    duration: 2000
});
      }else if(this.house_id==null){
            uni.showToast({
    title: '房号未选择',
    icon:'none',
    duration: 2000
});
      }else if(this.just_idk==''||this.back_idk==''){
            uni.showToast({
    title: '请上传身份证',
    icon:'none',
    duration: 2000
});
      }else{
      this.$http({ url: "api/home/create_user_house", data: {
        house_id:this.house_id,
        community_id:this.community_id,
        type:this.type,
        name:this.name,
        phone:this.phone,
        idcard:this.idcard,
        just_idk:this.just_idk,
        back_idk:this.back_idk
      },method:"post"})
          .then(res => {
            uni.showToast({
    title: res.msg,
    duration: 2000
});
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
              setTimeout(()=>{uni.navigateBack({delta: 1});},1500)
          })
          .catch(res => {
            uni.showToast({
    title: res.msg,
    icon:'none',
    duration: 2000
});
            // this.HMmessages.show(res.msg, { icon: "error" });
          });
      }
    },
    openKeyboard(){
      this.is_loudong=1
      this.dong=""
      this.unit=""
      this.roomnum=""
      this.dong_list=[]
      this.unit_list=[]
      this.roomnum_list=[]
      this.$http({ url: "api/floor/floor_list", data: {community_id:this.community_id} })
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
    bindPickerChange(e) {
      this.community_index = e.target.value;
      this.loudong=''
      this.dong=''
      this.unit=''
      this.roomnum=''
      this.house_id=null
      this.community_id =this.community_list[this.community_index].id;
    },
    sleShenFen(){
      let _this=this
      uni.showActionSheet({
    itemList:_this.obj_list ,
    success: function (res) {
        _this.type=res.tapIndex + 1
    },
    fail: function (res) {
    }
});
    }
  },
  components: { uniPopup,HMmessages},
  onLoad(opt) {
    this.$http({ url: "api/home/community", data: {} })
        .then(res => {
          this.community_list = res.data;
          this.community_id = res.data[0].id;
        })
        .catch(res => {});
        if(opt.id){
          this.id=opt.id
          this.$http({ url: `api/mine/houses/${opt.id}`, data: {} })
        .then(res => {
          let inx=this.community_list.findIndex((item)=>{
            return item.id==res.data.community_id
          })
          let a=res.data.house_number.split('-')
          this.dong=a[0]
          this.unit=a[1]
          this.roomnum=a[2]
          this.name=res.data.name
          this.phone=res.data.phone
          this.idcard=res.data.idcard

          this.community_index=inx
          this.community_id = res.data.community_id;
        })
        .catch(res => {});
        }
  },
  onShow() {
      uni.showTabBar()
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
  .cellbind{
    padding-bottom: 200rpx
  }
.cellbind-tt{
  font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
padding: 21rpx 0 22rpx 23rpx
}
.cellbind-fw{
  padding: 0 21rpx;
background: white
}
.cellbind-it{
padding: 24rpx  50rpx 24rpx 15rpx;
border-bottom:1px solid rgba(240,240,240,1);
}
.cellbind-inp{
  justify-content: flex-end;
}
.cellbind-inp input{
  font-size: 28rpx;
  text-align: end;
  width: 100%;
}
.cellbind-txt{
  justify-content: flex-end
}
.cellbind-txt input{text-align: end}
.cellbind-rtr{
  height: 25rpx;
  width: 20rpx;
  position: absolute;
  right: 10rpx;
  top:25rpx
}
.cellbind-rtr image{
  height: 100%;
  width: 100%
}
.cellbind-ok{
  justify-content: center;
  margin-top: 51rpx
}
.cellbind-ok-btn{
  width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37px;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);
text-align: center;
line-height: 73rpx
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
.cellbind-form-it{
    background: white;
    padding: 25rpx 27rpx 55rpx 14rpx;
    font-size: 28rpx;
    border-bottom:1px solid rgba(240,240,240,1);
}
.cellbind-form-it:last-child{
    border-bottom:none
}
.cellbind-form-lf{
    font-size: 28rpx;padding-left:18rpx;
}
.cellbind-form-upimg{
    margin-top: 25rpx
}
.cellbind-form-addpt{
    width:48%;
height:260rpx;
margin-right: 10rpx;
border: 1px dashed #f5f5f5;
margin-bottom: 15rpx;
position: relative;
}
.cellbind-form-addpt view{
  text-align: center;
  width: 100%;
  position: absolute;
  bottom:-56rpx;
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
}
.cellbind-form-addpt image{
    height: 100%;
    width: 100%
}
.cellbind-form-addpt input{
    position: absolute;
    top: 0;
    left: 0;
}
</style>
