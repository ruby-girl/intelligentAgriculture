<template>
	<view class="add-fram">
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">人工（{{personList.length}}） </text></label>
				<view class="display-flex">

					<view class="cr" @click="personAdd">
						<view class="cuIcon-roundadd imgIcon" style="font-size: 20px;"></view>添加
					</view>
				</view>
			</view>
			<view v-for="(item,index) in personList" :key='index' class="item-border">

				<view class="display-flex justify-content-flex-justify item-title">
					<view>
						{{index+1}}.人工
					</view>
					<veiw>
						<text class="iconfont iconquxiao imgIcon " @click="personDelete('personList',index)"></text>
					</veiw>
				</view>
				<view class="cu-form-group ">
					<view class="title"> 人员类型 </view>
					<input placeholder="请输入" :value="item.name" @input="changeInput($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						人工（亩）
					</view>
					<input placeholder="请输入" type="digit" :value="item.labour" @input="changeInput($event,'labour',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						工价（元）

					</view>
					<input placeholder="请输入" type="digit" :value="item.labourCost" @input="changeInput($event,'labourCost',index)"
					 name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						面积（亩）

					</view>
					<input disabled :value="acreage" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						费用合计

					</view>
					<input disabled :value="item.personFeeCount" name="input"></input>
				</view>
			</view>

		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">农资（{{suppliesList.length}}） </text></label>
				<view class="display-flex">
					<view class="cr" @click="suppliesAdd">
						<view class="cuIcon-roundadd imgIcon" style="font-size: 20px;"></view>添加
					</view>

				</view>
			</view>
			<view v-for="(item,index) in suppliesList" :key='index' class="item-border">
				<view class="display-flex justify-content-flex-justify item-title">
					<view>
						{{index+1}}.农资
					</view>
					<veiw>

						<text class="iconfont iconquxiao imgIcon " @click="personDelete('suppliesList',index)"></text>

					</veiw>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						资料名称
					</view>
					<input placeholder="请输入" :value="item.name" @input="changeInput2($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						生产厂家

					</view>
					<picker @change="companyChange($event,'supplierName',index)" range-key="name" :value="item.supplierName" :range="companySelectList">
						<view class="picker">
							{{item.supplierName}}

						</view>
					</picker>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						单位

					</view>
					<picker @change="unitsChange($event,'unit',index)" range-key="name" :value="item.unit" :range="unitSelectList">
						<view class="picker">
							{{item.unit}}


						</view>
					</picker>

				</view>
				<view class="cu-form-group ">
					<view class="title">

						每亩用量

					</view>

					<input placeholder="请输入" :value="item.unitArea" @input="changeInput2($event,'unitArea',index)" name="input"></input>

				</view>
				<view class="cu-form-group ">
					<view class="title">


						单价（元）


					</view>
					<input placeholder="请输入" :value="item.price" @input="changeInput2($event,'price',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">


						面积（亩）


					</view>
					<input disabled :value="acreage" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						费用
					</view>
					<input disabled :value="item.suppliesFeeCount" name="input"></input>
				</view>

			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">设备（{{equitmenList.length}}） </text></label>
				<view class="display-flex">
					<view class="cr" @click="equitmenAdd">
						<view class="cuIcon-roundadd imgIcon" style="font-size: 20px;"></view>添加
					</view>

				</view>
			</view>
			<view v-for="(item,index) in equitmenList" :key='index' class="item-border">
				<view class="display-flex justify-content-flex-justify item-title">
					<view>
						{{index+1}}.设备
					</view>
					<veiw>
						<text class="iconfont iconquxiao imgIcon " @click="personDelete('equitmenList',index)"></text>
					</veiw>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						设备名称
					</view>
					<input placeholder="请输入" :value="item.name" @input="changeInput3($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						每亩收费（元）
					</view>
					<input placeholder="请输入" :value="item.price" @input="changeInput3($event,'price',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						面积（亩）
					</view>
					<input disabled :value="acreage" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						费用
					</view>
					<input disabled :value="item.feeCount" name="input"></input>
				</view>
			</view>

		</view>
		<button class="cu-btn block bg-green  lg" @click="saveForm"> 提交 </button>
		<neil-modal :show="showModel" title="提示" content="是否删除？" @cancel="bindBtn" @confirm="sureDeleteFun">
		</neil-modal>

	</view>

