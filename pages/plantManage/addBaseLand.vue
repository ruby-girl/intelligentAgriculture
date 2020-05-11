<!-- 创建基地 -->
<template>
	<web-view src="http://192.168.101.32:8081/#/"></web-view>

	<!-- <view class="add-base-land"> 
		<map-item v-on:dataMsg="getMsg" ref="childMap"></map-item>
		<view class="draw-content showModel" :class="{'showModel':!isEdit}">
			<view class="tr"> 
				<button class="cu-btn  line-green" style="margin-right: 10px;" @click="clearMap">清空</button>
				<button class="cu-btn  bg-green  " @click="handleMapStart" v-if="isEdit == 1"> 开始圈地</button>
				<button class="cu-btn  bg-green  " @click="handleMapEnd" v-if="isEdit == 2"> 结束圈地</button>
				<button class="cu-btn  bg-green  " @click="handleMapEdit" v-if="isEdit == 3"> 编辑圈地</button>
			</view>
			<view class="gutter-blank"></view>
			<view style="padding: 30rpx; box-sizing: content-box;">
				<text class="f20">填写基地信息</text>
				<view class="cu-form-group ">
					<view class="title">
						基地名称
					</view>
					<input placeholder="基地名称" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">基地面积</view>
					<input placeholder="基地面积" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">基地地址</view>
					<picker mode="multiSelector" :value="multiIndex" :range="multiArray">
						<view class="picker">
							{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
						</view>
					</picker>
				</view>
				<button class="cu-btn  bg-green  lg block">创建基地</button>
			</view>
		</view> -->
	</view>
</template>
<script>
	import mapItem from '@/pages/plantManage/map5.vue'
	export default {
		components: {
			mapItem
		},
		data() {
			return {
				latitude: "24.47951",
				longitude: "118.08948",
				multiIndex: [0, 0, 0],
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
					['猪肉绦虫', '吸血虫']
				],
				isEdit: 1, //1 开始 2 结束 3 编辑
			}
		},
		onLoad() {},
		methods: {
			/* 获取组件数据 */
			getMsg(d) {
				
				console.log(d)
			},
			/* 开始圈地 */
			handleMapStart() {
				var c_name="listallwjh";
				if(getCookie("listallwjh")!=null){  
				    alert(getCookie("listallwjh"));  
				}  
			  function getCookie(c_name) {  
			        if (document.cookie.length>0)  {  
			            c_start=document.cookie.indexOf(c_name + "=");  
			            if (c_start!=-1)  {   
			                c_start=c_start + c_name.length+1 ;  
			                c_end=document.cookie.indexOf(";",c_start);  
			                    if (c_end==-1) 
			                       c_end=document.cookie.length;  
			                       return unescape(document.cookie.substring(c_start,c_end));  
			            }   
			        }  
			        return "";  
			    }  
			    
				this.isEdit = 2;
				this.$refs.childMap.init();
			},
			/* 结束圈地 */
			handleMapEnd() {
				this.isEdit = 3;
				this.$refs.childMap.closeEditPolygon();
			},
			/* 编辑圈地 */
			handleMapEdit() {
				this.isEdit = 2;
				this.$refs.childMap.editPolygon();
			},
			/* 清空圈地 */
			clearMap() {
				this.isEdit = 1;
				this.$refs.childMap.clearMapFun();
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>
<style lang="scss" scoped>
	.draw-content {

		width: 100vw;
		height: 100rpx;

		z-index: 1;
		box-sizing: content-box;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		transition: height .25s;
		z-index: 999;

		.tr {
			padding: 20rpx;
			text-align: right;
		}

		.gutter-blank {
			width: 100vw;
			height: 20rpx;
			background-color: #F2F2F2;
		}
	}

	.showModel {
		height: 48vh;
	}
</style>
