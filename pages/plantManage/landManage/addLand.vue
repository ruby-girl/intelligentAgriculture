<template>
	<view>

		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseId: '',
				organUserId: '',
				landId: '',
				url: '',
			}
		},
		onLoad(option) {
			this.landId = option.landId || '';
			this.url = "http://192.168.101.32:8091/#/addLand?baseId=" + uni.getStorageSync('baseId') + "&organUserId=" + uni.getStorageSync(
				'organUserId') + "&token=" + uni.getStorageSync('ddwb').token + '&landId=' + this.landId
		},
		onReady() {
			this.organUserId = uni.getStorageSync('organUserId');
			this.baseId = uni.getStorageSync('baseId');

		}
	}
</script>

<style lang="scss" scoped>

</style>
