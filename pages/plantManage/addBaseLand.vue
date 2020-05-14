<!-- 创建基地 -->
<template>
	<view>

	<web-view src="http://192.168.101.32:8091/#/"></web-view>


	</view>
</template>
<script>
	
	export default {
		
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

	}

	
</style>
