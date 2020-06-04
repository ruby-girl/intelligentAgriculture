<!-- 预警设置 -->
<template>
	<view class="workOrder">
			<scroll-view v-bind:style="{height:(windowHeight-20)+'px'}" class="list-container" scroll-y="true">
				<view class="list-item margin-top" @tap="toDetail()">
					<view class="flex align-items-center justify-content-flex-justify">
						<text class="item-title">空气温度预警开关</text>
						<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="red"></switch>
					</view>
					<view class="flex align-items-center justify-content-flex-justify border-top">
						<text class="small-text">温度预警值</text>
						<view>
							<text>最低°C 最高°C</text>
							<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="list-item margin-top" @tap="toDetail()">
					<view class="flex align-items-center justify-content-flex-justify">
						<text class="item-title">空气湿度预警开关</text>
						<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="red"></switch>
					</view>
					<view class="flex align-items-center justify-content-flex-justify border-top">
						<text class="small-text">湿度预警值</text>
						<view>
							<text>最低°C 最高°C</text>
							<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="list-item margin-top" @tap="toDetail()">
					<view class="flex align-items-center justify-content-flex-justify">
						<text class="item-title">土壤温度预警开关</text>
						<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="red"></switch>
					</view>
					<view class="flex align-items-center justify-content-flex-justify border-top">
						<text class="small-text">温度预警值</text>
						<view>
							<text>最低°C 最高°C</text>
							<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="list-item margin-top" @tap="toDetail()">
					<view class="flex align-items-center justify-content-flex-justify">
						<text class="item-title">土壤湿度预警开关</text>
						<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="red"></switch>
					</view>
					<view class="flex align-items-center justify-content-flex-justify border-top">
						<text class="small-text">湿度预警值</text>
						<view>
							<text>最低°C 最高°C</text>
							<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</scroll-view>

	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				moreHeight: 30,
				windowHeight: 300,
				switchB:true
			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			// this.getData()
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods: {
			toDetail(){//跳转设置
				uni.navigateTo({
					url: 'detailWarning'
				})
			},
			changeSwitch(e) {
				this.switchB = e.detail.value
			}
		

		}
	}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;
	
		.list-container {
			padding: 10rpx 30rpx;
		}
	}
	
	.flex {
		display: flex;
		justify-content: space-between;
	}
	
	.workOrder {
		height: 100%;
	
		.top {
			position: fixed;
			width: 100%;
			z-index: 1;
		}
	}
	
	.box-margin {
		padding-top: 10px;
	}
	
	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 20rpx 15px 20px 15px;
		margin: 20rpx 8rpx 30rpx 8rpx;
	}
	
	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
	}
	.border-top{
		border-top:1px solid #eee;
		margin-top:20rpx;
		padding-top:10rpx;
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
	
	.small-text {
		color: #999999;
		font-size: 13px;
	}
	
	.equipmentManagement-title {
		padding: 15rpx 30rpx;
		background: #eee;
	
		image {
			width: 24px;
			margin-right: 5px;
		}
	
		.equipmentManagement-btn {
			background: #17BB89;
			padding: 3px 8px;
			border-radius: 17px;
			color: #fff;
	
			image {
				width: 10px;
				height: 10px;
				margin-right: 3px;
			}
		}
	}
	
	.line-img {
		width: 20px !important;
		height: 20px !important;
	}
	
	.jt-img {
		width: 8px !important;
		height: 16px !important;
		margin-left: 5px;
		position: relative;
		top:3px;
	}
	
	.item-bottom-box {
		border-top: 1px solid #eee;
		padding-top: 20rpx;
		margin-right: 20rpx;
	}
	
	.item-bottom-box-left {
		width: 50%;
		padding: 20rpx 20rpx 20rpx 0;
	}
	
	.item-title {
		font-size: 15px;
		font-weight: bold;
	}
	.item-icon{
		width:22px !important;
		height:22px !important;
		margin-right: 5px;
	}
	.item-type-box{
		padding: 5px 30rpx;
		width:46%;
		background:rgba(249,249,249,1);
		border-radius:32px;
	}
</style>
