<!-- 待处理 -->
<template>
	<view class="workOrder ">
		<view class="top" id="mjltest">
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
				<ms-dropdown-item v-model="value3" :hasSlot="true" title="工单批次" ref="dropdownItem">
					<view class="dropdown-item-content">
						<view>=====此为测试内容=====</view>
					
					</view>
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

		<view class="content" :style="{top:topHeight}">

			<view class="item" v-for="(item,index) in listData" :key="index" @tap="toUrl(item.id)">

				<!-- 跟距狀態不一樣 字段不同-->
				<view class="flex">
					<view>
						<image src="/static/plant/icon_fertilization@2x.png" class="imgIcon"></image>
						<text>{{item.farmWorkItemName}}</text><text class="f10 cr3">来自:工单</text>
					</view>
					<view @tap.stop='goAddUrl(item.id)'><text class="cr">执行</text></view>
				</view>
				<view>
					<text class="cr3">开始时间：</text>{{item.scheduledtime}}
				</view>
				<view>
					<text class="cr3">结束时间：</text>{{item.scheduledtime}}
				</view>
				<view>
					<text class="cr3">作物：</text>{{item.scheduledtime}}
				</view>
				<view>
					<text class="cr3">地块：</text>
				</view>
				<view>
					<text class="cr3">种植方案：</text>
				</view>
			</view>

		</view>
		<!-- <uni-popup ref="popup" type="top" class="ttt">
			<view class="popup-content">
			    <view>111</view>
			    <view>111</view>
			</view>
		 </uni-popup> -->

	</view>
</template>

<script>
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
				typeList:[
					{
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
				value1: 0,
				value2: 1,
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
				topHeight: '',
				listData: [],
				baseId: ''
			};
		},
		onLoad(option) {
			this.TabCur = option.type
			this.baseId = option.baseId
			// 获取下拉数据--工单批次
			this.$apiYZX.getWorkOrderManage().then(res=>{
				
			})
		},
		onReady() {
			let me = this
			//创建节点选择器
			var query = wx.createSelectorQuery();
			//选择id
			query.select('#mjltest').boundingClientRect()
			query.exec(function(res) {
				//res就是 所有标签为mjltest的元素的信息 的数组
				me.topHeight = res[0].height + 'px'

			})

			this.initData()
		},

		methods: {
			initData() {

				this.$api.gerWorkOrders({
					plantingBatchCode: '',
					pageNo: 1,
					baseId: this.baseId,
					workOrderStatus: this.TabCur,

				}).then(res => {
					this.listData = res.data.data.data
				})

			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.initData()
			},
			/* 跳转 查看详情 */
			toUrl(id) {
				uni.navigateTo({
					url: '/pages/plantManage/workDetail?id=' + id
				});
			},
			/* 跳转 添加农事 */
			goAddUrl(id) {
				uni.navigateTo({
					url: '/pages/plantManage/addFram??id=' + id
				});
			},
			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	.flex {
		display: flex;
		justify-content: space-between;
	}

	.workOrder {
		.top {
			position: fixed;
			background-color: #fff;
			width: 100%;
			z-index: 1;

		}
	}

	// .select-model{
	//  height: 60rpx;
	//  line-height: 60rpx;
	//  .img{
	//  	  width: 46rpx;
	//  	  height: 46rpx;
	//   vertical-align: middle;
	//  }
	//  .sel{
	//   text-align: center;
	//   width: 100%;
	//  	    margin-left: 30rpx;
	//  	  /deep/ .list-container{
	//  		  width: 100%!important;
	//  	  }
	//  }
	// }
	.content {
		padding: 30rpx;
		overflow-y: auto;
		position: relative;

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

	//  .ttt{

	//   /deep/ .uni-transition{
	// top: var(--window-top)!important;
	//   }
	//   .uni-popup__wrapper-box{
	// 	  top:50px
	//   }
	//  }
	//  .popup-content {

	//  	background-color: #fff;
	//  	padding: 15px;
	//  	font-size: 14px;
	//  }
</style>
