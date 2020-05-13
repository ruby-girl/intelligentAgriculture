<!-- 工单详情 -->
<template>
	<view class="work-detail">
		<view class="first">
			<view class="mb20" v-if="resultData.workOrderStatus == 2">
				<label><text class="line"></text>工单信息</label>
				<view class="content">
					<view><text class="cr3">
							工单类型
						</text> <text>批次工单</text>
						<text class="cr " style="float: right;">{{resultData.workOrderStatus === 1?"待执行" :"已执行" }}</text>
					</view>
					<view><text class="cr3">批次信息
						</text>{{resultData.plantingBatchName || '-'}}</view>
					<view><text class="cr3">
							开始时间 </text>{{resultData.scheduledtime || '-'}}</view>
					<view><text class="cr3"> 结束时间
						</text>{{resultData.creDate || '-'}}</view>
					<view><text class="cr3">
							操作类型
						</text>{{resultData.farmWorkItemName || '-'}}</view>
				</view>
			</view>
		
			<view class="mb20">

				<label><text class="line"></text>人资物料费用预算</label>
				<view class="content">
					<view class="f12">人资费用</view>

					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>人工(亩)</t-th>
							<t-th>工价<br />(元/人/田)</t-th>
							<t-th>农资费用</t-th>
							<t-th>设备费用</t-th>
						</t-tr>
						<t-tr v-for="item in table1" :key="item.id">
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.labour }}</t-td>
							<t-td>{{ item.labourCost }}</t-td>
							<t-td>{{ item.acreageCount }}</t-td>
							<t-td>{{ item.personFeeCount }}</t-td>
						</t-tr>
					</t-table>
					<view class="f12">设备费用</view>

					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>每亩费用(元)</t-th>
							<t-th>面积(亩)</t-th>
							<t-th>费用(元)</t-th>
						
						</t-tr>
						<t-tr v-for="item in table2" :key="item.id">
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.price }}</t-td>
							<t-td>{{ item.acreageCount }}</t-td>
							<t-td>{{ item.feeCount }}</t-td>
						
						</t-tr>
					</t-table>
					<view class="f12">农资费用</view>

					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>农资名称</t-th>
							<t-th>农资名称</t-th>
							<t-th>每亩用量</t-th>
							<t-th>面积(亩)</t-th>
							<t-th>费用(元)</t-th>
						</t-tr>
						<t-tr v-for="item in table3" :key="item.id">
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.supplierName }}</t-td>
							<t-td>{{ item.unitArea }}</t-td>
							<t-td>{{ item.acreageCount }}</t-td>
							<t-td>{{ item.suppliesFeeCount }}</t-td>
						</t-tr>
					</t-table>
				</view>
			</view>
	<view class="mb20">
				<label><text class="line"></text>采收方式</label>
			<view class="method-top">
				<view><b>采收</b></view>
				<view>机械采收，人工辅助</view>
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
				                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
				                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
				                   <image src="/static/timg.jpg"lazy-load="true" mode="aspectFill"></image>
				                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
				                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
				                 </scroll-view> 
			</view>
			</view>

		</view>
		<view class="second"  v-if="resultData.workOrderStatus == 2">
			<view class="mb20">
				<label><text class="line"></text>执行信息</label>
				<view class="content">
					<view><text class="cr3 mr10">
                                执行时间   
						</text> <text>批次工单</text>
						<text class="cr " style="float: right;">状态</text>
					</view>
					<view><text class="cr3 mr10">上传照片
						</text>
						<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
						                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
						                   <image src="/static/timg.jpg"lazy-load="true" mode="aspectFill"></image>
						                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
						                   <image src="/static/timg.jpg" lazy-load="true" mode="aspectFill"></image>
						                 </scroll-view> 
						</view>
					<view><text class="cr3 mr10">
							
                                备注信息  
                             </text>sdfasdfasdfasd</view>
				
					
				</view>
			</view>
			<view class="mb20">
		
				<label><text class="line"></text>执行人资物料费用</label>
				<view class="content">
					<view class="f12">人资费用</view>
		
					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>人工(亩)</t-th>
							<t-th>工价<br />(元/人/田)</t-th>
							<t-th>农资费用</t-th>
							<t-th>设备费用</t-th>
						</t-tr>
						<t-tr v-for="item in tableList" :key="item.id">
							<t-td>{{ item.id + 1 }}</t-td>
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.age }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
						</t-tr>
					</t-table>
					<view class="f12">设备费用</view>
		
					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>人工(亩)</t-th>
							<t-th>工价<br />(元/人/田)</t-th>
							<t-th>农资费用</t-th>
							<t-th>设备费用</t-th>
						</t-tr>
						<t-tr v-for="item in tableList" :key="item.id">
							<t-td>{{ item.id + 1 }}</t-td>
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.age }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
						</t-tr>
					</t-table>
					<view class="f12">农资费用</view>
		
					<t-table border-color="#E1E1E1">
						<t-tr class="bg-tr">
							<t-th>人员类型</t-th>
							<t-th>人工(亩)</t-th>
							<t-th>工价<br />(元/人/田)</t-th>
							<t-th>农资费用</t-th>
							<t-th>设备费用</t-th>
						</t-tr>
						<t-tr v-for="item in tableList" :key="item.id">
							<t-td>{{ item.id + 1 }}</t-td>
							<t-td>{{ item.name }}</t-td>
							<t-td>{{ item.age }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
							<t-td>{{ item.hobby }}</t-td>
						</t-tr>
					</t-table>
				</view>
			</view>
		
		
		</view>
		<navigator :url="'/pages/plantManage/workeMethod?id='+id">	
			<button class="cu-btn block bg-green  lg"  v-if="resultData.workOrderStatus == 1">立即执行</button>
</navigator>
		
	</view>
</template>

<script>
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
				tableList: [{
						id: 0,
						name: '张三',
						age: '19',
						hobby: '游泳'
					},
					{
						id: 1,
						name: '李四',
						age: '21',
						hobby: '绘画'
					},
					
				],
				resultData:{},
				table1:[],
				table2:[],
				table3:[],
				id:''
			};
		},
		onLoad(option) {
			this.id =  option.id;
			/* 基础信息 */
			this.initData(option.id);
			
		},
		methods:{
			initData(id){
				this.$api.getByWorkId({
					id:id
				}).then(res=>{
					this.resultData  = res.data.data
				});
				/* 人资费用 */
				this.$api.getByWorkOrderIdPerson({
					workOrderId:id
				}).then(res=>{
					this.table1 = res.data.data
				});
				/* 设备费用 */
				this.$api.getByWorkOrderIdEqu({
					workOrderId:id
				}).then(res=>{
					this.table2 = res.data.data
				});
				/* 物料信息 */
				this.$api.getByWorkOrderIdSup({
					workOrderId:id
				}).then(res=>{
					this.table3 = res.data.data
				});
			}
				
			
		}
	}
