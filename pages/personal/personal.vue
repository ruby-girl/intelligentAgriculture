<template>
	<view>
		<view class="bg-personal">
			<view class="user-info text-center">
				<view class="cu-avatar lg round" v-bind:style="{'backgroundImage':'url('+user.headPortrait+')'}"></view>
				<view style="margin-top:20rpx" class="text-lg">{{user.name}}</view>
				<text class="text-gray">{{user.phone}}</text>
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group" @click="toRealInformmation">
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
		<button @click="toList" class="cu-btn block line-green lg" style="width:90%;margin:50rpx auto">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchB: true,
				user:{}
			};
		},
		onLoad() {
			let _this=this
			uni.getStorage({
			key: 'ddwb',
			success: function (res) { 
				_this.user= {			
					name: res.data.name || '',
					phone:res.data.phone||'',
					headPortrait:res.data.headPortrait
				}
			}
			});
		},
		methods: {
			toRealInformmation(){
				uni.navigateTo({
				    url: 'realInformation'
				});
			},
			changeSwitch(e) {
				this.switchB = e.detail.value
			},
			toList(){//测试跳转批次
				uni.navigateTo({
				    url: '/pages/plantManage/batchManagement/list'
				});
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
