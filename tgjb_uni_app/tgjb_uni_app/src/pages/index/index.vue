<template>
  <view class="span24 inx">
    <view class="span24 inx-bnr">
      <uni-swiper-dot
        :info="info"
        :current="current"
        field="content"
        :mode="mode"
        :dotsStyles="dotsStyles"
		class="uni-swiper-dot"
      >
        <swiper class="swiper-box" @change="change">
          <swiper-item v-for="(item ,index) in info" :key="index">
            <view class="swiper-item">
				<!--  @tap.stop="toRecharge" -->
              <image src="https://imgcdn.tuogouchebao.com/property_index_banner.png"  @tap.stop="toRecharge"></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
	<view class="span24 content">
		<view class="span24 inx-loc">
			<view class="span2">
				<image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_dingwei.png'></image>
			</view>
			<view class="span22" @tap="toSwitchQuarters">{{community}}</view>
		</view>
		<view class="span24 inx-wtr">
			<view class="span12 inx-wtr-it">
		       <view class="span2"><image mode="aspectFit" :src="weather.icon"></image></view>
		       <view class="span22 inx-wtr-it-ms">天气：{{weather.weather.info+" "+weather.weather.temperature}}℃</view>
		    </view>
		    <view class="span12 inx-wtr-it" style="justify-content: center">
		       <image style="display:inline-block;width:30rpx;margin-right:15rpx" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xian.png'></image>
		       今日限行：{{limit_row}}
		    </view>
		</view>
		<view class="span24 inx-func">
			<view class="span7 inx-func-it" v-for="(it,index) in obj_type" :key="index" @tap="toTarget(it,$event)"><image class="inx-func-img"  mode="aspectFit" :src='it.img'></image>{{it.title}}</view>
			<!-- <view class="span7 inx-func-it" @tap="toHousekeeper"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_guanjia.png'></image>管家</view>
			<view class="span7 inx-func-it" @tap="toOpenDoor"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_kaimen.png'></image>开门</view>
			<view class="span7 inx-func-it" @tap="toPay"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_jiaofei.png'></image>缴费</view>
			<view class="span7 inx-func-it"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_baoxiu.png'></image>报修</view>
			<view class="span7 inx-func-it" @tap="toCharge"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_chongdian.png'></image>充电</view>
			<view class="span7 inx-func-it"><image class="inx-func-img"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_jiazheng.png'></image>家政</view> -->
		</view>
		<view class="span24 inx-gongao">
		    <view class="span24 inx-gongao-tt" @tap="toNoticeList">更多公告></view>
		    <view class="span24 inx-gg-ct">
				<view class="span24">
					<view class="span2 inx-gg-ico"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_gonggao.png'></image></view>
					<view class="span22 inx-gg-tt">小区最新公告</view>
				</view>
				<view class="span24 inx-gg-text" >
				  <view class="inx-gg-textscroll" id="gongao" ref="gongao" :style="{top:scroll,transition:trans}">
					<view class="span24 inx-gg-textit" v-for="item in notice" :key="item.id">尊敬的业主： {{item.content}}</view>
				  </view>
			    </view>
				<view class="span24 inx-gg-bg"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_inx_beijing.png'></image></view>
			</view>
		</view>
	</view>
	<uni-popup ref="popup" type="center" :maskClick="false">
		<!-- <image @tap="closeModel"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_shanchu.png'></image> -->
		<view class="span24 inx-model">
			<view class="span24 inx-model-close"></view>
			<view class="span24 inx-model-tt">您还未绑定房屋</view>
			<view class="span24" style="justify-content: center;"><view @tap="toCellBind" class="inx-model-btn">去绑定</view></view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import { uniSwiperDot,uniPopup   } from "@dcloudio/uni-ui";
import { setInterval, clearInterval } from 'timers';
import { base_url } from '../../api/http.js';
import QQMapWX from '../../api/qqmap-wx-jssdk.min.js';
var qqmapsdk=new QQMapWX({
            key: 'PTOBZ-BVCW2-2U3U3-CEUP3-3UIJ7-DCFJX'
        });
