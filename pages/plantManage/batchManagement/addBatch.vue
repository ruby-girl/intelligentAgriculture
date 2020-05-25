<template>
	<view>
		<!-- 添加批次 -->
		<!-- <title-item title="基础信息" /> -->
		<view class="flex align-items-center title-height">
			<view class="shu-box">
			</view>
			<view class="title-txt">
				基础信息
			</view>
		</view>
		<view class="container-input">
			<form>
				<view class="cu-form-group">
					<view class="title">批次名称</view>
					<input v-model="postData.name" class="form-input-left" placeholder="请输入批次名称" name="input"></input>	
				</view>
				<view class="cu-form-group breed-select">
					<view class="title">作物</view>
					<picker @change="pickerChange($event)" :value="breed" :range="breedList" range-key="name">
						<view class="uni-input">{{breedList[breed].name}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">种植年份</view>
					<!-- <view class="disabled-txt">2020</view> -->
					<picker mode="date" :value="date" fields="year" start="2015" end="2030" @change="DateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">种苗企业</view>
					<input v-model="postData.seedEnterpirse" class="form-input-left" placeholder="请輸入种苗企业" name="input"></input>
					
					
				</view>
			</form>
		</view>
		<view class="item-border">
			<!-- <title-item title="地块" /> -->
			<view class="flex align-items-center title-height">
				<view class="shu-box">
				</view>
				<view class="title-txt">
					地块
				</view>
			</view>
			<view class="flex flex-wrap container-input">
				<view v-bind:class="{'btn-box':true,'btn-box-action':item.isChecked}" @click="setAction(i)" :key="i" v-for="(item,i) in landList">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="item-border">
			<!-- <title-item title="种植计划" /> -->
			<view class="flex align-items-center title-height">
				<view class="shu-box">
				</view>
				<view class="title-txt">
					种植计划
				</view>
			</view>
			<view class="cu-form-group container-input" @click="toPlan">
				<view class="title">种植计划</view>
				<input disabled="true" v-model="planName" class="form-input-left" placeholder="请选择种植计划" name="input"></input>
				<view class="iconfont right-jt">&#xe738;</view>
			</view>
		</view>
		<button :disabled="disabled" @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
			新建批次</button> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				action: 1,
				date: '2020',
				landList: [],
				disabled: false,
				obj: {
					baseId: '',
					userId: '',
					organUserId: ''
				},
				landId: '', //选择的地块ID
				landIdArr: [],
				breedList: [], //作物列表
				breed: '0', //作物值
				planName: '',
				postData: {
					baseId: '',
					userId: '',
					breedId: '1', //作物值
					plantingTime: '2020', //种植时间
					landParcelIds: '', //地块
					plantingPlanId: '' ,//种植计划
					seedEnterpirse:'',
					name:''
				}
			}
		},
		onLoad(option) {
			let _this = this
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId = res.data
					_this.postData.baseId = res.data
					uni.getStorage({
						key: 'organUserId',
						success: function(res) {
							_this.obj.userId = res.data 				
							_this.postData.userId = res.data
							_this.getByUserIdAndBaseId().then(_this.getBreedsAll(option))					
						}
					})
				}
			});

		},
		methods: {
			getBreedsAll(option) { // 获取作物
				this.$apiYZX.getBreedsAll().then(res => {
					this.breedList = res.data.data
					//选择计划后(跳转页面)回显数据
					if (option.planName) {
						this.postData.seedEnterpirse=option.seedEnterpirse
						debugger
						this.postData.name=option.name
						this.planName = option.planName
						this.postData.plantingPlanId = option.planId
						this.date = option.plantingTime
						this.postData.plantingTime = option.plantingTime
						this.landId = option.landId
						this.postData.landParcelIds = option.landId
						let arr = this.landId.split(',')
						this.landList.forEach((item, i) => {
							arr.forEach(a => {
								if (a == item.id) {
									this.landList[i].isChecked = true
								}
							})
						})
						let breed = option.breed
						this.postData.breedId = option.breed
						let index = this.breedList.findIndex((item, i) => {
							return item.id == breed
						})
						if (index == -1){
							index = 0
						}
						this.breed = index
					}
				})
			},
			getByUserIdAndBaseId() { //获取用户地块
			return new Promise((resolve, reject) => {
				this.$apiYZX.getByUserIdAndBaseId(this.obj).then(res => {
					res.data.data.forEach((item, i) => {
						res.data.data[i].isChecked = false
					})
					this.landList = res.data.data
					if (this.landList.length < 1) {
						uni.showToast({
							title: '无地块信息，无法添加批次',
							icon: 'none'
						})
						this.disabled = true
					}
					resolve()
				})
			})
				
			},
			setAction(i) {
				this.landList[i].isChecked = !this.landList[i].isChecked
				let arr = this.landList.filter(item => {
					return item.isChecked
				})
				let ids = arr.map(item => {
					return item.id
				})
				this.landId = ids.join()
				this.postData.landParcelIds = ids.join()
			},
			toPlan() {
				console.info(this.postData)
				uni.redirectTo({
					url: 'selectPlan?breed=' + this.postData.breedId + '&plantingTime=' + this.date + '&landId=' + this.landId +
						'&planName=' +
						this.planName + '&planId=' + this.postData.plantingPlanId+'&name='+this.postData.name+'&seedEnterpirse='+this.postData.seedEnterpirse
				});
			},
			DateChange(e) {
				this.date = e.detail.value
				this.postData.plantingTime = e.detail.value
			},
			pickerChange(e) {
				this.breed = e.target.value
				let arr = this.breedList.filter((item, i) => {
					return i == e.target.value
				})
				this.postData.breedId = arr[0].id
			},
			test() {
				if (this.postData.landParcelIds.length < 1) {
					uni.showToast({
						title: '请选择地块信息',
						icon: 'none'
					})
					return false
				}
				if (this.postData.plantingPlanId.length < 1) {
					uni.showToast({
						title: '请选择种植计划',
						icon: 'none'
					})
					return false
				}
				return true
			},
			addFunc() {
				if (!this.test()) return
				this.$apiYZX.addPlantingBatchs(this.postData).then(res => {
					if (res.data.code == '200') {
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								uni.redirectTo({
									url: 'list'
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color:#fff;
	// }
	.form-input-left {
		text-align: right;
	}

	.container-input {
		padding: 0 25rpx !important;
		background: #fff;
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
	
	}

	.item-border {
		border-top: 16rpx solid #eee;
		background: #fff;
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

	.breed-select picker::after {
		top: -10px;
	}

	.breed-select picker .picker {
		text-align: right;
	}

	.breed-select picker .uni-input {
		height: 30px;
		padding-right: 0;
		line-height: 20px;
		text-align: right;
	}
	.title-txt{
		font-size: 17px;
		font-weight: bold;
		
	}
	.shu-box{
		height:20px;
		width:4px;
		background: #00AE66;
		margin-right: 20rpx;
	}
	.title-height{
		height:90rpx;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
</style>
