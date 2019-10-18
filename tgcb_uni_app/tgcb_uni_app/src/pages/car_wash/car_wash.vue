<template>
	<view>
    	 <car_wash></car_wash>
		 <tab-bar address="2"></tab-bar>
	</view>
</template>

<script>
import car_wash from '../../components/car_wash/car_wash'
 import tabBar from "../../components/tab-bar/tabBar.vue";
	export default {
		components: {
			tabBar,
			car_wash
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	};
</script>

<style>
	
</style>
