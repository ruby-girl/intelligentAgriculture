<template>
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">设备序列号</view>
			<input placeholder="输入设备名称" name="input"></input>
			<image class="code-img" src="../../static/imgs/qr-code.png" mode=""></image>
		</view>
		<view class="cu-form-group">
			<view class="title">设备名称</view>
			<input placeholder="输入设备名称" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联地块</view>
			<picker @change="pickerChange($event)" :value="optionValue" :range="list" range-key="name">
				<view class="uni-input">{{list[optionValue].name}}</view>
			</picker>
		</view>
		<view class="bottom-lg-btn">添加设备</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: 'option1',
					id: 1
				}, {
					name: 'option2',
					id: 2
				}],
				optionValue: 0
			}
		},
		onLoad(option) {

		},
		methods: {
			pickerChange(e) {
				this.optionValue = e.target.value
				// let arr = this.breedList.filter((item, i) => {
				// 	return i == e.target.value
				// })
				// this.postData.breedId = arr[0].id
			},
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}
	.cu-form-group picker::after{
		line-height: 50rpx;
	}
	.uni-input{
		line-height: 18rpx;
		padding-left: 0;
	}
	.title{
		width:180rpx;
	}
	.bottom-lg-btn{
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width:80%;
		margin:40rpx auto;
		text-align: center;
		color:#fff;
	}
</style>
