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
                <view class="span6 appo-form-key">详细地址</view>
                <view class="span18 appo-form-val"><input disabled @tap="sleAdress" v-model="full_address" type="text" placeholder="请选择详细地址"></view>
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
            <view class="span24 appo-form-it" style="padding-right:0">
                <view class="span24 appo-form-key">上传图片<span>（最多四张）</span></view>
                <view class="span24 appo-form-val appo-form-val-tp">
                    <view class="appo-form-pt" v-for="(item,inx) in image_list" :key="inx"><image   mode="aspectFit" :src='item'></image>
                    </view>
                    <view class="appo-form-pt"><image @tap="seleTp"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_add_photo.png'></image>
                    </view>
                </view>
            </view>
            <view class="span24 appo-form-it">
                <view class="span6 appo-form-key">订单加急</view>
                <view class="span18 appo-form-val"><switch :checked="is_jiaji" @change="switchChange" color="#409CCBFF"/></view>
                <view class="appo-form-jiaji" v-if="is_jiaji">
                    <view class="appo-form-jiaji-it" v-for="(it,ix) in jiaji_list" :key="it.id" @tap.stop='sleJiaItem(ix,$event)'>
                        <view class="appo-form-jiaji-nm">{{it.name}}</view>
                        <view class="appo-form-jiaji-pay">立即支付</view>
                        <image class="appo-form-jiaji-bg" :src="it.sle==true?'../../static/images/bulgexuanzhong.png':'../../static/images/bulge.png'"></image>
                    </view>
                </view>
            </view>
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
    <uni-popup ref="popup" type="bottom">
        <view class="mdl-jiaji">
            <view class="mdl-jiaji-line1">
                <view>加急费</view>
                <view class="mdl-jiaji-cls" @tap.stop="closeModel">取消</view>
            </view>
            <view class="mdl-jiaji-line2">
                <view class="mdl-jiaji-jg">{{cur_sle.price}}￥</view>
            </view>
            <view class="mdl-jiaji-line3">
                <view class="mdl-jiaji-weixinic"><image   mode="aspectFit" src='../../static/images/weixing.png'></image></view>
                <view class="mdl-jiaji-tt">微信支付</view>
                <view class="mdl-jiaji-sle"><image   mode="aspectFit" src='../../static/images/xuanzhong.png'></image></view>
            </view>
            <view class="mdl-jiaji-line4">
                <view class="mdl-jiaji-sur" @tap.stop="jiajiPay">确定</view>
            </view>
        </view>
    </uni-popup>
	</view>
</template>

