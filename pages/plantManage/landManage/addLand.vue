<template>
	<view>
		
	<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseId:'',
				organUserId:'',
				url:"http://192.168.101.32:8091/#/addLand?baseId="+ uni.getStorageSync('baseId')+"&organUserId="+uni.getStorageSync('organUserId')+"&token="+uni.getStorageSync('ddwb').token
			
			}
		},
		onReady() {
			this.organUserId = uni.getStorageSync('organUserId');
			this.baseId = uni.getStorageSync('baseId');
		
		},

		methods: {

			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
