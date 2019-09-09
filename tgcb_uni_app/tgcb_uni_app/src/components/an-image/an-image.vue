<template>
	<!-- <view> -->
		<!-- <image :src="src" :mode="mode" @error="imgError" 
			:style="'width:'+(width<1?width*100+'%':width+'rpx')+'; height: '+(height<1?height*100+'%':height+'rpx')+'; background-image: url('+alt+'); background-size:'+(width<1?width*100+'%':width+'rpx')+' '+(height<1?height*100+'%':height+'rpx')+';'">
		</image> -->
		<image :src="src" :mode="mode" @error="imgError" 
			:style="'width:100%;height:100%;background-image: url('+alt+'); background-size:100% 100%'">
		</image>
	<!-- </view> -->
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: '' 
			}, 
			alt: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			width: {
				type: Number,
				default: 70
			},
			height: {
				type: Number,
				default: 90
			}
		},
		data() {
			return {
				url: ''
			};
		},
		methods: {
			imgError(){
				this.url = this.alt;
			},
		}
	}
</script>

<style>
</style>