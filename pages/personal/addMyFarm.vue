<template>
	<view>
		<!-- 添加农场 -->
		<scroll-view scroll-y="true">
			<view class="container-input">
				<form>
					<view class="cu-form-group">
						<view class="title">农场名称</view>
						<input class="form-input-left" placeholder="请输入农场名称" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">农场区域</view>
						<input class="form-input-left" placeholder="请输入批次名称" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">农场区域</view>
						<picker mode="multiSelector" @change="MultiChange" :range-key="'name'" @columnchange="MultiColumnChange" :value="multiIndex"
						 :range="multiArray">
							<view class="picker">
								{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">农场地址</view>
						<input class="form-input-left" placeholder="请输入农场详细地址" name="input"></input>
					</view>
				</form>
			</view>
			<view class="people-box container-input">
				<view class="cu-form-group">
					<view class="title">农场负责人</view>
					<input class="form-input-left" placeholder="请输入农场负责人" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系电话</view>
					<input class="form-input-left" placeholder="请输入联系电话" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">负责人照片</view>
				</view>
				<view>
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group" style="border-top:1px solid #eee;">
					<view class="title">农场介绍</view>
				</view>
				<view>
					<textarea placeholder="请输入农场介绍" maxlength="100"></textarea>
				</view>
				<view class="cu-form-group">
					<view class="title">农场照片</view>
				</view>
				<view>
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<button :disabled="disabled" @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg" style="margin:40px 20px 20px 20px">
				添加农场</button>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				imgList: [],
				action: 1,
				date: '2020',
				landList: [],
				disabled: false,
				landId: '', //选择的地块ID
				landIdArr: [],
				breedList: [], //作物列表
				breed: '0', //作物值
				planName: '',
				multiIndex: [0, 0, 0],
				multiArray: [
					[{
						name: 'asd',
						id: 1
					}, {
						name: 'asd2',
						id: 2
					}],
					[{
						name: 'asd3',
						id: 3
					}, {
						name: 'asd4',
						id: 4
					}],
					[{
						name: 'asd5',
						id: 5
					}, {
						name: 'asd6',
						id: 6
					}]
				]
			}
		},
		onLoad(option) {

		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let that = this
						res.tempFilePaths.forEach(item => {
							that.uploadImg(item)
						});

					}
				});
			},
			uploadImg(url) {
				let that = this
				let URLPath = getApp().globalData.baseUrl + '/uploadFile/plantingUpload';
				wx.uploadFile({
					url: URLPath,
					filePath: url,
					name: 'files',
					//formData: { type: 'headImg' },
					success: function(resData) {
						let data = JSON.parse(resData.data).data
						that.imgList = that.imgList.concat(that.imgUrl + data)
						that.imgArr.push(data)

					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgArr.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			MultiChange() {},
			MultiColumnChange() {},
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
		text-align: left;
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

	.people-box {
		margin: 30rpx 0;
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

	.picker {
		text-align: left !important
	}

	.title-txt {
		font-size: 17px;
		font-weight: bold;

	}

	.shu-box {
		height: 20px;
		width: 4px;
		background: #00AE66;
		margin-right: 20rpx;
	}

	.title-height {
		height: 90rpx;
		padding: 30rpx;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.cu-form-group .title{
		width:180rpx;
	}
</style>
