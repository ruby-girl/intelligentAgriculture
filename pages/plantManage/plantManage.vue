<!-- 种植管理  已有基地-->
<template>
	<view class="plant">
		<view class="plant-top">

			<view class="flex-top">
				<view class="name">{{resultData.userName}}的土地信息</view>
				<view class="section right">
					<view @click="downSelect">
						<text>{{selectValue.name}}</text>

						<text class="iconfont iconfanhui" :class="{'degimg':isShow}"></text>
					</view>
				</view>


			</view>

			<view class="select-model" :class="{'showModel':isShow}">
				<view v-for="(item,index) in allBaseLand" :key='index' class="select-li" @click="selectedFun(item.id)">{{item.organ.name}}</view>
			</view>
			<view class="plant-top-content flex-top">
				<view class="item">
					<view>
						<text class="fb">{{resultData.acreages}}</text><text>亩</text>
					</view>
					<view>土地总面积</view>
				</view>
				<view class="item">
					<view>
						<text class="fb">{{resultData.landParcelCount}}</text><text>块</text>
					</view>
					<view>总地块数量 </view>
				</view>

				<view class="item">
					<view>
						<text class="fb">{{resultData.plantingBatchs.length}}</text><text>批</text>
					</view>
					<view>种植中批次</view>
				</view>


			</view>

		</view>

		<view class="plant-item ">
			<view class="cark" style="    left: 60rpx;"></view>
			<view class="cark cark-right"></view>
			<view class="flex">
				<view>
					<navigator :url="'/pages/plantManage/workOrder?type=1&baseId='+baseId">
						<view>
							<image src="/static/plant/icon_pending@2x.png" class="icon" />

						</view>
						<text>待处理</text>

					</navigator>

				</view>
				<view>
					<view>
						<image src="/static/plant/icon_warning@2x.png" class="icon" />

					</view>
					<text>预警提醒</text>
				</view>
				<view>
					<view>
						<image src="/static/plant/icon_batch@2x.png" class="icon" />

					</view>
					<text>批次管理</text>
				</view>
				<view>
					<navigator :url="'/pages/plantManage/landManage/landManage?baseId='+baseId">
						<view>
							<image src="/static/plant/icon_plot@2x.png" class="icon" />

						</view>
						<text>地块管理</text>
					</navigator>
				</view>
				<view>
					<view>
						<image src="/static/plant/icon_farming@2x.png" class="icon" />

					</view>
					<text>农事管理</text>
				</view>

			</view>
			<label class="title">种植中批次</label>
			<view style="overflow-y: auto;height: 70%;">

				<view>
					<view v-for="(item, index) in resultData.plantingBatchs" :key="index" class="item-view">

						<view class="item-title">{{item.name}}</view>
						<view style="padding: 10px 0;">
							<view class="inline content">
								<view class="f20">
									{{item.landParcels.length}}
								</view>
								<view class="cr2 f12">地块数量</view>
							</view>
							<view class="inline line"></view>
							<view class="inline content">
								<view class="f20">
									?
								</view>
								<view class="cr2 f12">待处理</view>
							</view>

							<view class="inline line"></view>
							<view class="inline content">
								<view class="f20">
									{{item.breed.name}}
								</view>
								<view class="cr2 f12">种植品种</view>
							</view>

						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				array: ['美国', '中国', '巴西', '日本'],
				isShow: false,
				allBaseLand: [],
				selectValue: {},
				baseId: '',
				orgId: '',
				userId: '',
				resultData:{}

			};
		},
		onLoad() {



		},
		onReady() {
		
			const obj = uni.getStorageSync('ddwb');
			this.allBaseLand = obj.landOrgan;
			this.userId = obj.userid
			if (obj.landOrgan.length > 0) {
				this.selectValue = obj.landOrgan[0].organ
				this.orgId = obj.landOrgan[0].organ.id
			}
			/* 种植中批次 */
			this.$nextTick(function() {
				this.initData()
			})

		},
		methods: {
			initData() {
				this.$api.getPagingCriteriaQuery({
					userId: this.userId,
					organId: this.orgId,
				}).then(res => {
					this.resultData = res.data.data
					uni.setStorage({
						key:'baseId',
						data:res.data.data.baseId
					});
					this.baseId = res.data.data.baseId
			
				})
			},
			downSelect() {
				this.isShow = !this.isShow
			},
			selectedFun(item) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.plant {
		.flex {
			display: flex;
			justify-content: space-between;
		}

		.select-model {
			background-color: #fff;
			width: 100vw;
			max-height: 0;
			overflow: auto;
			transition: max-height .4s;
			position: absolute;
			z-index: 9999;
			left: 0;
			top: 60rpx;

			.select-li {
				color: #666;
				padding: 10px 6px;
				border-bottom: 1px solid #dddedd;

			}

			box-shadow:0px 5px 8px rgba(37, 37, 37, 0.3);
		}

		.showModel {
			max-height: 20vh;
		}

		.plant-top {
			height: 20vh;

			color: #FFFFFF;
			background: linear-gradient(top, rgba(41, 185, 130, 1), rgba(45, 187, 87, 1));
			;
			padding: 0px 16rpx;

			.iconfont {
				display: inline-block;
				margin-left: 3px;
				transform: rotate(-90deg);
				transition: transform 0.2s ease-in;

			}

			.degimg {
				transform: rotate(90deg);
			}

			.flex-top {
				display: flex;
				justify-content: space-between;

				.name {
					font-size: 17px;
				}

			}

			.plant-top-content {
				margin-top: 26rpx;
				text-align: right;
				font-size: 12px;
				line-height: 22px;

				.fb {
					font-size: 20px;
				}

				.item {
					padding: 0px 10px;
				}

			}
		}

		.plant-item {
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
			border-radius: 10px;
			background-color: #fff;
			margin: 0px 16px;
			margin-top: -16px;
			position: relative;
			height: 65vh;


			.flex {
				font-size: 12px;
				text-align: center;
				color: #666666;
				padding: 30rpx 30rpx 20rpx 30rpx;
				box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);

			}

			.cark {
				width: 6px;
				height: 17px;
				background-color: #f1f0f0;
				position: absolute;
				top: -8px;

				border-radius: 6px;
				box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

			}

			.cark-right {

				right: 60rpx;
			}

			.icon {
				width: 38rpx;
				height: 38rpx;
			}

			.title {
				margin-top: 50rpx;
				display: inline-block;
				margin-bottom: 5px;
			}

			.item-title {
				padding: 6px 16px;
				background-color: #EEFEF0;
			}

			.inline {
				display: inline-block;
				text-align: center;
			}

			.content {
				width: 32%;
				line-height: 25px;
			}

			.line {
				width: 2px;
				height: 35px;
				background-color: #D1D1D1;
			}

			.item-view {
				box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
				margin-bottom: 20px;
			}

		}

	}
</style>
