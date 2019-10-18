<template>
	<view class="content">
		<view @tap='toExplanFun' class="row_list">
			<text>使用方法</text>
			<view class="iconfont icon-xiayibu"></view>
		</view>
		<view @tap='toProblem' class="row_list">
			<text>常见问题</text>
			<view class="iconfont icon-xiayibu"></view>
		</view>
		<view class="foot_txt">
			<view class="iconfont icon-xiayibu"></view>
			<text>最终解释权归脱狗车宝所有</text>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  components: {

  },
  methods: {
    // 去使用方法
    toExplanFun() {
      uni.navigateTo({
        url: "/pages/explain_function/explain_function"
      });
	},
	// 去常见问题
    toProblem() {
      uni.navigateTo({
        url: "/pages/explain_problem/explain_problem"
      });
    },
  },
  onLoad: function() {},
  onShow: function() {},
  onHide: function() {}
};
</script>

<style>
	.row_list{
		display: flex;
		height: 84.54rpx;
		background: #FFFFFF;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		padding: 0 10rpx 0 30rpx;
	}
	.row_list>text{
		color: #474747;
		font-size: 28.98rpx;
	}
	.row_list>image{
		width:50rpx;
		height:50rpx;
	}
	.foot_txt{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 39.85rpx;
	}
	.foot_txt>image{
		width: 28.98rpx;
		height: 28.98rpx;
	}
	.foot_txt>text{
		color: #909090;
		font-size: 21.73rpx;
		margin-left: 13.88rpx;
	}
</style>
