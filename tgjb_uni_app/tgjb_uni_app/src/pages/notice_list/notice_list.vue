<template>
  <view class="span24 noticelst">
      <view class="span24 noticelst-it" v-for="(it,key) in list" :key="key">
          <view class="span24">{{key}}</view>
          <view class="span24 noticelst-tm-it" v-for="itm in it" :key="itm.id">
              <view class="span3">{{itm.monthDay}}</view>
              <view class="span1 noticelst-fg">
                  <view class="noticelst-circle"></view>
                  <view class="noticelst-line"></view>
              </view>
              <view class="span20 noticelst-ct">
                  <view class="noticelst-ct-bg"></view>
                  <view class="span24 noticelst-ct-tt"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_gonggao.png'></image><span>{{itm.title}}</span></view>
                  <view class="span24 noticelst-ct-ntc">   {{itm.content}}</view>
              </view>
          </view>
          <!-- <view class="span24 noticelst-tm-it">
              <view class="span3">01-23</view>
              <view class="span1 noticelst-fg">
                  <view class="noticelst-circle"></view>
                  <view class="noticelst-line"></view>
              </view>
              <view class="span20 noticelst-ct">
                  <view class="noticelst-ct-bg"></view>
                  <view class="span24 noticelst-ct-tt"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_gonggao.png'></image><span>电费通知</span></view>
                  <view class="span24 noticelst-ct-ntc">   您好！3季度（20**年7月1日至20**年9月30日）物业费已开始收取，请各位业主或物业使用人......</view>
              </view>
          </view> -->
      </view>
      <!-- <view class="span24 noticelst-it">
          <view class="span24">4月</view>
          <view class="span24 noticelst-tm-it">
              <view class="span3">01-23</view>
              <view class="span1 noticelst-fg">
                  <view class="noticelst-circle"></view>
                  <view class="noticelst-line"></view>
              </view>
              <view class="span20 noticelst-ct">
                  <view class="noticelst-ct-bg"></view>
                  <view class="span24 noticelst-ct-tt"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_gonggao.png'></image><span>电费通知</span></view>
                  <view class="span24 noticelst-ct-ntc">   您好！3季度（20**年7月1日至20**年9月30日）物业费已开始收取，请各位业主或物业使用人......</view>
              </view>
          </view>
          <view class="span24 noticelst-tm-it">
              <view class="span3">01-23</view>
              <view class="span1 noticelst-fg">
                  <view class="noticelst-circle"></view>
                  <view class="noticelst-line"></view>
              </view>
              <view class="span20 noticelst-ct">
                  <view class="noticelst-ct-bg"></view>
                  <view class="span24 noticelst-ct-tt"><image  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_gonggao.png'></image><span>电费通知</span></view>
                  <view class="span24 noticelst-ct-ntc">   您好！3季度（20**年7月1日至20**年9月30日）物业费已开始收取，请各位业主或物业使用人......</view>
              </view>
          </view>
      </view> -->
      <view class="span24 queshen" v-if="show_default">
        <view class="span24 queshen-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property/quesheng.png'></image></view>
        <view class="span24 queshen-tt">还没有公告数据~</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        list:null,
        show_default:false
    };
  },	
  methods: {
  },
  components: {},
  onLoad() {
      this.$http({ url:`api/home/community_notice_list`,data:{
          }}).then(res => {
              this.list=res.data
              if(res.data.length==0){
                       this.show_default=true
               }else{
                   this.show_default=false
               }
          })
          .catch(res => {});
  },
  onShow() {
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
.noticelst-fg{
    position: relative;
    height: 182rpx;
}
.noticelst-it{
    padding: 20rpx 49rpx 66rpx 37rpx    
}
.noticelst-circle{
    position: absolute;
    width:17rpx;
height:17rpx;
background:rgba(253,208,0,1);
border-radius:50%;
top: 18rpx
}
.noticelst-line{
    position: absolute;
height:204rpx;
border:1rpx solid rgba(253,208,0,1);
top: 18rpx;
left: 8rpx;
}
.noticelst-ct{
    position: relative;
padding: 20rpx  46rpx 10rpx 24rpx;
top:30rpx
}
.noticelst-tm-it{
    margin-bottom: 22rpx
}
.noticelst-ct-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
background:rgba(253,209,0,1);
box-shadow:-6px 1px 21px 0px rgba(241,241,241,0.58);
opacity:0.2;
border-radius:10rpx;
}
.noticelst-ct-tt{
    align-items: center
}
.noticelst-ct-tt image{
    width:27rpx;
height:27rpx;
margin-right: 20rpx
}
.noticelst-ct-tt span{
font-size:30rpx;
font-weight:500;
color:#666666;
}
.noticelst-ct-ntc{
font-size:22rpx;
font-weight:400;
color:rgba(102,102,102,1);
height: 75rpx;
line-height: 27rpx;
text-indent: 2em;
overflow-y:scroll;
}
.queshen{
    height: 100%;
    background: white;
    position:fixed;
    left: 0;
    right: 0;
    align-items: flex-start;
    display: block
}
.queshen-tp{
    display: block;
    text-align: center;
    margin-top: 200rpx
}
.queshen-tp image{
    width: 326rpx;
height: 316rpx;
}
.queshen-tt{
    display: block;
    text-align: center;
    margin-top: 80rpx
}
</style>
