<template>
	<!-- 详细预警设置 -->
	<view>
		
		<view class="cu-form-group">
			<view class="title">最低预警值</view>
			<input placeholder="低于此值时预警通知" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">最高预警值</view>
			<input placeholder="高于此值时预警通知" name="input"></input>
		</view>
		<view class="bottom-lg-btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				}
		},
		onLoad(option) {

		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.cu-form-group picker::after {
		line-height: 50rpx;
	}

	.uni-input {
		line-height: 18rpx;
		padding-left: 0;
	}

	.title {
		width: 180rpx;
	}

	.bottom-lg-btn {
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 80%;
		margin: 60rpx auto;
		text-align: center;
		color: #fff;
	}
	.btn-box {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 4px;
		margin: 20rpx 30rpx 20rpx 0;
	}
	
	.btn-box-action {
		border: 1px solid #00AE66;
		color: #00AE66;
	}
</style>
