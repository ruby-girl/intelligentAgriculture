<!-- 种植管理  已有基地-->
<template>
	<view>
		<view v-if="isBaseLand == 0">
			<choose-handle></choose-handle>
		</view>
		
			<view class="plant" v-if="isBaseLand>0">
		
				<view class="plant-top" v-if="resultData">
		
					<view class="flex-top" v-if="resultData.organUserName">
		
						<view class="name">{{resultData.organUserName || '-'}}的土地信息</view>
		
					</view>
					<view class="display-flex justify-content-flex-end">
						<ms-dropdown-menu>
							<ms-dropdown-item :title="selectValueName" v-model="selectValue" :list="allBaseLand" :hasSlot="true">
							</ms-dropdown-item>
						</ms-dropdown-menu>
					</view>
		
					<view class="plant-top-content display-flex justify-content-flex-justify">
						<view class="item">
							<view>
								<text class="fb">{{resultData.acreages || 0 }}</text><text>亩</text>
							</view>
							<view>土地总面积</view>
						</view>
						<view class="item">
							<view>
								<text class="fb">{{resultData.landParcelCount || 0}}</text><text>块</text>
							</view>
							<view>总地块数量 </view>
						</view>
		
						<view class="item">
							<view>
								<text class="fb">{{resultData.plantingBatchs?resultData.plantingBatchs.length: 0 || 0}}</text><text>批</text>
							</view>
							<view>种植中批次</view>
						</view>
		
		
					</view>
		
				</view>
		
				<view class="plant-item " v-if="resultData">
					<view class="cark" style="    left: 60rpx;"></view>
					<view class="cark cark-right"></view>
					<view class="flex">
						<view>
							<navigator :url="'/pages/plantManage/workOrder?type=1&baseId='+baseId">
		
								<view class="iconfont cr f20">&#xe60e;</view>
								<text>待处理</text>
							</navigator>
						</view>
						<view>
							<view class="iconfont cr f20">&#xe60c;</view>
							<text>预警提醒</text>
						</view>
						<view>
							<navigator url="/pages/plantManage/batchManagement/list">
		
								<view class="iconfont cr f20">&#xe60d;</view>
								<text>批次管理</text>
							</navigator>
						</view>
						<view>
							<navigator :url="'/pages/plantManage/landManage/landManage?baseId='+baseId+'&acreages='+resultData.acreages+'&landCount='+resultData.landParcelCount">
								<view class="iconfont cr f20">&#xe60a;</view>
								<text>地块管理</text>
							</navigator>
						</view>
						<view>
							<navigator :url="'/pages/plantManage/framManage/framManage?baseId='+baseId">
		
								<view class="iconfont cr f20">&#xe60b;</view>
								<text>农事管理</text>
							</navigator>
						</view>
		
					</view>
					<label class="title">种植中批次</label>
					<view style="overflow-y: auto;height: 70%;">
		
						<view v-if="resultData.plantingBatchs">
							<view v-for="(item, index) in resultData.plantingBatchs" :key="index" class="item-view">
								<navigator :url="'/pages/plantManage/workOrder?type=&baseId='+baseId">
									<view class="item-title">{{item.name}}</view>
									<view style="padding: 10px 0;">
										<view class="inline content">
											<view class="f20">
												{{item.landParcelCount}}
											</view>
											<view class="cr2 f12">地块数量</view>
										</view>
										<view class="inline line"></view>
										<view class="inline content">
											<view class="f20">
												{{item.notExcuteCount}}
											</view>
											<view class="cr2 f12">待处理</view>
										</view>
		
										<view class="inline line"></view>
										<view class="inline content">
											<view class="f20">
												{{item.breedName}}
											</view>
											<view class="cr2 f12">种植品种</view>
										</view>
		
									</view>
								</navigator>
							</view>
						</view>
						<view v-else class="null-data">
		
							暂无数据
						</view>
					</view>
				</view>
		
		
			</view>
		
	</view>
	
	

</template>

<script>
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'

	import chooseHandle from '@/components/chooseHandle.vue'

	export default {
		components: {
			msDropdownMenu,
			msDropdownItem,
			chooseHandle
		},
		data() {
			return {
				isShow: false,
				allBaseLand: [],
				selectValue: '',
				selectValueName: '',
				baseId: '',
				orgId: '',
				userId: '',
				resultData: {},
				isBaseLand:-1

			};
		},
		onShow() {
			let _this = this;
			const obj = uni.getStorageSync('ddwb');
			this.userId = obj.userid;
			this.initSelect()
		},
		onPullDownRefresh: function() {
			this.initSelect()
		},
		watch: {
			selectValue(val, oldValue) {

				if (oldValue) {
					let _this = this
					this.selectValue = val;
					this.initData(val)
					this.resultData = {}
					this.allBaseLand.forEach((a) => {
						if (a.value == val) {
							_this.selectValueName = a.text
						}
					})
				}
			},
		},

		methods: {
			initSelect() {
				let _this = this;
				this.$api.getJoinOkList({
					userId: this.userId
				}).then(res => {
				    this.isBaseLand = res.data.data.length;
					res.data.data.forEach((item) => {
						let obj = {
							text: item.name,
							value: item.id
						}
						_this.allBaseLand.push(obj)
					});
					this.selectValue = res.data.data[0].id
					this.selectValueName = res.data.data[0].name
					this.orgId = res.data.data[0].id
					this.initData(this.orgId)
				})
			},
			initData(orgId) {
				this.$api.getPagingCriteriaQuery({
					userId: this.userId,
					organId: orgId,
				}).then(res => {
					this.resultData = res.data.data
					uni.setStorage({
						key: 'baseId',
						data: res.data.data.baseId
					});
					uni.setStorage({
						key: 'organUserId',
						data: res.data.data.organUserId
					});
					this.baseId = res.data.data.baseId
					uni.stopPullDownRefresh();
				})

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
			background: linear-gradient(top, rgba(41, 185, 130, 1), rgba(45, 187, 87, 1));
			;
			padding: 0px 16rpx;

			/deep/ .dropdown-item__selected {
				background-color: transparent;
				color: #fff;
				padding: 0;
			}

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


				.name {
					font-size: 16px;
					color: #FFFFFF;
					line-height: normal;
					box-sizing: border-box;
				}

			}

			.plant-top-content {
				text-align: right;
				font-size: 12px;
				line-height: 20px;
				color: #FFFFFF;

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
			height: 78vh;
			padding-bottom: 15px;



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
				text-indent: 10rpx;
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

	.null-data {
		text-align: center;
		color: #999;
	}
</style>
