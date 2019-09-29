<template>
	<view class="order span24">
        <view class="span24 order-tab">
        <wuc-tab tabStyle="width:100%" :tab-list="tabList" :tabCur.sync="TabCur" textFlex="true"></wuc-tab>
        </view>
        <view class="span24 order-ct">
<swiper :current="TabCur" duration="300" @change="swiperChange">
  <swiper-item>
      <scroll-view class="scroll-view" :scroll-y="true">
          <view style="padding-bottom:200rpx">
    <view class="span24 order-it" v-for="item in incomplete" :key="item.id"  @tap="toDetails(item,$event)">
        <view class="span24 order-it-line">
            <view class="span15 order-it-tm"><view class="order-it-tm-ico"></view>{{item.created_at}}</view>
            <view class="span9 order-it-sta" v-if="item.order_status===2">预约中</view>
            <view class="span9 order-it-sta" v-if="item.order_status===3">服务中</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span15">类型</view>
            <view class="span9 order-it-leix">{{item.class_name}}</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span10">{{item.internal_order_sn}}</view>
            <view class="span14 order-it-xq"><view v-if="item.order_status===2||item.order_status===3" @tap.stop="openCancel(item,$event)">取消</view ><view v-if="item.order_status===3" @tap.stop="openSur(item,$event)">确认</view></view>
        </view>
    </view>
    </view>
    </scroll-view>
  </swiper-item>
  <swiper-item>
      <scroll-view class="scroll-view" :scroll-y="true">
          <view style="padding-bottom:200rpx">
    <view class="span24 order-it" v-for="item in completed" :key="item.id"  @tap="toDetails(item,$event)">
        <view class="span24 order-it-line">
            <view class="span15 order-it-tm"><view class="order-it-tm-ico"></view>{{item.created_at}}</view>
            <view class="span9 order-it-sta">已完成</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span15">类型</view>
            <view class="span9 order-it-leix">{{item.class_name}}</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span15">{{item.internal_order_sn}}</view>
            <view class="span9 order-it-xq"><view @tap.stop="openCancel(item,$event)">取消</view></view>
        </view>
    </view>
    </view>
    </scroll-view>
  </swiper-item>
  <swiper-item>
      <scroll-view class="scroll-view" :scroll-y="true">
          <view style="padding-bottom:200rpx">
    <view class="span24 order-it" v-for="item in close" :key="item.id"  @tap="toDetails(item,$event)">
        <view class="span24 order-it-line">
            <view class="span15 order-it-tm"><view class="order-it-tm-ico"></view>{{item.created_at}}</view>
            <view class="span9 order-it-sta">已取消</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span15">类型</view>
            <view class="span9 order-it-leix">{{item.class_name}}</view>
        </view>
        <view class="span24 order-it-line">
            <view class="span15">{{item.internal_order_sn}}</view>
            <view class="span9 order-it-xq"><view @tap.stop="openCancel(item,$event)">取消</view></view>
        </view>
    </view>
    </view>
    </scroll-view>
  </swiper-item>
</swiper>
</view>
<view style="background:rgba(0,0,0,0.2);height:100%;width:100%;position:fixed;top:0;left:0" v-if="model"></view>
        <view class="model" v-if="model">
            <view class="span24 model-tt">确认取消</view>
            <view  class="span24 model-body">确认取消此订单吗</view>
            <view class="span24 model-foot">
                <view class="span12 model-sur" @tap="toOk">确认</view>
                <view class="span12 model-cancel" @tap="toCancel">取消</view>
            </view>
</view>
<view style="background:rgba(0,0,0,0.2);height:100%;width:100%;position:fixed;top:0;left:0" v-if="sur_model"></view>
        <view class="model" v-if="sur_model">
            <view class="span24 model-tt">确认订单</view>
            <view  class="span24 model-body">确认已完成此订单吗</view>
            <view class="span24 model-foot">
                <view class="span12 model-sur" @tap="toOkSur">确认</view>
                <view class="span12 model-cancel" @tap="toCancelSur">取消</view>
            </view>