<script>
import QQMapWX from '../../api/qqmap-wx-jssdk.min.js';
import { uniPopup } from "@dcloudio/uni-ui";
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
                is_jiaji:false,
                cur_sle:null,//当前选中加急
                image_list:[],
                upl_list:[],
                jiaji_list:[],
                full_address:'',
                remarks:null,
                contacts:null,
                mobile:null,
                longitude:null,
                latitude:null,
                if_click:true
			}
        },
        components: { HMmessages,uniPopup},
        onShow(){
                this.if_click=true
        },
		onLoad() {
            let _this=this  
           this.loadClass()
           this.loadJiajiList()
		},
		methods: {
            sleAdress(){
                let _this=this
            uni.chooseLocation({
    success: function (res) {
        _this.full_address=res.address
        _this.latitude=res.latitude
        _this.longitude=res.longitude
    }
});
            },
            closeModel(){
            this.$refs.popup.close()
            },
            sleJiaItem(val,e){
                let a=this.jiaji_list
                for(let i in a){
                    if(parseInt(i)==val){
                        a[i].sle=true
                        this.cur_sle=a[i]
                    }else{
                        a[i].sle=false
                    }
                }
                this.$set(this.jiaji_list,val,a[val])
            },
            loadClass(){
                this.$http({
        url: `api/goods_class`,data: {}
        }).then(res => {
            this.type_array=[res.data,res.data[0].zi]
        })
        .catch(res => {
        })
            },
            loadJiajiList(){
                this.$http({
        url: `api/urgent`,data: {}
        }).then(res => {
            let a=res.data
            if(res.data.length!=0){
                for(let i in res.data){
                    if(parseInt(i)==0){
                        a[i].sle=true
                        this.cur_sle=a[i]
                    }else{
                        a[i].sle=false
                    }
                }
            }
            this.jiaji_list=a
        })
        .catch(res => {
        })
            },
            switchChange(e){
                this.is_jiaji=e.detail.value
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
         let a=res.tempFilePaths
         a.forEach((it,inx)=>{
             _this.$http({ url: `upload` ,fileType:"image",filePath:it,name:'img'},true).then(res=>{
              _this.$set(_this.upl_list,inx,res.data.url)
               console.log(_this.upl_list)
             }).catch(res=>{
               console.log(res)
             })
             
         })
         
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
                let _this=this
                if(this.if_click){
                    if(!this.is_jiaji){//不需要加急

                    if(this.remarks==null||this.remarks==''||this.contacts==null||this.contacts==''||this.mobile==null||this.mobile==''){
                        
             this.HMmessages.show('请检查是否输入完全', { icon: "error" });
                    }else{
                         this.if_click=false
           
        this.$http({
        url: "api/create_order",
        method: "POST",
        data: {
          remarks:this.remarks,
          remark_img:this.upl_list,
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
           
                    }
                }else{//需要加急
            this.$refs.popup.open()
                }
                }
            },
            jiajiPay(){
                if(this.remarks==null||this.remarks==''||this.contacts==null||this.contacts==''||this.mobile==null||this.mobile==''){
                        
             this.HMmessages.show('请检查是否输入完全', { icon: "error" });
                    }else{
                         this.if_click=false
           
        this.$http({
        url: "api/create_order",
        method: "POST",
        data: {
          remarks:this.remarks,
          remark_img:this.upl_list,
          contacts:this.contacts,
          mobile:this.mobile,
          full_address:this.full_address,
          lng:this.longitude,//,
          lat:this.latitude,//,
          class_id:this.type_array[1][this.index_2].id,
          class_name:this.type_array[0][this.index_1].class_name+'-'+this.type_array[1][this.index_2].class_name,
          urgent_id:this.cur_sle.id
        }
      })
        .then(res => {
              this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"rgba(64,156,203,1)"});
            //   setTimeout(()=>{
            //   uni.navigateTo({url: `/pages/wait_jiedan/wait_jiedan?order_id=${res.data.order_id}`});
            //   },1500)
        })
        .catch(res => {
            this.if_click=true
             this.HMmessages.show(res.msg, { icon: "error" });
        });
           
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
.appo uni-popup{
    z-index: 99999;
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
		justify-content: center;
        z-index: 99;
	}
	.appo-btm > view{
		width:555rpx;
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
    .appo-form-jiaji{
        display: flex;
        justify-content:space-between;
        padding: 20rpx 103rpx;
        padding-top: 0;
        width: 100%;
        flex-wrap:wrap
    }
    .appo-form-jiaji-it{
        position: relative;
        height: 128rpx;
        width: 196rpx;
        z-index: 99;
        margin-top: 50rpx;
        border: 2rpx solid white
    }
    .appo-form-jiaji-it-sle{
        position: relative;
        height: 128rpx;
        width: 196rpx;
        z-index: 99;
        margin-top: 50rpx;
        border: 2rpx solid rgba(64,156,203,1)
    }
    .appo-form-jiaji-nm{
        
font-size:32rpx;
font-family:PingFang SC;
font-weight:bold;
color:rgba(64,156,203,1);
text-align: center;
margin-top: 12rpx
    }
    .appo-form-jiaji-pay{
font-size:24rpx;
font-family:PingFang SC;
font-weight:400;
color:rgba(255,255,255,1);
margin-top: 14rpx;
text-align: center
    }
    .appo-form-jiaji-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .mdl-jiaji{
        width: 100%;
        background: white
    }
    .mdl-jiaji-line1{
        text-align: center;
        padding: 45rpx 0;
        padding-bottom: 25rpx;
        position: relative;
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
    }
    .mdl-jiaji-line2{
        text-align: center;
        padding-bottom: 0rpx;
        position: relative;
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
padding-bottom: 15rpx;
border-bottom: 2rpx solid rgba(240,240,240,1)
    }
    .mdl-jiaji-line3{
        display: flex;
        padding-bottom: 0rpx;
        position: relative;
font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
padding: 28rpx 41rpx;
vertical-align: top
    }
    .mdl-jiaji-line4{
        padding: 38rpx 0;
    }
    .mdl-jiaji-cls{
        position: absolute;
        right: 49rpx;
        top: 40rpx;
color:rgba(64,156,203,1);
    }
    .mdl-jiaji-jg{
        
font-size:72rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(51,51,51,1);
    }
    .mdl-jiaji-tt{
        display: flex;
        width: 80%;
    }
    .mdl-jiaji-weixinic{
        width: 10%;
        text-align: start;
        display: flex;
        align-items: center
    }
    .mdl-jiaji-weixinic image{
        height: 38rpx;
        width: 38rpx;
    }
    .mdl-jiaji-sle{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: flex-end
    }
    .mdl-jiaji-sle image{
        height: 38rpx;
        width: 38rpx;
    }
    .mdl-jiaji-sur{
        width:575rpx;
        text-align: center;
        line-height: 73rpx;
height:73rpx;
background:rgba(64,156,203,1);
border-radius:37rpx;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);
        margin: 0 auto
    }
</style>
