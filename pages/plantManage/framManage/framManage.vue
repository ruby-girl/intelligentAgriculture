<!-- 农事管理 -->

<template>
	<view class="workOrder ">
		<scroll-view v-bind:style="{height:(windowHeight-10)+'px'}" class="content" scroll-y="true"
		 refresher-enabled="true"
		  @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
		  @refresherabort="onAbort" :refresher-triggered="triggered" :refresher-threshold="100" @scrolltoupper="scrolltoupper"
		  @scrolltolower="loadingData">
		
	
			<view class="item" v-for="(item,index) in listData" :key="index" :class="{'showModel':isMoreArr.indexOf(item)>=0}">
				<view>
					<image src="/static/plant/icon_fertilization@2x.png" class="imgIcon"></image>
					<text>{{item.farmWorkItemName}}</text>
				</view>

				<view class="textHidden">
					<text class="cr3 ">
						批次信息：</text>{{item.plantingBatchName}}
				</view>
				<view class="textHidden">
					<text class="cr3 ">执行时间：</text>{{item.executiontime}}
				</view>
				<view class="textHidden">
					<text class="cr3 ">上传图片：</text>
				</view>
				<view class="textHidden">
					<text class="cr3 ">
						备注信息：</text>{{item.remark}}
				</view>
				<view class="content-table">
					<view class="f13" v-if="item.personResources.length>0">人资费用</view>
							
					<t-table border-color="#E1E1E1" v-if="item.personResources.length>0">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>人工(亩)</t-th>
							<t-th>工价<br />(元/人/田)</t-th>
							<t-th>农资费用</t-th>
							<t-th>设备费用</t-th>
						</t-tr>
						<t-tr v-for="(sub,i) in item.personResources" :key="i">
							<t-td>{{ sub.name }}</t-td>
							<t-td>{{ sub.labour }}</t-td>
							<t-td>{{ sub.labourCost }}</t-td>
							<t-td>{{ sub.acreageCount }}</t-td>
							<t-td>{{ sub.personFeeCount }}</t-td>
						</t-tr>
					</t-table>
					<view class="f13" v-if="item.equipmentResources.length>0">设备费用</view>
					<t-table border-color="#E1E1E1" v-if="item.equipmentResources.length>0">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>每亩费用(元)</t-th>
							<t-th>面积(亩)</t-th>
							<t-th>费用(元)</t-th>
							
						</t-tr>
						<t-tr v-for="(sub,i)  in item.equipmentResources" :key="i">
							<t-td>{{ sub.name }}</t-td>
							<t-td>{{ sub.price }}</t-td>
							<t-td>{{ sub.acreageCount }}</t-td>
							<t-td>{{ sub.feeCount }}</t-td>
							
						</t-tr>
					</t-table>
					<view class="f13" v-if="item.suppliesResources.length>0">农资费用</view>
							
					<t-table border-color="#E1E1E1" v-if="item.suppliesResources.length>0">
						<t-tr class="bg-tr">
							<t-th>农资名称</t-th>
							<t-th>农资名称</t-th>
							<t-th>每亩用量</t-th>
							<t-th>面积(亩)</t-th>
							<t-th>费用(元)</t-th>
						</t-tr>
						<t-tr v-for="(sub,i)  in item.suppliesResources" :key="i">
							<t-td>{{ sub.name }}</t-td>
							<t-td>{{ sub.supplierName }}</t-td>
							<t-td>{{ sub.unitArea }}</t-td>
							<t-td>{{ sub.acreageCount }}</t-td>
							<t-td>{{ sub.suppliesFeeCount }}</t-td>
						</t-tr>
					</t-table>
				</view>

				<text @click="handleCard(item)" class="handle-text">

					{{isMoreArr.indexOf(item)>=0?'收起':'展开'}}

				</text>
			</view>
	

		
			<view class="loading-more">{{contentdown}}</view>
		</scroll-view>
		<navigator url="/pages/plantManage/framManage/addFram">
		
    
		   <button class="cu-btn block bg-green  lg">添加农事记录</button>
		   
	   </navigator>

	</view>
</template>

<script>
	import {
		throttle
	} from "@/utils/index.js"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {

				isMoreArr: [],
				listData:[],
				params:{
					executionUserId :uni.getStorageSync('organUserId'),
					pageNo:1
				},
				windowHeight: 0,
				contentdown: '',
				loadingType: 0,
				triggered: false,
				_freshing: false

			};
		},
		onLoad: function() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight // 屏幕的高度
				this.initData()
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
					_this.params.pageNo=1
					_this.loadingType=1
					_this.listData=[]
					_this.contentdown=''
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
			scrolltoupper() {
				console.info('下拉')
			},
			loadingData(e) {
		
				if (this.loadingType) {
					this.params.pageNo++
					this.contentdown = '加载中...'
					this.initData()
				}
			},
			initData(){
				this.$api.getFarmWorkList(this.params).then(res=>{
		
					this.listData = this.listData.concat(res.data.data.data)
					if(this.params.pageNo==1&&this.listData.length==0){
						this.loadingType = 0
						this.contentdown = '暂无数据'
					}else if(res.data.data.rowCount == this.listData.length&&this.params.pageNo==1&&this.listData.length<3){
						this.contentdown = ''
						this.loadingType = 0
					}else if(res.data.data.rowCount == this.listData.length&&this.params.pageNo==1&&this.listData.length>2){
						this.contentdown = '无更多数据'
						this.loadingType = 0
					}
					else if (res.data.data.rowCount == this.listData.length) {
						this.loadingType = 0
						this.contentdown = '无更多数据'
					} else {
						this.contentdown = '上拉加载更多'
						this.loadingType = 1
					}
					
				})
			},
			handleCard(item, key) {

				if (this.isMoreArr.indexOf(item) >= 0) {
					this.isMoreArr = this.isMoreArr.filter(t => t != item)
				} else {
					this.isMoreArr.push(item)
				}

			},
		}
	}
</script>

<style lang="scss"  scoped>
	.flex {
		display: flex;
		justify-content: space-between;
	}

.cu-btn{
			width: 90%;
			margin: 0 auto;
			margin-top: 40rpx;
		
		}
	.content {
		
	
		height: calc(100vh - 150rpx);
		position: relative;
	
       .content-table{
		   .cr3 {
		   	margin-right: 30rpx;
		   }
		   
		   /deep/ .t-th {
		   	font-size: 20rpx;
		   	font-weight: normal;
		   	padding: 2px;
			
		   }
		   
		   .bg-tr {
		   	background-color: #F3FBEE;
		   }
		   
		   /deep/ .t-table {
		   	margin-bottom: 30rpx;
			color: #E1E1E1;
		   }
	   }
				
			
		.item {
				background-color: #ffffff;
			line-height: 30rpx;
		
			margin-bottom: 30rpx;
			height: 160px;
			overflow: hidden;
			transition: height .3s;
			position: relative;
		    padding: 30rpx 30rpx 60rpx;


			.flex {
				margin-bottom: 20rpx;
			}

			.textHidden {
				width: 88%;
				display: inline-block;
			}
		}

		.showModel {
			height:auto;





		}

		.handle-text {
			position: absolute;
			bottom: 20rpx;
			right: 30rpx;
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10px;
		}
		.loading-more {
			text-align: center;
			color: #ddd;
		}
		
	}
</style>
