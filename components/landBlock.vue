<template>
	<view class="list-item">
		<view class="flex  align-items-center justify-content-flex-justify">
			<view class="flex  align-items-center">
				<image class="land-img" src="../static/imgs/location.png" mode=""></image>
				<view class="item-title">
					<view class="order-title">NO.00001</view>
					<view class="order-title small-text">开心农场 </view>
				</view>
			</view>
			<view class="state-box">
				在线
			</view>
		</view>
		<view class="box-margin flex justify-content-flex-justify align-items-center">
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜</text>
			</view>
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜</text>
			</view>
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜</text>
			</view>
		</view>
		<view class="box-margin flex justify-content-flex-justify align-items-center">
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜</text>
			</view>
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜阿萨德</text>
			</view>
			<view class="item-content-box">
				<view class="item-num">
					60%
				</view>
				<text class="small-text">冬瓜</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'landBlock',
		props: {	
			itemObject:Object
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	image {
			width: 28px;
			height: 28px;
			margin-right: 20rpx;
			position: relative;
			top: 3px;
	}
	.content {
		padding: 30rpx;
		overflow-y: auto;
		position: relative;
		padding-top: 200rpx;

		.item {
			padding: 30rpx;
			line-height: 30rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
			margin-bottom: 30rpx;

			.flex {
				margin-bottom: 20rpx;
			}
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10px;
		}
	}

	.order-title {
		line-height: 20px;
	}
	.small-text{
		color:#999999;
		font-size: 13px;
	}
	.list-item{
		background: #fff;
		border-radius: 8px;
		padding:20rpx;
		margin-bottom: 20rpx;
	}
	.state-box {
		position: relative;
		padding:3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right:-20rpx;
		background: #49BA89;
		color:#fff;
	}
	.item-content-box{
		width:30%;
		text-align: center;
		.item-num{
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>