export default {
  data() {
    return {
      info: [
        {
          content: "内容 A"
        },
        {
          content: "内容 B"
        },
        {
          content: "内容 C"
        }
	  ],
	  obj_type:null,
	  notice:[], //消息
	  is_togo:null,
	  limit_row:"",
	  current: 0,
	  mode: "long",
	  community:'小区',
	  weather:{weather:{info:"",temperature:""}},
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
	  },
	  cur_scroll:1,
	  scroll:"0",
	  trans:"top 2s",
	  sco:null
    };
  },	
  onTabItemTap(e){
console.log(e)
  },
  methods: {
    change(e) {
      this.current = e.detail.current;
	},
	toRecharge(){
    //   uni.navigateTo({url: `/pages/charge_details/charge_details?path=00000001&plug_number=01`});
	},
	onShareAppMessage(){

	},
	// closeModel(){
	//   this.$refs.popup.close()
	// },
	toCellBind(){
      uni.navigateTo({url: '/pages/cell_bind/cell_bind'});
	},
	// toHousekeeper(){
	// 	uni.navigateTo({url: '/pages/housekeeper/housekeeper'});
	// },
	// toOpenDoor(){
	// 	uni.navigateTo({url: '/pages/open_door/open_door'});
	// },
	toSwitchQuarters(){
		this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //获取绑定
		  if(res.data.length===0){
			  this.$refs.popup.open()
			  }else{
		uni.navigateTo({url: '/pages/switch_quarters/switch_quarters'});
		   
			  }
		  })
          .catch(res => {});
	},
	// toCharge(){
    //     uni.navigateTo({url: '/pages/charge/charge'});
	// },
	// toPay(){
    //     uni.navigateTo({url: '/pages/pay/pay'});
	// },
	toNoticeList(){
		if(this.is_togo==1){
uni.navigateTo({url: '/pages/notice_list/notice_list'});
		}else if(this.is_togo==2){
			 this.$refs.popup.open()
		}else{
			 uni.showToast({
    title: '信息待审核',
    duration: 2000,
	icon:'none'
});
		}
	},
	loadObjType(){
		 this.$http({ url:`api/home/homeMenu`,data:{
          }}).then(res => {
			  this.obj_type=res.data
          })
          .catch(res => {});
	},
	toTarget(val,e){
		if(this.is_togo==1){
uni.navigateTo({url: val.url});
		}else if(this.is_togo==2){
			 this.$refs.popup.open()
		}else{
			 uni.showToast({
    title: '信息待审核',
    duration: 2000,
	icon:'none'
});
		}
	}
  },
  destroyed(){
     clearInterval(this.sco)
  },
  components: { uniSwiperDot ,uniPopup },
  onLoad() {
	  uni.showLoading({
    title: '加载中'
});
	   uni.setStorageSync('is_commit', false);
	  let _this=this
	  uni.setStorageSync('community_selected', '');
			 uni.login({
				 complete:function(){
	   uni.setStorageSync('is_commit', true); 
				 },
          success: function(loginRes) {
             uni.request({ url: `${base_url}api/login`,
             header: {
             'X-WX-Code': loginRes.code //自定义请求头信息
             },
             method:"post",
             success: (res) => {
				 uni.setStorageSync("skey", res.data.data.skey);
				 setTimeout(()=>{
		   _this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //获取绑定
		   uni.hideLoading();
		  if(res.data.length===0){
			  _this.is_togo=2
			  _this.$refs.popup.open()
		  }else{
			  _this.$refs.popup.close()
		   for(let i in res.data){
		   if(res.data[i].status===1){
			  _this.is_togo=1
			uni.setStorageSync('community_selected', res.data[i]);
			_this.community=uni.getStorageSync('community_selected').community
	        _this.loadObjType()
			break
		   }else if(res.data[i].status===2){
			   uni.showToast({
    title: '小区审核不通过',
	duration: 2000,
	icon:'none'
});
		   }else{
			   uni.setStorageSync('community_selected', '');
			   continue
		   }
			  }
		  }
		   uni.getLocation({success:function(res){
		  qqmapsdk.reverseGeocoder({
			  location:{
				  latitude:res.latitude,
				  longitude:res.longitude
			  },
			  success:function(res){
				    _this.$http({url:'api/home/index',data:{
						city:res.result.address_component.city
						}}).then(res=>{
							  _this.limit_row=res.data.limitRow //限号
							  _this.notice=res.data.notice      //通知
							  _this.weather=res.data.weather    //天气
							  console.log(res.data.notice)
							  if(res.data.notice.length>1){
_this.sco=setInterval(()=>{
	if(3===_this.cur_scroll){
		_this.scroll=`0`
		_this.cur_scroll=1
	_this.trans="top 1s"
	}else{
	let top=_this.cur_scroll*138
    _this.scroll=`-${top}rpx`
	_this.cur_scroll+=1
	_this.trans="top 2s"
	}
},8000)
							  }
							}).catch(res=>{
							})
							}
							})
							}})
          })
          .catch(res => {
			  uni.hideLoading();
		  });
		  
	  },1500)
             }
            })
          }
        });
  },
  onShow() {
	  this.community=uni.getStorageSync('community_selected').community
	  if(uni.getStorageSync('is_commit')){
	 this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //
		  if(res.data.length===0){
			  this.$refs.popup.open()
			  }else{
			  this.$refs.popup.close()
			  for(let i in res.data){
				  if(res.data[i].status===0){
				  uni.showToast({
    title: '信息待审核',
    duration: 2000,
	icon:'none'
});
		   }
			  } 
			  }
			  
		  })
          .catch(res => {});
	  }
  },
  onHide() {}
};
</script>

