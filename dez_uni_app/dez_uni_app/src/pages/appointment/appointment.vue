<template>
	<view class="appo span24">
        <view class="span24 appo-form">
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">服务类型</view>
                <view class="span18 appo-form-val">
                    <picker mode = "multiSelector"  :value="[0, 0]" @change="changeType" :range="type_array" @columnchange="columnChange" range-key="class_name">
                        <view class="uni-input">{{type_array===null?'':(type_array[0][index_1].class_name+'-'+type_array[1][index_2].class_name)}}</view>
                    </picker>
                </view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">区域</view>
                <view class="span18 appo-form-val"><input @blur="soAdress" v-model="aa_address" type="text" placeholder="请输入区域地址"></view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">详细地址</view>
                <view class="span18 appo-form-val"><input @blur="soAdress" v-model="bb_address" type="text" placeholder="请输入详细地址"></view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">服务需求</view>
                <view class="span18 appo-form-val"><input v-model="remarks" type="text" placeholder="请输入服务需求"></view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">联系人</view>
                <view class="span18 appo-form-val"><input v-model="contacts" type="text" placeholder="请输入联系人"></view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">联系电话</view>
                <view class="span18 appo-form-val"><input maxlength="11" v-model="mobile" type="number" placeholder="请输入联系电话"></view>
            </view>
            <!-- <view class="span24 appo-form-it" style="padding-right:0">
                <view class="span24 appo-form-key">上传图片<span>（最多四张）</span></view>
                <view class="span24 appo-form-val appo-form-val-tp">
                    <view class="appo-form-pt" v-for="(item,inx) in image_list" :key="inx"><image   mode="aspectFit" :src='item'></image>
                    </view>
                    <view class="appo-form-pt"><image @tap="seleTp"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_add_photo.png'></image>
                    </view>
                </view>
            </view> -->
        </view>
        <view class="span24">
            <view class="span24 appo-tip">温馨提示</view>
            <view class="span24 appo-tip-ct">1：本次预约免费</view>
            <view class="span24 appo-tip-ct">2：维修、家政、装修所产生的费用直接和服务员沟通</view>
        </view>
        <view class="span24 appo-btm">
			<view  @tap="toYuyue">立即预约</view>
		</view>
        <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
	</view>
</template>

<script>
import QQMapWX from '../../api/qqmap-wx-jssdk.min.js';
var qqmapsdk=new QQMapWX({
            key: 'PTOBZ-BVCW2-2U3U3-CEUP3-3UIJ7-DCFJX'
        });
