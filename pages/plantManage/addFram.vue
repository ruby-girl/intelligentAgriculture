<!-- 添加农事 -->
<template>
	<view class="add-fram">
		<view class="section">
			<label><text class="line"></text>基础信息</label>
			<view class="cu-form-group margin-top">
				<view class="title">
                                种植批次 
                            </view>
				<picker @change="PickerChange"  :value="ttt" :range="picker">
					<view class="picker">
	  
					{{ttt>-1?picker[ttt]:'请选择'}}
					
					</view>
				</picker>
			</view>
				<view class="cu-form-group margin-top">
				<view class="title">
                                操作类型 
                            </view>
				<picker @change="PickerChange"  :value="ttt" :range="picker">
					<view class="picker">
	  
					{{ttt>-1?picker[ttt]:'请选择'}}
					
					</view>
				</picker>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ttt:-1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
			};
		},
		methods:{
		PickerChange(e) {
			this.ttt = e.detail.value
		},
		}
	}
</script>

<style lang="scss">
     .add-fram{
		 .section{
			 background-color: #fff;
			 padding: 30rpx;
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
