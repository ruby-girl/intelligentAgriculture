<template>
	<view>
		<view class="bg-personal">
			<view class="user-info text-center">
				<view class="cu-avatar lg round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
				<view style="margin-top:20rpx" class="text-lg">毛小瓜</view>
				<text class="text-gray">13696279917</text>
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group">
					<view class="title">实名信息</view>
					<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
				</view>
				<view class="cu-form-group">
					<view class="title">意见反馈</view>
					<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
				</view>
				<view class="cu-form-group">
					<view class="title">内容推送</view>
					<switch @change="changeSwitch" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
				</view>
				<view class="cu-form-group">
					<view class="title">设置</view>
					<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
				</view>
			</form>
		</view>
		<button class="cu-btn block line-green lg" style="width:90%;margin:50rpx auto">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchB: true
			};
		},
		onLoad() {
			this.getSettingMes()
		},
		methods: {
			// 查看已授权选项
			getSettingMes() {
				console.log('1111111')
				let _this = this;
				uni.getSetting({
					success(res) {
						console.log('123123213213', res.authSetting)
						if (res.authSetting['scope.userInfo']) {
							// 用户信息已授权，获取用户信息
							uni.getUserInfo({
								success(res) {
									console.log(res);
								},
								fail() {
									console.log("获取用户信息失败")
								}
							})
						} else if (!res.authSetting['scope.userInfo']) {
							console.log('失败了')
							// console.log("需要点击按钮手动授权")
							uni.authorize({
								scope: 'scope.userInfo',
								success(res) {
									console.log('授权成功')
									uni.getUserInfo({
										// 获取信息成功
										success(res) {
											console.log(res);
											// 成功后进行登录,获取code
											uni.login({
												success(res) {
													console.log(res);
													if (res.code) {
														//发起网络请求
														uni.request({
															// 请求路径
															url: 'https://test.com/onLogin',
															// 请求参数code
															data: {
																code: res.code
															},
															method: 'GET',
															success(res) {
																// 请求成功后获取openid和session_key
																console.log(res)
															}
														})
													} else {
														console.log('登录失败！' + res.errMsg)
													}
												}
											})
										},
										fail() {
											console.log("获取用户信息失败");
										}
									})
								},
								fail() {
									// 这里再次唤起
									uni.openSetting({
										success: (res) => {
											console.log('再次')
										}
									})
									console.log("授权失败");
								}
							})
						}
					},
					fail() {
						console.log("获取已授权选项失败")
					}
				})
			},
			changeSwitch(e) {
				this.switchB = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.bg-personal {
		height: 200rpx;
		background: #00AE66;
		position: relative;
		z-index: 1;
	}

	.user-info {
		height: 320rpx;
		margin: 0 30rpx;
		padding: 40rpx;
		background-image: url('@/static/user-bg.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.form-input-left {
		text-align: right;
	}

	.container-input {
		padding: 0 25rpx;
		padding-top: 130rpx;
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
		transform: rotate(180deg);
		width: 16px;
	}
</style>
