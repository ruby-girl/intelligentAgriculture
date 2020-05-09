<template>
	<view class="padding-login">
		<view class="title">慧种植</view>
		<view class="border-bottom">
			<view><text class="iconfont iconipad color-green" style="font-size: 26px;"></text><text class="text-margin">手机</text></view>
			<input type="number" v-model="obj.account" placeholder="请输入手机号码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="iconfont iconpassword color-green" style="font-size: 26px;"></text><text class="text-margin">密码</text></view>
			<input placeholder="请输入登录密码" v-model="obj.password" type="password" name="input"></input>
		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" style="margin-top:100rpx" @click="userLogin">
			登录</button>
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
				obj:{
					account:'',
					captcha:'',
					password:''
				}
			}
		},
		onLoad() {

		},
		methods: {
			toRegister() {
				// uni.navigateTo({
				// 	url: 'register'
				// })
			
				uni.switchTab({
				    url: '../personal/personal'
				});
			},
			toRetypePassword(){
				// uni.navigateTo({
				// 	url: 'retypePassword'
				// })
				uni.navigateTo({
					url: 'register'
				})
			},
			userLogin(){
				this.$apiYZX.login(this.obj).then(res=>{
					let obj={
						token:res.data.data.token,
						userid:res.data.data.user.id,
						phone:res.data.data.user.phone,
						name:res.data.data.user.name
					}
					uni.setStorage({
					key:'ddwb',
					data:obj
					})
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
		.uni-input-placeholder{
			font-size: 14px;
		}
		.iconfont{
			position: relative;
			top:2px;
		}
	}

	.padding-login {
		padding: 0 60rpx;
	}

	.color-green {
		color: #00AE66;
	}
</style>
