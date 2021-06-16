<template>
	<view style="width: 100%;">
		<!-- <page-head :title="title"></page-head> -->
		<view class="uni-common-mt">
			<form>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title" :class="requireClass">{{ uploaderTitle }} {{ this.countMax ? '(单次提交最多' + countMax + '张)' : '' }}</view>
								<view class="uni-uploader-info" v-if="uploadInfoShow">{{ imageList.length }}/{{ countMax }}</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-if="echoList.length" v-for="(image, index) in echoList" :key="index">
										<view class="uni-uploader__file" :class="{ namess: rename, nameHieght: rename }">
											<view class="upfileBr namess" :class="{ pdfseat: image.Format == 'pdf' }">
												<div v-if="image.Format == 'pdf'" @click="todoc(image)" class="uni-uploader__img"></div>
												<imagess
													v-else
													@load="loadimg"
													lazy-load
													class="uni-uploader__img"
													:src="image.pUrl"
													:data-src="image.pUrl"
													@tap="previewImage"
													:previewValue="ownData.pvalue"
													alt="图片"
												></imagess>
												<span v-if="echoCanDel && canAddImg" class="delIcon" @tap.stop="deleteImage(index, rename)"></span>
											</view>
											<view v-if="rename" class="names" @click="onShowNameTipsMouseenter($event)">{{ image.name }}</view>
										</view>
									</block>
									<block v-for="(image, index) in imageList" :key="index">
										<view class="uni-uploader__file" :class="{ namess: rename, nameHieght: rename }">
											<view class="upfileBr namess">
												<imagess
													class="uni-uploader__img"
													:src="image.pUrl"
													:data-src="image.pUrl"
													@tap="previewImage"
													:previewValue="ownData.pvalue"
												></imagess>
												<span class="delIcon" @tap.stop="deleteImage(index)"></span>
											</view>
											<view v-if="rename" class="names" @click="onShowNameTipsMouseenter($event)">{{ image.name }}</view>
										</view>
									</block>
									<view v-if="canAddImg" class="uni-uploader__input-box">
										<!-- chooseImageSele -->
										<!-- <view class="uni-uploader__input" @tap="rename ? chooseImage1() : chooseImage()"></view> -->
										<view
											class="uni-uploader__input"
											@tap="tapPhoto()"
										></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
		<mc-pop-select v-if="rename" @showP="isRenameOver" :show="show" :rename="rename" v-model="name" :nameLists="getNameList" :nameIndexn="nameIndexn"></mc-pop-select>
	</view>
