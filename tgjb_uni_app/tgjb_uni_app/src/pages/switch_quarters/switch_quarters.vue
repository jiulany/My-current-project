<template>
  <view class="span24 switchqur">
      <view class="span24 switchqur-count">
          目前已绑定{{my_community&&my_community.length}}个小区
      </view>
      <view class="span24 switchqur-it" v-for="item in my_community" :key="item.community_id">
          <view class="span16">
              <view class="span24 switchqur-name">小区名称：{{item.community}}</view>
              <view class="span24 switchqur-addr"><image class="switchqur-dw"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_dingwei.png'></image><view>{{item.community_address}}</view></view>
          </view>
          <view class="span8">
              <view class="span16 switchqur-sle">
                <span v-if="item.status===0" style="color:rgba(153,153,153,1)">(审核中)</span><span v-if="item.status===2" style="color:rgba(153,153,153,1)">(审核不通过)</span><image v-if="item.status===1" @tap="seleCommit(item,$event)"  mode="aspectFit" :src="item.sle?'https://imgcdn.tuogouchebao.com/property_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image>
              </view>
              <view class="span8 switchqur-dele">
                <image  mode="aspectFit" @tap="openDeleModel(item,$event)" src='https://imgcdn.tuogouchebao.com/property_delete.png'></image>
                </view>
          </view>
      </view>
       <Modal v-model="showModel" confirm-style="color:#fdd000" title='确认删除' text='确认删除该车位吗？' @cancel='cancelModel' @confirm='confirmModel'/>
       <HMmessages
      ref="HMmessages"
      @complete="HMmessages = $refs.HMmessages"
      @clickMessage="clickMessage"
    ></HMmessages>
    <view class="span24 queshen" v-if="show_default">
        <view class="span24 queshen-tp"><image mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property/quesheng.png'></image></view>
        <view class="span24 queshen-tt">还没有预约数据~</view>
    </view>
  </view>
</template>

<script>
import Modal from '../../components/x-modal/x-modal'
import HMmessages from "../../components/HM-messages/HM-messages.vue";
export default {
  data() {
    return {
        my_community:[],
        showModel:null,
        curClickItem:null,
        show_default:false
    };
  },
  methods: {
      openDeleModel(item,e){
          this.showModel=true
          this.curClickItem=item
      },
      seleCommit(item,e){
          uni.setStorageSync('community_selected', item);
          this.reLoadList()
          var a=setTimeout(()=>{
uni.navigateBack({
    delta: 1
});
clearTimeout(a)
          },500)
      },
      reLoadList(){
      this.$http({ url: "api/home/my_community", data: { }})
          .then(res => {
              let a=res.data
              for(let i in a){
                  if(a[i].community_id===uni.getStorageSync('community_selected').community_id){
                      a[i].sle=true
                  }else{
                      a[i].sle=false
                  }
              }
              this.my_community=a
              if(res.data.length==0){
                   this.show_default=true
               }else{
                   this.show_default=false
               }
          })
          .catch(res => {
          });
      },
      confirmModel(e){
          let _this=this
          this.$http({
        url: `api/home/del_community/${this.curClickItem.community_id}`,
        data: {
        }
      })
        .then(res => {
            _this.reLoadList()
            _this.HMmessages.show(res.msg, { icon: "success" ,iconColor:"#fdd000"});
        })
        .catch(res => {
            _this.HMmessages.show(res.msg, { icon: "error" });
        });
      }
  },
  components: {Modal,HMmessages},
  onLoad() {
  },
  onShow() {
      this.reLoadList()
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
.switchqur-count{
    padding: 25rpx 0 25rpx 30rpx
}
.switchqur-it{
    padding: 28rpx 49rpx 27rpx 30rpx;
    background: white;
    margin-bottom: 27rpx
}
.switchqur-name{
    font-size:30rpx;
font-weight:600;
color:rgba(51,51,51,1);
}
.switchqur-addr{
    align-items: center;font-size:28rpx;
color:rgba(102,102,102,1);
}
.switchqur-addr view{
    
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
width: 92%
}
.switchqur-dw{
    width: 20rpx;
    height: 28rpx;
    margin-right: 10rpx
}
.switchqur-sle{
    align-items: center;
    justify-content: flex-end
}
.switchqur-sle span{
    font-size: 24rpx
}
.switchqur-sle image{
    width: 51rpx;
    height: 51rpx;
}
.switchqur-dele {
    align-items: center;
    justify-content: flex-end
}
.switchqur-dele image{
    width:  27rpx;
    height: 29rpx;
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
