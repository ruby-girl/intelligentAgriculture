<template>
	<!-- 添加地块 -->
	<view>
		<view class="cu-form-group" style="position: relative;">
			<view class="title">选择农场</view>
			<picker @change="pickerChange($event)" :value="farmValue" :range="farmList" range-key="name">
				<view class="uni-input">{{farmList[farmValue].farmName}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">地块编号</view>
			<input placeholder="输入地块编号" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">地块名称</view>
			<input placeholder="输入地块名称" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关联作物</view>
			<picker @change="pickerChange($event)" :value="optionValue" :range="list" range-key="name">
				<view class="uni-input">{{list[optionValue].name}}</view>
			</picker>
		</view>
		<view class="cu-form-group" style="padding-bottom:0;height:40rpx">
			<view class="title">关联设备</view>
		</view>
		<view class="cu-form-group" style="border-top:none;">
			<view class="flex flex-wrap container-input">
				<view v-bind:class="{'btn-box':true,'btn-box-action':item.isChecked}" @click="setAction(i)" :key="i" v-for="(item,i) in landList">
					{{item.label}}
				</view>
			</view>
		</view>		
		<view class="bottom-lg-btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				farmList:[],
				farmValue:0,
				list: [{
					name: 'option1',
					id: 1
				}, {
					name: 'option2',
					id: 2
				}],
				optionValue: 0,
				values: [],
				landList: [{
					id: '选项1',
					label: '黄金糕',
					isChecked:false
				}, {
					id: '选项2',
					label: '双皮奶',
					isChecked:false
				}, {
					id: '选项3',
					label: '蚵仔煎',
					isChecked:false
				}, {
					id: '选项4',
					label: '龙须面',
					isChecked:false
				}, {
					id: '选项5',
					label: '北京烤鸭',
					isChecked:false
				}]
			}
		},
		onLoad(option) {
			
		},
		methods: {
			selectChange(val) {
				this.values = val
			},
			pickerChange(e) {
				this.optionValue = e.target.value
				// let arr = this.breedList.filter((item, i) => {
				// 	return i == e.target.value
				// })
				// this.postData.breedId = arr[0].id
			},
		setAction(i) {
			this.landList[i].isChecked = !this.landList[i].isChecked
			let arr = this.landList.filter(item => {
				return item.isChecked
			})
			let ids = arr.map(item => {
				return item.id
			})
			// this.landId = ids.join()
			// this.postData.landParcelIds = ids.join()
		},
		getFarmData() {//获取农场下拉数据
			let obj = {
				pageNum:1,
				pageSize: 100
			}
			this.$api.farmGetAll(obj).then(res => {
				this.farmList =res.data.data.farms			
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
