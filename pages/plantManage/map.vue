<template>
  <div class="base-map-container">

    <div id="container"></div>
    <div style="text-align:right">
      <button v-if="!isadd" icon="plus" @click="addplot1">开始圈地</button>
      <div v-if="isadd">
        <button @click="delpol" style="margin-right:15px">清空</button>
        <!-- <a-button @click="Back">撤销</a-button> -->
        <button type="primary" @click="addplot1">确定</button>
      </div>
    </div>

  </div>
</template>
<script>

import MapLoader from "@/utils/loadMap.js";
export default {
  props: ["userId"],
  data() {
    return {
      vispic: false,
      hpfileList: [],
      hppreviewVisible: false,
      hppreviewImage: "",
      picdata: "",
      //地块表格展示所需参数
      plotdata: [],
      loading: false,
      isadd: false,
      spinning: false,
      par: {},
      map: null,
      polygons: [],
      basemarker: null,
      //获取基地id与经纬度
      baseid: "",
      acreage:'',//面积
      jwd: [],
      areacord: "",
      mapok: false,
      infoWindow: null,
      remove: false,
      markers: [], //标记
      mouseTool: null, //折线
      path: [],
      pathArray: [],
      polygonattr: {
        path: null,
        fillColor: "#87ffc5", // 多边形填充颜色
        borderWeight: 0, // 线条宽度，默认为 1
        strokeColor: "#87ffc5", // 线条颜色
        strokeOpacity: 0,
        fillOpacity: 0.4
      },
      pol: null,
      provinceCode: "", //基地信息
      cityCode: "",
      areaCode: "",
      addr: "",
      formItemLayout: {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 14 },
          sm: { span: 14 }
        }
      },
      chinamap: [{ areaCode: "1001", areaName: "下拉框" }], //下拉框数据
      secondmap: [
        { areaCode: "1003", areaName: "下拉框2" },
        { areaCode: "100", areaName: "下拉框2" }
      ],
      threemap: [],
      ssxarea1: "",
      ssxarea2: "",
      ssxarea3: "",
      ssxarea4: "",
      ssxarea: "",
   
      geocoder: null
    };
  },
  watch: {
    plotdata: function() {
      if (this.mapok) {
        this.addBlockOnMap(this.plotdata);
      }
    }
  },
  created() {
    this.initMap();

  },
  mounted() {
    let that = this;
    window.addEventListener("mapload_done", function() {
      //   that.addBaseToMap();
      that.addBlockOnMap(that.plotdata);
      AMap.plugin(
        [
          "AMap.Autocomplete",
          "AMap.PlaceSearch",
          "AMap.Geolocation",
          "AMap.Geocoder"
        ],
        function() {
          var autoOptions = {
            // 城市，默认全国
            city: "全国",
            // 使用联想输入的input的id
            input: "input3",
            citylimit: true
          };
          that.geocoder = new AMap.Geocoder({
            city: "全国", //城市设为北京，默认：“全国”
            radius: 1000 //范围，默认：500
          });
          var autocomplete = new AMap.Autocomplete(autoOptions);

          var placeSearch = new AMap.PlaceSearch({
            city: "全国",
            map: that.map
          });
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 10),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: "RB"
          });

          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete);
          AMap.event.addListener(geolocation, "error", onError);

          function onComplete(data) {
            // data是具体的定位信息
            that.jwd = [data.position.lng, data.position.lat];
            that.addBaseToMap();
          }

          function onError(data) {
            // 定位出错
          }
          AMap.event.addListener(autocomplete, "select", function(e) {
            //TODO 针对选中的poi实现自己的功能
            // console.log(e.poi);
            if (e.poi.address.length > 0) {
              placeSearch.search(e.poi.name);
            } else {
              let aa = [];
              aa.push(e.poi.location.lng);
              aa.push(e.poi.location.lat);
              that.map.setCenter(aa);
            }
          });
        }
      );
    });
  },
  methods: {
    regeoCode(lnglat, n) {
      let arr = [lnglat, n];
      let _this = this;
      this.geocoder.getAddress(arr, function(status, result) {
        if (status === "complete" && result.regeocode) {
          var address = result.regeocode.formattedAddress;
          _this.provinceCode =
            result.regeocode.addressComponent.adcode.substring(0, 2) + "0000";
          _this.cityCode =
            result.regeocode.addressComponent.adcode.substring(0, 4) + "00";
          _this.areaCode = result.regeocode.addressComponent.adcode;
          // _this.autoGetCode(_this.provinceCode, _this.cityCode);
        } else {
          console.log("根据经纬度查询地址失败");
        }
      });
    },
    Back() {
      //上一步
      let len = this.markers.length - 1;
      this.markers[len].setMap(null);
      let that = this;
      this.markers.pop();
    },

    addBaseToMap() {
      var icon = new AMap.Icon({
        size: new AMap.Size(30, 30),
        image: require("@/static/logo.png"),
        imageOffset: new AMap.Pixel(0, 0),
        imageSize: new AMap.Size(30, 30)
      });
      this.basemarker = null;
      this.basemarker = new AMap.Marker({
        map: this.map,
        position: this.jwd,
        icon: icon,
        anchor: "center",
        offset: new AMap.Pixel(0, 0)
      });
      this.map.setFitView([this.basemarker]);
    },
    addplot1() {
      // this.$refs.addplot.add(this.baseid,this.jwd,this.areacord);
      this.isadd = !this.isadd;
      if (this.isadd) {
        this.huadikuai();
      }
    },
    huadikuai() {
      if (this.pol != null) {
        this.pol.setMap(null);
        this.pol = null;
      }
      this.remove = false;
      this.path = [];
      this.pathArray = [];
      let that = this;
      
      AMap.plugin("AMap.MouseTool", function() {
        that.mouseTool = new AMap.MouseTool(that.map);
        that.mouseTool.polyline({
          strokeColor: "#87ffc5"
        });
        that.markers = [];
        that.map.on("click", addMarker1);
        function addMarker1(e) {
          that.pathArray.push(e.lnglat);
          if (!that.remove) {
            var icon1 = new AMap.Icon({
              size: new AMap.Size(20, 20), // 图标尺寸
              image: require("@/static/logo.png"), // Icon的图像
              imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
              imageSize: new AMap.Size(20, 20) // 根据所设置的大小拉伸或压缩图片
            });
            var marker = new AMap.Marker({
              map: that.map,
              position: e.lnglat,
              icon: icon1,
              anchor: "center",
              offset: new AMap.Pixel(0, 0)
            });

            that.markers.push(marker);
            //鼠标点击marker
            AMap.event.addListener(marker, "click", function(e) {
              that.remove = true;
              for (let j = 0; j < that.markers.length; j++) {
                that.markers[j].setMap(null);
              }
              that.mouseTool.close(true);
              if (that.pathArray.length > 1) {
                for (let i = 0; i < that.pathArray.length; i++) {
                  let point = that.pathArray[i];
                  that.path.push(new AMap.LngLat(point.lng, point.lat));
                }
                that.regeoCode(that.pathArray[0].lng, that.pathArray[0].lat);
              }
              that.acreage = Number(
                0.0015 * AMap.GeometryUtil.ringArea(that.path)
              ).toFixed(3);
              that.polygonattr.path = that.path;
              that.pol = new AMap.Polygon(that.polygonattr);
              that.map.add(that.pol);
              let myEvent = new CustomEvent("removeMarkerListener", {});
              that.map.off("click", addMarker1);
            });
          }
        }
      });
    },
    delpol() {
      if (this.pol) {
        this.pol.setMap(null);
        this.pol = null;
        this.polygonattr.path = null;
        this.huadikuai();
      } else {
        this.map.remove(this.markers);
        this.mouseTool.close(true); //关闭，并清除覆盖物
        this.huadikuai();
      }
    },
    addBlockOnMap(remarks) {
      if (this.polygons.length > 0) {
        for (let i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setMap(null);
        }
      }
      if (this.pol != null) {
        this.pol.setMap(null);
      }
      this.polygons = [];
      for (let i = 0; i < remarks.length; i++) {
        let remark = remarks[i].remark;
        if (remark != undefined && remark != null && remark.trim() != "") {
          let remarkJson2 = eval("(" + remark + ")");
          let newPath = [];
          for (let i = 0; i < remarkJson2.path.length; i++) {
            let point = remarkJson2.path[i];
            newPath.push(new AMap.LngLat(point.lng, point.lat));
          }
          remarkJson2.path = newPath;
          let polygon2 = new AMap.Polygon(remarkJson2);
          this.polygons.push(polygon2);
          this.map.add(polygon2);
          this.map.setFitView();
        }
      }
      let that = this;
      for (let i = 0; i < that.polygons.length; i++) {
        that.polygons[i].on("click", function(e) {
          that.infowindow(e, i);
        });
      }
    },
    infowindow(e, i) {
      this.info = [];
      this.getinfo(i);
      this.infoWindow = new AMap.InfoWindow({
        content: this.info.join("")
      });
      this.infoWindow.open(this.map, [e.lnglat.lng, e.lnglat.lat]);
    },

    initMap(ln, lg) {
      let that = this;
      that.spinning = true;
      MapLoader().then(AMap => {
        let googleLayer = new AMap.TileLayer({
          getTileUrl:
            "http://mt{1,2,3,0}.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile"
        });
        let roadNetLayer = new AMap.TileLayer.RoadNet({
          opacity: 0
        });
        that.map = new AMap.Map("container", {
          cnenter: [lg, ln],
          zoom: 15,
          resizeEnable: true,
          layers: [googleLayer, roadNetLayer]
        });

        // 定位

        // 定位end
        this.map.on("complete", function() {
          that.mapok = true;
          that.spinning = false;
          var myEvent = new CustomEvent("mapload_done", {});
          if (window.dispatchEvent) {
            window.dispatchEvent(myEvent);
          } else {
            window.fireEvent(myEvent);
          }
        });
      });
    },



  }
};
</script>

<style scoped>
#container {
  width: 100vh;
  height: 50vh;
 
}

</style>
