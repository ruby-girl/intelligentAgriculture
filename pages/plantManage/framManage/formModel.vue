<template>
	<view class="add-fram">
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">人工（{{personList.length}}） </text></label>
				<view class="display-flex">

					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon" @click="personAdd"></image> 添加
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
					<input placeholder="请输入" @input="changeInput($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						人工（亩）
					</view>
					<input placeholder="请输入" type="digit" @input="changeInput($event,'labour',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						工价（元）

					</view>
					<input placeholder="请输入" type="digit" @input="changeInput($event,'labourCost',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						面积（亩）

					</view>
					<input placeholder="请输入" disabled  name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						费用合计

					</view>
					<input placeholder="请输入" disabled  name="input"></input>
				</view>
			</view>

		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">农资（{{suppliesList.length}}） </text></label>
				<view class="display-flex">

					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon" @click="suppliesAdd"></image> 添加
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
					<input placeholder="请输入" @input="changeInput2($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						生产厂家

					</view>
					<picker @change="companyChange($event,'supplierName',index)" range-key="name" :value="companySelval" :range="companySelectList">
						<view class="picker">
							{{companySelval?companySelectList[companySelval].name:'请选择'}}


						</view>
					</picker>
				</view>
				<view class="cu-form-group ">
					<view class="title">

						单位

					</view>
					<picker @change="unitsChange($event,'unit',index)" range-key="name" :value="unitSelval" :range="unitSelectList">
						<view class="picker">
							{{unitSelval?unitSelectList[unitSelval].name:'请选择'}}


						</view>
					</picker>

				</view>
				<view class="cu-form-group ">
					<view class="title">

						每亩用量

					</view>

					<input placeholder="请输入" @input="changeInput2($event,'suppliesCount',index)" name="input"></input>

				</view>
				<view class="cu-form-group ">
					<view class="title">


						单价（元）


					</view>
					<input placeholder="请输入" @input="changeInput2($event,'price',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">


						面积（亩）


					</view>
					<input placeholder="请输入" @input="changeInput2($event,'acreageCount',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">



						费用



					</view>
					<input placeholder="请输入" @input="changeInput2($event,'suppliesFeeCount',index)" name="input"></input>
				</view>

			</view>
		</view>
		<view class="section">
			<view class="label display-flex  justify-content-flex-justify">
				<label><text class="line"></text><text class="fb">设备（{{equitmenList.length}}） </text></label>
				<view class="display-flex">

					<view class="cr">
						<image src="/static/plant/icon_add@2x.png" class="imgIcon" @click="equitmenAdd"></image> 添加
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
					<input placeholder="请输入" @input="changeInput3($event,'name',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						每亩收费（元）
					</view>
					<input placeholder="请输入" @input="changeInput3($event,'price',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						面积（亩）
					</view>
					<input placeholder="请输入" @input="changeInput3($event,'acreageCount',index)" name="input"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">
						费用
					</view>
					<input placeholder="请输入" @input="changeInput3($event,'feeCount',index)" name="input"></input>
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
		data() {
			return {
				ttt: '',
				showModel: false,
				picker: [],
				personList: [],
				
				nowDeletePersonIndex: '',
				nowName: '',

				suppliesList: [],
				companySelval: '',
				companySelectList: [],
				unitSelval: '',
				unitSelectList: [],

				equitmenList: []

			};
		},
		created() {
			this.initSelect()
		},
		methods: {
			initSelect() {
				this.$api.getSuppliersCompany().then(res => {
					this.companySelectList = res.data.data
				})
				this.$api.getSuppliersUnits().then(res => {
					this.unitSelectList = res.data.data
				})
			},
			saveForm() {
				this.$api.addPersonResources(this.personList).then(res => {})
				this.$api.addSuppliessResources(this.suppliesList).then(res => {})
				this.$api.addEquitmenResources(this.equitmenList).then(res => {});
				wx.showToast({
					title: '成功',
					icon: 'success',
					duration: 2000
				});
				wx.navigateTo({
					url: '../plantManage/framManage/framManage'
				})


			},
			/* 人工 */
			personAdd() {
				let obj = {
					"name": "",
					"labour": '',
					"labourCost": '',
					"acreageCount": '',
					"personFeeCount": '',
					"farmWorkRecordId": 1,
					"workOrderId": 3
				}
				this.personList.push(obj)
			},
			/* 删除人工 */
			personDelete(name,index) {
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
					"supplierName": "",
					"unit": "",
					"suppliesCount": "",
					"price": "",
					"acreageCount": "",
					"suppliesFeeCount": "",
					"farmWorkRecordId": 1,
					"workOrderId": 3
				}
				this.suppliesList.push(obj)

			},
			companyChange(e, n, i) {
				this.companySelval = e.detail.value
				this.suppliesList[i][n] = this.companySelectList[e.detail.value].name
			},
			unitsChange(e, n, i) {
				this.unitSelval = e.detail.value
				this.suppliesList[i][n] = this.unitSelectList[e.detail.value].name
			},
			/* 设备 */
			equitmenAdd() {
				let obj = {
					"name": "",
					"price": "",
					"acreageCount": "",
					"feeCount": "",
					"farmWorkRecordId": 1,
					"workOrderId": 3
				}
				this.equitmenList.push(obj)
			},

			/* 人工输入框数据 */
			changeInput(e, v, index) {
				if(v == 'labour'){
					
				}
				if(v == 'labourCost'){
					
				}
				
				this.personList[index][v] = e.detail.value;

			},
			/* 农资  输入框数据 */
			changeInput2(e, v, index) {
				this.suppliesList[index][v] = e.detail.value;
			},
			/* 设备  输入框数据 */
			changeInput3(e, v, index) {
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
			width: 40rpx;
			height: 40rpx;
			vertical-align: text-bottom;
			color: #333333;
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
