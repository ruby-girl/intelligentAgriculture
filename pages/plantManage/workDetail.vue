<!-- 工单详情 -->
<template>
	<view class="work-detail">
		<view class="first">
			<view class="mb20">
				<label><text class="line"></text>工单信息</label>
				<view class="content">
					<view><text class="cr3">
							工单类型
						</text> <text>批次工单</text>
						<text class="cr " style="float: right;">状态</text>
					</view>
					<view><text class="cr3">批次信息
						</text>批次工单</view>
					<view><text class="cr3">
							开始时间 </text>批次工单</view>
					<view><text class="cr3"> 结束时间
						</text>批次工单</view>
					<view><text class="cr3">
							操作类型
						</text>批次工单</view>
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
		<view class="second">
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
		<button class="cu-btn block bg-green  lg">立即执行</button>
		
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
					
				]
			};
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
