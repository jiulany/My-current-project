<template>
	<view>
		<view class="content">
			<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="TabCur3" tab-class="text-center text-black" select-class="bg-orange"></wuc-tab>
			<swiper :current="TabCur3" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
			 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange3">
				<swiper-item>
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="lower">
						<view class="park_con" >
							<view class="park_list" v-for="(item,index) in list1" :key="index">
								<image src=""></image>
								<view class="pl_center">
									<view>{{item.created_at}}</view>
									<view>{{item.address}}</view>
									<view class="pc_bottom">
										<text v-if="item.status == 0">未上传</text>
										<text v-else-if="item.status == 3" class="status_error">审核未通过</text>
										<text v-else>已上传</text>
										<text v-if="item.status != 3">{{item.car_num}}</text>
										<text v-else class="details" @tap="openDetails(item)">详情</text>
									</view>
								</view>
								<!-- <view class="pc_right" v-if="item.status == 1">上传成功</view> -->
								<view class="pc_right_success" v-if="item.status == 0" @click="up_card(item.id)">上传凭证</view>
								<view class="pc_right_success" v-else-if="item.status == 3"  @click="up_card(item.id)">重新上传</view>
								<view class="pc_right_success" v-else @click="checkImage(item)">查看凭证</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="lower">
						<view class="park_con">
							<view class="park_list" v-for="(item,index) in list2" :key="index">
								<image src=""></image>
								<view class="pl_center">
									<view>{{item.created_at}}</view>
									<view>{{item.address}}</view>
									<view class="pc_bottom">
										<text v-if="item.status == 0">未上传</text>
										<text v-else-if="item.status == 3" class="status_error">审核未通过</text>
										<text v-else>已上传</text>
										<text v-if="item.status != 3">{{item.car_num}}</text>
										<text v-else class="details" @tap="openDetails(item)">详情</text>
									</view>
								</view>
								<!-- <view class="pc_right" v-if="item.status == 1">上传成功</view> -->
								<view class="pc_right_success" v-if="item.status == 0" @click="up_card(item.id)">上传凭证</view>
								<view class="pc_right_success" v-else-if="item.status == 3"  @click="up_card(item.id)">重新上传</view>
								<view class="pc_right_success" v-else @click="checkImage(item)">查看凭证</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y style="height: 100%;" @scrolltolower="lower">
						<view class="park_con">
							<view class="park_list" v-for="(item,index) in list3" :key="index">
								<image src=""></image>
								<view class="pl_center">
									<view>2019-4-24 14:04</view>
									<view>四川省成都市金牛区星辉中路20号</view>
									<view class="pc_bottom">
										<text v-if="item.status == 0">未上传</text>
										<text v-else-if="item.status == 3" class="status_error">审核未通过</text>
										<text v-else>已上传</text>
										<text v-if="item.status != 3">{{item.car_num}}</text>
										<text v-else class="details" @tap="openDetails(item)">详情</text>
									</view>
								</view>
								<!-- <view class="pc_right" v-if="item.status == 1">上传成功</view> -->
								<view class="pc_right_success" v-if="item.status == 0" @click="up_card(item.id)">上传凭证</view>
								<view class="pc_right_success" v-else-if="item.status == 3"  @click="up_card(item.id)">重新上传</view>
								<view class="pc_right_success" v-else @click="checkImage(item)">查看凭证</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- 查看凭证-->
			<view class="see" @tap="close" v-if="imagePopup">
				<view class="see_img">
					<image :src="imageUrl"></image>
				</view>
			</view> 
		</view>
<!--审核未通过原因-->
		<view class="mengban" v-show="detailPopup">
			<view class="fail_box">
					<view class="fb1" @tap="closeDetailsPopup">
						<image src="../../static/image/cha.png"></image>
					</view>
					<image src="https://imgcdn.tuogouchebao.com/shenheweitongguo.png" class="fb2"></image>
					<view class="fb3">审核未通过原因</view>
					<view class="fb4">{{remarks}}</view>
				</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '../../model/user'
