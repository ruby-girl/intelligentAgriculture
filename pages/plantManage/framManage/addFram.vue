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
						<view class="bg-img" v-for="(item,index) in imgList" :key="index"  :data-url="imgList[index]">
							<image :src="imgUrl+imgList[index]" mode="aspectFill"></image>
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
				
			</view>
	
		</view>


		<second-model :workOrderId="params.workOrderId" :plantingBatchId="params.plantingBatchId" :status="status" :formObj="params"
		 :personResources="personResources"  :imgList="imgList" :equipmentResources="equipmentResources" :suppliesResources="suppliesResources"></second-model>





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
					"farmWorkRecordPicsStr": '',
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
				voiceTime:0,
				execuResultData:{},
				imgUrl:getApp().globalData.imgUrl

			};
		},
		onLoad(option) {
		
		  
			let _this = this;
			
			// /* 录音 */
			// uni.authorize({
			// 	scope: 'scope.userLocation',
			// 	success() {
			// 		recorderManager.onStop(function(res) {
			// 			_this.voicePath = res.tempFilePath;	
			// 			_this.voiceTime = res.duration
			// 		});
			// 	}
			// })
			
			this.params.workOrderId = Number(option.workOrderId);
			this.params.plantingBatchId = Number(option.plantingBatchId);
			this.status = option.workOrderStatus;
			this.$nextTick(function() {
				_this.initSelect();


			})
		},
	
		methods: {
			
			farmWorkRecordPicsStrValue(e) {
				this.params.remark = e.detail.value
			},
			initData() {
				this.$apiYZX.organUserWorkOrderManageGetById({
					id: this.params.workOrderId
				}).then(res => {
					let resdata = res.data.data.farmWorkRecordVO;
					//this.execuResultData = res.data.data.farmWorkRecordVO;
					console.log(resdata)
					this.params.remark = resdata.remark;
					this.params.plantingBatchId = resdata.plantingBatchId || this.batchData[0].id;
					this.params.plantingBatchName = resdata.plantingBatchName || this.batchData[0].name;
					this.params.farmWorkItemId = resdata.farmWorkItemId || this.farmData[0].id;
					this.params.farmWorkItemName = resdata.farmWorkItemName || this.farmData[0].name;
					if(resdata.farmWorkRecordPics){
						resdata.farmWorkRecordPics.forEach((a)=>{
							this.imgList.push(a.path)
						})
					}
					
					
					this.params.farmWorkRecordPicsStr =this.imgList.join(',')
					//人资personResourcesBudget;
					//设备 equipmentResourcesBudget;
					//农资suppliesResourcesBudget;

					this.personResources = resdata.personResources
					this.equipmentResources = resdata.equipmentResources
					this.suppliesResources = resdata.suppliesResources
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
				
			},
			ChooseImage() {
				   let that = this
				    wx.chooseImage   ({
				      count: 1,
				      sizeType: ['original', 'compressed'],
				      sourceType: ['album'],
				      success: (res) => {
				        let URL =  getApp().globalData.baseUrl+'/uploadFile/plantingUpload';
				        wx.uploadFile({
				          url: URL,
				          filePath: res.tempFilePaths[0],
				          name: 'files',
				          //formData: { type: 'headImg' },
				          success: function (resData) {
							
						  
							  let data =  JSON.parse(resData.data).data
							  if (data) {
							  			that.imgList = that.imgList.concat(data)
							  		} else {
							  			that.imgList = res.tempFilePaths
							  		}
				            
				          }
				        })
				      }
				    })
				
			},
			ViewImage(e) {
				console.log(e)
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			/*  http://localhost:8090/api/uploadFile/baseinfo/imgs */
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
