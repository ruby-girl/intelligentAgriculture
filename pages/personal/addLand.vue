<template>
	<!-- 添加地块 -->
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">选择农场</view>
			<picker @change="pickerChange($event)" :value="farmValue" :range="farmList" range-key="farmName">
				<view class="uni-input">{{farmList[farmValue].farmName}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">地块编号</view>
			<input placeholder="输入地块编号" v-model="obj.massifNo" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">地块名称</view>
			<input placeholder="输入地块名称" v-model="obj.massifName" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联作物</view>
			<input placeholder="输入作物名称" v-model="obj.crop" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">作物周期</view>
			<input placeholder="输入作物周期" v-model="obj.cycle" type="number" name="input"></input>
		</view>
		<view class="cu-form-group" style="padding-bottom:0;height:40rpx">
			<view class="title">关联设备</view>
		</view>
		<view class="cu-form-group" style="border-top:none;">
			<view class="flex flex-wrap container-input">
				<view v-bind:class="{'btn-box':true,'btn-box-action':item.isChecked}" @click="setAction(i)" :key="i" v-for="(item,i) in devicegetList">
					{{item.deviceName}}
				</view>
			</view>
		</view>
		<view class="bottom-lg-btn" @click="insertMassif">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				farmList: [],
				farmValue: 0,
				list: [{
					name: 'option1',
					id: 1
				}, {
					name: 'option2',
					id: 2
				}],
				obj: { //设备参数未处理~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					massifName: '', //地块名
					massifNo: '', //地块编号
					crop: '', //作物
					cycle: '', //预计作物周期
					massifId: '' //地块ID
				},
				devicegetList: [], //设备下拉变量
			}
		},
		onLoad(option) {
			if (option.massifId) {
				this.obj.massifId = option.massifId
			}
			this.devicegetNoBangAll()
			this.getFarmData()
		},
		methods: {
			getOptionValue(){			
				let _this=this
				let arr=this.farmList.filter((item,i)=>{
					return i==_this.farmValue
				})
				this.obj.farmId=arr[0].farmId			
			},
			insertMassif() { //添加地快，未处理判断新增和编辑的接口~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
				if (!this.obj.massifName) {
					uni.showToast({
						title: '请输入地块名称',
						icon: 'none'
					})
					return
				}
				if (!this.obj.massifNo) {
					uni.showToast({
						title: '请输入地块编号',
						icon: 'none'
					})
					return
				}
				this.getOptionValue()
				this.$api.insertMassif(this.obj).then(res => {
					if (this.obj.massifId) {
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
			},
			devicegetNoBangAll() { //获取地块
				this.$api.devicegetNoBangAll().then(res => {
					res.data.data.devices.forEach((item, i) => {
						res.data.data.devices[i].isChecked = false
					})
					this.devicegetList = res.data.data.devices
				})
			},
			pickerChange(e) {//选择农场
				this.farmValue = e.target.value
			},
			setAction(i) {
				this.devicegetList[i].isChecked = !this.devicegetList[i].isChecked
				let arr = this.devicegetList.filter(item => {
					return item.isChecked
				})
				let ids = arr.map(item => {
					return item.deviceId
				})
				// this.landId = ids.join()
				// this.postData.landParcelIds = ids.join()
			},
			getFarmData() { //获取农场下拉数据
				let obj = {
					pageNum: 1,
					pageSize: 100
				}
				this.$api.farmGetAll(obj).then(res => {
					this.farmList = res.data.data.farms
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

	.btn-box {
		border: 1px solid #eee;
		padding: 4px 8px;
		border-radius: 4px;
		margin: 20rpx 30rpx 20rpx 0;
	}

	.btn-box-action {
		border: 1px solid #00AE66;
		color: #00AE66;
	}
</style>
