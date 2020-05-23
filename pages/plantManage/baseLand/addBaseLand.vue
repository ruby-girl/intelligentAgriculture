<!-- 创建基地 -->
<template>
	<view>
	 <web-view :src="url"></web-view>
	</view>
</template>
<script>
	
	export default {
		
		data() {
			return {
				url:''
			}
		},
	onLoad() {
		
		this.url = "https://bysk.scddwb.com/map/#/?userId=" + uni.getStorageSync('ddwb').userid + "&token=" + uni.getStorageSync('ddwb').token;
		//this.url = "http://192.168.101.32:8091/#/?userId=" + uni.getStorageSync('ddwb').userid + "&token=" + uni.getStorageSync('ddwb').token;
	
	},
	
		
	}
</script>
<style lang="scss" scoped>
	.draw-content {

		width: 100vw;
		height: 100rpx;

		z-index: 1;
		box-sizing: content-box;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		transition: height .25s;
		z-index: 999;

	}

	
</style>
