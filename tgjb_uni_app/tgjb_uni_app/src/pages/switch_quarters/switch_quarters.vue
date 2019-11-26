<template>
  <view class="span24 switchqur">
      <view class="span24 switchqur-count">
          目前已绑定{{my_community&&my_community.length}}个小区
      </view>
      <view class="span24 switchqur-it" v-for="item in my_community" :key="item.community_id">
          <view class="span16">
              <view class="span24 switchqur-name">小区名称：{{item.community}}</view>
              <view class="span24 switchqur-addr"><image class="switchqur-dw"  mode="aspectFit" src='https://imgcdn.tuogouchebao.com/property_dingwei.png'></image>{{item.community_address}}</view>
          </view>
          <view class="span8">
              <view class="span13 switchqur-sle">
                <span v-if="item.status===0" style="color:rgba(153,153,153,1)">(审核中)</span><image v-else @tap="seleCommit(item,$event)"  mode="aspectFit" :src="item.sle?'https://imgcdn.tuogouchebao.com/property_xuanzhong.png':'https://imgcdn.tuogouchebao.com/property_weixuanzhong.png'"></image>
              </view>
              <view class="span11 switchqur-dele">
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
.switchqur-dw{
    width: 20rpx;
    height: 28rpx;
    margin-right: 10rpx
}
.switchqur-sle{
    align-items: center;
    justify-content: flex-end
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
</style>
