<template>
	<view class="chat">
		<view class="message">

			<view v-for="item in message">
				<view class="message-unit-left" v-if="item.position == 'left'">
					<view class="head-portrait">
						<image class="head-portrait-image" :src="item.avatar_url"></image>
					</view>
					<view class="message-content">
            {{item.message}}<view v-if="!robot" @tap="cutRobot" style='color:#FDD000'>[机器人模式]</view>
            
						<view class="testmotion"></view>
					</view>
				</view>

				<view class="message-unit-right" v-else>
					<view class="message-content">{{item.message}}
						<view class="testmotion"></view>
					</view>
					<view class="head-portrait">
						<image class="head-portrait-image" :src="no_pic"></image>
					</view>
				</view>
				<view class="send-time">{{item.send_time}}</view>

			</view>
			
			


			<!-- <view class="message-unit-right">
				<view class="message-content">什么东西对车保养很好？
					<view class="testmotion"></view>
				</view>
				<view class="head-portrait">
					<image class="head-portrait-image" src="https://imgcdn.tuogouchebao.com/no-pic.png"></image>
				</view>
			</view>
			<view class="send-time">2019-07-11 14:00</view> -->


		</view>
		<view class="chat-bottom">
			<view class="chat-input-box">
				<input class="chat-input" v-model="inputValue" @input="input" type="text" placeholder="问点什么呢~">
			</view>
			<view class="send" @tap="_send">发送</view>
		</view>
	</view>
</template>

<script>
import {ChatModel} from '../../model/chat.js'
import { setTimeout } from 'timers';
const chatModel = new ChatModel()
export default {
  data() {
    return {
		no_pic:getApp().globalData.no_pic,
		inputValue:"",
		message:[],
		receiver_id:1,
    user:{},
    is_online:false,
    robot:false
	};
  },
  components: {},
  methods: {
    _connectSocket(){
      uni.connectSocket({
        url: "wss://chatserver.tuogouchebao.com",
      });
    },
	  _online(client_id,nick_name,avatar_url){
		  let data = {
			  user_id : "user_"+this.user.id,
			  client_id : client_id,
			  nick_name : nick_name,
			  avatar_url : avatar_url,
			  message_type : 1
		  }
		  chatModel.online(data).then((res) => {
			console.log(res)
		  })
	  },
	  _send()
	  {
      uni.showLoading({
        title:'loading'
      })
      let params = {
        sender_id : "user_"+this.user.id,
        receiver_id : "system_"+this.receiver_id,
        message : this.inputValue,
        avatar_url : 'avatar_url',
        message_type : 1,
        is_system_user:0
      }
      if(this.robot){
        this.robotModel(params)
      } else {
        this.sendModel(params)
      }
      
    },
     cutRobot(){
      uni.showLoading({
        title:'loading'
      })
      this.robot = true;
      let params = {
        sender_id : "user_"+this.user.id,
        receiver_id : "system_"+this.receiver_id,
        message : 'robot',
        avatar_url : 'avatar_url',
        message_type : 1,
        is_system_user:0
      }
      this.robotModel(params)
	  },
    sendModel(params){
        chatModel.send(params).then((res)=>{
          uni.hideLoading()
          console.log(res)
          let data = res.data
          params.position = 'right'
          params.send_time = data.send_time
          this.message.push(params)
          this.inputValue = ""
        })
    },
    robotModel(params){
        chatModel.robot(params).then((res)=>{
          uni.hideLoading()
          console.log(res)
          if (params.message == 'robot') {
              this.inputValue = ""
              return false
          }
          let data = res.data
          params.position = 'right'
          params.send_time = data.send_time
          this.message.push(params)
          this.inputValue = ""
        })
    },
	  input(val) {
      this.inputValue = val.detail.value
      console.log(val)
	  },
  },
  onLoad: function() {

	
  },
  onShow: function() {
      this.user = uni.getStorageSync('users')
      var self = this
      this._connectSocket()
      
      uni.onSocketOpen(function(res) {
          console.log(res);
          console.log("打开成功");
      });

      uni.onSocketError(function (res) {
          console.log('WebSocket连接打开失败，请检查！');
      });

      uni.onSocketClose(function (res) {
          self._connectSocket()
          console.log('WebSocket 已关闭！');
      });


        uni.onSocketMessage(function(res) {
        console.log("收到服务器信息" + JSON.stringify(res));
        let data = JSON.parse(res.data)
        console.log(data)
        switch(data.type){
          case 'client_id':
              self._online(data.client_id,'nick_name','avatar_url')
          break;
          case 'message':
            let message = data
            message.position = 'left'
            setTimeout(()=>{
              uni.vibrateLong({
                success: function () {
                    console.log('success');
                }
            });
              self.message.push(message)
            },1000)
          break;	  
        }
        
      

        });
        uni.onSocketOpen(function(res) {
          console.log("WebSocket连接已打开！");
          console.log("数据发送");
          uni.sendSocketMessage({
            data: "hello"
          });
        });

        
  },
  onHide: function() {}
};
</script>

