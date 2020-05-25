<template>
	<view class="padding-login">
		<view class="title-y">
			欢迎登录/注册数农科技！
		</view>
		<view class="border-bottom">
			<view class="cu-form-group">
				<input @input="onInput" type="number" placeholder="请输入手机号码" name="input"></input>
			</view>
		</view>
		<view class="border-bottom">
			<view class="cu-form-group">
				<input placeholder="请输入验证码"  name="input" @input="captchaInput"></input>
				<button class='cu-btn line-green shadow' :disabled="disabled"  @click="codeClick">{{btnTitle}}{{txt}}</button>
			</view>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx" open-type="getUserInfo"
		 lang="zh_CN" @getuserinfo="userLogin">
			登录</button> 
			
		<view class="auto-bottom">
			注册即为同意<text class="agreement">《数农科技用户使用协议》</text>
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
				headPortrait: '',
				name:'',
				disabled: false,
				btnTitle: "获取验证码",
				txt: ''
			}
		},
		onLoad() {},
		onShow() {
			// uni.hideHomeButton()
		},
		onShareAppMessage(res) {
		    return {
		      title: '农事云',
				  path: '/pages/index/index'
		  }
		},
		onBackPress(e) {  
			// return true 表示禁止默认返回
			return false
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
									_this.name = res.userInfo.name
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
			userLogin() {
				let that = this;
				uni.switchTab({
					url: '../personal/personal'
				});
				return
				this.$apiYZX.test().then(res=>{
					console.info('66666')
				})
				return
				this.$apiYZX.login(this.obj).then(res => {
					if (res.data.code == 200) {
						let obj = {
							token: res.data.data.token,
							userid: res.data.data.user.id,
							phone: res.data.data.user.phone,
							name: res.data.data.user.name,
							headPortrait: this.headPortrait,
						}

						uni.setStorage({
							key: 'shunong',
							data: obj,
							success() {
								uni.showToast({
									title: '登录成功',
									icon: 'success',
									success() {
										console.log(obj.landOrgan.length)
										uni.switchTab({
											url: '../plantManage/plantManage'
										});
								
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
	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;

		.uni-input-placeholder {
			font-size: 16px;
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
	.logo-box{
		width:200rpx;
		height:200rpx;
		margin: 0 auto;
	}
	.title-y{
		text-align: left;
		margin: 80rpx 0;
		font-size: 21px;
		font-weight: bold;
	}
	.auto-bottom{
		padding-top: 30vh;
		text-align: center;
		.agreement{
			color:#0FD4FF;
		}
	}
</style>
