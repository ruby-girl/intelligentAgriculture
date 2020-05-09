<template>
	<view class="padding-login">
		<view class="title">慧种植</view>
		<view class="border-bottom">
			<view><i class="iconfont iconipad color-green" style="font-size: 26px;"></i><text class="text-margin">手机</text></view>
			<input placeholder="请输入手机号码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><i class="iconfont iconpassword color-green" style="font-size: 26px;"></i><text class="text-margin">密码</text></view>
			<input placeholder="请输入登录密码" type="password" name="input"></input>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx">
			登录</button>
		<view class="flex justify-content-flex-justify color-green">
			<text @click="toRegister">注册新用户</text>
			<text>忘记密码</text>
		</view>
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
