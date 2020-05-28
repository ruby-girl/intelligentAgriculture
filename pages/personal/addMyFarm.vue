<template>
	<view>
		<!-- 添加批次 -->
		<!-- <title-item title="基础信息" /> -->
		<view class="flex align-items-center title-height">
			<view class="shu-box">
			</view>
			<view class="title-txt">
				基础信息
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group">
					<view class="title">批次名称</view>
					<input class="form-input-left" placeholder="请输入批次名称" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">批次名称</view>
					<input  class="form-input-left" placeholder="请输入批次名称" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">批次名称</view>
					<picker mode="multiSelector" @change="MultiChange" :range-key="'name'" @columnchange="MultiColumnChange" :value="multiIndex"
					 :range="multiArray">
						<view class="picker">
							{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
						</view>
					</picker>
				</view>


			</form>
		</view>
		<button :disabled="disabled" @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
			新建批次</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				action: 1,
				date: '2020',
				landList: [],
				disabled: false,
				landId: '', //选择的地块ID
				landIdArr: [],
				breedList: [], //作物列表
				breed: '0', //作物值
				planName: '',
				multiIndex:[0,0,0],
				multiArray: [
					[{name:'asd',id:1}, {name:'asd2',id:2}],
					[{name:'asd3',id:3}, {name:'asd4',id:4}],
					[{name:'asd5',id:5}, {name:'asd6',id:6}]
				]
			}
		},
		onLoad(option) {

		},
		methods: {
			MultiChange(){},
			MultiColumnChange(){},
			DateChange(e) {
				this.date = e.detail.value
				this.postData.plantingTime = e.detail.value
			},
			pickerChange(e) {
				this.breed = e.target.value
				let arr = this.breedList.filter((item, i) => {
					return i == e.target.value
				})
				this.postData.breedId = arr[0].id
			},
			test() {
				if (this.postData.landParcelIds.length < 1) {
					uni.showToast({
						title: '请选择地块信息',
						icon: 'none'
					})
					return false
				}
				if (this.postData.plantingPlanId.length < 1) {
					uni.showToast({
						title: '请选择种植计划',
						icon: 'none'
					})
					return false
				}
				return true
			},
			addFunc() {
				if (!this.test()) return
				this.$apiYZX.addPlantingBatchs(this.postData).then(res => {
					if (res.data.code == '200') {
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								uni.redirectTo({
									url: 'list'
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color:#fff;
	// }
	.form-input-left {
		text-align: left;
	}

	.container-input {
		padding: 0 25rpx !important;
		background: #fff;
	}

	.cu-form-group {
		padding: 1px 0;
	}

	.disabled-txt {
		padding-right: 20rpx;
	}

	.right-jt {
		font-size: 23px;
		color: #828282;

	}

	.item-border {
		border-top: 16rpx solid #eee;
		background: #fff;
	}

	.btn-box {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 4px;
		margin: 20rpx 30rpx 20rpx 0;
	}

	.btn-box-action {
		border: 1px solid #00AE66;
		color: #00AE66;
	}
	.picker {
		text-align: left !important
	}
	.title-txt {
		font-size: 17px;
		font-weight: bold;

	}

	.shu-box {
		height: 20px;
		width: 4px;
		background: #00AE66;
		margin-right: 20rpx;
	}

	.title-height {
		height: 90rpx;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
</style>