import HMmessages from "../../components/HM-messages/HM-messages.vue";
	export default {
		data() {
			return {
                type_array:null,
                index_1:0,
                index_2:0,
                image_list:[],
                upl_list:[],
                full_address:'',
                aa_address:'',
                bb_address:'',
                remarks:null,
                contacts:null,
                mobile:null,
                longitude:null,
                latitude:null,
                if_click:true
			}
        },
        components: { HMmessages},
        onShow(){
                this.if_click=true
        },
		onLoad() {
            let _this=this  
           this.getAddress()
        this.$http({
        url: `api/goods_class`,data: {}
        }).then(res => {
            this.type_array=[res.data,res.data[0].zi]
        })
        .catch(res => {
        })
		},
		methods: {
            getAddress(){
                let _this=this
 uni.getLocation({
    type: 'wgs84',
    success: function (res) {
            qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
      success: function(res) {//成功后的回调
      console.log(res)
      _this.aa_address=res.result.address_component.province+res.result.address_component.city+res.result.address_component.district
      _this.bb_address=res.result.address_component.street_number
      _this.full_address=res.result.address_component.province+res.result.address_component.city+res.result.address_component.district+res.result.address_component.street_number
      qqmapsdk.geocoder({
      //获取表单传入地址
      address: res.result.address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) {//成功后的回调
        var res = res.result;
        _this.latitude= res.location.lat;
        _this.longitude= res.location.lng;
      },
      fail: function(error) {
      },
      complete: function(res) {
          if(res.status!=0){
               _this.full_address=''
             _this.HMmessages.show(res.message, { icon: "error" });
          }else{

          }
      }
    })
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
    }
});
            },
            soAdress(){
                let _this=this
                if(this.full_address==''){

                }else{
 qqmapsdk.geocoder({
      //获取表单传入地址
      address:_this.aa_address+_this.bb_address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) {//成功后的回调
        var res = res.result;
        _this.latitude= res.location.lat;
        _this.longitude= res.location.lng;
      },
      fail: function(error) {
      },
      complete: function(res) {
          if(res.status!=0){
               _this.full_address=''
               _this.aa_address=''
               _this.bb_address=''
             _this.HMmessages.show(res.message, { icon: "error" });
          }else{

          }
      }
    })
                }
            
            },
            changeType(e){
                this.index_1=e.detail.value[0]
                this.index_2=e.detail.value[1]
            },
            seleTp(){
                var _this=this
                uni.chooseImage({
    count: 4,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album','camera'], //从相册选择
    success: function (res) {
         _this.image_list=res.tempFilePaths
    }
});
            },
            columnChange(e){
               if(e.detail.column===0){
                   let a=this.type_array[0]
                   let b=a[e.detail.value].zi
                   this.type_array=[a,b]
               }
            },
            upLoad(inx){
                return new Promise((resolve,reject)=>{
             this.$http({ url: `upload` ,fileType:"image",filePath:this.image_list[inx],name:'img'},true).then(res=>{
                resolve(res.data.url)
             }).catch(res=>{
               reject(res)
             })
                })
                
            },
            toYuyue(){
                if(this.if_click){
                    console.log("Sss")
                    if(this.remarks==null||this.remarks==''||this.contacts==null||this.contacts==''||this.mobile==null||this.mobile==''){
                        
             this.HMmessages.show('请检查是否输入完全', { icon: "error" });
                    }else{
                         this.if_click=false
            Promise.all(this.image_list.map((item,inx)=>{
                return this.upLoad(inx)
            })).then(res=>{
        this.$http({
        url: "api/create_order",
        method: "POST",
        data: {
          remarks:this.remarks,
          remark_img:res,
          contacts:this.contacts,
          mobile:this.mobile,
          full_address:this.full_address,
          lng:this.longitude,//,
          lat:this.latitude,//,
          class_id:this.type_array[1][this.index_2].id,
          class_name:this.type_array[0][this.index_1].class_name+'-'+this.type_array[1][this.index_2].class_name
        }
      })
        .then(res => {
              this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"rgba(64,156,203,1)"});
              setTimeout(()=>{
              uni.navigateTo({url: `/pages/wait_jiedan/wait_jiedan?order_id=${res.data.order_id}`});
              },1500)
        })
        .catch(res => {
            this.if_click=true
             this.HMmessages.show(res.msg, { icon: "error" });
        });
            }).catch(res=>{
                this.if_click=true
            console.log(res)
            })
                    }
                }
            }
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
}
.appo{
    padding-bottom: 200rpx
}
.appo-form-it{
    padding: 40rpx 24rpx 20rpx 0;
    border-bottom:1px solid rgba(240,239,239,1);
}
.appo-form-it:last-child{
    border-bottom:none;
}
.appo-form{
    padding: 0 21rpx;
    background: white;
    margin-top: 20rpx
}
.appo-form-key{
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(64,156,203,1);
}
.appo-form-key span{
font-size:26rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,153,153,1);
}
.appo-form-val{
    justify-content: flex-end
}
.appo-form-val input{
    width: 100%;
    text-align: end
}
.appo-form-pt{
  width: 165rpx;
  height: 165rpx;
  /* margin-right: 20rpx; */
}
.appo-form-pt image{
  height: 100%;
  width: 100%;
  border-radius:20rpx;
}
.appo-tip{
font-size:28rpx;
padding: 35rpx 0 0 21rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(64,156,203,1);
}
.appo-tip-ct{
font-size:26rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(153,153,153,1);
padding: 0 0 0 21rpx
}
.appo-form-val-tp{
    justify-content: space-between
}
.appo-form-val-tp::after{
    content: '';
  width: 165rpx;
}
.appo-btm{
		position: fixed;
		bottom: 0;
		padding: 25rpx 0;
		padding-bottom: 50rpx;
		background: white;
		justify-content: center
	}
	.appo-btm > view{
		width:458rpx;
        background:rgba(64,156,203,1);
        border-radius:10rpx;
        font-size:30rpx;
		height: 65rpx;
		line-height: 65rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-align: center
	}
</style>
