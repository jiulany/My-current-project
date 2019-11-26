<template>
  <view class="span24 serviceap">
      <view class="span24 serviceap-notice">
          <uni-notice-bar 
    show-icon="true"  background-color="#FFC36E" color="#AD6601"
    scrollable="true" single="true"  :speed="50"
    text="温馨提示：预约时间段为白天8:00 - 21:00 ，其他时间段不接受预约">
</uni-notice-bar>
      </view>
       <view class="span24 serviceap-address">
        <view class="span24">
            <view class="span16 serviceap-address-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image><span>{{address[address_index].community_name}}</span></view>
            <view class="span8 serviceap-address-bj">
                <span>
                        <view class="uni-input" @tap="toAddress">编辑</view>
                </span>
                <picker @change="bindPickerChange" :value="address_index" :range="address" range-key="address">
                <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiala.png'></image>
                </picker>
            </view>
        </view>
        <view class="span24" >
            <view class="serviceap-address-nm">{{address[address_index]&&address[address_index].name}}</view>
            <view class="serviceap-address-ph">{{address[address_index]&&address[address_index].phone}}</view>
        </view>
        <view class="span24 serviceap-address-ad">
            {{address[address_index]&&address[address_index].address}}
        </view>
      </view>
      <view class="span24 serviceap-yy">
        <view class="span12 serviceap-yy-tt">预约项</view>
        <view class="span12 serviceap-yy-xm">弱电维修</view>
      </view>
      <view class="span24 serviceap-form">
         <!-- <view class="span24 serviceap-form-it">
             <view class="span6 serviceap-form-lf">联系人</view>
             <view class="span18 serviceap-form-rg"><input type="text" placeholder="请输入姓名"></view>
         </view>
         <view class="span24 serviceap-form-it">
             <view class="span6 serviceap-form-lf">联系人电话</view>
             <view class="span18 serviceap-form-rg"><input type="text" placeholder="请输入联系电话"></view>
         </view>
         -->
         <view class="span24 serviceap-form-it" v-if="neednumber">
             <view class="span6 serviceap-form-lf">数量</view>
             <view class="span18 serviceap-form-rg"><yp-number-box :min="1" :max="999" :value="num" @change="bindInpChange"></yp-number-box></view>
         </view> 
         <view class="span24 serviceap-form-it">
             <view class="span24 serviceap-form-lf">上传图片</view>
             <view class="span24 serviceap-form-upimg">
                 <view class="serviceap-form-addpt" v-for="(item,inx) in upList" :key="inx"><image mode="aspectFit" :src='item'></image></view>
                 <view class="serviceap-form-addpt"><image @tap="seleTp" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_add_photo.png'></image></view>
             </view>
         </view>
         <view class="span24 serviceap-form-it">
             <view class="span24 serviceap-form-lf">内容描述</view>
             <view class="span24 serviceap-form-upimg">
               <input type="text" placeholder="请输入想要服务内容" v-model="remarks">
             </view>
         </view>
         <view class="span24 serviceap-form-it" @tap="seleTime">
             <view class="span6 serviceap-form-lf">预约时间</view>
             <view class="span18 serviceap-form-rg">
                 <view class="span22  serviceap-form-sle">{{service_time}}</view>
                 <view class="span2  serviceap-form-sleico"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_rt_right.png'></image></view>
             </view>
         </view>
      </view>
      <w-picker mode="dateTime" startYear="2016" endYear="2999" step="1" @confirm="sleYuYueTime"  :current="true"  ref="picker" themeColor="#fdd000" ></w-picker>
      <view class="span24 serviceap-ok">
          <view @tap="toPay">确定</view>
      </view>
      <view class="goodsdtl-pop-bto">
       <uni-popup ref="popup" type="bottom" >
		<view class="span24 serviceap-model">
			<view class="span24 serviceap-model-it">
                <view class="span24 serviceap-model-fy">总共费用</view>
                <view class="span24 serviceap-model-fyz">50￥</view>
            </view>
			<view class="span24">
                <view class="span24 serviceap-model-tyit">
                    <view class="span22 serviceap-model-tyico" >
                        <image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_weixin.png'></image>微信支付
                    </view>
                    <view class="span2 serviceap-model-tysle"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xuanzhong.png'></image></view>
                </view>
                <view class="span24 serviceap-model-sure">
                    <view @tap="toSuccess">确定</view>
                </view>
            </view>
		</view>
	</uni-popup>
    </view>
  </view>
</template>

