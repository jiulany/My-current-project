<template>
  <view class="my">
    <my :user="user" @bindgetuserinfo="bindgetuserinfo" :userDisplayData="userDisplayData"></my>
    <tab-bar address="4"></tab-bar>
  </view>
</template>
<script>
import tabBar from "../../components/tab-bar/tabBar.vue";
import uniPopup from "../../components/uni-popup/uni-popup.vue"
import my from '../../components/my/my'
import {UserModel} from "../../model/user";
const  userModel = new UserModel()
export default {
  data() {
    return {
      user:{},
      showSignModel:false,
      userDisplayData : {}
    };
  },
  methods: {
   // 个人中心
    _getUserInfo(){
        userModel.getUerInfo().then((res) => {
            if(res.code < 400){
                this.user = res.data
                if (res.data.nick_name || res.data.avatar_url) {
                  this.userDisplayData = {
                    nick_name : res.data.nick_name,
                    avatar_url : res.data.avatar_url,
                    phone : res.data.phone,
                  }
                }
                console.log(this.userDisplayData)
            }
        })
    },
    bindgetuserinfo(res)
    {
      let data = res.detail.userInfo
      let params = {
          nick_name : data.nickName,
          avatar_url : data.avatarUrl,
          city : data.city,
          country : data.country,
          province : data.province,
          gender : data.gender,
      }
      userModel.updateUserInfo(params).then((res) => {
          if (res.code == 200) {
              this.userDisplayData = res.data
          }
      })
    }
  },
  components: { tabBar ,uniPopup,my},
  onLoad: function() {},
  onShow: function() {
    uni.hideTabBar();
    this._getUserInfo()
  },
  onHide: function() {}
};
</script>

<style>

</style>
