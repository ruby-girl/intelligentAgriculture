<template>
	<view>
		<view class="bg-personal">
			<view class="user-info text-center flex" v-if="isLogin">
				<view class="text-lg">
					<image style="width:90rpx;height:90rpx;border-radius: 50%;" :src="user.avatarUrl" mode=""></image>
				</view>
				<view style="text-align: left;padding-left:20rpx">
					<text style="color:#fff">{{user.nickName||''}}</text>
					<view style="color:#fff" class="text-gray">{{user.phone||''}}</view>
				</view>
			</view>
			<view style="padding:40rpx 30rpx" v-else>
				<view class="login-box" @click="showPopup">
					登录/注册
				</view>
			</view>

		</view>
		<view class="flex justify-content-flex-justify positon-box">
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
				<view class="cu-form-group item-jt" @click="toSetWaring">
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
				<view class="cu-form-group item-jt" @click="toUs">
					<view class="title display-flex align-items-center">
						<image src="../../static/imgs/about.png" mode=""></image>关于我们
					</view>
					<image src="../../static/imgs/arrows.png" mode=""></image>

				</view>
			</form>
		</view>
		<button v-if="isLogin" @click="toLogin" class="cu-btn block line-green lg" style="width:90%;margin:60rpx auto">退出</button>
		<popup content='是否跳转到登录页面？' align='center' cancelText="我再看看" :show='popupShow' :showCancel='true' confirmText='确定'
		 @confirm="confirmFunc" @close="closePopup" />
	</view>
</template>

<script>
	import popup from "@/components/neil-modal/neil-modal.vue"
	export default {
		data() {
			return {
				switchB: true,
				nums: {
					massifCount:'-',
					farmCount:'-'
				},
				user: {},
				isLogin: false,
				popupShow: false
			};
		},
		components: {
			popup
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key: 'XYZNUserInfo',
				success: function(res) {
					_this.isLogin = true
					getApp().globalData.isLogin = true
					_this.user = {
						nickName: res.data.nickName || '',
						phone: res.data.phone || '',
						avatarUrl: res.data.avatarUrl
					}
					 _this.getCount()
				},
				fail: function() {
					_this.isLogin = false
					getApp().globalData.isLogin = false
				}
			});
		},
		onShareAppMessage: function() {
			return {
				title: '星鸦智农',
				desc: '',
				path: 'pages/personal/personal'
			}
		},
		onShow() {
			if (!this.isLogin) { //每次进入页面检查是否登录，如果没有登录，再拿一次最新状态
				this.isLogin = getApp().globalData.isLogin
				if (this.isLogin) {
					this.getCount()
				}
			}else{
				this.getCount()
			}
		},
		methods: {
			closePopup() {
				this.popupShow = false
			},
			toSetWaring() { //跳转预警设置
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: 'landWaring'
				});
			},
			getCount() {
				this.$api.massifCount().then(res => {
					this.nums = res.data.data
				})
			},
			toMyFarm() { //跳转我的农场
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				
				uni.navigateTo({
					url: 'myFarm'
				});
			},
			toLandManagement() { //跳转地块管理
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: 'landManagement'
				});
			},
			toLogin() { //退出
				uni.clearStorageSync();
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			confirmFunc() {
				this.toLogin()
			},
			showPopup() {
				this.popupShow = true
			},
			toUs(){
				uni.navigateTo({
					url: 'aboutUs'
				});			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-personal {
		height: 250rpx;
		background: #17BB89;
		position: relative;
		z-index: 1;
	}

	.user-info {
		margin: 0 30rpx;
		padding: 40rpx;
		padding-left: 0;

		.text-lg image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.form-input-left {
		text-align: right;
	}

	.title>image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 5px;
	}

	.item-jt>image {
		width: 14rpx;
		height: 28rpx;
	}

	.tip-text {
		color: #999999;
		font-size: 14px;
	}

	.item-box {
		width: 45%;
		background: #fff;
		padding: 15rpx;
		border-radius: 6px;
	}

	.positon-box {
		position: relative;
		top: -80rpx;
		z-index: 1011;
		padding: 0 30rpx;

		.position-num {
			font-size: 28px;
			font-weight: bold;
			color: #49BA89;
			text-align: center;
		}
	}

	.container-input {
		padding: 0 30rpx;
		z-index: 11111;
		background: #fff;
		position: relative;
		top: -40rpx;
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

	.login-box {
		background: #17BB89;
		padding: 3px 0;
		border-radius: 17px;
		border: 1px solid #fff;
		color: #fff;
		width: 160rpx;
		text-align: center;
	}
</style>