</view>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			return {
          TabCur: 0,
          tabList: [{ name: '未完成' }, { name: '已完成' },{ name: '关闭' }],
          sleCurItem:null,
          model:false,
          sur_model:false,
          incomplete:[],
          incomplete_page:1,
          completed:[],
          completed_page:1,
          close:[],
          close_page:1
			}
		},
		onLoad() {
            this.loadList()
        },
        components:{WucTab},
		methods: {
            tabChange(index) {
            this.TabCur = index;
        },
         openCancel(item,e){
                this.sleCurItem=item
                this.model=true
            },
            openSur(item,e){
                this.sleCurItem=item
                this.sur_model=true
            },
            toOk(){
                uni.showLoading({
    title: '请稍等'
});
                this.$http({ url: `api/cancel_order` ,data:{
                order_id:this.sleCurItem.id
          },method:"post"}).then(res => {
                this.loadList(true)
                this.model=false
                uni.hideLoading()
          })
          .catch(res => {
                uni.hideLoading()
                });
            },
            toOkSur(){
                uni.showLoading({
    title: '请稍等'
});
                this.$http({ url: `api/confirm_order` ,data:{
                order_id:this.sleCurItem.id
          },method:"post"}).then(res => {
                this.loadList(true)
                this.sur_model=false
                uni.hideLoading()
          })
          .catch(res => {
                uni.hideLoading()
                });
            },
            toCancel(){
                this.model=false
            },
            toCancelSur(){
                this.sur_model=false
            },
        loadList(re){
            let status=null
            let page=null
            if(this.TabCur===0){
                status=2
                if(re){
                    page=1
                    this.incomplete_page=1
                }else{
                page=this.incomplete_page
                }
            }
            if(this.TabCur===1){
                status=4
                if(re){
                    page=1
                    this.completed_page=1
                }else{
                page=this.completed_page
                }
            }
            if(this.TabCur===2){
                status=5
                if(re){
                    page=1
                    this.close_page=1
                }else{
                page=this.close_page
                }
            }
            this.$http({ url: `api/order_list` ,data:{
                status:status,
                page:page
          }}).then(res => {
              if(status===2){
                  if(re){
                      this.incomplete=res.data.data
                  }else{
                  this.incomplete=this.incomplete.concat(res.data.data)
                  }
                  this.incomplete_page=this.incomplete_page+1
              }
              if(status===4){
                  if(re){
                      this.completed=res.data.data
                  }else{
                  this.completed=this.completed.concat(res.data.data)
                  }
                  this.completed_page=this.completed_page+1
              }
              if(status===5){
                  if(re){
                  this.close=res.data.data
                  }else{
                  this.close=this.close.concat(res.data.data)
                  }
                  this.close_page=this.close_page+1
              }
          })
          .catch(res => {});
        },
        swiperChange(e){
            this.TabCur=e.detail.current
            if(e.detail.current===0&&this.incomplete_page===1){
            this.loadList()
            }
            if(e.detail.current===1&&this.completed_page===1){
            this.loadList()
            }
            if(e.detail.current===2&&this.close_page===1){
            this.loadList()
            }
        },
        toDetails(item,e){
            uni.setStorageSync('details', item);
            uni.navigateTo({url: '/pages/order_details/order_details'});
        }
		}
	}
</script>

<style>
    page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  line-height: 1.8;
  height: 100%;
}
.order-tab{
    height: 8vh;
}
.order{
    height: 100%;
}
.order wuc-tab{
    width: 100%;
}
.order .wuc-tab-item{
    margin:0 40rpx;;
  height: 100%;
}
.order-ct{
    height: 92vh;
}
swiper{
    width: 100%;
  height: 100%;
}
.order .scroll-view{
    height: 100%;
}
.order-it{
    padding: 25rpx 25rpx 0 25rpx
}
.order-it-line{
    padding: 25rpx 23rpx 23rpx 34rpx;
    background: white;
    border-bottom:2rpx solid rgba(240,239,239,1);
font-size:30rpx;
}
.order-it-line:first-child{
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx
}
.order-it-line:last-child{
    border-bottom-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
    border-bottom:none;
}
.order-it-tm-ico{
    width:4rpx;
height:29rpx;
background:rgba(64,156,203,1);
border-radius:2rpx;
margin-right: 14rpx;
}
.order-it-tm{
    font-size:26rpx;
    align-items: center;
    position: relative;
    left: -10rpx
}
.order-it-sta{
    justify-content: flex-end;
font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(252,187,60,1);
}
.order-it-leix{
    justify-content: flex-end
}
.order-it-xq{
    justify-content: flex-end
}
.order-it-xq view{
    width:145rpx;
    margin-left: 20rpx;
height:50rpx;
background:rgba(247,247,247,1);
border-radius:10rpx;
font-size:28rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(154,154,154,1);
text-align: center
}
.order-it-xq view:nth-of-type(2){
    color: rgba(252,187,60,1)
}
.model{
    width: 400rpx;
    background: white;
    border-radius:30rpx;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    top: 400rpx;
    left: 0rpx;
    right: 0rpx;
}
.model-tt{
    justify-content: center;
    padding: 20rpx 0;
    font-size: 30rpx;
    padding-bottom: 0
}
.model-body{
    padding: 40rpx 0;
    justify-content: center;
}
.model-foot{
    border-top: 2rpx solid #f5f5f5
}
.model-sur{
    padding: 20rpx 0;
    justify-content: center;
    border-right: 1rpx solid #f5f5f5;
    color:#409CCB;
}
.model-cancel{
    padding: 20rpx 0;
    border-left: 1rpx solid #f5f5f5;
    justify-content: center;
}
</style>
