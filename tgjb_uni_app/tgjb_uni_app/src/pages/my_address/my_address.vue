<template>
  <view class="span24 myaddress">
      <view class="span24 myaddress-it" v-for="item in address_list" :key="item.id">
          <view class="span24 myaddress-hd">
              <view class="span2 myaddress-ico">
                   <image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_xiaoqu.png'></image>
              </view>
              <view class="span22 myaddress-xq">{{item.community_name}}</view>
          </view>
          <view class="span24 myaddress-ct">
              <view class="span18">
                  <view class="span24 myaddress-name">{{item.name}}<span>{{item.phone}}</span></view>
                  <view class="span24 myaddress-address">{{item.address+item.community_name+item.number}}</view>
              </view>
              <view class="span6">
                  <view class="span16 myaddress-bj" @tap="toXiuGai(item,$event)">编辑</view>
                  <view class="span8 myaddress-delete"><image @tap="openModel(item,$event)" mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image></view>
              </view>
          </view>
      </view>
      <view class="span24 myaddress-tj" @tap="toAddAddress">添加</view>
      <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该地址吗？' @cancel='cancelModel' @confirm='confirmModel'/>
    <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
  </view>
</template>

<script>
import HMmessages from "../../components/HM-messages/HM-messages.vue";
import Modal from '../../components/x-modal/x-modal'
export default {
  data() {
    return {
        address_list:[],
        showModel: false,
        curClickItem:null
    };
  },
  methods: {
      reLoadList(){
      this.$http({url:'api/mine/address' ,data:{
           }}).then(res=>{
          this.address_list=res.data
          if(res.data.length==0){
              this.HMmessages.show("查询无数据", { icon: "error" });
          }
      }).catch(res=>{
      })
      },
      toAddAddress(){
          uni.navigateTo({url: '/pages/my_address_add/my_address_add?type=1'});
      },
      openModel(item,e){
          this.showModel=true
          this.curClickItem=item
      },
      toXiuGai(item,e){
          uni.navigateTo({url: `/pages/my_address_add/my_address_add?type=2&id=${item.id}`});
      },
      cancelModel(e){
      },
      confirmModel(e){
          let _this=this
          this.$http({
        url: "api/mine/del_address",
        method: "POST",
        data: {
          id:this.curClickItem.id
        }
      })
        .then(res => {
            console.log(res)
            _this.reLoadList()
            _this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            _this.HMmessages.show(res.msg, { icon: "error"});
        });
      }
  },
  components: {  Modal,HMmessages },
  onLoad() {
  },
  onShow() {
      this.reLoadList()
  },
  onHide() {}
};
</script>

<style>
page{
    height: 100%;
    background: #f5f5f5;
}
.myaddress{
    padding-bottom: 200rpx
}
.myaddress-it{
    margin-top: 10rpx
}
.myaddress-hd{
        padding:18rpx 0 12rpx 28rpx ;
        font-size:28rpx;
        align-items: center
    }
    .myaddress-ico image{
        height: 49rpx;
        width: 49rpx
    }
    .myaddress-xq{
        color: #fdd000;
        padding-left: 10rpx
    }
    .myaddress-bj{
        align-items: center;
        justify-content: flex-end
    }
    .myaddress-delete{
        align-items: center;
        justify-content: flex-end
    }
    .myaddress-delete image{
width: 30rpx;
height: 32rpx;
    }
    .myaddress-ct{
        font-size: 30rpx;
        padding: 19rpx 30rpx 33rpx 31rpx;
        background: white;
    }
    .myaddress-name{
        margin-bottom: 25rpx;
        align-items: center
    }
    .myaddress-name span{
        margin-left: 33rpx;
font-size:24rpx;
color:rgba(153,153,153,1);
    }
    .myaddress-address{
        font-size: 24rpx;
        color: rgba(153, 153, 153, 1)
    }
    .myaddress-tj{
        position: fixed;
        bottom: 0;
        height: 96rpx;
        justify-content: center;
        align-items: center;
        background:linear-gradient(90deg,rgba(255,195,110,1) 0%,rgba(252,238,191,1) 100%);color:rgba(173,102,1,1);
        font-size:35rpx;
    }
</style>