</template>
<script>
import { WatermarkCamera, Camera } from '@/common/Mobile/MobileUtils.js';
export default {
	data() {
		return {
			imageList: this.imageListArr,
			CANUSE: true,
			show: false,
			name: '0000',
			nameIndexn: '',
			resImg: {},
			echoList: this.echoImgList,
			getNameList: [],
			imageWH: { w: 1080, h: 1280 },
			unwanted: false
		};
	},
	props: {
		uploaderTitle: {
			type: String,
			default: '点击可预览选好的图片'
		}, // 顶部的显示的标题
		requireClass: {
			type: String,
			default: ''
		}, // 必填时的样式名字，伪类方式添加的样式
		uploadInfoShow: {
			type: Boolean,
			default: false
		}, // 显示张数信息  当前数目/总数目
		sourceTypeId: {
			type: Number,
			default: 2
		}, // 照片来源
		sizeTypeId: {
			type: Number,
			default: 2
		}, // 照片品质
		countMax: {
			type: Number,
			default: 10
		}, // 限制最大数量
		echoImgList: {
			type: Array,
			default: function() {
				return [];
			}
		}, // 回显图片数据，直接是url地址的数组，不包含在数量限制中
		imageListArr: {
			type: Array,
			default: function() {
				return [];
			}
		}, // 本次图片数据
		canAddImg: {
			type: Boolean,
			default: true
		}, // 是否显示图片添加按钮
		ownData: {
			type: Object,
			default: function() {
				return {
					serno: '',
					type: ''
				};
			}
		},
		// 是否是修改时的添加
		isChangeAdd: {
			type: Boolean,
			default: false
		},
		// 是否可以重命名
		rename: {
			type: Boolean,
			default: false
		},
		// 回显的数据能否删除
		echoCanDel: {
			type: Boolean,
			default: false
		},
		// 是否可以选择图片
		canSelect: {
			type: Boolean,
			default: false
		},
		// 不需要上传影像平台
		unwant: {
			type: Boolean,
			default: false
		},
		// 普通拍照-不加水印与定位
		commonC: {
			type: Boolean,
			default: false
		}
	},
	computed: {},
	mounted() {
		this.unwanted = this.unwant;
		var a = [];
		var b = a.concat(this.echoList);
		var c = b.concat(this.imageList);
		var list = [];
		for (var i = 0; i < c.length; i++) {
			list.push(c[i].name);
		}
		this.getNameList = list;
		this.$forceUpdate();
		this.$emit('getImageData', this.imageList);
	},
	methods: {
		fnameFormat(len = 4, curr) {
			var a = (curr * 1).toString();
			var zlen = len - a.length;
			var z = '';
			for (var i = 0; i < zlen; i++) {
				z += '0';
			}
			return z + a;
		},
		tapPhoto() {
			debugger
			if (this.canSelect) {
				this.chooseImageSele();
			} else {
				if (this.commonC) {
					this.chooseImage1();
				} else {
					this.chooseImage();
				}
			}
		},
		chooseImage: async function() {
			if (this.countMax) {
				// countMax有值进行限制
				// 如果达到最大限制，结束
				if (this.imageList.length >= this.countMax) {
					let isContinue = await this.isFullImg();
					return;
				}
			}
			uni.showLoading({
				title: '正在获取位置信息',
				mask: true
			});
			var _this = this;
			WatermarkCamera({ worknum: this.$store.state.accountInfos.actorno, workname: this.$store.state.accountInfos.actorname }, function(request, respons) {
				console.log('拍照返回', respons);
				uni.hideLoading();
				// 拍照定位失败
				if (respons.code == '13') {
					return;
				}
				// 拍照取消
				if (respons.code == '3') {
					return;
				}
				if (_this.CANUSE) {
					_this.$request
						.post({
							url: 'creditPhotoUpload/v1/CpmCreditUpload',
							data: {
								creditbase64: respons.imgbase64,
								phototype: _this.ownData.type,
								serno: _this.ownData.serno,
								fileType: respons.imgtype,
								delSign: _this.unwanted ? '3' : _this.isChangeAdd == true ? '1' : ''
							},
							upType: true,
							upMsg: '正在合成影像信息'
						})
						.then(res => {
							res = res.result[0];
							if (res.head.returnCode == '00000000') {
								_this.imageList = _this.imageList.concat({
									pUrl: 'data:image/jpeg;base64,' + res.content.creditbase64,
									pPath: res.content.photoUrl,
									imgSn: res.content.imgSn
								});
							} else {
								uni.showToast({
									title: res.head.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						})
						.catch(err => {});
				} else {
					_this.imageList = _this.imageList.concat({
						pUrl: 'data:image/jpeg;base64,' + respons.imgbase64,
						imgSn: '22222222'
					});
				}
			});
		},
		chooseImage1: async function(numIndex, wh, hh) {
			if (this.countMax) {
				// countMax有值进行限制
				// 如果达到最大限制，结束
				if (this.imageList.length >= this.countMax) {
					let isContinue = await this.isFullImg();
					return;
				}
			}
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			var _this = this;
			var numPara = {};
			if (this.canSelect && (numIndex !== '' && numIndex != null && numIndex != undefined)) {
				numPara = {
					num: numIndex,
					wight: wh,
					height: hh
				};
			}
			Camera(numPara, function(request, respons) {
				console.log('拍照返回', respons);
				uni.hideLoading();
				// 拍照取消
				if (respons.code == '3') {
					return;
				}
				if (_this.canSelect) {
					// 取消选择
					if (respons.code == 'errorimage') {
						return;
					}
				}
				if (_this.CANUSE) {
					if (_this.rename) {
						_this.show = true;
						_this.name = _this.fnameFormat(4, _this.imageList.length + 1);
						_this.resImg = respons;
						return;
					}
					_this.$request
						.post({
							url: 'creditPhotoUpload/v1/CpmCreditUpload',
							data: {
								creditbase64: respons.imgbase64,
								phototype: _this.ownData.type,
								serno: _this.ownData.serno,
								fileType: respons.imgtype,
								delSign: _this.unwanted ? '3' : _this.isChangeAdd == true ? '1' : ''
							},
							upType: true,
							upMsg: '正在合成影像信息'
						})
						.then(res => {
							res = res.result[0];
							if (res.head.returnCode == '00000000') {
								_this.imageList = _this.imageList.concat({
									pUrl: 'data:image/jpeg;base64,' + res.content.creditbase64,
									pPath: res.content.photoUrl,
									imgSn: res.content.imgSn
								});
							} else {
								uni.showToast({
									title: res.head.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						})
						.catch(err => {});
				} else {
					_this.imageList = _this.imageList.concat({
						pUrl: 'data:image/jpeg;base64,' + respons.imgbase64,
						imgSn: '22222222'
					});
				}
			});
		},
		chooseImageSele: function() {
			uni.showActionSheet({
				title: '标题',
				itemList: ['选择图片', '拍照'],
				success: e => {
					console.log(e.tapIndex);
					console.log('eee', this.canSelect);
					if (e.tapIndex === 0) {
						this.chooseImage1(5, 1080, 1280);
					} else {
						this.chooseImage1();
					}
				}
			});
		},
		isRenameOver($event) {
			this.show = $event;
			this.$request
				.post({
					url: 'creditPhotoUpload/v1/CpmCreditUpload',
					data: {
						creditbase64: this.resImg.imgbase64,
						phototype: this.ownData.type,
						serno: this.ownData.serno,
						photoName: this.name,
						fileType: this.resImg.imgtype,
						delSign: this.unwanted ? '3' : this.isChangeAdd == true ? '1' : ''
					},
					upType: true,
					upMsg: '正在合成影像信息'
				})
				.then(res => {
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						this.imageList = this.imageList.concat({
							pUrl: 'data:image/jpeg;base64,' + res.content.creditbase64,
							pPath: res.content.photoUrl,
							imgSn: res.content.imgSn,
							name: this.name
						});
					} else {
						uni.showToast({
							title: res.head.returnMsg,
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '最多只能添加' + this.countMax + '张图片！',
					showCancel: false,
					success: e => {
						if (e.confirm) {
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
			var imageList = [];
			var allimage = this.echoList.concat(this.imageList);
			for (var i = 0; i < allimage.length; i++) {
				imageList.push(allimage[i].pUrl);
			}
			uni.previewImage({
				current: current,
				urls: imageList
			});
		},
		// EsCreditImageDelete 贷前删除
		deleteImage: function(index, isecho) {
			uni.showModal({
				content: '您确认要删除该照片吗？',
				success: e => {
					if (e.confirm) {
						if (this.CANUSE) {
							if (!isecho) {
								this.$request
									.post({
										url: 'creditPhotoUpload/v1/CpmdeleteImagelinshi',
										data: {
											imgSn: this.imageList[index].imgSn
										}
									})
									.then(res => {
										res = res.result[0];
										if (res.head.returnCode == '00000000') {
											if (this.imageList.length) {
												this.imageList.splice(index, 1);
											}
										}
									})
									.catch(err => {});
							} else {
								this.$request
									.post({
										url: 'es/json/EsCreditImageDelete',
										data: {
											serno: this.ownData.serno, //	任务编号
											crtdate: this.ownData.date ? this.ownData.date : '',
											fileno: this.echoList[index].Name, // 影像图片标识
											imgsn: this.echoList[index].DQIMGTYPE //cpm图片imgsn
										}
									})
									.then(res => {
										if (res.response.header.returnCode == '00000000') {
											if (this.echoList.length) {
												this.echoList.splice(index, 1);
											}
										}
									})
									.catch(err => {});
							}
						} else {
							if (this.imageList.length) {
								this.imageList.splice(index, 1);
							}
						}
					}
				},
				fail: () => {}
			});
		},
		loadimg() {},
		onShowNameTipsMouseenter: function(e) {
			var e = window.event;
			var target = e.target || e.srcElement;
			var containerLength = target.clientWidth;
			var textLength = target.scrollWidth;
			var text = target.innerText;
			//console.log("contentLength:" + containerLength);
			//console.log("textLength", textLength);
			if (textLength > containerLength) {
				uni.showToast({
					title: text,
					icon: 'none',
					duration: 1500
				});
			}
		},
		todoc(image) {
			uni.setStorage({
				key: 'purl',
				data: '',
				success: function() {
					uni.setStorage({
						key: 'purl',
						data: image,
						success: function() {
							uni.navigateTo({
								url: '/pages/indetificationCust/docPage?docType=3'
							});
						}
					});
				}
			});
		}
	},
	watch: {
		imageList: {
			handler(v) {
				this.imageList = v;
				var a = [];
				var b = a.concat(this.echoList);
				var c = b.concat(this.imageList);
				var list = [];
				for (var i = 0; i < c.length; i++) {
					list.push(c[i].name);
				}
				this.getNameList = list;
				this.$forceUpdate();
				this.$emit('getImageData', this.imageList);
			},
			deep: true
		},
		echoList: {
			handler(v) {
				var a = [];
				var b = a.concat(this.echoList);
				var c = b.concat(this.imageList);
				var list = [];
				for (var i = 0; i < c.length; i++) {
					list.push(c[i].name);
				}
				this.getNameList = list;
				this.$forceUpdate();
			},
			deep: true
		},
		echoImgList: {
			handler(v) {
				this.echoList = this.echoImgList;
				this.$forceUpdate();
			}
		},
		imageListArr: {
			handler(v) {
				this.imageList = this.imageListArr;
				this.$forceUpdate();
			}
		},
		unwant: {
			handler(v, o) {
				this.unwanted = this.unwant;
				console.log('this.wwwwwwwww', this.unwanted);
				this.$forceUpdate();
			}
		}
	}
};
</script>

<style scoped>
.hiddenCanvas {
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
.uni-uploader-title {
	position: relative;
	font-family: PingFang-SC-Medium;
	font-size: 24rpx;
	color: #00002a;
	letter-spacing: 0;
	line-height: 48rpx;
	padding-left: 10rpx;
}
.uni-uploader-title.requireIcon {
	padding-left: 20rpx;
}
.uni-uploader-info {
	font-size: 24rpx;
	line-height: 48rpx;
	color: #b2b2b2;
}
.uni-list:after {
	display: none;
}
.uni-list::before {
	display: none;
}
.uni-common-mt {
	margin-top: 0;
}
.uni-list {
	margin-top: 0;
}
.uni-uploader-body {
	margin-top: 0;
}
.upfileBr {
	width: 228rpx;
	height: 172rpx;
	border: 1px solid #e3e5e8;
	margin: 4rpx;
	box-sizing: border-box;
}
.uni-uploader__file {
	width: 234rpx;
	margin: 3rpx;
	margin-bottom: 12rpx;
}
.upfileBr.namess {
	margin-right: 20rpx;
}
.uni-uploader__file.nameHieght {
	height: auto;
}
.uni-uploader__file.names {
	margin: 3rpx;
}

.names {
	font-size: 26rpx;
	color: #00002a;
	text-align: center;
	padding: 0 10rpx;
	line-height: 40rpx;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pdfseat {
	background: image-set(url('@/static/img/pdf.png') 1x, url('@/static/img/pdf@2x.png') 2x, url('@/static/img/pdf@3x.png') 3x) no-repeat center center;
	background-size: contain;
	border: none;
}
</style>
