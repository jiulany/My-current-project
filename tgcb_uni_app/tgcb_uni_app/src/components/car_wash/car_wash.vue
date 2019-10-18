<template>
	<view class="content">
		<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black" select-class="bg-orange"></wuc-tab>
		<swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
		 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
			<swiper-item>
				<view class="listbox">

					<view @tap='toOrder(item)' class="list" v-for="(item,index) in wash_list" :key="index">
						<view class="left_con">
							<!-- <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1346669751,974538333&fm=26&gp=0.jpg"></image> -->
							<view class="image-box">
								<an-image :src="item.commodity_image_thum" :alt="no_pic"></an-image>
							</view>
							<view class="center_txt">
								<text>{{item.commodity_name}}</text>
								<text>{{item.brief_introduction}}</text>
							</view>
						</view>
						<text>￥{{item.min_price}}</text>
					</view>
					
				</view>
			</swiper-item>


			<swiper-item>
				<view class="listbox">

					<view @tap='toOrder(item)' class="list" v-for="(item,index) in wash_list" :key="index">
						<view class="left_con">
							<!-- <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1346669751,974538333&fm=26&gp=0.jpg"></image> -->
							<view class="image-box">
								<an-image :src="item.commodity_image_thum" :alt="no_pic"></an-image>
							</view>
							<view class="center_txt">
								<text>{{item.commodity_name}}</text>
								<text>{{item.brief_introduction}}</text>
							</view>
						</view>
						<text>￥{{item.min_price}}</text>
					</view>
				
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import {
	uniSwiperDot
} from "@dcloudio/uni-ui";
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import {IndexModel} from "../../model";
import { deflate } from 'zlib';
import anImage from '@/components/an-image/an-image.vue'
import {config} from '@/common/utils/congfig.js'
    const  indexModel = new IndexModel()
	export default {
		name:'car_wash',
		data() {
			return {
				no_pic: getApp().globalData.no_pic,
				TabCur3: 1,
				tabList3: [{
					name: '只洗车身'
				}, {
					name: '里外都洗'
				}],
				wash_list:[]
			}
		},
		props:{
			
		},
		components: {
			WucTab,
			anImage
		},
		methods: {
			swiperChange3(e) {
				let {
					current
				} = e.target;
				this.TabCur3 = current;
				this._getService()
			},
			toOrder(item){
				let data = [{
					id :item.one_sku.id,
					num : 1
				}]
				uni.navigateTo({
					url : '/pagesB/car_wash_buyOrder/car_wash_buyOrder?data=' + JSON.stringify(data)
				})
			},
			 // 洗车
            _getService()
			{
				let params = {
					page:1,
					size:20,
					service_classify_id:1,
					recommend_type:this.TabCur3 + 1
				}
				console.log(params)
				indexModel.getCosmetology(params).then((res) => {
					let data = res.data
                    this.wash_list = data.data
				})
			}
			
		},
		mounted(){
			 this._getService()
		},
	}
</script>
<style>
	page{
		height: 100vh;
	}
	.content{
		height: 100vh;
	}
	.swiper{
		height: 690.82rpx;
	}

	.listbox {
		padding: 0 24.15rpx;
		background: #FFFFFF;
		padding-bottom: 163.04rpx;
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #E2DED7;
		padding: 28.38rpx 22.94rpx 28.38rpx 59.17rpx;
	}

	.list:last-child {
		border: none !important;
	}

	.left_con {
		display: flex;
		align-items: center;
	}

	.image-box {
		width: 116.54rpx;
		height: 116.54rpx;
	}

	.center_txt {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 28.98rpx;
		height: 92.39rpx;
	}

	.center_txt>text:first-child {
		color: #474747;
		font-size: 25.36rpx;
	}

	.center_txt>text:nth-child(2) {
		color: #909090;
		font-size: 21.73rpx;
	}

	.list>text {
		color: #F75C3E;
		font-size: 28.98rpx;
		font-weight: bold;
	}
</style>