const userModel = new UserModel();
import WucTab from '@/components/wuc-tab/wuc-tab2.vue';
import { parse } from 'path';
	export default {
		data() {
			return {
				TabCur3: 0,
				tabList3: [{
					name: '全部'
				}, {
					name: '已上传'
				}, {
					name: '已到账'
				}],
				list1:[],
				list2:[],
				list3:[],
				stutas1:true,
				stutas2:true,
				stutas3:true,
				page1:1,
				page2:1,
				page3:1,
				size: 10,
				status : 0,
				imagePopup:false,
				imageUrl:"",
				flag: true,
				detailPopup:false,
				remarks : ""
			}
		},
		components: {
			WucTab
		},
		methods: {
			lower() {
				if(this.flag == true) {
					this.getList();
				}
			},
			up_card(record_id){
				uni.navigateTo({
					url:'/pagesB/park_upload/park_upload?record_id=' + record_id
				})
			},
			swiperChange3(e) {
				let {current} = e.target;
				this.TabCur3 = current;
				this.status = current;
				if(e.detail.current == 0 && this.page1 == 1) {
					this.getList();
				}
				if(e.detail.current == 1 && this.page2 == 1) {
					this.getList();
				}
				if(e.detail.current == 2 && this.page3 == 1) {
					this.getList();
				}
			},
			getList()
			{
				let params = {
					size: this.size,
					status: this.status
				}
				switch(this.TabCur3) {
					case 0 : 
						params.page = this.page1;
						break;
					case 1:
						params.page = this.page2;
						break;
					case 2:
						params.page = this.page3;
						break;
				}
				userModel.parkingRecode(params).then((res) => {
					if(res.code == 200) {
						if(this.TabCur3 == 0) {
							this.list1 = this.list1.concat(res.data)
                        	if(res.data.length==0){
								this.flag = false;
                        	}else{
								this.flag = true;
                            	this.page1 = this.page1+1;
							}
							console.log(this.list1.length);
						}
						if(this.TabCur3 == 1) {
							this.list2 = this.list2.concat(res.data)
							if(res.data.length==0) {
								this.flag = false;
							}else {
								this.flag = true;
								this.page2 = this.page2+1;
							}
						}
						if(this.TabCur3 == 2) {
							this.list3 = this.list3.concat(res.data)
							if(res.data.length == 0) {
								this.flag = false;
							}else {
								this.flag = true;
								this.page3 = this.page3+1
							}
						}
					}
				})
			},
			close(){
				this.imagePopup = false
			},
			checkImage(item){
				this.imagePopup = true
				this.imageUrl = item.apply.voucher_image
			},
			openDetails(item){
				this.detailPopup = true;
				this.remarks = item.apply.remarks
			},
			closeDetailsPopup(){
				this.detailPopup = false;
			}

		},
		onShow(){
			this.list1 = [];
			this.list2 = [];
			this.list3 = [];
			this.page1 = 1;
			this.page2 = 1;
			this.page3 = 1;
			this.getList();
		}
	}
</script>

<style>
	.content,swiper{
		height: 85vh;
	}
	page {
		overflow: hidden;
		background: #FFFFFF;
	}
	swiper-item{
		overflow: scroll;
	}
	.park_con{
		width: 100%;
		position: absolute;
		/* overflow: scroll; */
		height: 80vh;
	}
	.park_list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 34rpx 16.93rpx 34rpx 38.71rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.park_list:last-child{
		border-bottom: none;
	}
	.park_list:first-of-type{
		margin-top: 0rpx !important;
	}
	.park_list>image {
		width: 106.47rpx;
		height: 106.47rpx;
		border-radius: 50%;
	}

	.pl_center>view:first-child {
		font-size: 22.98rpx;
		color: #474747;
	}

	.pl_center>view:nth-child(2) {
		color: #474747;
		font-size: 22.98rpx;
	}

	.pc_bottom>text {
		color: #909090;
		font-size: 22.98rpx;
	}

	.pc_bottom>text:nth-child(2) {
		margin-left: 24rpx;
	}

	.pc_right {
		width: 163.94rpx;
		height: 52.02rpx;
		border: 1rpx solid rgba(253, 208, 0, 1);
		border-radius: 4.83rpx;
		color: #FDD000;
		font-size: 22.98rpx;
		text-align: center;
		line-height: 52.02rpx;
	}
	.pc_right_success {
		width: 163.94rpx;
		height: 52.02rpx;
		border: 1px solid rgba(71,71,71,1);
		border-radius: 4.83rpx;
		color: #474747;
		font-size: 22.98rpx;
		text-align: center;
		line-height: 52.02rpx;
	}
	.mengban{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 1;
	}
	.fail_box{
		width: 652.75rpx;
		height: 804.59rpx;
		background: #FFFFFF;
		z-index: 2;
		position: absolute;
		left: 48.39rpx;
		top: 156rpx;
		border-radius: 4.83rpx;
		padding: 27.82rpx;
		box-sizing: border-box;
	}
	.fb1{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.fb1>image{
		width: 30.24rpx;
		height: 30.24rpx;
	}
	.fb2{
		width: 175.43rpx;
		height: 174.22rpx;
		display: block;
		margin: 0 auto;
	}
	.fb3{
		color: #E84242;
		font-size: 29.03rpx;
		text-align: center;
		margin-top: 24.8rpx;
	}
	.fb4{
		color: #474747;
		font-size: 29.03rpx;
		margin-top: 45.97rpx;
	}
	.text-center .wuc-tab-item{
		height: 7.5vh !important;
		line-height: 8vh !important;
	}
	.status_error{
		color: #D91313 !important;
	}
	.details{
		background:rgba(224,224,224,1);
		padding: 5rpx 10rpx;
		color: #474747 !important;
		border-radius:5px;
		width:51rpx;
		height:25rpx;
		font-size: 18rpx !important;
	}
	.see{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:rgba(153,153,153,0.8);
	}
	.see_img{
		width:512rpx;
		height:676rpx;
		background:rgba(255,255,255,1);
		margin: 0 auto;
		margin-top: 253rpx;
		padding-top: 46rpx;
		box-sizing: border-box;
	}
	.see_img image{
		display: block;
		margin: 0 auto;
		width:474rpx;
		height:557rpx;
	}
	.details{
		width:51rpx;
		height:25rpx;
		background:rgba(224,224,224,1);
		border-radius:5rpx;
		margin-left: 10rpx;
	}
</style>
