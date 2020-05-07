<!-- 地块管理 -->
<template>
	<view>

		<view class="drawMap">
			<map id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location style="width: 100%; height: 100%;">
			</map>
		</view>
		<view class="draw-content">
			<view class="cark" style="    left: 90rpx;"></view>
			<view class="cark cark-right"></view>
			<view class="item-top display-flex">
				<view class="left">
					<view style="line-height: 0;"><image src="../../static/logo.png"  ></image></view>
					<view style="height: 28rpx;">sdfas</view>
				</view>
				<view>
					<view>地块总数：4</view>
					<view>地块总面积：11.25亩</view>
				</view>
				
			</view>
			<view class="gutter-item">
				<view class="label">
					<label><text class="line"></text>当前种植</label>
					<text class="cr " style="float: right;">编辑</text>
				</view>


				<view class="content">
					<view><text class="cr3">
							批次名称：
						</text> <text>批次工单</text>

					</view>
					<view><text class="cr3">
							种植计划：
						</text>批次工单</view>
					<view><text class="cr3">

							种植作物：
						</text>批次工单</view>
					<view><text class="cr3"> 开始时间：
						</text>批次工单</view>

				</view>
			</view>
			<view class="gutter-blank"></view>

			<view class="gutter-item">
				<view class="label">
					<label><text class="line"></text>历史种植</label>
					<text class="cr " style="float: right;">编辑</text>
				</view>


				<view class="content">
					<view><text class="cr3">
							批次名称：
						</text> <text>批次工单</text>

					</view>
					<view><text class="cr3">
							种植计划：
						</text>批次工单</view>
					<view><text class="cr3">

							种植作物：
						</text>批次工单</view>
					<view><text class="cr3"> 开始时间：
						</text>批次工单</view>

				</view>
			</view>



		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				latitude: "24.47951",
				longitude: "118.08948",
				multiIndex: [0, 0, 0],
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
					['猪肉绦虫', '吸血虫']
				],
			}
		},

		methods: {

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.drawMap {
		width: 100vw;
		height: 45vh;
	}

	.draw-content {

		height: 50vh;

		box-sizing: content-box;

		box-sizing: content-box;
		background-color: #fff;
		position: relative;
		.cark {
			width: 6px;
			height: 17px;
			background-color: #f1f0f0;
			position: absolute;
			top: -70rpx;
		    z-index: 2;
			border-radius: 6px;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
		
		}
		
		.cark-right {
		
			right: 90rpx;
		}
.item-top{
	width: 86vw;
	margin: 0 auto;
	padding: 20rpx 30rpx;
	background-color: #fff;
box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.15);
border-radius:6px;
position: relative;

top:-50rpx;

.left{
	border-right: 1px solid #dcdcdc;
	padding-right: 30rpx;
	margin-right: 30rpx;
}
image{
	width: 80rpx;
	height: 80rpx;
}
}
		.gutter-item {
			padding: 30rpx;
		}

		.gutter-blank {
			width: 100vw;
			height: 20rpx;
			background-color: #F2F2F2;
		}

		.label {

			display: block;
			font-size: 34rpx;
			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;
			font-weight: bold;

			.line {
				display: inline-block;
				width: 2px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
	}
</style>
