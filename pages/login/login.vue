<template>
	<view class="padding-login">
		<view class="title">慧种植</view>
		<view class="border-bottom">
			<view><text class="iconfont iconipad color-green" style="font-size: 26px;"></text><text class="text-margin">手机</text></view>
			<input @input="onInput" type="number" placeholder="请输入手机号码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">密码</text></view>
			<input placeholder="请输入登录密码" @input="onPwdInput" type="password" name="inputs"></input>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx" open-type="getUserInfo"
		 lang="zh_CN" @getuserinfo="onGotUserInfo">
			登录</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS||H5 -->
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx"
		 lang="zh_CN" @click="userLogin">
			登录</button>
		<!-- #endif -->
		<view class="flex justify-content-flex-justify color-green">
			<text @click="toRegister">注册新用户</text>
			<text @click="toRetypePassword">忘记密码</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				obj: {
					phone: '',
					captcha: '',
					password: ''
				},
				headPortrait: ''
			}
		},
		onLoad() {},
		onShow() {
			// uni.hideHomeButton()
		},
		methods: {
			onInput(e) {
				this.obj.phone = e.detail.value
			},
			onPwdInput(e) {
				this.obj.password = e.detail.value
			},
			getSettingMes() {
				let _this = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 用户信息已授权，获取用户信息
							uni.getUserInfo({
								success(res) {
									_this.headPortrait = res.userInfo.avatarUrl
									_this.userLogin()
								},
								fail() {
									console.log("获取用户信息失败")
								}
							})
						} else if (!res.authSetting['scope.userInfo']) {
							console.log("需要点击按钮手动授权")
						}
					},
					fail() {
						console.log("获取已授权选项失败")
					}
				})
			},
			// 手动授权方法
			onGotUserInfo(e) {
				let _this = this;
				// 获取用户信息
				uni.getUserInfo({
					// 获取信息成功
					success(res) {
						_this.headPortrait = res.userInfo.avatarUrl
						_this.userLogin()
					},
					fail() {
						console.log("获取用户信息失败");
					}
				})
			},
			toRegister() {
				uni.navigateTo({
					url: 'register'
				})
			},
			toRetypePassword() {
				uni.navigateTo({
					url: 'retypePassword'
				})
			},
			userLogin() {
				let that = this;
				this.$apiYZX.login(this.obj).then(res => {
					if (res.data.code == 200) {
						let obj = {
							token: res.data.data.token,
							userid: res.data.data.user.id,
							phone: res.data.data.user.phone,
							name: res.data.data.user.name,
							headPortrait: this.headPortrait,
							landOrgan: res.data.data.user.organUsers
						}

						uni.setStorage({
							key: 'ddwb',
							data: obj,
							success() {
								uni.showToast({
									title: '登录成功',
									icon: 'success',
									success() {
										console.log(obj.landOrgan.length)
										if (obj.landOrgan.length == 0) {
									uni.redirectTo({
										url: '../plantManage/baseLand/chooseHandle'
									});

										} else {
											uni.switchTab({
												url: '../plantManage/plantManage'
											});
											uni.setStorage({
												key: 'organId',
												data: obj.landOrgan[0].organ.id,
											})
											
										}
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #fff;
	}

	.text-margin {
		margin-left: 5px;
		font-size: 15px;
	}

	.title {
		font-size: 20px;
		color: #00AE61;
		font-weight: bold;
		text-align: center;
		padding: 62rpx 0 160rpx 0;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;

		.uni-input-placeholder {
			font-size: 14px;
		}

		.iconfont {
			position: relative;
			top: 2px;
		}
	}

	.padding-login {
		padding: 0 60rpx;
	}

	.color-green {
		color: #00AE66;
	}
</style>
