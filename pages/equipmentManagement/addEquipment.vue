<template>
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">设备序列号</view>
			<input placeholder="输入设备名称" v-model="obj.sn" name="input"></input>
			<image @click="toScanCode" class="code-img" src="../../static/imgs/qr-code.png" mode=""></image>
		</view>
		<view class="cu-form-group">
			<view class="title">设备名称</view>
			<input placeholder="输入设备名称" v-model="obj.deviceName" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联地块</view>
			<picker @change="pickerChange($event)" :value="optionValue" :range="massifsList" range-key="massifName">
				<view class="uni-input">{{massifsList[optionValue].massifName}}</view>
			</picker>
		</view>
		<view class="bottom-lg-btn" @click="toAdd">{{btnTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				optionValue: 0,
				obj: {
					deviceName: '',
					massifId: '',
					sn: '',
					deviceId: ''
				},
				massifsList: [],
				btnTxt: '新建设备'
			}
		},
		onLoad(option) {
			if (option.deviceId) {
				this.obj.deviceId = option.deviceId
				this.selectDevice()
				uni.setNavigationBarTitle({
					title: "编辑设备"
				})
				this.btnTxt = '保存'
			} else {
				this.selectMassif()
			}

		},
		methods: {
			toScanCode() { //扫码
				uni.scanCode({
					success: function(res) {
						console.log(JSON.stringify(res));
						this.obj.sn=res.result	
					}
				});

			},
			selectDevice() {
				this.$api.selectDevice({
					deviceId: this.obj.deviceId
				}).then(res => {
					this.obj = res.data.data
					this.selectMassif()
				})
			},
			selectMassif() { //获取地块列表
				this.$api.selectMassif({
					pageNum: 1,
					pageSize: 100
				}).then(res => {
					this.massifsList = res.data.data.massifs
					if (option.deviceId) {
						this.optionValue = this.massifsList.filter((item, i) => {
							if (item.massifId == this.obj.massifId) {
								return i
							}
						})
					}
				})
			},
			pickerChange(e) {
				this.optionValue = e.target.value
				// let arr = this.breedList.filter((item, i) => {
				// 	return i == e.target.value
				// })
				// this.postData.breedId = arr[0].id
			},
			toAdd() { //添加设备
				if (!this.obj.deviceName) {
					uni.showToast({
						title: '请输入设备名称',
						icon: 'none'
					})
					return
				}
				if (!this.obj.SN && !this.obj.deviceId) {
					uni.showToast({
						title: '请输入设备序列号',
						icon: 'none'
					})
					return
				}
				if (this.obj.sn && this.obj.deviceId) {
					uni.showToast({
						title: '请输入设备序列号',
						icon: 'none'
					})
					return
				}
				let api; //未处理~~~~
				if (!this.obj.massifId) {
					api = 'insertDevice'
				} else {
					api = 'updateDevice';
					this.obj.SN = this.obj.sn
				}
				this.$api[api](this.obj).then(res => {
					if (this.obj.deviceId) {
						uni.showToast({
							title: '编辑成功',
							duration: 2000,
							success() {
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
									success: function() {
										beforePage.onLoad(); // 执行前一个页面的onLoad方法
									}
								});
							}
						});
					} else {
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 前一个页面
								uni.navigateBack({
									success: function() {
										beforePage.onLoad(); // 执行前一个页面的onLoad方法
									}
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.code-img {
		position: absolute;
		right: 20px;
		bottom: rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.cu-form-group picker::after {
		line-height: 50rpx;
	}

	.uni-input {
		line-height: 18rpx;
		padding-left: 0;
	}

	.title {
		width: 180rpx;
	}

	.bottom-lg-btn {
		background: #00AE66;
		border-radius: 20px;
		padding: 5px 0;
		width: 80%;
		margin: 40rpx auto;
		text-align: center;
		color: #fff;
	}
</style>
