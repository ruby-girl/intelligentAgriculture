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
		<view>
			<view class="section">
				<view class="label">
					<label><text class="line"></text><text class="fb">基础信息</text></label>

				</view>
				<view class="cu-form-group margin-top">
					<view class="title">
						种植批次
					</view>
					<picker @change="batchChange" range-key="name" :value="params.plantingBatchName" :range="batchData">
						<view class="picker">

							{{params.plantingBatchName?params.plantingBatchName:'请选择'}}

						</view>
					</picker>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">
						操作类型
					</view>
					<picker @change="farmChange" range-key="name" :value="params.farmWorkItemName" :range="farmData">
						<view class="picker">
							{{params.farmWorkItemName?params.farmWorkItemName:'请选择'}}
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
					<view class="title">备注信息</view>
					<textarea maxlength="-1" @input="farmWorkRecordPicsStrValue" name="nickname" :value="params.remark" placeholder="请输入反馈内容"></textarea>
				</view>
				
				<view>
					<view class="display-flex justify-content-flex-justify">
						<view @tap="playVoice">
							<text class="cuIcon-video f20"></text> <text class="cr2" style="margin: 0 10px;">新录音</text> <text class="f12 cr3">{{voiceTime}}秒</text>
						</view>
						<view>
							<text class="cuIcon-close" @click="closeVoice"></text>
						</view>

					</view>
					<button @touchstart="startRecord" @touchend="endRecord" class="cu-btn block  lg line-gray" style="margin: 5px 0;">
						<text class="iconfont iconyuyin- f20" style="margin-right: 10px;"> </text>
						<template v-if="isRecord">
							录音中...
						</template>
						<template v-else>
							按住说话,松开结束
						</template>
					</button>
				</view>
			</view>
			<!-- <button class="cu-btn block bg-green  lg" @tap="NumSteps">下一步</button> -->
		</view>


		<second-model :workOrderId="params.workOrderId" :plantingBatchId="params.plantingBatchId" :status="status" :formObj="params"
		 :personResources="personResources" :equipmentResources="equipmentResources" :suppliesResources="suppliesResources"></second-model>





	</view>
</template>

<script>
	const recorderManager = wx.getRecorderManager();
	const innerAudioContext = wx.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
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
				stepsNum: 0,
				plantingBatchValue: '',
				farmWorkItemValue: '',
				params: {
					"baseId": uni.getStorageSync('baseId'),
					"executionUserId": uni.getStorageSync('organUserId'),
					"farmWorkItemId": '',
					"farmWorkItemName": '',
					"remark": "",
					"plantingBatchId": '',
					"plantingBatchName": '',
					"price": '',
					"workOrderId": ''
				},
				status: 1,
				ttt: 5,
				personResources: [],
				equipmentResources: [],
				suppliesResources: [],
				
				voicePath: "",
				
				isRecord: false, // 记录状态,录音中或者是未开始
				
				intervalTime: 0,
				
				timer: null,
				voiceTime:0

			};
		},
		onLoad(option) {
			let _this = this;
			
			/* 录音 */
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					recorderManager.onStop(function(res) {
						_this.voicePath = res.tempFilePath;	
						_this.voiceTime = res.duration
					});
				}
			})
			
			this.params.workOrderId = Number(option.workOrderId);
			//this.params.plantingBatchId = Number(option.data.plantingBatchId);
			this.status = option.workOrderStatus;
			this.$nextTick(function() {
				_this.initSelect();


			})
		},
		computed: {
			intIntervalTime() {
				// 用于显示整数的秒数
		
				return Math.round(this.intervalTime);
			}
		},
		methods: {
			startRecord() {
					
				this.timer = setInterval(() => {
					this.intervalTime += 0.5;
			
					if (this.intervalTime >= 0.5 && !this.isRecord) {
						//如果用户录制的时间太短,就不会去开启录音, 因为有个bug: recorderManager.stop()在短时间内开启在关闭的话,实际上他还在不停地录音,不知道你们有没有遇到过
						this.isRecord = true;
			
						this.intervalTime = 0;
			
						recorderManager.start({
							format: "mp3"
						});
					}
				}, 300);
			},
			
			endRecord() {
				if (this.intervalTime <= 0.5) {
					uni.showToast({
						title: '录音太短了',
						icon: 'none',
						})
				
				}
			
				clearInterval(this.timer);
			
				if (this.isRecord) {
					// setTimeout(() => {
						recorderManager.stop();
			
						this.isRecord = false;
			
					// 	console.log(this.isRecord);
					// }, 200); //延迟小段时间停止录音, 更好的体验
				}
			},
			
			playVoice() {
				console.log("播放录音");
			
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
			
					innerAudioContext.play();
				}
			},
			closeVoice(){
					clearInterval(this.timer);
					this.voicePath ='';
					this.voiceTime = 0;
					
			},
			// NumSteps() {
			// 	this.$api.addFarmWorkBase(this.params).then(res => {
			// 		this.farmWorkRecordId =res.data.data.farmWorkRecordId;
			// 		this.acreage =res.data.data.acreageCount;
			// 		this.stepsNum = this.stepsNum == this.numList.length - 1 ? 0 : this.stepsNum + 1
			// 	});
			// },
			farmWorkRecordPicsStrValue(e) {
				this.params.remark = e.detail.value
			},
			initData() {
				this.$apiYZX.organUserWorkOrderManageGetById({
					id: this.params.workOrderId
				}).then(res => {
					this.params.remark = res.data.data.remark;

					this.params.plantingBatchId = res.data.data.plantingBatchId || this.batchData[0].id;
					this.params.plantingBatchName = res.data.data.plantingBatchName || this.batchData[0].name;
					this.params.farmWorkItemId = res.data.data.farmWorkItemId || this.farmData[0].id;
					this.params.farmWorkItemName = res.data.data.farmWorkItemName || this.farmData[0].name;
					this.params.price = res.data.data.price || '';
					//人资personResourcesBudget;
					//设备 equipmentResourcesBudget;
					//农资suppliesResourcesBudget;

					this.personResources = res.data.data.personResources
					this.equipmentResources = res.data.data.equipmentResources
					this.suppliesResources = res.data.data.suppliesResources
				})

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
				// 编辑获取信息
				if (this.status == 0) {
					this.initData();
				}
				/* 編輯獲取基本信息*/

				// if (this.status == 0) {
				// 	console.log(11111)
				// 	this.$api.getByWorkId({
				// 		id: this.params.workOrderId
				// 	}).then(res => {
				// 		debugger

				// 		this.params.remark = res.data.data.remark;

				// 		this.params.plantingBatchId = res.data.data.plantingBatchId || this.batchData[0].id;
				// 		this.params.plantingBatchName = res.data.data.plantingBatchName || this.batchData[0].name;
				// 		this.params.farmWorkItemId = res.data.data.farmWorkItemId || this.farmData[0].id;
				// 		this.params.farmWorkItemName = res.data.data.farmWorkItemName || this.farmData[0].name;
				// 		this.params.price = res.data.data.price || '';


				// 	});
				// }
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
				this.params.plantingBatchId = this.batchData[this.plantingBatchValue].id;
				this.params.plantingBatchName = this.batchData[this.plantingBatchValue].name;

			},
			farmChange(e) {

				this.farmWorkItemValue = e.detail.value;
				this.params.farmWorkItemId = this.farmData[this.farmWorkItemValue].id
				this.params.farmWorkItemName = this.farmData[this.farmWorkItemValue].name

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
