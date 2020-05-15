<!-- 农事管理 -->

<template>
	<view class="workOrder ">
		<view class="content">

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
						备注信息：</text>{{item.farmWorkRecordPicsStr}}
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

		</view>
		<navigator url="/pages/plantManage/framManage/addFram">
		
    
		   <button class="cu-btn block bg-green  lg">添加农事记录</button>
		   
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

				isMoreArr: [],
				listData:[],
				params:{
					executionUserId :uni.getStorageSync('organUserId'),
					pageNo:1
				}

			};
		},
		created() {

	this.initData()
		},
		
		methods: {
			initData(){
				this.$api.getFarmWorkList(this.params).then(res=>{
					this.listData =  res.data.data.data
					
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
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
	.content {
		padding: 30rpx;
		background-color: #ffffff;
		overflow-y: auto;
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
			
			line-height: 30rpx;
			padding-top: 30rpx;
			padding-bottom: 60rpx;
			margin-bottom: 30rpx;
			height: 160px;
			overflow: hidden;
			transition: height .3s;
			position: relative;
			border-bottom: 1px solid #D8D8D8;

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
		
	}
</style>
