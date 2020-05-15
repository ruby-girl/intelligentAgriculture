<!-- 农事管理 -->

<template>
	<view class="workOrder ">



		<view class="content">

			<view class="item" v-for="(item,index) in 5" :class="{'showModel':isMoreArr.indexOf(item)>=0}">


				<view>
					<image src="/static/plant/icon_fertilization@2x.png" class="imgIcon"></image>
					<text>施肥</text>
				</view>

				<view class="textHidden">
					<text class="cr3 ">
						批次信息：</text>10000
				</view>
				<view class="textHidden">
					<text class="cr3 ">结束时间：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">上传图片：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">
						备注信息：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">
						总费用信息：11111111111111111111111111111111111111111111111111</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">

						物资费用信息：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">


						名称：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">



						品牌：
					</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">



						每亩用量：
					</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">




						物流单价：

					</text>
				</view>

				<text @click="handleCard(item)" class="handle-text">

					{{isMoreArr.indexOf(item)>=0?'收起':'展开'}}

				</text>
			</view>

		</view>

		<button class="cu-btn block bg-green  lg">添加农事记录</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				isMoreArr: []

			};
		},
		onReady() {


		},

		methods: {
			handleCard(item, key) {

				if (this.isMoreArr.indexOf(item) >= 0) {
					this.isMoreArr = this.isMoreArr.filter(t => t != item)
				} else {
					this.isMoreArr.push(item)
				}

			},
		}
	}
</script>

<style lang="scss"  scoped>
	.flex {
		display: flex;
		justify-content: space-between;
	}

.cu-btn{
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
	.content {
		padding: 30rpx;
		overflow-y: auto;
		position: relative;

		.item {
			padding: 30rpx;
			line-height: 30rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
			margin-bottom: 30rpx;
			height: 180px;
			overflow: hidden;
			transition: height .3s;
			position: relative;

			.flex {
				margin-bottom: 20rpx;
			}

			.textHidden {
				width: 88%;
				display: inline-block;
			}
		}

		.showModel {
			height: 330px;





		}

		.handle-text {
			position: absolute;
			bottom: 20rpx;
			right: 30rpx;
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10px;
		}
	}
</style>
