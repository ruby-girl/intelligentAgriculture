<!-- 添加农事 -->
<template>
	<view class="add-fram">
		<!-- <view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>stepsNum?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view> -->
		<view >
			<view class="section">
				<view class="label">
					<label><text class="line"></text><text class="fb">基础信息</text></label>

				</view>
				<view class="cu-form-group margin-top">
					<view class="title">
						种植批次
					</view>
					<picker @change="batchChange" range-key="name" :value="plantingBatchValue" :range="batchData">
						<view class="picker">

							{{plantingBatchValue?batchData[plantingBatchValue].name:'请选择'}}

						</view>
					</picker>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">
						操作类型
					</view>
					<picker @change="farmChange" range-key="name" :value="farmWorkItemValue" :range="farmData">
						<view class="picker">
							{{farmWorkItemValue?farmData[farmWorkItemValue].name:'请选择'}}
						</view>
					</picker>
				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action">
						上传图片
					</view>
					<view class="action">
						{{imgList.length}}/6
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
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
				<view class="cu-form-group align-start">
					<view class="title">反馈内容</view>
					<textarea maxlength="-1" @input="farmWorkRecordPicsStrValue" placeholder="请输入反馈内容"></textarea>
				</view>
			</view>
			<!-- <button class="cu-btn block bg-green  lg" @tap="NumSteps">下一步</button> -->
		</view>


        <second-model :workOrderId="params.workOrderId"
		 :plantingBatchId="params.plantingBatchId" :formObj="params"></second-model>





</view>
</template>

<script>
	import secondModel from '../framManage/formModel'
	export default {
		components: {
			secondModel
		},
		data() {
			return {
		
				batchData: [],
				farmData: [],
				imgList: [],
				numList: [{
					name: '基础信息'
				}, {
					name: '农事信息'
				}],
				stepsNum:0,
				plantingBatchValue: '',
				farmWorkItemValue: '',
				params: {
					"baseId": uni.getStorageSync('baseId'),
					"executionUserId": uni.getStorageSync('organUserId'),
					"farmWorkRecordPicsStr": "",
					"plantingBatchId":'',
					"price": '',
					"workOrderId": ''
				},
			
			};
		},
		onLoad(option) {
	
			this.initSelect();
			this.params.workOrderId  = Number(option.workOrderId);
			this.params.plantingBatchId  =  Number(option.plantingBatchId);
			
		},
		methods: {
			// NumSteps() {
			// 	this.$api.addFarmWorkBase(this.params).then(res => {
			// 		this.farmWorkRecordId =res.data.data.farmWorkRecordId;
			// 		this.acreage =res.data.data.acreageCount;
			// 		this.stepsNum = this.stepsNum == this.numList.length - 1 ? 0 : this.stepsNum + 1
			// 	});
			// },
			farmWorkRecordPicsStrValue(e) {
				this.params.farmWorkRecordPicsStr = e.detail.value
			},
			initSelect() {


				let obj = {
					baseId: uni.getStorageSync('baseId'),
					organUserId: uni.getStorageSync('organUserId'),
					plantingBatchStatus: ''
				}
				this.$api.getFarmWorkSelect(obj).then(res => {
					this.batchData = res.data.data
				})


				this.$api.getFarmWorkItems().then(res => {
					this.farmData = res.data.data
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
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
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			/*选择批次 */
			batchChange(e) {

				this.plantingBatchValue = e.detail.value
				this.params.plantingBatchId = this.batchData[this.plantingBatchValue].id

			},
			farmChange(e) {
				this.farmWorkItemValue = e.detail.value;
				this.params.farmWorkItemId = this.farmData[this.farmWorkItemValue].id

			},
		}
	}
</script>

<style lang="scss">
	.add-fram {
		.cu-btn {
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}

		.imgIcon {
			width: 40rpx;
			height: 40rpx;
			vertical-align: text-bottom;
		}

		.section {
			background-color: #fff;
			padding: 30rpx;
			margin-bottom: 30rpx;
		}

		.fb {
			font-weight: bold;
		}

		.label {



			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;

			b {
				font-size: 34rpx;
			}

			.line {
				display: inline-block;
				width: 4px;
				height: 33rpx;
				background-color: $uni-text-color-primary;
				margin-right: 8px;
				vertical-align: text-top;
			}
		}
	}
</style>
