<!-- 生长监测 -->
<template>
	<view class="workOrder">
		<view>
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true">
				<view class="map-container">
				
					<video style="width:100%;height:600rpx;"  id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
					          enable-danmu danmu-btn controls></video>
					<view class="map-top-box flex align-items-center justify-content-flex-justify">
						<view class="detail-name">
							<view><text style="font-weight: bold;font-size: 16px;">开心农场</text></view>
							<view class="detail-small-txt"><image style="width: 17px;height: 20px;" src="../../static/imgs/location-2.png" mode="aspectFill"></image>农场地址阿达收到</view>
						</view>
						<view class="detail-img">
							<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
							<view>
								编辑
							</view>
						</view>
					</view>
					<view class="map-bottom-box">
						<view class="list-item">
							<view class="flex  align-items-center justify-content-flex-justify">
								<view class="flex  align-items-center">
									<image class="land-img" src="../../static/imgs/location.png" mode=""></image>
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
						   <view class="flex">
							   <view class="map-bottom-tip">
								   <image src="../../static/imgs/deit.png" mode="aspectFill"></image>
								   <text>20人点赞</text>
							   </view>
							   <view class="map-bottom-tip">
							   	  <image src="../../static/imgs/deit.png" mode="aspectFill"></image>
							   	  <text>20人点赞</text>		   
							   </view>
						   </view>
						</view>
					</view>
				</view>
				<view class="farm-detail-box">
					<view><text style="font-size: 16px;">数据监测</text></view>
					<view class="">
						<line-chart ref="line" :opts="option" chartType="line" option/>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/u-charts/u-charts/component.vue';
	export default {
		components: {		
			LineChart		
		},
		data() {
			return {
				option:{
					
						//数字的图--折线图数据
						categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
						series: [
							{ name: '成交量A', data: [35, 8, 25, 37, 4, 20]}
						]
					
				},
				orderList: [],
				list: [{
					name: 'asdasd'
				}, {
					name: 'asdasd'
				}, {
					name: 'asdasd'
				}],
				TabCur: 1,
				newsList: [],
				baseId: '',
				obj: {
					baseId: '',
					organUserId: '',
					plantingBatchStatus: '' //批次状态
				},
				listObj: {
					plantingBatchId: '', //批次ID
					timeType: '', //时间
					workOrderStatus: '', //工单状态
					initiatorId: '' //发起人
				},
				page: 1,
				moreHeight: 30,
				windowHeight: 300,
				contentdown: '',
				newsList: [],
				loadingType: 0,
				triggered: false,
				_freshing: false
			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			// this.getData()
		},
		mounted() {
		},
		methods: {
			onPulling() {},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) { //界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true;
				}
				let _this = this
				setTimeout(() => {
					this.triggered = false; //触发onRestore，并关闭刷新图标
					this._freshing = false;
					_this.initData()
				}, 1000)
			},
			onRestore() {
				this.triggered = false; // 需要重置
				this._freshing = false
			},
			onAbort() {
				this.triggered = false; //触发onRestore，并关闭刷新图标
				this._freshing = false;
			},
			initData() {
				this.newsList = []
				this.page = 1
				this.loadingType = 1
				this.contentdown = ''
				this.getData()
			},

			delOrganUserWorkOrderManage(id) { //删除
				let _this = this
				this.$apiYZX.delOrganUserWorkOrderManage(id).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '删除成功',
							duration: 2000,
							success() {
								_this.initData()
							}
						});
					}
				})
			},
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
				this.lastTime = e.timeStamp
				if (this.loadingType) {
					this.page++
					this.contentdown = '加载中...'
					this.getData()
				}
			},
			getData() {
				let obj = { ...this.listObj,
					...this.obj
				}
				this.$apiYZX.getFeedBackWorkOrdersList(this.page, obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.data)
					if (this.page == 1 && this.newsList.length == 0) {
						this.loadingType = 0
						this.contentdown = '暂无数据'
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length < 3) {
						this.contentdown = ''
						this.loadingType = 0
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1 && this.newsList.length > 2) {
						this.contentdown = '无更多数据'
						this.loadingType = 0
					} else if (res.data.data.rowCount == this.newsList.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				// if (e.currentTarget.dataset.id == 1) {
				// 	this.listObj.initiatorId = this.obj.organUserId
				// } else {
				// 	this.listObj.initiatorId = ''
				// }
				// this.initData()
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

	.box-margin {
		padding-top: 10px;
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
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

	.item-content-box {
		width: 30%;
		text-align: center;

		.item-num {
			font-size: 18px;
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
	.detail-name{
		width:75%;
		border-right:1px solid #eee;
	}
	.detail-small-txt{
		color:#999;
		font-size: 13px;
	}
	.detail-img{
		width:25%;
		text-align: center;
	}
	.detail-img image,.detail-name image{
		width:30rpx;
		height:30rpx;
	}
	.detail-box{
		padding:20rpx;
		background: #fff;
		border-radius: 6px;
	}
	.color-grey{
		color:#999;
	}
	.font-size-16{
		font-size: 15px;
	}
    .map-top-box{
		position: absolute;
		top:10rpx;
		width:96%;
		background: #fff;
		padding:10rpx 20rpx;
		left:2%;
		border-radius: 4px;
	}
	 .map-bottom-box{
		position: absolute;
		bottom:-300rpx;
		left:2%;
		width:96%;
		background: #fff;
		padding:10rpx 20rpx;
		border-radius: 4px;
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
	}
	.farm-detail-box{
		padding: 20rpx 30rpx;
		background: #fff;
		border-top: 360rpx solid #eee;
	}
	.map-bottom-tip{
		width:50%;
		text-align: center;
		margin-top:5rpx;
		color:#999;
		image{
			width:30rpx;
			height:30rpx;
		}
	}
	
</style>
