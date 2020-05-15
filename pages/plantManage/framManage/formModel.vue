<template>
	<view class="add-fram">
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">人工（0）数组 </text></label>
				<view class="display-flex">
					<view style="color: red;margin-right: 8px;">
						<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
					</view>
					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon" @click="personAdd"></image> 添加
					</view>
				</view>
			</view> 
			<view v-for="(item,index) in personList" :key='index'class="item-border">
				
		
			<view class="cu-form-group ">
				<view class="title"> 人员类型 </view>
				<input placeholder="请输入" @input="changeInput($event,'name')" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">
					人工（亩）
				</view>
				<input placeholder="请输入" @input="changeInput($event,'labour')" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					工价（元）

				</view>
				<input placeholder="请输入" @input="changeInput($event,'labourCost')" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					面积（亩）

				</view>
				<input placeholder="请输入" @input="changeInput($event,'acreageCount')" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					费用合计

				</view>
				<input placeholder="请输入" @input="changeInput($event,'personFeeCount')" name="input"></input>
			</view>
			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">农资（0）数组 </text></label>
				<view class="display-flex">
					<view style="color: red;margin-right: 8px;">
						<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
					</view>
					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon"></image> 添加
					</view>
				</view>
			</view>

			<view class="cu-form-group ">
				<view class="title">
					资料名称
				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">

						{{ttt>-1?picker[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					生产厂家

				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">

						{{ttt>-1?picker[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					每亩用量

				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">


					单价（元）


				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">


					面积（亩）


				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">



					费用



				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">设备（0）数组 </text></label>
				<view class="display-flex">
					<view style="color: red;margin-right: 8px;">
						<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
					</view>
					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon"></image> 添加
					</view>
				</view>
			</view>

			<view class="cu-form-group ">
				<view class="title">
					设备名称
				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">

						{{ttt>-1?picker[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">
					每亩收费（元）
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">
					面积（亩）
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">
					费用
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
		</view>
		<button class="cu-btn block bg-green  lg">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personList: [{
					"name": "",
					"labour": 0,
					"labourCost": 0,
					"acreageCount": 0,
					"personFeeCount": 0,

					"id": 0,


					"warmWorkRecordId": 0,
					"workOrderId": 0
				}]
			};
		},
		methods: {
			/* 人工 */
			personAdd() {
				let obj = {
					"name": "",
					"labour": 0,
					"labourCost": 0,
					"acreageCount": 0,
					"personFeeCount": 0,					
					"id": 0,
					"warmWorkRecordId": 0,
					"workOrderId": 0
				}
				this.personList.push(obj)

			},
			changeInput(e, d) {

			}
		}
	}
</script>

<style lang="scss">
	.add-fram {
		.cu-btn {
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			vertical-align: text-bottom;
		}

		.section {
			background-color: #fff;
			padding: 30rpx;
			margin-bottom: 30rpx;
		}

		.fb {
			font-weight: bold;
		}

		.label {



			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;

			b {
				font-size: 34rpx;
			}

			.line {
				display: inline-block;
				width: 4px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
		.item-border{
			border-bottom: 1px solid red;
		}
	}
</style>
