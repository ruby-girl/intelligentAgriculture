<template>
	<view class="padding">
		<view class="text-black text-lg" style="padding-top:8px">
			基本资料
		</view>
		<view class="border-bottom">
			<view><i class="red">*</i><text class="text-margin">真实姓名</text></view>
			<input placeholder="请输入真实姓名" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><i class="red">*</i><text class="text-margin">身份证号</text></view>
			<input placeholder="请输入身份证号" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><i class="red">*</i><text class="text-margin">手机号码</text></view>
			<input placeholder="请输入手机号码" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="text-margin">邮箱地址</text></view>
			<input placeholder="请输入邮箱地址" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><i class="red">*</i><text class="text-margin">教育程度</text></view>
			<view class="cu-form-group">
				<picker @change="pickerChange($event)" :value="jy" :range="educationList" range-key="name">
					<view class="uni-input">{{educationList[jy].name}}</view>
				</picker>
			</view>

		</view>
		<view class="border-bottom">
			<view><i class="red">*</i><text class="text-margin">教育程度</text></view>
			<view class="cu-form-group">
				<picker mode="multiSelector" @change="MultiChange"  @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
			</view>
		
		</view>
		<view class="border-bottom">
			<view><text class="text-margin">详细地址</text></view>
			<input placeholder="请输入详细地址" name="input"></input>
		</view>
		<view>
			<view class="text-black text-lg" style="padding-top:8px">身份证照片上传</view>
			<view class="cu-form-group" style="padding-bottom:8px">
				<view><i class="red">*</i><text class="text-margin">身份证人面像：</text></view>
				<view style="padding-right: 25%;"><i class="red">*</i><text class="text-margin">身份证国徽像：</text></view>
			</view>
			<!-- 左 -->
			<view>
				<view class="cu-form-group">
					<view class="grid col-2 grid-square flex-sub">				
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
					<view class="grid col-2 grid-square flex-sub">					
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>				
				</view>
			</view>
			
		</view>	
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn">
			提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				educationList: [{
						name: '小学',
						value: 1
					},
					{
						name: '初中',
						value: 2
					},
					{
						name: '高中',
						value: 3
					},
					{
						name: '中专',
						value: 4
					},
					{
						name: '大专',
						value: 5
					},
					{
						name: '本科',
						value: 6
					},
					{
						name: '硕士',
						value: 7
					},
					{
						name: '博士',
						value: 8
					}
				],
				jy: 0,
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
					['猪肉绦虫', '吸血虫']
				],
				multiIndex: [0, 0, 0],
				imgList: [],
			}
		},
		methods: {
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
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
								data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
								break;
							case 1:
								data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
								data.multiArray[2] = ['鲫鱼', '带鱼'];
								break;
						}
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
					case 1:
						switch (data.multiIndex[0]) {
							case 0:
								switch (data.multiIndex[1]) {
									case 0:
										data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
										break;
									case 1:
										data.multiArray[2] = ['蛔虫'];
										break;
									case 2:
										data.multiArray[2] = ['蚂蚁', '蚂蟥'];
										break;
									case 3:
										data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
										break;
									case 4:
										data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
										break;
								}
								break;
							case 1:
								switch (data.multiIndex[1]) {
									case 0:
										data.multiArray[2] = ['鲫鱼', '带鱼'];
										break;
									case 1:
										data.multiArray[2] = ['青蛙', '娃娃鱼'];
										break;
									case 2:
										data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
										break;
								}
								break;
						}
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			pickerChange: function(e, val) {
				this.jy= e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
		padding: 5px 0;
	}

	.red {
		color: red;
	}

	.text-margin {
		margin-left: 5px;
		font-size: 15px;
	}
	.cu-form-group{
		min-height: 0;
		padding:0;
	}
	.cu-form-group .uni-input{
		height:33px;
	}
	.cu-form-group uni-picker .picker,.cu-form-group uni-picker::after{
		line-height: 34px;
		text-align: left;
		padding-left: 7px;
	}
</style>
