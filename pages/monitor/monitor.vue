<!-- 预警与监测 -->
<template>
	<view class="workOrder">
		<view class="top">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.id==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index"
					 @tap="tabSelect" :data-id="item.id">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="TabCur==1">
			<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
			 refresher-background="#fff" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
			 @scrolltolower="loadingData">
				<view class="" v-for="(item,index) in list" :key="index" @tap="toUrl(item)">
					<land-block :itemObject="item" />
				</view>
				<view class="loading-more">{{contentdown}}</view>
			</scroll-view>
		</view>
		<view v-bind:style="{height:(windowHeight-20)+'px',padding:'10px 0'}" v-else>
			<scroll-view v-bind:style="{height:(windowHeight-20)+'px'}" class="list-container" scroll-y="true">
				<view class="cu-timeline">
					<view class="cu-item text-olive" v-for="i in 5" :key="i">
						<text class="small-text">2010-11-11</text>
						<view class="flex justify-content-flex-justify align-items-center">
							<view class="timeline-box">
								<view>开心农场 NO.123123</view>
								<view><text>温度45℃</text><text>温度45℃</text></view>
							</view>
							<button class="cu-btn bg-green">查看</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	import landBlock from '@/components/landBlock.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem,
			landBlock
		},
		data() {
			return {
				orderList: [],
				tabs: [{
						id: 1,
						name: '监测信息'
					},
					{
						id: 2,
						name: '预警（8）'
					},
				],
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
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods: {
			toUrl(){//跳转监测详情
			console.log('123')
				uni.navigateTo({
					url: 'growthMonitoring'
				})
			},
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

		.list-container {
			padding: 10rpx 30rpx;
			padding-top: 100rpx;
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
</style>
