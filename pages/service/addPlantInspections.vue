<template>
	<view class="container">
		<!-- 新增巡查工单 -->
		<view class="cu-form-group">
			<input placeholder="请输入反馈标题" v-model="obj.name" ref="titleInput" name="input" @input="titleInput"></input>
		</view>
		<view class="cu-form-group">
			<textarea @input="textareaAInput" v-model="obj.feedbackContent" placeholder="请输入反馈内容" maxlength="100"></textarea>
		</view>
		<view class="cu-form-group" @click="toList">
			<view class="title">种植批次</view>
			<input disabled="true" v-model="obj.plantingBatchName" class="form-input-left" placeholder="请选择种植批次" name="input"></input>
			<image class="right-jt" src="@/static/plant/nav_icon_back@2x.png" mode="widthFix">
		</view>
		<view class="cu-bar bg-white margin-top uploader-border">
			<view class="action">
				上传图片
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index"  :data-url="imgList[index]">
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
		<view style="width: 100%;">
			<button @click="addFunc" class="cu-btn block bg-green margin-tb-sm lg add-btn">
				新建巡查工单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchB: true,
				obj: {
					name: '',
					baseId: '',
					workOrderType: 1, //1未处理
					feedbackContent: '', //巡查内容
					plantingBatchId: '', //批次ID
					plantingBatchName: '', //批次名称
					initiatorId: '',
					wordOrderPicStr:''//图片
				},
				imgList: [],
				imgArr:[],
				imgUrl:getApp().globalData.imgUrl
			};
		},
		onLoad(option) {
			let _this = this
			uni.getStorage({
				key: 'baseId',
				success: function(res) {
					_this.obj.baseId = res.data
					_this.obj.plantingBatchName = option.name || ''
					_this.obj.plantingBatchId = option.id || ''
					_this.obj.feedbackContent = option.content || ''
					_this.obj.name = option.title || ''

				}
			});
			uni.getStorage({
				key: 'organUserId',
				success: function(res) {
					_this.obj.initiatorId = res.data
				}
			})
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let that=this
						 let URL =  getApp().globalData.baseUrl+'/uploadFile/plantingUpload';
				        wx.uploadFile({
				          url: URL,
				          filePath: res.tempFilePaths[0],
				          name: 'files',
				          //formData: { type: 'headImg' },
				          success: function (resData) {		  
							  let data =  JSON.parse(resData.data).data
							  if (data) {
							  		that.imgList = that.imgList.concat(that.imgUrl+data)
									that.imgArr.push(data)
							  	} else {
							  		that.imgList = res.tempFilePaths
								}
				          }
				        })
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
							this.imgArr.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			titleInput(e) {
				let _this = this
				setTimeout(() => {
					_this.obj.name = e.detail.value
				}, 0)
			},
			textareaAInput(e) {
				let _this = this
				setTimeout(() => {
					_this.obj.feedbackContent = e.detail.value
				}, 0)
			},
			toList() {
				uni.redirectTo({
					url: 'selectBatch?id=' + this.obj.plantingBatchId + '&name=' + this.obj.plantingBatchName + '&title=' + this.obj
						.name +
						'&content=' + this.obj.feedbackContent
				});
			},
			test() {
				if (!this.obj.name || !this.obj.feedbackContent || !this.obj.plantingBatchId) {
					uni.showToast({
						title: '请完整填写信息',
						icon: 'none'
					})
					return false
				}
				return true
			},
			addFunc() {
				if (!this.test()) return;
				this.obj.wordOrderPicStr=this.imgArr.join();
				this.$apiYZX.addOrganUserWorkOrderManage(this.obj).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							success() {
								uni.redirectTo({
									url: 'plantInspections'
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
	page,
	.container {
		background: #fff;
		padding: 0 15rpx;
	}

	.right-jt {
		transform: rotate(180deg);
		width: 16px;
	}

	.add-btn {
		width: 90%;
		left: 5%;
		top: 800rpx;
		position: absolute;
	}

	.uploader-border {
		border-top: 1px solid #eee;
		margin-top: 0;
	}

	.action {
		color: #333;
		font-size: 30rpx !important;
	}
</style>
