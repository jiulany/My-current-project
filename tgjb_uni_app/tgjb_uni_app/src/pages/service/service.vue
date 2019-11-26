<template>
  <view class="span24 serv">
      <view class="span24 serv-bnr">
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
              <image src="https://imgcdn.tuogouchebao.com/property_index_banner.png" mode="aspectFit" ></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      </view>
      <view class="span24 serv-bt">
          家政
      </view>
      <view class="span24 serv-jz-ct">
          <view class="span12 serv-jz-it" v-for="item in housekeeping" :key="item.id" @tap="toIntro(item,1,$event)">
              <view class="span8 serv-jz-ico"><image :src="item.commodity_image_thum" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">{{item.spu_name}}</view>
          </view>
          <!-- <view class="span12 serv-jz-it">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_kongtiao.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">空调清洁</view>
          </view>
          <view class="span12 serv-jz-it">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_zhengtibaojie.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">整体保洁</view>
          </view>
          <view class="span12 serv-jz-it">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_boli.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">玻璃清洁</view>
          </view>
          <view class="span12 serv-jz-it">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_qujiaquan.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">袪甲醛</view>
          </view>
          <view class="span12 serv-jz-it">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_pijubaojie.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">皮具保洁</view>
          </view>
          <view class="span12 serv-jz-it" style="border-bottom:none">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_qiangmian.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">墙面保洁</view>
          </view>
          <view class="span12 serv-jz-it" style="border-bottom:none">
              <view class="span8 serv-jz-ico"><image src="https://imgcdn.tuogouchebao.com/property_dimian.png" mode="aspectFit" ></image></view>
              <view class="span16 serv-jz-tt">地面保洁</view>
          </view> -->
      </view>
      <view class="span24 serv-bt">
          报修
      </view>
      <view class="span24 serv-ggss" v-for="item in public_maintenance" :key="item.id" @tap="toIntro(item,2,$event)">
          <view class="span3 serv-ggss-ico"><image :src="pub_icon" mode="aspectFit" ></image></view>
          <view class="span21 serv-ggss-tt">{{item.spu_name}}</view>
      </view>
      <view class="span24 serv-fwwx">
          <view class="span3 serv-fwwx-ico"><image :src="fang_icon" mode="aspectFit" ></image></view>
          <view class="span21 serv-fwwx-bt">房屋维修</view>
      </view>
      <view class="span24 serv-fwwx-ct">
          <view class="span8 serv-fwwx-it" v-for="item in private_maintenance" :key="item.id"  @tap="toIntro(item,3,$event)">
              <view class="span24 serv-fwwx-tt">{{item.spu_name}}</view>
              <view class="span24 serv-fwwx-ttf" v-if="item.brief_introduction">（{{item.brief_introduction}}）</view>
              <view class="span24 serv-fwwx-tp"><image :src="item.commodity_image_thum" mode="aspectFit" ></image></view>
          </view>
          <!-- <view class="span8 serv-fwwx-it">
              <view class="span24 serv-fwwx-tt">龙头管件</view>
              <view class="span24 serv-fwwx-ttf">（阀门、水管等）</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_longtouguanjian.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it" style="border-right:none">
              <view class="span24 serv-fwwx-tt">卫浴洁具</view>
              <view class="span24 serv-fwwx-ttf">（洁具安装）</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_weiyujieju.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it">
              <view class="span24 serv-fwwx-tt">门窗家居</view>
              <view class="span24 serv-fwwx-ttf">（门锁等）</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_menchuangjiaju.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it">
              <view class="span24 serv-fwwx-tt">打孔疏通</view>
              <view class="span24 serv-fwwx-ttf">（挂空、疏通等）</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_dakongshutong.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it" style="border-right:none">
              <view class="span24 serv-fwwx-tt">开锁换锁</view>
              <view class="span24 serv-fwwx-ttf">（开锁服务）</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_kaisuohuansuo.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it">
              <view class="span24 serv-fwwx-tt">防水补漏</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_fangshuibulou.png" mode="aspectFit" ></image></view>
          </view>
          <view class="span8 serv-fwwx-it">
              <view class="span24 serv-fwwx-tt">厨具维修</view>
              <view class="span24 serv-fwwx-tp"><image src="https://imgcdn.tuogouchebao.com/property_chujuweixiu.png" mode="aspectFit" ></image></view>
          </view> -->
          <view class="span8 serv-fwwx-it" style="border-right:none"></view>
      </view>
      <uni-popup ref="popup" type="center" :maskClick="false">
		<view class="span24 inx-model">
			<view class="span24 inx-model-close"> </view>
			<view class="span24 inx-model-tt">您还未绑定房屋</view>
			<view class="span24" style="justify-content: center;"><view @tap="toCellBind" class="inx-model-btn">去绑定</view></view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import { uniSwiperDot,uniPopup  } from "@dcloudio/uni-ui";
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
      pub_icon:'',
      fang_icon:'',
      current: 0,
      mode: "long",
      dotsStyles: {
        backgroundColor: "rgba(253, 208, 0, 0.3)",
        border: "1px rgba(253, 208, 0, 0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(253, 208, 0, 0.7)",
        selectedBorder: "1px rgba(253, 208, 0, 0.7) solid"
      },
      housekeeping:null,
      public_maintenance:null,
      private_maintenance:null
    };
  },
  methods: {
      change(e) {
      this.current = e.detail.current;
    },
    
	toCellBind(){
      uni.navigateTo({url: '/pages/cell_bind/cell_bind'});
	},
    toIntro(item,val,e){
        uni.setStorageSync('is_num',val),
        uni.navigateTo({url: `/pages/service_intro/service_intro?id=${item.id}`});
    },
    reloadList(){
      this.$http({ url: `api/service/housekeeping` ,data:{//家政
      }}).then(res => {
          this.housekeeping=res.data.data
          })
          .catch(res => {});
      this.$http({ url: `api/service/public_maintenance` ,data:{//公共维修
      }}).then(res => {
          this.public_maintenance=res.data.data
          this.pub_icon=res.data.icon
          })
          .catch(res => {});
      this.$http({ url: `api/service/private_maintenance` ,data:{//房屋
      }}).then(res => {
          this.private_maintenance=res.data.data
          this.fang_icon=res.data.icon
          })
          .catch(res => {});
    }
  },
  components: {  uniSwiperDot ,uniPopup},
  onLoad() {
		
  },
  onShow() {
      this.$http({ url: `api/home/my_community` ,data:{}}).then(res => { //获取绑定
		  if(res.data.length===0){
			  this.$refs.popup.open()
			  }else{
			  this.$refs.popup.close()
              }
		  })
          .catch(res => {});
      this.reloadList()
          },
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.serv{
		padding-bottom: 150rpx;
}
.serv-bnr {
    height:300rpx;
}
.serv-bnr .swiper-item {
  height: 100%;
  width: 100%;
}
.serv-bnr .uni-swiper-dot{
	height: 100%;
  width: 100%;
}
.serv-bnr .swiper-item image {
  height: 100%;
  width: 100%;
}
.serv-bt{
    padding: 26rpx 0 34rpx 0;
    font-size: 30rpx;font-family:PingFang SC;
font-weight:400;
color:rgba(102,102,102,1);
justify-content: center
}
.serv-jz-ct{
    background: white;
    padding: 0 24rpx
}
.serv-jz-it{
align-items: center;
padding: 40rpx 0;
justify-content: center;
border-bottom: 1px solid rgba(240,240,240,1)
}
.serv-jz-it:nth-of-type(odd){
    border-right: 0.5px solid rgba(240,240,240,1)
}
.serv-jz-tt{
justify-content: flex-start;
font-size: 28rpx;
color: #666
}
.serv-jz-ico{
    height: 37rpx;
    justify-content: center
}
.serv-jz-ico image{
    height: 100%;
    width: 37rpx
}
.serv-ggss{
height:103rpx;
background:rgba(255,255,255,1);
align-items: center;
padding-left: 30rpx;
margin-bottom: 25rpx
}
.serv-ggss-tt{
    font-size: 30rpx
}
.serv-ggss-ico{
    height: 51rpx;
}
.serv-ggss-ico image{
    height: 100%;
}
.serv-fwwx{
height:103rpx;
background:rgba(255,255,255,1);
align-items: center;
padding-left: 30rpx;
height: 80rpx;
border-bottom: 1px solid rgba(240,240,240,1);
}
.serv-fwwx-bt{
    font-size: 30rpx
}
.serv-fwwx-ico{
    height: 51rpx;
}
.serv-fwwx-ico image{
    height: 100%;
}
.serv-fwwx-ct{
    background: white;
    padding: 0 24rpx;
    font-size: 30rpx
}
.serv-fwwx-it{
    height: 175rpx;
    border-bottom: 1px solid rgba(240,240,240,1);
    border-right: 1px solid rgba(240,240,240,1);
    position: relative;
}
.serv-fwwx-tt{
    justify-content: center;
    align-items: center;
    font-size: 30rpx
}
.serv-fwwx-ttf{
    justify-content: center;
    font-size: 22rpx
}
.serv-fwwx-tp{
    position: absolute;
    bottom: 0;
    height: 100rpx;
    justify-content: flex-end;
    padding-right: 5rpx;
    padding-bottom: 5rpx
}
.serv-fwwx-tp image{
    height: 100%;
    width: 100rpx
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
