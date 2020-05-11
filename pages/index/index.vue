<!-- 启动页 -->
<template>
	<view class="content">
		<view class="bg">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

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
