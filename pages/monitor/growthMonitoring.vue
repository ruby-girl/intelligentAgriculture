<!-- 生长监测 -->
<template>
	<view class="workOrder"  >
		<view>
			<scroll-view v-bind:style="{height:windowHeight+'px'}" style="overflow: hidden;" class="list-container" scroll-y="true" @scroll="scroll" >
				<view class="map-container">
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.surplus}}</view>
							<view class="small-text">剩余时间(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.already}}</view>
							<view class="small-text">已成长(天)</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.creationTime}}</view>
							<view class="small-text">种植日期</view>
						</view>
						<view class="map-top-item">
							<view style="font-size: 15px;font-weight: bold;">{{obj.proportion}}%</view>
							<view class="small-text">种植进度</view>
						</view>
					</view>
					<video custom-cache="false" autoplay="true" controls style="width:100%;height: 600rpx;" :poster='obj.liveCoverUrl'
					 :src="obj.hlsLivePlayUrl">
					</video>


					<!-- <view  class="play-box">
						<image src="../../static/imgs/play.png" mode=""></image>
					</view> -->
					<view class="map-bottom-box">
						<view class="list-item">
							<view class="flex  align-items-center justify-content-flex-justify">
								<view class="flex  align-items-center">
									<image class="land-img" src="../../static/imgs/location.png" mode=""></image>
									<view class="item-title">
										<view class="order-title">NO.{{obj.massifNo}}</view>
										<view class="order-title small-text">{{obj.farmName}}</view>
									</view>
								</view>
								<view class="state-box" v-if="obj.statusTxt=='在线'">
									{{obj.statusTxt||''}}
								</view>
								<view class="state-box-error" v-else-if="obj.statusTxt!=='-'">
									{{obj.statusTxt||''}}
								</view>
							</view>
							<view class="box-margin flex align-items-center flex-wrap">
								<view class="item-content-box">
									<view class="item-num">
										{{obj.crop||'-'}}
									</view>
									<text class="small-text">作物名称</text>
								</view>
								<view class="item-content-box" v-for="(item,n) in monitorings" :key="n">
									<view class="item-num">
										{{item.value||'-'}}<span class="small-txt">{{item.unit}}</span>
									</view>
									<text class="small-text">{{item.name}}</text>
								</view>
							</view>
							<view class="flex align-items-center">
								<view class="progress">
									<text class="progressing" v-bind:style="'width:' + obj.proportion+'%' "></text>
								</view>
								<text class="progress-txt"><text style="font-size: 16px;font-weight: bold;">{{obj.proportion}}</text><text
									 class="small-txt">%</text></text>
							</view>
							<view class="flex">
								<view class="map-bottom-tip">
									<view class="likes-box flex justify-content-flex-center align-items-center">
										<view class="flex justify-content-flex-center align-items-center likes-shere-box">
											<image v-if="isLike" src="../../static/imgs/like.png" mode="aspectFill" @click="likesFunc"></image>
											<image v-else src="../../static/imgs/no-like.png" mode="aspectFill" @click="likesFunc"></image>
											<button v-if="num!==0" class="like-txt" lang="zh_CN" withCredentials="true" @click="likesFunc">
												{{num}}人点赞</button>
											<button v-else class="like-txt" lang="zh_CN" withCredentials="true" @click="likesFunc">
												点赞</button>
										</view>
										<view style="height:25px;border-left:2px solid #eee;"></view>
										<view class="flex justify-content-flex-center align-items-center likes-shere-box">
											<image class="right-img" src="../../static/imgs/share.png" mode="aspectFill" @click="shareFunc"></image>
											<button class="like-txt" lang="zh_CN" withCredentials="true" @click="shareFunc">
												分享二维码</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">数据监测</text></view>
					<view style="padding-top:20rpx" v-if="chartsList.length>0">
						<view class="" v-for="(item,n) in chartsList" :key="n">
							<line-chart :title="item.name" :width="cWidth*2" :height="cHeight*2" :style="{'width':cWidth+'px','height':cHeight+'px'}"
							 :canvasId="item.field+'Line'" chartType="line" :opts="item.opts" :unit="item.unit" />
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="shoeModel?'show':''" @click="hideModal">
			<view class="cu-dialog">
				<view class="bg-img" style="padding:40rpx">
					<image :src="modelImg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/u-charts/u-charts/component.vue';
	import {
		formatDate
	} from "@/utils/index.js"
	export default {
		components: {
			LineChart
		},
		data() {
			return {
				chartsList: [],
				baseId: '',
				obj: {
					proportion: '0'
				},
				windowHeight: 300,
				massifId: '',
				scrollTop: 0,
				cWidth: '',
				cHeight: '',
				openid: '',
				isLike: false,
				num: 0,
				shoeModel: false,
				modelImg: '',
				monitorings: [] //有的检测类型
			};
		},
		onShareAppMessage: function() {
			return {
				title: '快来看看我的地块生长情况吧！',
				desc: '',
				path: 'pages/monitor/growthMonitoring?massifId=' + this.massifId // 路径，传递参数到指定页面。
			}
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			if (option.scene) {
				this.massifId = option.scene
			} else {
				this.massifId = option.massifId
			}
		},
		onShow() {
			this.getData()
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.openid = getApp().globalData.openid
			this.getCode()
			this.findRangeDatay()
		},
		mounted() {},
		methods: {
			// onShareTimeline(){},//分享朋友圈需要定义的方法
			// 手动授权方法
			getCode() {
				let _this = this
				if (_this.openid) {
					_this.getLikes()
				} else {
					wx.login({
						success(res) {
							if (res.code) {
								//发起网络请求
								var code = res.code
								// 这里通过code获取openid
								_this.$api.decodeUserInfo({
									code: code
								}).then(res => {
									getApp().globalData.openid = res.data.data.openid
									_this.openid = res.data.data.openid
									_this.getLikes()
								})
							}
						}
					})
				}

			},
			shareFunc() { //显示小程序码
				let obj = {
					scene: this.massifId,
					page: 'pages/monitor/growthMonitoring',
					width: '250'
				}
				this.$api.getUnlimited(obj).then(res => {
					this.shoeModel = true
					this.modelImg = 'https://xyzn.tree-iot.com' + res.data.path
				})
			},
			hideModal() {
				this.shoeModel = false
			},
			getLikes() { //进入获取点赞状态
				let obj = {
					openid: this.openid,
					massifId: this.massifId
				}
				let _this = this
				this.$api.getLikes(obj).then(res => {
					_this.num = res.data.data.likes
					if (res.data.data.state == 1) {
						_this.isLike = true
					} else {
						_this.isLike = false
					}
				})
			},
			likesFunc() { //点赞
				let obj = {
					openid: this.openid,
					massifId: this.massifId
				}
				let _this = this
				this.$api.likes(obj).then(res => {
					_this.num = res.data.data.likes
					if (res.data.data.state == 1) {
						_this.isLike = true

					} else {
						_this.isLike = false
					}
				})
			},
			scroll: function(e) {
				this.scrollTop = e.detail.scrollTop
			},
			getData() { //获取检测详情
				this.$api.massifMonitor({
					massifId: this.massifId
				}).then(res => {
					this.obj = res.data.data
					// 处理该设备有的检测类型
					this.monitorings = res.data.data.monitorings
					//*** */
					let arr = this.obj.creationTime.split(' ')
					let YMD = arr[0]
					let MD = YMD.split('-')
					this.obj.creationTime = MD[1] + '-' + MD[2]
					if (this.obj.status == 'ONLINE') {
						this.obj.statusTxt = '在线'
					} else if (this.obj.status == 'OFFLINE') {
						this.obj.statusTxt = '离线'
					} else if (this.obj.status == 'UNACTIVE') {
						this.obj.statusTxt = '未激活'
					} else if (this.obj.status == 'DISABLE') {
						this.obj.statusTxt = '禁用'
					} else {
						this.obj.statusTxt = '-'
					}
				})
			},
			findRangeDatay() {//折线图所有数据集合
				this.$api.findRangeData({
					massifId: this.massifId
				}).then(res => {
					var chart = res.data.data
					var chartsList = chart.filter(li => {
						return li.sevenDays.data
					})
					chartsList.map(items => {
						let orderDps = items.sevenDays.data[0].orderDps
						let option = {
							//数字的图--折线图数据
							categories: [],
							series: [{
								name: '',
								data: []
							}]
						}
						orderDps.forEach(item => {
							if (item.value !== undefined && item.timestamp) {
								option.categories.push(formatDate(item.timestamp))
								option.series[0].data.push((parseFloat(item.value)).toFixed(1))
							}
						})
						items.opts = option
					})
					this.chartsList = [...chartsList]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #eee;
	}

	.flex {
		display: flex;
	}

	.workOrder {
		height: 100%;

		.top {
			position: fixed;
			background-color: #fff;
			width: 100%;
			z-index: 1;
		}
	}

	.likes-shere-box {
		width: 49%;
		text-align: center;
	}

	.box-margin {
		padding-top: 5px;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
		padding-top: 20px;
	}

	.order-title {
		line-height: 20px;
	}

	.small-text {
		color: #999999;
		font-size: 13px;
	}

	.state-box {
		position: relative;
		right: -15px;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		background: #49BA89;
		color: #fff;
	}

	.state-box-error {
		position: relative;
		padding: 3px 6px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		right: -20rpx;
		background: #FDB523;
		color: #fff;
	}

	.item-content-box {
		width: 32%;
		text-align: center;
		line-height: 18px;

		.item-num {
			font-size: 16px;
			font-weight: bold;
		}
	}

	.timeline-box {
		text {
			color: red;
		}

	}

	// 地图CSS
	.map-container {
		position: relative;
	}

	.detail-name {
		width: 75%;
		border-right: 1px solid #eee;
	}

	.small-txt {
		font-size: 12px;
	}

	.detail-img {
		width: 25%;
		text-align: center;
	}

	.detail-img image,
	.detail-name image {
		width: 30rpx;
		height: 30rpx;
	}

	.detail-box {
		padding: 20rpx;
		background: #fff;
		border-radius: 6px;
	}

	.color-grey {
		color: #999;
	}

	.font-size-16 {
		font-size: 15px;
	}

	.map-top-box {
		// position: absolute;
		// top: 10rpx;

		background: #fff;
		padding: 10rpx 20rpx;
		// left: 2%;
	}

	.map-bottom-box {
		background: #fff;
		padding: 10rpx 20rpx;
		border-bottom: 10px solid #f9f9f9;

		image {
			width: 28px;
			height: 28px;
			margin-right: 20rpx;
			position: relative;
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

		.list-item {
			background: #fff;
			border-radius: 8px;
			margin-bottom: 20rpx;
		}

		.state-box {
			position: relative;
			padding: 3px 6px;
			border-top-left-radius: 15px;
			border-bottom-left-radius: 15px;
			right: -20rpx;
			background: #49BA89;
			color: #fff;
		}

		.item-content-box {
			width: 32%;
			text-align: center;

			.item-num {
				font-size: 18px;
				font-weight: bold;
			}
		}
	}

	.farm-detail-box {
		padding: 20rpx 30rpx;
		background: #fff;
		// border-top: 440rpx solid #F5F5F5;
	}

	.map-bottom-tip {
		width: 100%;
		text-align: center;
		margin-top: 5rpx;
		color: #999;

		image {
			width: 31rpx;
			height: 27rpx;
		}

		.right-img {
			width: 36rpx;
			height: 33rpx;
		}
	}

	.map-top-item {
		width: 25%;
		text-align: center;
	}

	.play-box {
		width: 100%;
		text-align: right;
		padding: 500rpx 20rpx 10rpx 0;

		image {
			width: 88rpx;
			height: 68rpx;
		}
	}

	.like-txt {
		background: #fff;
		border: none;
		font-size: 28rpx;
		display: inline-block;
		margin: 0 !important;
		padding: 0 !important;
		margin-top: 14rpx;
	}

	button::after {
		border: none;
	}

	.likes-box {
		text-align: center;
	}

	.progress {
		width: 70%;
		height: 16px;
		background: rgba(255, 255, 255, 0.2);
		margin: 12px 15px;
		border-radius: 10px;
		text-align: center;
		color: #fff;
		border: 1px solid #49BA89;

		.progressing {
			position: relative;
			float: left;
			margin: 0 auto;
			height: 15px;
			background: #49BA89;
			border-radius: 10px;
		}
	}
</style>
