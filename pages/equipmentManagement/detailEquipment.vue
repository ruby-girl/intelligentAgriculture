<template>
	<view class="detail-container">
		<view class="detail-box">
			<view class="flex align-items-center justify-content-flex-justify">
				<view class="detail-name">
					<view><text style="font-weight: bold;font-size: 17px;">SN:0000</text><text style="font-size: 13px;">设备名称</text></view>
					<view class="detail-small-txt"><text>经度：117.11</text><text>纬度：110.22</text></view>
				</view>
				<view class="detail-img">
					<image src="../../static/imgs/deit.png" mode="aspectFill"></image>
					<view>
						编辑
					</view>
				</view>
			</view>
			<view class="detail-bottom-box">
				<view class="flex align-items-center justify-content-flex-justify">
					<view class="font-size-16">
						<text class="color-grey">所属农场：</text><text>开心农场</text>
					</view>
					<view class="font-size-16">
						<text class="color-grey">设备状态：</text><text>正常</text>
					</view>
				</view>
				<view class="flex align-items-center justify-content-flex-justify">
					<view class="font-size-16">
						<text class="color-grey">版本信息：</text><text>V1.0</text>
					</view>
					<view class="font-size-16">
						<text class="color-grey">设备电量：</text><text>89%</text>
					</view>
				</view>
			</view>
			<view class="color-grey" style="text-align: center;">数据更新于12:57:11</view>
		</view>
		<view class="bottom-lg-btn">删除设备</view>
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
	.detail-container{
		padding: 20rpx;
	}
	.bottom-lg-btn{
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width:80%;
		margin:50rpx auto;
		text-align: center;
		color:#fff;
	}
	.detail-name{
		width:75%;
		border-right:1px solid #eee;
	}
	.detail-small-txt{
		color:#999;
		font-size: 13px;
	}
	.detail-img{
		width:25%;
		text-align: center;
	}
	.detail-img image{
		width:30rpx;
		height:30rpx;
	}
	.detail-box{
		padding:20rpx;
		background: #fff;
		border-radius: 6px;
	}
	.color-grey{
		color:#999;
	}
	.font-size-16{
		font-size: 15px;
	}
	.detail-bottom-box{
		padding:40rpx;
		margin-top:20rpx;
		border-top:1px solid #eee;
	}
</style>
