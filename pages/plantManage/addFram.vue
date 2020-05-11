<!-- 添加农事 -->
<template>
	<view class="add-fram">
		<view class="section">
			<view class="label">
				<label ><text class="line"></text><b>基础信息</b></label>
				
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">
					种植批次
				</view>
				<picker @change="batchChange" :value="ttt" :range="batchData">
					<view class="picker">

						{{ttt>-1?batchData[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">
					操作类型
				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">
						{{ttt>-1?picker[ttt]:'请选择'}}
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
				<textarea maxlength="-1" @input="textareaBInput" placeholder="请输入反馈内容"></textarea>
			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
					<label><text class="line"></text><b>人工（0）数组 </b></label>
					<view class="display-flex">
						<view style="color: red;margin-right: 8px;">
							<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
						</view>
						<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon"></image> 添加
					</view>
					</view>
			</view>
		
			<view class="cu-form-group ">
				<view class="title"> 人员类型 </view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">
					人工（亩）
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					工价（元）

				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					费用合计

				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
					<label><text class="line"></text><b>农资（0）数组 </b></label>
					<view class="display-flex">
						<view style="color: red;margin-right: 8px;">
							<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
						</view>
						<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon"></image> 添加
					</view>
					</view>
			</view>
	
			<view class="cu-form-group ">
				<view class="title">
					资料名称
				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">

						{{ttt>-1?picker[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					生产厂家

				</view>
				<picker @change="PickerChange" :value="ttt" :range="picker">
					<view class="picker">

						{{ttt>-1?picker[ttt]:'请选择'}}

					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">

					每亩用量

				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">


					单价（元）


				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">


					面积（亩）


				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">



					费用



				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
					<label><text class="line"></text><b>设备（0）数组 </b></label>
					<view class="display-flex">
						<view style="color: red;margin-right: 8px;">
							<image src="/static/plant/icon_del@2x.png" class="imgIcon"></image> 删除
						</view>
						<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon"></image> 添加
					</view>
					</view>
			</view>
		
			<view class="cu-form-group ">
				<view class="title"> 
                                设备名称 
                             </view>
			<picker @change="PickerChange" :value="ttt" :range="picker">
				<view class="picker">
			
					{{ttt>-1?picker[ttt]:'请选择'}}
			
				</view>
			</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">			
                                每亩收费（元）                             
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">
                                面积（亩）                         
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">		
                                费用                             
				</view>
				<input placeholder="请输入" name="input"></input>
			</view>
		</view>

		<button class="cu-btn block bg-green  lg">提交</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ttt: -1,
				batchData:[],
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				imgList: [],
			};
		},
		onLoad() {
			this.initSelect()
		},
		methods: {
			initSelect(){
				this.$api.getPlantingBatchs({baseId:23}).then(res=>{
					this.batchData =  res.data.data
				})	
				this.$api.getFarmWorkItems().then(res=>{
					
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
			batchChange(e){
				 
			},
			PickerChange(e) {
				this.ttt = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.add-fram {
		.cu-btn{
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
		.imgIcon{
			width: 40rpx;
			height: 40rpx;
				vertical-align: text-bottom;
		}
		.section {
			background-color: #fff;
			padding: 30rpx;
			margin-bottom: 30rpx;
		}

		.label {

			
		
			border-bottom: 1px solid #E1E1E1;
			padding-bottom: 16rpx;
			margin-bottom: 20rpx;
	        b{
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
