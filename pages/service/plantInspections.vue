<!-- 巡查工单列表 -->
<template>
	<view class="workOrder">
		<view style="position: relative;">

			<!-- <refresh ref="refresh" @isRefresh='isRefresh'></refresh> -->
		</view>
		<view class="top">
			<ms-dropdown-menu>
				<ms-dropdown-item v-model="value1" :list="timeList" :hasSlot="true" title="最近时间"></ms-dropdown-item>
				<!-- <ms-dropdown-item v-model="value2" :list="list"></ms-dropdown-item> -->
				<ms-dropdown-item v-model="value2" :list="typeList" :hasSlot="true" title="工单状态">

				</ms-dropdown-item>
				<ms-dropdown-item v-model="value3" :hasSlot="true" title="工单批次" :list="orderList">
				</ms-dropdown-item>
			</ms-dropdown-menu>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.id==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index"
					 @tap="tabSelect" :data-id="item.id">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

		</view>

		<view class="">
			<scroll-view v-bind:style="{height:(windowHeight-60)+'px'}" class="list-container" scroll-y="true" refresher-enabled="true"
			 refresher-background="#fff" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
			 @scrolltolower="loadingData">
				<view class="list-item" v-for="(item,index) in newsList" :key="index" @tap="toUrl(item.id)">
					<view>
						<view class="flex justify-content-flex-justify align-items-center">
							<view>
								<image src="/static/plant/icon_workorde@2x.png" class="imgIcon"></image>
								<text class="order-title">{{item.name}}</text>
							</view>
							<view style="color:#00AE66" v-if="item.workOrderStatus!==1">已处理</view>
							<view style="color:red" v-else @tap.stop='goAddUrl(item.id,item.plantingBatchId)'>待处理</view>
						</view>
						<view>内容：{{item.feedbackContent==null?'':item.feedbackContent}}阿达地方萨法萨法按时发斯蒂芬啊发顺丰安抚安抚安抚爱的发声发萨法萨法萨法按时</view>
						<view>批次：{{item.plantingBatchName==null?'':item.plantingBatchName}}</view>
						<view class="flex align-items-center justify-content-flex-justify">
							<view>创建人：{{item.initiatorName||''}}&nbsp;&nbsp;{{item.creDate||''}}</view>
							<view v-if="obj.organUserId==item.initiatorId&&item.workOrderStatus==1" style="color:red" @click.stop='delOrganUserWorkOrderManage(item.id)'>删除</view>
						</view>
					</view>
				</view>
				<view class="loading-more">{{contentdown}}</view>		
			</scroll-view>
		</view>

		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin:0 15px" @click="toadd">
			添加巡查工单</button>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	import refresh from '@/components/refresh/refresh.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem,
			refresh
		},
		data() {
			return {
				timeList: [{
						text: '全部',
						value: ''
					},
					{
						text: '近一周',
						value: 1
					},
					{
						text: '近一个月',
						value: 2
					},
					{
						text: '近一年',
						value: 3
					}
				],
				orderList: [],
				typeList: [{
						text: '全部',
						value: ''
					},
					{
						text: '待处理',
						value: '1'
					},
					{
						text: '已处理',
						value: '0'
					}
				],
				value1: '',
				value2: '',
				value3: '',
				tabs: [{
						id: 1,
						name: '我发起的'
					},
					{
						id: 2,
						name: '全基地的'
					},
				],
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
		watch: {
			value1(val, oldValue) {
				this.listObj.timeType = val
				this.initData()
			},
			value2(val, oldValue) {
				this.listObj.workOrderStatus = val
				this.initData()
			},
			value3(val, oldValue) {
				this.listObj.plantingBatchId = val
				this.initData()
			}
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.obj.baseId = uni.getStorageSync('baseId');
			let _this = this
			uni.getStorage({
				key: 'organUserId',
				success: function(res) {
					_this.obj.organUserId = res.data
					_this.listObj.initiatorId = res.data
					_this.$apiYZX.getWorkOrderManage(_this.obj).then(res => {
						let obj = {
							text: '全部',
							value: ''
						}
						_this.orderList.push(obj)
						res.data.data.forEach((item) => {
							let obj = {
								text: item.name,
								value: item.id
							}
							_this.orderList.push(obj)
						})
					})
					_this.getData()
				}
			})

		},
		mounted() {
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
				this.contentdown=''
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
						this.moreHeight = this.windowHeight - 40
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1) {
						this.contentdown = ''
						this.loadingType = 0
						this.moreHeight = 30
					} else if (res.data.data.rowCount == this.newsList.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
						this.moreHeight = 30
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
						this.moreHeight = 30
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if (e.currentTarget.dataset.id == 1) {
					this.listObj.initiatorId = this.obj.organUserId
				} else {
					this.listObj.initiatorId = ''
				}
				this.initData()
			},
			/* 跳转 查看详情 */
			toUrl(id) {
				uni.navigateTo({
					url: '/pages/plantManage/workDetail?id=' + id
				});
			},
			/* 跳转 添加农事 */
			goAddUrl(id, plantingBatchId) {

				uni.navigateTo({
					url: '/pages/plantManage/framManage/addFram?workOrderId=' + id + '&plantingBatchId=' + plantingBatchId
				});
			},
			toadd() {
				uni.navigateTo({
					url: '/pages/service/addPlantInspections'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.workOrder {
		background: #fff;

		.list-container {
			padding: 10rpx 30rpx;
			padding-top: 200rpx;
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

	.list-item {
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		background: #fff;
		padding: 30rpx;
		margin: 20rpx 8rpx 30rpx 8rpx;

		image {
			width: 18px;
			height: 18px;
			margin-right: 20rpx;
			position: relative;
			top: 3px;
		}
	}
.loading-more {
		text-align: center;
		color: #ddd;
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
		margin-right: 10px;

		&+text {
			color: #999;
			font-size: 12px;
		}
	}
</style>
