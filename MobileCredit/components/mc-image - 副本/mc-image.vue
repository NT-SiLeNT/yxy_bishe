<template>
	<view style="width: 100%;">
		<!-- <page-head :title="title"></page-head> -->
		<canvas :style="{'width':w,'height': h}" class="hiddenCanvas" canvas-id="firstCanvas"></canvas>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list" style="display: none;">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left"><view class="uni-label">图片来源</view></view>
						<view class="uni-list-cell-right">
							<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
								<view class="uni-input">{{ sourceType[sourceTypeIndex] }}</view>
							</picker>
						</view>
					</view>

					<view class="uni-list-cell">
						<view class="uni-list-cell-left"><view class="uni-label">图片质量</view></view>
						<view class="uni-list-cell-right">
							<picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
								<view class="uni-input">{{ sizeType[sizeTypeIndex] }}</view>
							</picker>
						</view>
					</view>

					<view class="uni-list-cell">
						<view class="uni-list-cell-left"><view class="uni-label">数量限制</view></view>
						<view class="uni-list-cell-right">
							<picker :range="count" @change="countChange" mode="selector">
								<view class="uni-input">{{ count[countIndex] }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title" :class="requireClass">{{uploaderTitle}}</view>
								<view class="uni-uploader-info" v-if="uploadInfoShow">{{ imageList.length }}/{{countMax}}</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-if="echoImgList.length" v-for="(image, index) in echoImgList" :key="index">
										<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
									</block>
									<block v-for="(image, index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
											<span class="delIcon" @tap.stop="deleteImage(index)"></span>
										</view>
									</block>
									<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import permision from '@/common/permission.js';
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	data() {
		return {
			title: 'choose/previewImage',
			imageList: this.imageListArr,
			sourceTypeIndex: this.sourceTypeId,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: this.sizeTypeId,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			w: 0,
			h: 0
		};
	},
	props:{
		uploaderTitle:{
			type:String,
			default:'点击可预览选好的图片',
		}, // 顶部的显示的标题
		requireClass:{
			type:String,
			default:'',
		}, // 必填时的样式名字，伪类方式添加的样式
		uploadInfoShow:{
			type:Boolean,
			default:false,
		},// 显示张数信息  当前数目/总数目
		sourceTypeId:{
			type:Number,
			default:2,
		}, // 照片来源
		sizeTypeId:{
			type:Number,
			default:2,
		}, // 照片品质
		countMax:{
			type:Number,
			default:10,
		}, // 限制最大数量
		echoImgList:{
			type:Array,
			default:function(){
				return []
			},
		}, // 回显图片数据，直接是url地址的数组，不包含在数量限制中
		imageListArr:{
			type:Array,
			default:function(){
				return []
			},
		}, // 本次图片数据
	},
	methods: {
		sourceTypeChange: function(e) {
			this.sourceTypeIndex = parseInt(e.detail.value);
		},
		sizeTypeChange: function(e) {
			this.sizeTypeIndex = parseInt(e.detail.value);
		},
		countChange: function(e) {
			this.countIndex = e.detail.value;
		},
		chooseImage: async function() {
			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (this.sourceTypeIndex !== 2) {
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
			}
			// #endif

			if (this.imageList.length === this.countMax) {
				let isContinue = await this.isFullImg();
				console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			var that = this;
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.countMax,
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					return;
					uni.getImageInfo({
						src: res.tempFilePaths[0],
						success: ress => {
							that.w = ress.width + 'px';
							that.h = ress.height + 'px';
							let ctx = uni.createCanvasContext('firstCanvas'); /** 创建画布 */
							//将图片src放到cancas内，宽高为图片大小
							console.log('resssssrrr:', ress);
							ctx.drawImage(res.tempFilePaths[0], 0, 0, ress.width, ress.height);
							ctx.setFontSize(18);
							ctx.setFillStyle('#8a2929');
							ctx.rotate((30 * Math.PI) / 180);
							let textToWidth = (ress.width / 3) * 0.5;
							let textToHeight = (ress.height / 3) * 0.3;
							ctx.fillText('我是水印', textToWidth, textToHeight);
							/** 除了上面的文字水印，这里也可以加入图片水印 */
							//ctx.drawImage('/static/watermark.png', 0, 0, ress.width / 3, ress.height / 3)
							ctx.draw(false, () => {
								setTimeout(() => {
									uni.canvasToTempFilePath({
										canvasId: 'firstCanvas',
										success: res1 => {
											this.imageList = this.imageList.concat(res1.tempFilePath);
											console.log('ressss:', res1);
											console.log(this.imageList);
										}
									});
								}, 0);
							});
						}
					});
				},
				fail: err => {
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						this.checkPermission(err.code);
					}
					// #endif
					// #ifdef MP
					uni.getSetting({
						success: res => {
							let authStatus = false;
							switch (this.sourceTypeIndex) {
								case 0:
									authStatus = res.authSetting['scope.camera'];
									break;
								case 1:
									authStatus = res.authSetting['scope.album'];
									break;
								case 2:
									authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
									break;
								default:
									break;
							}
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: '此功能需要从您的相机或相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
				}
			});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '最多只能添加'+this.countMax+'张图片！',
					success: e => {
						if (e.confirm) {
							// this.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		async checkPermission(code) {
			let type = code ? code - 1 : this.sourceTypeIndex;
			let status = permision.isIOS
				? await permision.requestIOS(sourceType[type][0])
				: await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' : 'android.permission.READ_EXTERNAL_STORAGE');

			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: '没有开启权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}

			return status;
		},
		deleteImage: function(index) {
			uni.showModal({
				content: '是否确定删除图片？',
				success: e => {
					if (e.confirm) {
						this.imageList.splice(index,1);
					}
				},
				fail: () => {
				}
			});
		}
	},
	watch:{
		imageList:{
			handler(v){
				this.imageList = v;
				console.log('ddd',this.imageList);
				this.$emit('getImageData',this.imageList)
			},
			deep: true,
		},
	}
};
</script>

<style scoped>
.hiddenCanvas{
	position: absolute;
	z-index: -999;
	left: 999999px;
}
.cell-pd {
	padding: 22rpx 30rpx;
}

.list-pd {
	margin-top: 50rpx;
}
.uni-uploader-title{
	font-family: PingFang-SC-Medium;
	font-size: 24rpx;
	color: #00002A;
	letter-spacing: 0;
	line-height: 48rpx;
	margin-left: 10rpx;
}
.uni-uploader-info {
	font-size: 24rpx;
	line-height: 48rpx;
	color: #B2B2B2;
}
.uni-list:after{
	display: none;
}
.uni-list::before{
	display: none;
}
.uni-common-mt{
	margin-top: 0;
}
.uni-list{
	margin-top: 0;
}
.uni-uploader-body{
	margin-top: 0;
}
</style>