<style>
page {
		background-color: #fcfcfc;
		font-size: 28rpx;
		line-height: 1.8;
	}
	.inx{
		height: 100%;width: 100%;
		padding-bottom: 150rpx
	}
.inx-bnr .swiper-item {
  height: 100%;
  width: 100%;
}
.inx-bnr .uni-swiper-dot{
	height: 100%;
  width: 100%;
}
.inx-bnr .swiper-item image {
  width: 100%;
  height: 100%;
}
.content{
	padding:0 20rpx
}
.inx-loc{
	padding: 10rpx 0;
	color: #fdd000
}
.inx-loc image{
	height: 30rpx
}
.inx-loc view{
	align-items: center
}
.inx-wtr-it view{
	align-items: center
}
.inx-wtr-it{
	align-items: center
}
.inx-wtr-it image{
height: 30rpx;
}
.inx-wtr{
background: #fff;
padding: 17rpx 25rpx
}
.inx-wtr-it-ms{
	padding: 0 15rpx
}
.inx-func{
	justify-content: space-between;
	padding:30rpx 50rpx
}
.inx-func-it{
	position: relative;
	height: 260rpx;
	justify-content: center;
	align-items: center;
	z-index: 1;
	font-size: 34rpx;
	color: white;
	font-weight: 600
}
.inx-func-img{
	height:100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
.inx-gongao-tt{
	justify-content: flex-end;
	color: #AD6601;
	font-size: 30rpx
}
.inx-gg-ico{
	align-items: center;
	color: #C06507
}
.inx-gg-ico image{
	height: 30rpx;
}
.inx-gg-ct{
	position: relative;
	width: 100%;
	z-index: 1;
	padding: 30rpx;
}
.inx-gg-bg{
	position: absolute;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
}
.inx-gg-tt{
	align-items: center;
	color: #C06507
}
.inx-gg-bg image{
	height: 100%;
	width: 100%;
}
.inx-gg-text{
	color: #D0700D;
	font-size: 24rpx;
	text-indent: 2em;
	height: 138rpx;
	overflow-y: hidden
}
.inx-gg-textit{
	height: 138rpx;
	overflow-y: scroll;
	line-height:  46rpx
}
.inx-gg-textscroll{
	position: relative;
	top: 0;
	transition-timing-function:ease-in-out
}
.inx-model{
	padding-bottom: 40rpx
}
.inx-model-tt{
	font-size: 30rpx;
	justify-content: center;color:rgba(102,102,102,1);
	margin-bottom: 50rpx;
	padding: 40rpx 0 0 0
}
.inx-model-btn{
	font-size: 30rpx;
	background:rgba(253,208,0,1);
border-radius:22px;
width:190rpx;
text-align: center;
height:55rpx;
color:rgba(102,102,102,1);
}
.inx-model-close{
	justify-content: flex-end;
}
.inx-model-close image{
	height:24rpx;
	width:24rpx
}
</style>
