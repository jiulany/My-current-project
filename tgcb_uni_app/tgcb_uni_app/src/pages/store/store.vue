<template>
	<view class="store">
		 <store></store>
		 
    	 <tab-bar address="1"></tab-bar>
	</view>
</template>

<script>
 import store from '../../components/store/store'
 import tabBar from "../../components/tab-bar/tabBar.vue";
 
	export default {
		components: {
			tabBar,
			store
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		},
		onShow(){
			
		}
	};
</script>

<style lange="less">
.store{
	height:100%;
}	
</style>
