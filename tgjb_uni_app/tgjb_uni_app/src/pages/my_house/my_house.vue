<template>
  <view class="span24 myhouse">
      <view class="span24 myhouse-it" v-for="item in  list" :key="item.id">
          <view class="span24 myhouse-head">
              <view class="span18 myhouse-name" v-if="item.status===1">{{item.community_name}}</view>
              <view class="span18 myhouse-shenhe" v-if="item.status===0">审核中</view>
              <view class="span18 myhouse-shenhe" v-if="item.status===2">审核不通过</view>
              <view class="span6 myhouse-ctrol">
                  <!-- <span @tap="bj(item,$event)">编辑</span> -->
                  <image mode="aspectFit" @tap="deleteItem(item,$event)" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
          </view>
          <view class="span24 myhouse-ct">
              <view class="span24 myhouse-ct-it">
                  <view class="span5">姓名</view>
                  <view class="span19 myhouse-ct-val">{{item.name}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">电话</view>
                  <view class="span19 myhouse-ct-val">{{item.phone}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">小区名称</view>
                  <view class="span19 myhouse-ct-val">{{item.community_name}}</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">单元楼</view>
                  <view class="span19 myhouse-ct-val">{{item.house_number}}</view>
              </view>
          </view>
      </view>
       <!-- <view class="span24 myhouse-it">
          <view class="span24 myhouse-head">
              <view class="span18 myhouse-name">脱狗家宝</view>
              <view class="span18 myhouse-shenhe">审核中</view>
              <view class="span6 myhouse-ctrol"><span>编辑</span><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
          </view>
          <view class="span24 myhouse-ct">
              <view class="span24 myhouse-ct-it">
                  <view class="span5">姓名</view>
                  <view class="span19 myhouse-ct-val">万潇</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">电话</view>
                  <view class="span19 myhouse-ct-val">18723739871</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">小区名称</view>
                  <view class="span19 myhouse-ct-val">脱狗家宝</view>
              </view>
              <view class="span24 myhouse-ct-it">
                  <view class="span5">单元楼</view>
                  <view class="span19 myhouse-ct-val">九栋905</view>
              </view>
          </view> 
     </view> -->
      <view class="span24 myhouse-sv">
          <view @tap="toCell">添加房屋</view>
      </view>
      <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该房屋？' @cancel='cancelModel' @confirm='confirmModel'/>
    <view class="span24 queshen" v-if="show_default">
        <view class="span24 queshen-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property/quesheng.png'></image></view>
        <view class="span24 queshen-tt">还没有添加房屋信息~</view>
        <view class="span24 myhouse-sv">
          <view @tap="toCell">添加房屋</view>
        </view>
    </view>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
import Modal from '../../components/x-modal/x-modal'
export default {
  data() {
    return {
        list:null,
        curItem:null,
        showModel:false,
        show_default:false
    };
  },
  methods: {
      toCell(){
          uni.navigateTo({url: `/pages/cell_bind/cell_bind`});
      },
      bj(val){
          uni.navigateTo({url: `/pages/cell_bind/cell_bind?id=${val.id}`});
      },
      deleteItem(item,e){
          this.curItem=item
          this.showModel=true
      },
      confirmModel(){
           uni.showLoading({
    title: '加载中'
})
          this.$http({
        url: `api/mine/del_user_house/${this.curItem.id}`,
        method: "POST",
        data: {
        }
      }).then(res => {
            uni.hideLoading();
            this.showModel=false
            this.listLoad()
            this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            uni.hideLoading();
            this.showModel=false
            this.HMmessages.show(res.msg, { icon: "error" });
        });
      },
      listLoad(){
          uni.showLoading({
    title: '加载中'
})
          this.$http({ url: `api/mine/houses` ,data:{}}).then(res => {
            uni.hideLoading();
          this.list=res.data
               if(res.data.length==0){
                  this.show_default=true
               }else{
                  this.show_default=false
               }
          })
          .catch(res => {
            uni.hideLoading();
              this.HMmessages.show(res.msg, { icon: "error" });
          });
      }
  },
  components: { HMmessages ,Modal },
  onLoad() {
  },
  onShow() {
      this.listLoad()
      },
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.myhouse-it{
    font-size:28rpx;
    padding: 0 23rpx
}
.myhouse{
    padding-bottom: 200rpx
}
.myhouse-ctrol image{
    width: 30rpx;
    height: 32rpx;
}
.myhouse-shenhe{
    color:rgba(153,153,153,1);
}
.myhouse-name{
    color: #FDD000
}
.myhouse-ct-val{
    justify-content: flex-end
}
.myhouse-head{
    padding: 36rpx 39rpx 16rpx 6rpx
}
.myhouse-ctrol span{
    margin-right: 29rpx
}
.myhouse-ctrol{
    justify-content: flex-end
}
.myhouse-ct{
    background: white;
}
.myhouse-ct-it{
    padding: 22rpx 38rpx 32rpx 41rpx;
    border-bottom: 1rpx solid rgba(240,240,240,1)
}
.myhouse-ct-it:last-child{
    border-bottom: none
}
.myhouse-sv{
    justify-content: center;
    margin-top: 86rpx
}
.myhouse-sv view{
    width:575rpx;
height:73rpx;
background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);
border-radius:37rpx;
text-align: center;
line-height: 73rpx;

font-size:30rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(173,102,1,1);
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
