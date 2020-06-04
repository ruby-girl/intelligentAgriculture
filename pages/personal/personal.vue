<template>
	<view>
		<view class="bg-personal">
			<view class="user-info text-center flex">
				<view style="margin-top:20rpx" class="text-lg">
					<image :src="user.avatarUrl" mode=""></image>
				</view>
				<view class="">
					<text>{{user.nickName}}</text>
					<view class="text-gray">{{user.phone}}</view>
				</view>
			</view>
		</view>
		<view class="flex justify-content-flex-justify positon-box">
			<!-- 农场 -->
			<view class="item-box" @click="toMyFarm">
				<view class="flex justify-content-flex-justify item-jt align-items-center">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/farm-management.png" mode=""></image>我的农场
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				</view>
				<view class="position-num">
					{{nums.farmCount}}
				</view>
			</view>
			<!-- 地块 -->
			<view class="item-box" @click="toLandManagement()">
				<view class="flex justify-content-flex-justify item-jt align-items-center">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/dikuai.png" mode=""></image>我的地块
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				</view>
				<view class="position-num">
					{{nums.massifCount}}
				</view>
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group item-jt" @click="toSet">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/warning.png" mode=""></image>预警设置
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				</view>
				<view class="cu-form-group item-jt">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/tip.png" mode=""></image>版本更新
					</view>
					<text class="tip-text">当前1.0.0</text>

				</view>
				<view class="cu-form-group item-jt">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/about.png" mode=""></image>关于我们
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>
				
				</view>
			</form>
		</view>
		<button @click="toLogin" class="cu-btn block line-green lg" style="width:90%;margin:100rpx auto">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchB: true,
				nums: {},
				user:{}
			};
		},
		onShareAppMessage(res) {
			return {
				title: '农事云',
				path: '/pages/index/index'
			}
		},
		onShow() {
			let _this = this
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_this.isLogin=true
					_this.user = {
						nickName: res.data.nickName || '',
						phone: res.data.phone || '',
						avatarUrl: res.data.avatarUrl
					}
				},
				fail: function() {
					_this.isLogin=false
				}
			});
			this.getCount()
		},
		methods: {
			toSet(){//跳转预警设置
				uni.navigateTo({
					url: 'setTheWarning'
				});
			},
			getCount(){
				this.$api.massifCount().then(res => {
					this.nums=res.data.data
				})
			},
			toMyFarm(){//跳转我的农场
				uni.navigateTo({
					url: 'myFarm'
				});
			},
			toLandManagement(){//跳转地块管理
				uni.navigateTo({
					url: 'landManagement'
				});
			},
			toLogin() { //退出
				uni.clearStorageSync();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-personal {
		height: 200rpx;
		background:#17BB89;
		position: relative;
		z-index: 1;
	}

	.user-info {
		margin: 0 30rpx;
		padding: 40rpx;

		.text-lg image {
			width: 50rpx;
			height: 50rpx;
		}
	}
	.form-input-left {
		text-align: right;
	}
	.title>image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 5px;
	}
	.item-jt>image {
		width: 14rpx;
		height: 28rpx;
	}
	.tip-text{
		color:#999999;
		font-size: 14px;
	}
	.item-box{
		width:45%;
		background: #fff;
		padding:15rpx;
		border-radius: 6px;
	}
	.positon-box{
		position: relative;
		top: -30rpx;
		z-index: 1011;
		padding: 0 30rpx;
		.position-num{
			font-size: 28px;
			font-weight: bold;
			color:#49BA89;
			text-align: center;
		}
	}
	.container-input {
		padding: 0 30rpx;
		z-index: -11;
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
		width: 16px;
	}
</style>