<script>
import { uniNoticeBar,uniPopup} from "@dcloudio/uni-ui";
import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
import wPicker from "../../components/w-picker/w-picker.vue";
export default {
  data() {
    return {
        upList:[],
        address:[{address:"",community_name:"未添加"}],
        address_index:0,
        service_time:"请选择预约时间",
        remarks:null,
        neednumber:false,
        num:1
    };
  },
  methods: {
      toAddress(){
          uni.navigateTo({url: '/pages/my_address_add/my_address_add?type=1'});
      },
      seleTp(){
          let _this=this
          uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], //从相册选择
                success: function (res) {
                    console.log(res)
                    let upList=[]
                    _this.$http({ url: `api/upload` ,fileType:"image",filePath:res.tempFilePaths[0],name:'img',data:{}},true).then(res => {
                        upList[0]=res.data[1]
                         _this.upList=upList
                   })
                    .catch(res => {
                        console.log(res)
                    });
                    }
          });
      },
      bindPickerChange(e){
      this.address_index=e.detail.value
      },
      sleYuYueTime(e){
          this.service_time=e.result
      },
      bindInpChange(e){
          this.num=e
      },
      toSuccess(){
          uni.navigateTo({url: '/pages/pay_success/pay_success'});
      },
      toPay(){
	  this.$refs.popup.open()
      },
      seleTime(){
      this.$refs.picker.show();
      },
      toSuccess(){
           this.$http({ url: `api/service/create_service` ,data:{
               address_id:this.address[this.address_index].id,
               sku_id:uni.getStorageSync('sku_id'),
               remarks:this.remarks,
               service_time:this.service_time,
               num:this.num,
           },method:"post"}).then(res => {
                        
                   })
                    .catch(res => {});
      }
  },
  components: {uniNoticeBar,wPicker,uniPopup,ypNumberBox},
  mounted(){
  },
  onLoad() {
  },
  onShow() {
          this.$http({url:'api/mine/address',data:{}}).then(res=>{
              if(res.data.length==0){

              }else{
              this.address=res.data
              }
      }).catch(res=>{
          
      })
      if(uni.getStorageSync('is_num')===1){
          this.neednumber=true
      }else{
          this.neednumber=false
      }},
  onHide() {}
};
</script>

<style>
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
  overflow-x: hidden
}
.serviceap{
  padding-bottom: 176rpx
}
.serviceap-notice{
    font-size:22rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
line-height:30rpx; 
}
.serviceap-address{
  margin-top: 27rpx;
background:rgba(255,255,255,1);
padding: 15rpx 27rpx
}
.serviceap-address-bj{
    align-items: center;
    justify-content: flex-end
}
.serviceap-address-bj image{
    width: 27rpx;
    height: 16rpx;
}
.serviceap-address-bj span{
font-size:26rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
    margin-right: 22rpx
}
.serviceap-yy{
  margin-top: 27rpx;
height:79rpx;
background:rgba(255,255,255,1);
padding: 0 27rpx
}
.serviceap-yy-tt{
  align-items: center;
  font-size: 28rpx
}
.serviceap-yy-xm{
  align-items: center;
  justify-content: flex-end;
  font-size: 30rpx;
}
.serviceap-form{
    padding-left: 21rpx;
    background: white;
    margin-top: 19rpx
}
.serviceap-form-it{
    padding: 25rpx 27rpx 25rpx 14rpx;
    font-size: 28rpx;
    border-bottom:1px solid rgba(240,240,240,1);
}
.serviceap-form-it:last-child{
    border-bottom:none
}
.serviceap-form-lf{
    font-size: 28rpx;
}
.serviceap-form-rg {
    justify-content: flex-end
}
.serviceap-form-rg input{
    font-size: 28rpx;
    text-align: end;
    width: 100%;
}
.serviceap-form-addpt{
    width:158rpx;
height:140rpx;
margin-right: 10rpx;
border: 1px dashed #f5f5f5;
margin-bottom: 15rpx
}
.serviceap-form-addpt image{
    height: 100%;
    width: 100%
}
.serviceap-form-addpt input{
    position: absolute;
    top: 0;
    left: 0;
}
.serviceap-form-upimg{
    margin-top: 25rpx
}
.serviceap-form-sle{
    justify-content: flex-end;
    color:rgba(153,153,153,1);
}
.serviceap-form-sleico{
    justify-content: flex-end
}
.serviceap-form-sleico image{
width: 27rpx;
height: 36rpx;
}
.serviceap-ok{
    justify-content: center;
    padding: 53rpx 0;
    padding-bottom: 0
}
.serviceap-ok view{
    width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37rpx;font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);   
text-align: center;
line-height: 73rpx
}
.serviceap-model-it{
    padding: 44rpx 0;
    border-bottom: 1px solid rgba(240,240,240,1);   
}
.serviceap-model-fy{
    font-size: 32rpx;
    justify-content: center
}
.serviceap-model-fyz{
    font-size:72rpx;
color:rgba(253,208,0,1);
    justify-content: center
}
.serviceap-model-tyit{
    padding: 40rpx;
}
.serviceap-model-tyico {
    align-items: center
}
.serviceap-address-nm{
font-size:30rpx;
}
.serviceap-address-ph{
font-size:24rpx;line-height: 57rpx;
margin-left: 33rpx;
color:rgba(153,153,153,1);
}
.serviceap-address-ad{
font-size:28rpx;
}
.serviceap-address-tp image{
    height: 49rpx;
    width: 49rpx;
    margin-right: 28rpx
}
.serviceap-address-tp span{
color:rgba(253,208,0,1);
}
.serviceap-model-tyico image{
    height: 40rpx;
    width: 40rpx;
    margin-right: 20rpx
}
.serviceap-model-tysle image{
    height: 40rpx;
    width: 40rpx;
}
.serviceap-model-sure {
    justify-content: center;
    padding: 48rpx 0
}
.serviceap-model-sure view{
    width:575rpx;
    height:73rpx;
    background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
    border-radius:37px;font-size:30rpx;
color:rgba(173,102,1,1);
text-align: center;
line-height: 73rpx
}
</style>
