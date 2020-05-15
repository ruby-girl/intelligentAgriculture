<!-- 待处理 -->
<template>
	<view class="workOrder">
		<view class="top">
			<!-- <view class="flex select-model">
				<view class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					            :initValue="'苹果'"
								:style_Container="'height: 30px; font-size: 12px;border:0'"
					        >
					        </xfl-select>
				</view>
				<view  class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					      :style_Container="'height: 30px; font-size: 12px;border:0'"
					      
					            :initValue="'苹果'"
					        >
					        </xfl-select>
				</view>
				
				<view  class="sel">
					<xfl-select
					            :list="list"
					            :clearable="false"
					            :showItemNum="5" 
					      :style_Container="'height: 30px; font-size: 12px;border:0'"
					      
					            :initValue="'苹果'"
					        >
					        </xfl-select>
				</view>
				
					
				
				<view class="sel">
				  <text class="f12">筛选{{baseId}}</text><image src="../../static/plant/icon_screen@2x.png" class="img"></image>
				
				</view>
			</view> -->
			<ms-dropdown-menu>
				<ms-dropdown-item v-model="value1" :list="timeList" :hasSlot="true" title="最近时间"></ms-dropdown-item>
				<!-- <ms-dropdown-item v-model="value2" :list="list"></ms-dropdown-item> -->
				<ms-dropdown-item v-model="value2" :list="typeList" :hasSlot="true" title="工单类型">

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

		<scroll-view v-bind:style="{height:(windowHeight-10)+'px'}" class="list-container" scroll-y="true"
		 :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper" @scrolltolower="loadingData">
			<view class="list-item" v-for="item in newsList" :key="item" @tap="toUrl(item.id)">
				<view v-if="item.workOrderType==1">				
					<view class="flex justify-content-flex-justify align-items-center">
						<view>
							<image src="/static/plant/icon_weeding@2x.png" class="imgIcon"></image>						
							<text class="order-title">{{item.farmWorkItemName}}</text>
							<text>来自工单</text>
						</view>
						<view style="color:red" v-if="item.workOrderStatus!==1">{{getworkOrderStatus(item.workOrderStatus)}}</view>
						<view style="color:#00AE66" v-else @tap.stop='goAddUrl(item.id,item.plantingBatchId)'>执行</view>
					</view>
					<view class="flex align-items-center">				
						<view>开始时间：{{item.scheduledStartTime}}</view>
					</view>
					<view class="flex align-items-center">				
						<view>结束时间：{{item.scheduledEndTime}}</view>
					</view>
					<view class="flex align-items-center">				
						<view>作物：{{item.breedName}}</view>
					</view>
					<view class="flex align-items-center">				
						<view>地块：<text v-for="li in item.landParcels">{{li.name}}</text></view>
					</view>
					<view class="flex align-items-center">				
						<view>种植方案：{{item.plantingPlanName}}</view>
					</view>
				</view>
				<view v-else>
					<view class="flex justify-content-flex-justify align-items-center">
						<view>
							<image src="/static/plant/icon_workorde@2x.png" class="imgIcon"></image>
							<text class="order-title">{{item.farmWorkItemName}}</text>
							<text>来自巡查 {{item.executiontime==null?'':item.executiontime}}</text>
						</view>
						<view style="color:red" v-if="item.workOrderStatus!==1">{{getworkOrderStatus(item.workOrderStatus)}}</view>
						<view style="color:#00AE66" v-else @tap.stop='goAddUrl(item.id,item.plantingBatchId)'>执行</view>
					</view>
					<view>{{item.feedbackContent==null?'':item.feedbackContent}}</view>
					<view class="flex align-items-center">				
						<view>发起人：{{item.initiatorName}}</view>
					</view>
					<view class="flex align-items-center">				
						<view>地块：<text v-for="li in item.landParcels">{{li.name}}</text></view>
					</view>
					<view class="flex align-items-center">				
						<view>种植方案：{{item.plantingPlanName}}</view>
					</view>
				</view>
			</view>
			<view class="loading-more">{{contentdown}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				timeList: [{
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
					},
					{
						text: '全部',
						value: 0
					}
				],
				orderList: [],
				typeList: [{
						text: '批次工单',
						value: 1
					},
					{
						text: '巡查工单',
						value: 2
					},
					{
						text: '全部',
						value: 0
					}
				],
				value1: '',
				value2: '',
				value3: '',
				tabs: [{
						id: '',
						name: '全部'
					},
					{
						id: 3,
						name: '未开始'
					},
					{
						id: 1,
						name: '待处理'
					},
					{
						id: 2,
						name: '已结束'
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
					workOrderStatus: 1, //工单状态
					workOrderType: '' //工单类型
				},
				page: 1,
				windowHeight: 300,
				contentdown: '',
				newsList: [],
				loadingType: 0,
				triggered: false,
			};
		},
		watch:{
			value1(val,oldValue){
				this.listObj.timeType=val
				this.getData()
			},
			value2(val,oldValue){
				this.listObj.workOrderType=val
				this.getData()
			},
			value3(val,oldValue){
				this.listObj.plantingBatchId=val
				this.getData()
			}
		},
		onLoad(option) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
			this.TabCur = option.type
			this.obj.baseId = option.baseId
			// 获取下拉数据--工单批次
			let _this = this
			uni.getStorage({
				key: 'organUserId',
				success: function(res) {
					_this.obj.organUserId = res.data
					_this.$apiYZX.getWorkOrderManage(_this.obj).then(res => {
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
			getworkOrderStatus(state){
				if(state==3){
					return '未开始'
				}else if(state==1){
					return '执行'
				}else{
					return '已结束'
				}
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
				this.$apiYZX.getWorkOrderManageList(this.page, obj).then(res => {
					this.newsList = this.newsList.concat(res.data.data.data)
					if (this.page == 1 && this.newsList.length == 0) {
						this.loadingType = 0
						this.contentdown = '暂无数据'
					} else if (res.data.data.rowCount == this.newsList.length && this.page == 1) {
						this.contentdown = ''
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
				this.listObj.workOrderStatus=e.currentTarget.dataset.id;
				this.page=1
				this.loadingType=1
				this.newsList=[]
				this.getData()
			},
			/* 跳转 查看详情 */
			toUrl(id) {
				uni.navigateTo({
					url: '/pages/plantManage/workDetail?id=' + id
				});
			},
			/* 跳转 添加农事 */
			goAddUrl(id,plantingBatchId) {
				uni.navigateTo({
					url: '/pages/plantManage/framManage/addFram?workOrderId=' + id +'&plantingBatchId='+plantingBatchId
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
			top:3px;
		}
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
	.order-title{
		margin-right: 10px;
		&+text{
			color:#999;
			font-size: 12px;
		}
	}
	.loading-more {
		text-align: center;
		color: #ddd;
	}
</style>
