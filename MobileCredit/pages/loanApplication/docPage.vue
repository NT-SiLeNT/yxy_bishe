<template>
	<view class="w100" id="pdfwrap">
		<!--  -->
		<!-- data:application/pdf;base64, -->
		<div v-if="docType == 1" style="height:100%;overflow: hidden;display: flex;flex-direction: column;">
			<div class="v-viewbtns  mc-padding-radiu">
				<div style="position:relative;text-align: center;">
					<button type="" class="mc-min-btn-primary haveBg classBind" @click="scaleAdd">+</button>
					<button type="" class="mc-min-btn-primary haveBg" @click="scaleReduce">-</button>
				</div>
			</div>
			<div style="overflow: hidden;height: 100%;" class="mc-padding-wrap">
				<div style="height: 103%;">
					<div style="height: 103%;overflow:auto;"><div class="pdfList" ref="pdf" style="position:relative;"></div></div>
				</div>
			</div>
		</div>
		<block v-if="docType == 2">
			<view class="iframewrap"><web-view style="width:760px" :src="zxurl"></web-view></view>
		</block>
		<block v-if="docType == 3">
			<view class="iframewrap" style="height: 100%;"><web-view :src="urlHTML"></web-view></view>
		</block>
	</view>
</template>

<script>
import pdf from '../../static/pdf/build/pdf';
export default {
	data() {
		return {
			docType: 1,
			pdfDataList: '',
			scale: 100,
			zxurl: '',
			pUrl: '',
			urlHTML: ''
		};
	},
	onLoad(option) {
		this.docType = option.docType;
		if (this.docType == 2) {
			uni.setNavigationBarTitle({
				title: '征信报告'
			});
			var _this = this;
			uni.getStorage({
				key: 'zxurl',
				success: function(res) {
					if (res.data) {
						_this.zxurl = res.data; //接收传回来的数据
						_this.$forceUpdate();
					}
				}
			});
		} else if (this.docType == 3) {
			uni.setNavigationBarTitle({
				title: '预览'
			});
			var _this = this;
			uni.getStorage({
				key: 'purl',
				success: function(res) {
					console.log('$forceUpdate', res);
					if (res.data) {
						// _this.$request
						// 	.post({
						// 		url: 'customerimage/v1/downLoadDemo',
						// 		data: {
						// 			urlList: res.data.pUrl
						// 		}
						// 	})
						// 	.then(res => {
						// 		res = res.result[0];
						// 		console.log(res);
						// 		if (res.head.returnCode == '00000000') {
						// 		} else {
						// 		}
						// 	});
						if (navigator.userAgent.indexOf('Android') > -1) {
							//判断移动端是android 还是ios ，若是android 则要借助pdf插件
							// window.location.href = "http://192.168.1.110:8060/js/web/viewer.html?file="+url;
							var baseUrl = '';
							if (process.env.NODE_ENV === 'development') {
								// 开发环境
								baseUrl = '/api/customerimage/v1/downLoadDemo'
							} else {
								// 生产环境
								baseUrl = _this.$store.state.prodUrl + _this.$store.state.firstlevelName+'/customerimage/v1/downLoadDemo'
							}
							_this.pUrl = res.data.pUrl; //接收传回来的数据
							_this.urlHTML = '/static/pdf/web/viewer.html?file=' + decodeURIComponent(baseUrl+'?seat=seat&urlList='+decodeURIComponent(res.data.URL));
						} else {
							//ios直接打开pdf
							window.location.href = 'static/pdf/web/viewer.html?file=' + decodeURIComponent(res.data.pUrl);
						}
						_this.$forceUpdate();
					}
				}
			});
		}
	},
	onBackPress() {
		uni.setStorage({
			key: 'sqsPdf',
			data: '',
			success: function() {}
		});
	},
	created() {},
	mounted() {
		this.getPdfList(); //在这里调用pdf的方法
	},
	methods: {
		getPdfList(flagsss) {
			try {
				//这里是我用来请求后台返回给我返回base64格式的文件发的ajax请求
				PDFJS.workerSrc = require('../../static/pdf/build/pdf.worker.js');
				PDFJS.cMapUrl = './static/pdf/web/cmaps/';
				PDFJS.cMapPacked = true;
				// this.getPageNum(res);
				var _this = this;
				uni.getStorage({
					key: 'sqsPdf',
					success: function(res) {
						if (res.data) {
							_this.pdfDataList = res.data; //接收传回来的数据
							if (flagsss) {
								_this.showPdfdddd(_this); //调用生成PDF
							} else {
								_this.showPdf(_this); //调用生成PDF
							}
						}
					}
				});
			} catch (e) {
				//TODO handle the exception
			}
		},
		async showPdf(that) {
			uni.showLoading({
				title: '正在加载文档',
				mask: true
			});
			try {
				var _this = this;
				let pdfList = document.querySelector('.pdfList'); //通过querySelector选择DOM节点,使用document.getElementById()也一样
				let base64 = that.pdfDataList; //获得bas464编码
				let decodedBase64 = atob(base64); //使用浏览器自带的方法解码
				let pdf = await PDFJS.getDocument({ data: decodedBase64 }); //返回一个pdf对象
				let pages = pdf.numPages; //声明一个pages变量等于当前pdf文件的页数
				for (let i = 1; i <= pages; i++) {
					//循环页数
					let canvas = document.createElement('canvas');
					let page = await pdf.getPage(i); //调用getPage方法传入当前循环的页数,返回一个page对象
					let scale = 2; //缩放倍数，1表示原始大小
					let width = document.body.clientWidth; //窗口的宽度
					// let width = '800px'; //窗口的宽度
					let viewport = page.getViewport(scale);
					var obj2 = {
						Cheight: viewport.height * scale,
						width: viewport.width,
						height: viewport.height,
						canvas: canvas,
						index: self.loadedCount
					};
					canvas.width = viewport.width;
					canvas.height = viewport.height;
					canvas.className = 'canvas'; //给canvas节点定义一个class名,这里我取名为canvas
					obj2.src = obj2.canvas.toDataURL('image/jpeg');
					let ctx = canvas.getContext('2d');
					var renderContext = {
						canvasContext: ctx,
						viewport: viewport
					};
					page.render(renderContext).then(() => {
						var img = new Image();
						obj2.src = obj2.canvas.toDataURL('image/jpeg');
						img.src = obj2.src;
						img.style = 'width:100%'; //给canvas节点定义一个class名,这里我取名为canvas
						pdfList.appendChild(img);
					});
					// pdfList.appendChild(canvas); //插入到pdfList节点的最后
				}
				uni.hideLoading();
			} catch (e) {
				uni.hideLoading();
				//TODO handle the exception
			}
		},
		async showPdfdddd(that) {
			let pdfList = document.querySelector('.pdfList1'); //通过querySelector选择DOM节点,使用document.getElementById()也一样
			let base64 = this.pdfDataList; //获得bas464编码
			let decodedBase64 = atob(base64); //使用浏览器自带的方法解码
			let pdf = await PDFJS.getDocument({ data: decodedBase64 }); //返回一个pdf对象
			let pages = pdf.numPages; //声明一个pages变量等于当前pdf文件的页数
			for (let i = 1; i <= pages; i++) {
				//循环页数
				let canvas = document.createElement('canvas');
				let page = await pdf.getPage(i); //调用getPage方法传入当前循环的页数,返回一个page对象
				let scale = 0.5; //缩放倍数，1表示原始大小
				let width = document.body.clientWidth; //窗口的宽度
				let viewport = page.getViewport(scale);
				let context = canvas.getContext('2d'); //创建绘制canvas的对象
				canvas.height = viewport.height; //定义canvas高和宽
				canvas.width = viewport.width;
				let renderContext = {
					canvasContext: context,
					viewport: viewport
				};
				await page.render(renderContext);
				canvas.className = 'canvas'; //给canvas节点定义一个class名,这里我取名为canvas
				pdfList.appendChild(canvas); //插入到pdfList节点的最后
			}
		},
		scaleAdd() {
			if (this.scale == 300) return;
			this.scale += 10;
			this.$refs.pdf.style.width = parseInt(this.scale) + '%';
		},
		scaleReduce() {
			if (this.scale == 30) return;
			this.scale += -10;
			this.$refs.pdf.style.width = parseInt(this.scale) + '%';
		},
		loadFrame() {
			// iframe的load事件
		}
	}
};
</script>

<style lang="scss" scoped>
.mc-padding-radiu {
	width: 100%;
	border-radius: 32rpx;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	margin-bottom: 32rpx;
	padding: 20rpx 0;
}
.mc-padding-wrap {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	box-shadow: 0 2px 20rpx 0 rgba(48, 49, 51, 0.04);
	border-radius: 32rpx;
	box-sizing: border-box;
	padding-bottom: 1px;
	overflow: auto;
}
.w100 {
	background: #f8f9fd;
}
.downLine {
	text-decoration: underline;
}
#pdfwrap {
	overflow: hidden;
}
#iframe {
	height: 100%;
}
.classBind {
	margin-right: 40rpx;
}
.iframewrap {
	width: 100%;
}
.iframewrap #iframe {
	border: none;
}
</style>
