<template>
	<view class="padding container">
		<view class="text-black text-lg" style="padding-top:8px">
			基本资料
		</view>
		<view class="border-bottom">
			<view><text class="red">*</text><text class="text-margin">真实姓名</text></view>
			<input placeholder="请输入真实姓名" v-model="userInfo.name" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="red">*</text><text class="text-margin">身份证号</text></view>
			<input placeholder="请输入身份证号" v-model="userInfo.idcard" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="text-margin">邮箱地址</text></view>
			<input placeholder="请输入邮箱地址" v-model="userInfo.email" name="input"></input>
		</view>
		<view class="border-bottom">
			<view><text class="red">*</text><text class="text-margin">教育程度</text></view>
			<view class="cu-form-group">
				<picker @change="pickerChange($event)" :value="jy" :range="educationList" range-key="name">
					<view class="uni-input">{{educationList[jy].name}}</view>
				</picker>
			</view>

		</view>
		<view class="border-bottom">
			<view><text class="red">*</text><text class="text-margin">所在区域</text></view>
			<view class="cu-form-group">
				<picker mode="multiSelector" @change="MultiChange" :range-key="'name'" @columnchange="MultiColumnChange" :value="multiIndex"
				 :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
					</view>
				</picker>
			</view>

		</view>
		<view class="border-bottom">
			<view><text class="text-margin">详细地址</text></view>
			<input placeholder="请输入详细地址" v-model="userInfo.addr" name="input"></input>
		</view>
		<view>
			<view class="text-black text-lg" style="padding-top:8px">身份证照片上传</view>
			<view class="cu-form-group" style="padding-bottom:8px">
				<view><text class="red">*</text><text class="text-margin">身份证人面像：</text></view>
				<view style="padding-right: 25%;"><text class="red">*</text><text class="text-margin">身份证国徽像：</text></view>
			</view>
			<!-- 左 -->
			<view>
				<view class="cu-form-group">
					<view class="grid col-2 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index"  :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage(1)" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
					<view class="grid col-2 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgListIdCard" :key="index"  :data-url="imgListIdCard[index]">
							<image :src="imgListIdCard[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImgIdCard" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage(2)" v-if="imgListIdCard.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<button class="cu-btn block bg-green margin-tb-sm lg positon-btn" @click="submitFunc">
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
						name: '中专/高中',
						value: 3
					},
					{
						name: '专科',
						value: 4
					},
					{
						name: '本科',
						value: 5
					},
					{
						name: '硕士研究生',
						value: 6
					},
					{
						name: '博士研究生',
						value: 7
					},
					{
						name: '博士后',
						value: 8
					}
				],
				jy: 1,
				multiArray: [],
				multiIndex: [],
				multiIndexsave: [],
				imgList: [],
				imgListIdCard: [],
				userInfo: {},
				init: true,
				provincecode: '',
				citycode: '',
				areacode: '',
				imgUrl: getApp().globalData.imgUrl
			}
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key: 'ddwb',
				success: function(res) {
					_this.$apiYZX.getUserById(res.data.userid).then(res => {
						_this.userInfo = res.data.data
						if(res.data.data.idcardfront){
							_this.imgList.push(_this.imgUrl+res.data.data.idcardfront)
						}
						if(res.data.data.idcardreverse){
							_this.imgListIdCard.push(_this.imgUrl+res.data.data.idcardreverse)
						}
						// 根据code设置省市县默认值 
						_this.provincecode = res.data.data.provincecode
						_this.citycode = res.data.data.citycode
						_this.areacode = res.data.data.areacode
						_this.jy = _this.educationList.findIndex(item => {
							return item.value == res.data.data.education
						})
						if (_this.jy == -1) {
							_this.jy = 0
						}
						_this.$apiYZX.provinces().then(res => {
							let arr = []
							res.data.data.forEach(item => {
								let obj = {
									name: item.name,
									id: item.code
								}
								arr.push(obj)
							})
							_this.multiArray[0] = arr;
							let code;
							if (_this.provincecode) {
								_this.getByProvinceCode(_this.provincecode,_this.citycode)
							} else {
								_this.getByProvinceCode(res.data.data[0].code)
							}

						})
					})
				}
			});
		},
		methods: {
			getByProvinceCode(code,n) {//n有市的默认值
				this.$apiYZX.getByProvinceCode({
					provinceCode: code
				}).then(res => {
					let arr = []
					res.data.data.forEach(item => {
						let obj = {
							name: item.name,
							id: item.code
						}
						arr.push(obj)
					})
					this.multiArray[1] = arr;
					if(n){
						this.getByCityCode(n)
					}else{
						this.getByCityCode(res.data.data[0].code)
					}
					
				})
			},
			getByCityCode(code) {
				this.$apiYZX.getByCityCode({
					cityCode: code
				}).then(res => {
					let arr = []
					res.data.data.forEach(item => {
						let obj = {
							name: item.name,
							id: item.code
						}
						arr.push(obj)
					})
					this.multiArray[2] = arr;		
					if (this.init && this.provincecode) { //如果有默认值
						let code1 = this.multiArray[0].findIndex((item, i) => {
							return item.id == this.provincecode
						})
						let code2 = this.multiArray[1].findIndex((item, i) => {
							return item.id == this.citycode
						})
						let code3 = this.multiArray[2].findIndex((item, i) => {
							return item.id == this.areacode
						})
						
						this.multiIndex = [code1, code2, code3]
						this.init = false
					} else if (this.init && !this.provincecode) {
						this.multiIndex = [0, 0, 0]
						this.init = false
					} else {
						this.multiIndex = [...this.multiIndexsave]
					}
				})
			},
			ChooseImage(n) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let that = this
						let URL = getApp().globalData.baseUrl + '/uploadFile/plantingUpload';
						wx.uploadFile({
							url: URL,
							filePath: res.tempFilePaths[0],
							name: 'files',
							//formData: { type: 'headImg' },
							success: function(resData) {
								let data = JSON.parse(resData.data).data
								if (data && n == 1) {
									that.imgList = that.imgList.concat(that.imgUrl+data)
									that.userInfo.idcardfront=data
								} 					
								if (data && n == 2) {
									that.imgListIdCard = that.imgListIdCard.concat(that.imgUrl+data)
									that.userInfo.idcardreverse=data
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
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.userInfo.idcardfront=''
						}
					}
				})
			},
			DelImgIdCard(e){
				uni.showModal({
					title: '删除',
					content: '确定要删除此图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgListIdCard.splice(e.currentTarget.dataset.index, 1)
							this.userInfo.idcardreverse=''
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
				this.multiIndex[e.detail.column] = e.detail.value;
				this.multiIndexsave = [...this.multiIndex]
				switch (e.detail.column) {
					case 0:
						this.getByProvinceCode(data.multiArray[0][data.multiIndex[0]].id)
						break;
					case 1:
						this.getByCityCode(data.multiArray[1][data.multiIndex[1]].id)
						break;
				}

			},
			pickerChange: function(e, val) {
				this.jy = e.target.value
			},
			submitFunc() {
				if (!this.testInput()) return false;
				let test = this.isCardID(this.userInfo.idcard);
				if (!test) {
					uni.showToast({
						title: '请填写正确的身份证号码',
						icon: 'none'
					});
					return false;
				}
				this.getSelectValue()
				let _this = this
				this.$apiYZX.userPerfectInfo(this.userInfo).then(res => {
					if (res.data.code == 200) {
						let ddwb = uni.getStorageSync('ddwb')
						if (ddwb.name !== this.userInfo.name) {
							ddwb.name = this.userInfo.name
							uni.setStorage({
								key: 'ddwb',
								data: ddwb,
								success() {
									_this.toPersonel()
								}
							})
						} else {
							_this.toPersonel()
						}

					}
				})
			},
			toPersonel() {
				uni.showToast({
					title: '编辑成功',
					icon: 'success',
					success() {
						uni.switchTab({
							url: '../personal/personal'
						})
					}
				})
			},
			getSelectValue() { //获取教育程度，所在区域的值
				let item = this.educationList.filter((item, i) => {
					return i == this.jy
				})
				this.userInfo.education = item[0].value
				let code1 = this.multiArray[0].filter((item, i) => {
					return i == this.multiIndex[0]
				})
				let code2 = this.multiArray[1].filter((item, i) => {
					return i == this.multiIndex[1]
				})
				let code3 = this.multiArray[2].filter((item, i) => {
					return i == this.multiIndex[2]
				})
				this.userInfo.provincecode = code1[0].id
				this.userInfo.citycode = code2[0].id
				this.userInfo.areacode = code3[0].id
			},
			testInput() { //验证输入框内容
				if (!this.userInfo.name || !this.userInfo.idcard || !this.userInfo.idcardfront || !this.userInfo.idcardreverse) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					})
					return false
				}

				return true
			},
			isCardID(idcode) {
				// 加权因子
				var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				// 校验码
				var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
				var code = idcode + "";
				var last = idcode[17]; //最后一位
				var seventeen = code.substring(0, 17);
				// ISO 7064:1983.MOD 11-2
				// 判断最后一位校验码是否正确
				var arr = seventeen.split("");
				var len = arr.length;
				var num = 0;
				for (var i = 0; i < len; i++) {
					num = num + arr[i] * weight_factor[i];
				}
				// 获取余数
				var resisue = num % 11;
				var last_no = check_code[resisue];
				var idcard_patter =
					/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		background: #fff;
		height: 100vh;
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

	.cu-form-group {
		min-height: 0;
		padding: 0;
	}

	.cu-form-group .uni-input {
		height: 33px;
	}

	.cu-form-group uni-picker .picker,
	.cu-form-group uni-picker::after,
	.cu-form-group picker .picker,
	.cu-form-group picker .picker::after {
		line-height: 34px;
		text-align: left;
		padding-left: 7px;
	}

	.cu-form-group picker::after {
		top: -9rpx;
	}

	.cu-form-group picker .picker {
		text-align: left;
	}
</style>
