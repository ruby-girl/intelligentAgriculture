<template>
	<view class="padding-login">
		<view class="border-bottom">
			<view><text class="iconfont iconipad color-green" style="font-size: 26px;"></text><text class="text-margin">手机</text></view>
			<input placeholder="请输入手机号码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconsecurity color-green" style="font-size: 26px;"></text><text class="text-margin">验证码</text></view>
			<view class="cu-form-group">
				<input placeholder="请输入短信验证码" type="password" name="input"></input>
				<button class='cu-btn line-green shadow'>验证码</button>
			</view>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">密码</text></view>
			<input placeholder="请设置密码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">请确认密码</text></view>
			<input placeholder="请确认密码" name="input"></input>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx">
			确定</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: 'register'
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
		padding: 62rpx 0 227rpx 0;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;
		.iconfont{
			position: relative;
			top:3px;
		}
		.cu-form-group{
			min-height: 33px;
			padding-left:0;
		}
		.uni-input-placeholder{
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
