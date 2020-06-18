<!-- 设备列表-->
<template>
	<view class="workOrder">
		<view v-if="isLogin">
			<view class="top equipmentManagement-title flex  align-items-center justify-content-flex-justify">
				<view style="font-size: 16px;font-weight: bold;" class="flex  align-items-center">
					<image style="height:24px" src="../../static/imgs/equipmentManagement.png" mode=""></image>
					<text>在线设备3/5</text>
				</view>
				<view class="equipmentManagement-btn" @click="toAdd">
					<image src="../../static/imgs/add.png" mode=""></image>
					<text>添加</text>
				</view>
			</view>
				<scroll-view v-bind:style="{height:windowHeight+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
				 refresher-background="#fff" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
				 @scrolltolower="loadingData">
					<view class="list-item" :style="{'margin-top':index==0?true:false}" v-for="(item,index) in newsList" :key="index" @tap="toDetail(item.deviceId)">
						<view class="">
							<view class="flex align-items-center justify-content-flex-justify">
								<view class="">
									<text>SN:{{item.sn||''}}</text>
									<text>{{item.deviceName||''}}</text>
								</view>
								<view>
									<image v-if="item.statusTxt=='在线'" class="line-img" src="../../static/imgs/online.png" mode="aspectFill"></image>
									<image v-else class="line-img" src="../../static/imgs/offline.png" mode="aspectFill"></image>
									<text :style="{'color':item.statusTxt=='在线'?'#49BA89':'#E50C05'}">{{item.statusTxt||''}}</text>
									<image class="jt-img" src="../../static/imgs/arrows.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
						<view class="item-bottom-box">
							<view class="flex align-items-center justify-content-flex-justify">
								<view class="item-bottom-box-left" style="border-right:1px solid #eee;">
									<view  class="flex align-items-center justify-content-flex-justify">
										<view>版本信息</view>
										<view>{{item.firmwareVersion}}</view>
									</view>
									<text>已是最新版本</text>
								</view>
								<!-- 报红 -->
								<view style="padding-left:20rpx;color:red" class="flex align-items-center justify-content-flex-justify item-bottom-box-left">
									<view>
										<view>设备状态</view>
										<view>未定位</view>
									</view>
									<view>
										<view>故障码</view>
										<view>XXX</view>
									</view>
								</view>
							</view>
						</view>
						
					</view>
					<view class="loading-more">{{contentdown}}</view>
				</scroll-view>
		</view>
		<view v-else>
			<not-login />
		</view>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	import notLogin from "@/components/notLogin/notLogin.vue"
	export default {
		components: {
			notLogin
		},
		data() {
			return {
				orderList: [],
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
				_freshing: false,
				isLogin:false
			};
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.isLogin=getApp().globalData.isLogin
			if(this.isLogin){
				this.initData()
			}	
		},
		onShow() {
			if(!this.isLogin){//每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
				this.isLogin=getApp().globalData.isLogin
				if(this.isLogin){
					this.initData()
				}
			}
		},
		mounted() {
			this.loadingData = throttle(this.loadingData, 2000);
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
			toAdd(){//添加设备页面		
				uni.navigateTo({
					url: 'addEquipment'
				})
			},
			toDetail(id){//跳转详情
				uni.navigateTo({
					url: 'detailEquipment?deviceId='+id
				})
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
				let obj = {
					pageNum: this.page,
					pageSize: 10
				}
				this.$api.findByDevice(obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.devices)
					this.newsList.forEach((item,i)=>{
						if(this.newsList[i].status=='ONLINE'){
							this.newsList[i].statusTxt='在线'
						}else if(this.newsList[i].status=='OFFLINE'){
							this.newsList[i].statusTxt='离线'
						}else if(this.newsList[i].status=='UNACTIVE'){
							this.newsList[i].statusTxt='未激活'
						}else if(this.newsList[i].status=='DISABLE'){
							this.newsList[i].statusTxt='禁用'
						}
					})
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
			padding-top: 80rpx;
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
	.box-margin{
		padding-top:10px;
	}
	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 20rpx 0 20px 10px;
		margin: 20rpx 8rpx 30rpx 8rpx;

		image {
			width: 28px;
			height: 28px;
			margin-right: 20rpx;
			position: relative;
			top: 3px;
		}
	}

	.loading-more {
		text-align: center;
		color: #ddd;
		padding-bottom: 50rpx;
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
	.equipmentManagement-title{
		padding:15rpx 30rpx;
		background: #eee;
		image{
			width: 24px;
			margin-right: 5px;
		}
		.equipmentManagement-btn{
			background: #17BB89;
			padding: 3px 8px;
			border-radius: 17px;
			color:#fff;
			image{
				width:10px;
				height:10px;
				margin-right:3px;
			}
		}
	}
	.line-img{
		width:20px !important;
		height:20px !important;
	}
	.jt-img{
		width: 8px !important;
		height: 16px !important;
		margin-left:5px;
	}
	.item-bottom-box{
		border-top:1px solid #eee;
		padding-top:20rpx;
		margin-right:20rpx;
	}
	.item-bottom-box-left{
		width:50%;
		padding:20rpx 20rpx 20rpx 0;
	}
</style>
