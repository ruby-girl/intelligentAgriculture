<template>
	<!-- 批次管理列表 -->
	<view class="container">
		<scroll-view class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.value===TabCur?'text-orange cur':''" v-for="(item,index) in tab" :key="index"
				 @tap="tabSelect" :data-id="item.value">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

		<scroll-view v-bind:style="{height:(windowHeight-135)+'px'}" class="scroll-container"
		scroll-y="true" refresher-enabled="true"
		 refresher-background="#fff" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
		 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
		 @scrolltolower="loadingData">
			<view class="list-item" v-for="item in newsList" :key="item">
				<view class="flex align-items-center">
					<img src="@/static/plant/icon_plant@2x.png" alt="">
					<view>作物：{{item.breedName}}</view>
				</view>
				<view class="flex align-items-center">
					<img src="@/static/plant/icon_plan@2x.png" alt="">
					<view>种植计划：{{item.plantingPlanName}}</view>
				</view>
				<view class="flex align-items-center">
					<img src="@/static/plant/icon_date@2x.png" alt="">
					<view>种植年份：{{item.plantingTime||''}}</view>
				</view>
				<view class="flex align-items-center">
					<img src="@/static/plant/icon_land@2x.png" alt="">
					<view>地块数量：{{item.landParcelCount}}</view>
				</view>
				<view class="flex align-items-center">
					<img src="@/static/plant/icon_area@2x.png" alt="">
					<view>地块面积：{{item.acreages}}亩</view>
				</view>
			</view>
			<view class="loading-more">{{contentdown}}</view>
		</scroll-view>

		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" @click="toadd">
			新建批次</button>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	var _self,
		page = 1,
		timer = null;
	export default {
		data() {
			return {
				TabCur: '2',
				scrollLeft: 0,
				tab: [{
					name: '进行中',
					value: '2'
				}, {
					name: '已结束',
					value: '0'
				}, {
					name: '全部',
					value: ''
				}],

				contentdown: '',
				page: 1,
				newsList: [],
				loadingType: 0,
				triggered: false,
				lastTime: 0,
				windowHeight: 300,
				obj:{
					baseId: '',
					organUserId:'',
					plantingBatchStatus:2
				},
				triggered: false,
				_freshing: false
			}
		},
		onLoad: function() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			//页面一加载时请求一次数据
		},
		mounted() {
			let _this = this;
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId = res.data	
				}
			});
			uni.getStorage({
				key: 'organUserId',
				success: function(res) {			
					_this.obj.organUserId = res.data
					_this.getData()
				}
			});
			this.loadingData = throttle(this.loadingData, 2000);
		},
		methods: {
			onPulling() {},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered){//界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true;
				}
				let _this=this
				setTimeout(() => {
					this.triggered = false; //触发onRestore，并关闭刷新图标
					this._freshing = false;
					_this.page=1
					_this.loadingType=1
					_this.newsList=[]
					_this.contentdown=''
					_this.getData()		
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
				this.$apiYZX.plantingBatchsPage(this.page,this.obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.data)
					if(this.page==1&&this.newsList.length==0){
						this.loadingType = 0
						this.contentdown = '暂无数据'
					}else if(res.data.data.rowCount == this.newsList.length&&this.page==1&&this.newsList.length<3){
						this.contentdown = ''
						this.loadingType = 0
					}else if(res.data.data.rowCount == this.newsList.length&&this.page==1&&this.newsList.length>2){
						this.contentdown = '无更多数据'
						this.loadingType = 0
					}
					else if (res.data.data.rowCount == this.newsList.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
				})
			},
			toadd() {
				uni.redirectTo({
					url: 'addBatch'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.obj.plantingBatchStatus=e.currentTarget.dataset.id;
				this.page=1
				this.loadingType=1
				this.contentdown=''
				this.newsList=[]
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container,
	page {
		height: 100vh;
		background: #fff !important;

		.list-container {
			padding: 10rpx 30rpx;
		}

		.positon-btn {
			position: fixed;
			bottom: 20rpx;
			z-index: 111;
			width: 93%;
			left: 25rpx;
		}
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
	}

	.scroll-container {
		padding: 0 20rpx;
	}

	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 30rpx;
		margin:20rpx 8rpx 30rpx 8rpx;
		img {
			width: 18px;
			height: 18px;
			margin-right: 20rpx;
		}
	}
</style>
