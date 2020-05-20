<template>
	<view class="padding-login">
		<view class="border-bottom">
			<view><text class="iconfont iconxingming color-green" style="font-size: 26px;"></text><text class="text-margin">姓名</text></view>
			<input placeholder="请输入姓名" name="input" @input="accountInput"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconipad color-green" style="font-size: 26px;"></text><text class="text-margin">手机</text></view>
			<input placeholder="请输入手机号码" type="number" @input="phoneInput" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconsecurity color-green" style="font-size: 26px;"></text><text class="text-margin">验证码</text></view>
			<view class="cu-form-group">
				<input placeholder="请输入验证码"  name="input" @input="captchaInput"></input>
				<button class='cu-btn line-green shadow' :disabled="disabled"  @click="codeClick">{{btnTitle}}{{txt}}</button>
			</view>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">密码</text></view>
			<input placeholder="请设置密码" type="password" name="input" @input="passwordInput"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">请确认密码</text></view>
			<input placeholder="请确认密码" type="password" name="input" @input="passwordComfirmInput"></input>
		</view>
		<button @click="register" class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx">
			注册</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo: {
					account: '',
					phone: '',
					captcha: '',
					password: '',
					passwordComfirm: ''
				},
				disabled: false,
				btnTitle: "验证码",
				txt: ''
			}
		},
		onLoad() {

		},
		methods: {
			accountInput(e){
				this.userInfo.account = e.detail.value
			},
			phoneInput(e){
				this.userInfo.phone = e.detail.value
			},
			captchaInput(e){
				this.userInfo.captcha = e.detail.value
			},
			passwordInput(e){
				this.userInfo.password = e.detail.value
			},
			passwordComfirmInput(e){
				this.userInfo.passwordComfirm = e.detail.value
			},
			codeClick() {
				//点击发送验证码		     
				let _this = this
				if (!this.userInfo.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				this.disabled = true
				this.$apiYZX.captcha({
					phone: this.userInfo.phone,
					type: '2'
				}).then(res => {			
					if (res.data.code == 200) {					
						this.btnTitle = 60
						this.txt = 'S秒后获取'
						let timer = setInterval(function() {
							if (_this.btnTitle == 1) {
								clearInterval(timer)
								_this.btnTitle = '获取验证码'
								_this.txt = ''
								_this.disabled = false
							} else {
								_this.btnTitle = _this.btnTitle - 1
							}
						}, 1000)
					} else {
						this.disabled = false
					}
				})
			},
			register() {
				wx.login({
				     success: res => {
				       // 发送 res.code 到后台换取 openId, sessionKey, unionId
										console.info(res.code)
				     }
				   })
				//return
				if(!this.test()) return false
	
				this.$apiYZX.loginReg(this.userInfo).then(res => {
					if(res.data.code=='200'){
						uni.showToast({
						    title: '注册成功',
							icon:'success',
							success() {
								uni.redirectTo({
								    url: 'login'
								});
							}
						})	
					}
				})
			},
			test() {
				if(!this.userInfo.account || !this.userInfo.phone || !this.userInfo.captcha || !this.userInfo.password || !this.userInfo
					.passwordComfirm) {		
					uni.showToast({
						title: '请输入完整信息',
						icon: 'none'
					})
					return false
				}
				if(this.userInfo.passwordComfirm!==this.userInfo.password){
					uni.showToast({
						title: '输入的密码不一致',
						icon: 'none'
					})
					return false
				}
				return true
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
		padding: 62rpx 0 227rpx 0;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;

		.iconfont {
			position: relative;
			top: 3px;
		}

		.cu-form-group {
			min-height: 33px;
			padding-left: 0;
		}

		.uni-input-placeholder {
			font-size: 14px;
		}
	}

	.padding-login {
		padding: 0 60rpx;
	}

	.color-green {
		color: #00AE66;
	}
</style>
