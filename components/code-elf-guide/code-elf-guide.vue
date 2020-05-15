<template>
<view class="bg">
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		onLoad(){
		},
		methods: {
		}
	}
</script>
<style>
	page,
	.content {
		width: 100%;
		height: 100%;
		padding: 0;
	}
	
	.bg {
		height: 100%;
		width: 100%;
		background-image: url('@/static/loading.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}
</style>