<style lang="less">
.chat {
  background: #f5f5f5;
  .message {
    padding: 23rpx 23rpx 130rpx 23rpx;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .send-time {
      text-align: center;
      color: #999999;
      font-size: 24rpx;
    }
    .message-unit-left,
    .message-unit-right {
      display: flex;
      padding: 20rpx;
    }
    .message-unit-left {
      // justify-content: space-between;
      .message-content {
        margin-left: 32rpx;
        .testmotion {
          display: inline-block;
          font-size: 0;
          overflow: hidden;

          position: absolute;
          left: -20rpx;
          top: 40rpx;
          border-top-left-radius: 100%;
          border-bottom-left-radius: 100%;
        }
        .testmotion:before {
          content: "";
          position: relative;
          display: inline-block;
          border: 15rpx solid transparent; // 控制三角形高度

          right: 5rpx;
          border-left-width: 0;
          border-right-width: 30rpx; // 控制三角形长度
          // border-right-color: rgba(181, 181, 181, 1);
          border-right-color: #ffffff;
        }
      }
    }
    .message-unit-right {
	   justify-content: flex-end;
      .message-content {
        margin-right: 32rpx;
        background: #fdd100;
        .testmotion {
          display: inline-block;
          font-size: 0;
          overflow: hidden;

          position: absolute;
          right: -20rpx;
          top: 40rpx;
          border-top-right-radius: 100%;
          border-bottom-right-radius: 100%;
        }
        .testmotion:before {
          content: "";
          position: relative;
          display: inline-block;
          border: 15rpx solid transparent; // 控制三角形高度

          left: 5rpx;
          border-right-width: 0;
          border-left-width: 30rpx; // 控制三角形长度
          // border-left-color: rgba(181, 181, 181, 1);
          border-left-color: #fdd100;
        }
      }
    }
    .head-portrait {
      width: 102rpx;
      height: 102rpx;
      border-radius: 102rpx;
      overflow: hidden;
      .head-portrait-image {
        width: 102rpx;
        height: 102rpx;
      }
    }
    .message-content {
      max-width: 532rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 8rpx;
      padding: 18rpx;
      font-size: 26rpx;
      color: #333333;
	  position: relative;
    }
  }
  .chat-bottom {
    height: 120rpx;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    box-sizing: border-box;
    align-items: center;
    font-size: 26rpx;
    color: #999999;
    .chat-input-box {
      width: 557rpx;
      height: 88rpx;
      background: rgba(245, 245, 245, 1);
      border-radius: 8rpx;
      padding: 20rpx 43rpx;
      box-sizing: border-box;
    }
    .send {
      width: 140rpx;
      height: 88rpx;
      padding: 20rpx;
      box-sizing: border-box;
      background: rgba(245, 245, 245, 1);
      border-radius: 8rpx;
      text-align: center;
    }
  }
}
</style>