</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';

	export default {
		components: {
			neilModal
		},
		props: ['workOrderId', 'plantingBatchId', 'formObj', 'status', 'suppliesResources', 'personResources',
			'equipmentResources','imgList'
		],
		data() {
			return {

				showModel: false,

				personList: [],

				nowDeletePersonIndex: '',
				nowName: '',

				suppliesList: [],
				companySelval: 1,
				companySelectList: [],
				unitSelval: '',
				unitSelectList: [],

				equitmenList: [],
				farmWorkRecordId: '',
				acreage: 0
			};
		},

		created() {
			let _this = this;


			this.$nextTick(function() {
				_this.initSelect();

			})
			setTimeout(function() {
				_this.initData()
			}, 700);



		},
		methods: {
			initData() {

				if (this.formObj.workOrderId) {


					this.$api.getFarmWorkTabelList({
						workOrderId: this.formObj.workOrderId,
						plantingBatchId: this.formObj.plantingBatchId
					}).then(res => {
						this.acreage = res.data.data.acreageCount || 0;
						/* 编辑 */
						if (this.status == 0) {
							this.equitmenList = this.equipmentResources;
							this.personList = this.personResources;
							this.suppliesList = this.suppliesResources;
						} else {
							this.equitmenList = res.data.data.equipmentResources;
							this.personList = res.data.data.personResources;
							this.suppliesList = res.data.data.suppliesResources;
						}


					})


				}

			},
			initSelect() {
				this.$api.getSuppliersCompany().then(res => {
					this.companySelectList = res.data.data;
				})
				this.$api.getSuppliersUnits().then(res => {
					this.unitSelectList = res.data.data;
				})
			},
			saveForm() {

            
				let obj = {
					"baseId": uni.getStorageSync('baseId'),
					"executionUserId": uni.getStorageSync('organUserId'),
					"remark": this.formObj.remark,
					"plantingBatchId": this.formObj.plantingBatchId,
					"plantingBatchName": this.formObj.plantingBatchName,
					"farmWorkItemId": this.formObj.farmWorkItemId,
					"farmWorkItemName": this.formObj.farmWorkItemName,
					"workOrderId": this.formObj.workOrderId,
					 farmWorkRecordPicsStr:this.imgList?this.imgList.join(','):'',
					equipmentResources: this.equitmenList,
					personResources: this.personList,
					suppliesResources: this.suppliesList,
				}
				

				if (!this.formObj.plantingBatchId) {
					uni.showToast({
						title: "请选择种植批次",
						icon: "none"
					});
					return;
				}
				if (!this.formObj.farmWorkItemId) {
					uni.showToast({
						title: "请选择操作类型",
						icon: "none"
					});
					return;
				}


				this.$api.addFarmWorkBase(obj).then(res => {
					uni.showToast({
						title: '提交成功',
						icon: 'success',
						success() {
							uni.navigateTo({
								url: '/pages/plantManage/workOrder?type=0&baseId=' + uni.getStorageSync('baseId')
							});

						}
					})

				});
			},
			/* 人工 */
			personAdd() {
				let obj = {
					"name": "",
					"labour": '',
					"labourCost": '',
					"acreageCount": this.acreage,
					"personFeeCount": '',

					"workOrderId": this.workOrderId
				}
				this.personList.push(obj)
			},
			/* 删除人工 */
			personDelete(name, index) {
				this.showModel = true;
				this.nowName = name;
				this.nowDeletePersonIndex = index;
			},
			bindBtn() {
				this.showModel = false;
			},
			sureDeleteFun() {
				this.showModel = false;
				this[this.nowName].splice(this.nowDeletePersonIndex, 1)
			},
			/* 农资 */
			suppliesAdd() {
				let obj = {
					"name": "",
					"supplierName": this.companySelectList ? this.companySelectList[0].name : '',
					"supplierCode": this.companySelectList ? this.companySelectList[0].id : '',
					"unit": this.unitSelectList ? this.unitSelectList[0].name : '',
					"unitArea": "",
					"price": "",
					"acreageCount": this.acreage,
					"suppliesFeeCount": "",

					"workOrderId": this.workOrderId
				}
				this.suppliesList.push(obj)

			},
			companyChange(e, n, i) {
				this.companySelval = e.detail.value
				this.suppliesList[i][n] = this.companySelectList[e.detail.value].name
			},
			unitsChange(e, n, i) {
				console.log(11)
				this.unitSelval = e.detail.value
				this.suppliesList[i][n] = this.unitSelectList[e.detail.value].name
			},
			/* 设备 */
			equitmenAdd() {
				let obj = {
					"name": "",
					"price": "",
					"acreageCount": this.acreage,
					"feeCount": "",

					"workOrderId": this.workOrderId
				}
				this.equitmenList.push(obj)
			},

			/* 人工输入框数据 */
			changeInput(e, v, index) {
				let acreage = Number(this.acreage);
				if (v == 'labour' && this.personList[index]['labourCost']) {

					let labour = e.detail.value;
					let labourCost = this.personList[index]['labourCost'];
					this.personList[index]['personFeeCount'] = acreage * labour * labourCost

				}
				if (v == 'labourCost' && this.personList[index]['labour']) {


					let labour = this.personList[index]['labour'];

					let labourCost = e.detail.value;
					this.personList[index]['personFeeCount'] = acreage * labour * labourCost



				}

				this.personList[index][v] = e.detail.value;

			},
			/* 农资  输入框数据 */
			changeInput2(e, v, index) {
				let acreage = Number(this.acreage);
				if (v == 'unitArea' && this.suppliesList[index]['price']) {
					let unitArea = e.detail.value;
					let price = this.suppliesList[index]['price'];
					this.suppliesList[index]['suppliesFeeCount'] = acreage * unitArea * price
				}
				if (v == 'price' && this.suppliesList[index]['unitArea']) {
					let unitArea = this.suppliesList[index]['unitArea'];
					let price = e.detail.value;
					this.suppliesList[index]['suppliesFeeCount'] = acreage * unitArea * price
				}
				this.suppliesList[index][v] = e.detail.value;
			},
			/* 设备  输入框数据 */
			changeInput3(e, v, index) {
				let acreage = Number(this.acreage);
				if (v == 'price') {

					let price = e.detail.value;
					this.equitmenList[index]['feeCount'] = acreage * price

				}
				this.equitmenList[index][v] = e.detail.value;
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
			display: inline-block;
			vertical-align: middle;
			margin-right: 3px;
			color: #00AE66;
			line-height: 1;

		}

		.section {
			padding: 30rpx;
			margin-bottom: 30rpx;
		}

		.fb {
			font-weight: bold;
		}

		.label {

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

		.item-border {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			margin-bottom: 30rpx;

			.item-title {
				background-color: #EEFEF0;
				padding: 20rpx 30rpx;
			}

		}
	}
</style>