</script>

<style lang="scss">
	.work-detail {
		.cu-btn{
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
		.mb20 {
			margin-bottom: 30rpx;
		}
		.second{
			margin-top: 30rpx;
			background-color: #fff;
			padding: 30rpx;
			.mr10{
				margin-right: 30rpx;
			}
			.scroll-view_H{
				       padding: 20rpx 0;
				      height: 140rpx;
					      white-space: nowrap;
				box-sizing: content-box;
				width:calc(100vw - 60rpx);  
				    image{
					   display: inline-block;
					   width: 200rpx;
					   height: 100%;
					   margin-right: 10rpx;
					   border-radius: 3px;
					
				   }
			}
		}
		.first {
			background-color: #fff;
			padding: 30rpx;
	.method-top{
			background-color: #fff;
		
			.scroll-view_H{
				       padding: 20rpx 0;
				      height: 140rpx;
					      white-space: nowrap;
				box-sizing: content-box;
				width:calc(100vw - 60rpx);  
				    image{
					   display: inline-block;
					   width: 200rpx;
					   height: 100%;
					   margin-right: 10rpx;
					   border-radius: 3px;
					
				   }
			}
		}
			.content {
				.cr3 {
					margin-right: 30rpx;
				}

				.t-th {
					font-size: 20rpx;
					font-weight: normal;
					padding: 2px;
				}

				.bg-tr {
					background-color: #F3FBEE;
				}
				.t-table{
					margin-bottom: 30rpx;
				}
			}

			
		}

		label {

			display: block;
			font-size: 34rpx;
			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;
			font-weight: bold;

			.line {
				display: inline-block;
				width: 4px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
	}
</style>
