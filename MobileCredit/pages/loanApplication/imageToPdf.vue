<template>
	<view class="w100">
		<view class="mpd">请按顺序拍摄需要生成pdf的图片，点击确定生成</view>
		<mc-image
			class="mianRadius"
			@getImageData="checkItem[0].currentImageList = $event"
			:ownData="{ type: checkItem[0].id, serno: currentserno, date: apply_date, pvalue: currentserno + 'pdf' }"
			:countMax="checkItem[0].max"
			:uploaderTitle="checkItem[0].tip"
			:requireClass="'requireIcon'"
			:echoImgList="checkItem[0].echoImgList"
			:imageListArr="checkItem[0].currentImageList"
			:canAddImg="true"
			:commonC="true"
			:canSelect="true"
			:unwant="true"
		></mc-image>
		<button style="margin-top: 40rpx;" type="" class="mc-btn-primary" @click="toPdf">确定</button>
		<!-- <button style="margin-top: 40rpx;" type="" class="mc-btn-primary" @click="pdfCreate">确定1</button> -->
		<mc-pop-select v-if="rename" @showP="isRenameOver" :show="show" :rename="true" v-model="name" :nameLists="getNameList" :nameIndexn="nameIndexn"></mc-pop-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentserno: '',
			apply_date: '',
			filepath: '', //生成的pdf文件路径
			pdfName: '',
			show: false,
			rename: true,
			name: '0000',
			nameIndexn: '',
			getNameList: [],
			checkItem: [
				{
					label: '图片',
					id: '010304',
					requird: true,
					tip: '图片',
					max: 0,
					echoImgList: [],
					currentImageList: []
				}
			],
			itemPrevPage: {}
		};
	},
	onLoad(option) {
		console.log('option  :', option.id);
		this.checkItem[0].id = option.id;
		this.currentserno = option.serno;
		this.apply_date = option.date;
	},
	mounted() {
		var _this = this;
		uni.getStorage({
			key: 'PdfPageNameList',
			success: function(res) {
				if (res.data) {
					_this.itemPrevPage = res.data;
					var a = [];
					var b = a.concat(_this.itemPrevPage.echoImgList);
					var c = b.concat(_this.itemPrevPage.currentImageList);
					var list = [];
					for (var i = 0; i < c.length; i++) {
						list.push(c[i].name);
					}
					_this.getNameList = list;
				}
			}
		});
	},
	methods: {
		isRenameOver($event) {
			this.show = $event;
			this.pdfCreate();
		},
		toPdf() {
			var imgList = this.checkItem[0].currentImageList;
			var _this = this;
			if (imgList.length) {
				uni.showModal({
					content: '是否确定生成pdf？',
					success: e => {
						if (e.confirm) {
							if (_this.rename) {
								_this.show = true;
								_this.name = _this.fnameFormat(4, _this.itemPrevPage.currentImageList.length + 1);
								return;
							}
						}
					},
					fail: () => {}
				});
			} else {
				uni.showToast({ title: '请拍摄图片', icon: 'none' });
				return;
			}
		},
		fnameFormat(len = 4, curr) {
			var a = (curr * 1).toString();
			var zlen = len - a.length;
			var z = '';
			for (var i = 0; i < zlen; i++) {
				z += '0';
			}
			return z + a;
		},
		uolpa() {
			this.$request
				.post({
					url: 'creditPhotoUpload/v1/CpmPdfInfoCommit',
					data: {
						filepath: this.filepath,
						phototype: this.checkItem[0].id,
						serno: this.currentserno,
						photoName: this.name,
						fileType: 'pdf',
						delSign: '1', // pdf默认传1
					},
					upType: true,
					upMsg: '正在合成影像信息'
				})
				.then(res => {
					res = res.result[0];
					if (res.head.returnCode == '00000000') {
						this.upLoadImgPlat();
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
		upLoadImgPlat() {
			this.$request
				.post({
					url: 'es/json/EsCreditImageUploadDQ',
					data: {
						serno: this.currentserno, //	任务编号
						crtdate: this.apply_date ? this.apply_date : '',
						pdfSign: '1' // 单独上传此pdf
					},
					upType: true,
					upMsg: '正在上传文件'
				})
				.then(res => {
					if (res.response.header.returnCode == '00000000') {
						console.log('现场核查影像上传', res);

						uni.setStorage({
							key: 'pdfBack',
							data: '',
							success: function() {}
						});
						uni.setStorage({
							key: 'pdfBack',
							data: { back: true, date: this.apply_date },
							success: function() {
								uni.navigateBack({});
							}
						});
					} else {
						uni.showToast({
							title: '提交失败',
							icon: 'none',
							duration: 1500
						});
					}
				})
				.catch(err => {});
		},
		pdfCreate() {
			var TemplateCodes = '';
			var TemplateCode = [];
			var ImageDatas = [];
			var imgList = this.checkItem[0].currentImageList;
			if (imgList.length) {
				for (var i = 0; i < imgList.length; i++) {
					TemplateCode.push('dp003');
					var item = {
						imagePath: imgList[i].pPath,
						imageWidth: '500',
						imageHeight: '1800',
						imageHash: '',
						type: '2',
						pageNo: '',
						lx: '50',
						ly: '90',
						keyWord: '',
						locationStyle: '',
						offsetX: '',
						offsetY: '',
						tempLateIndex: i + 1 + ''
					};
					ImageDatas.push(item);
				}
				TemplateCodes = TemplateCode.join(',');
			} else {
				uni.showToast({ title: '请拍摄图片', icon: 'none' });
				return;
			}
			var params = {
				TemplateCode: TemplateCodes,
				AttributeDatas: [
					{
						key: 'NAME',
						value: 'qqq',
						type: 'text',
						tempLateIndex: 1
					}
				],
				isUploadImage: 'false', // 上传影像平台--授权书此时不上传影像平台
				ImageDatas: ImageDatas
			};
			//生成pdf,
			this.$request
				.post({
					url: 'es/json/EsCreatePDF',
					data: params
				})
				.then(res => {
					console.log('eee', res);
					if (res.response.header.returnCode == '00000000' && res.response.content) {
						this.filepath = res.response.content.pdfPath;
						this.uolpa();
					} else {
						uni.showToast({ title: res.response.header.returnMsg, icon: 'none' });
					}
				})
				.catch(err => {
					console.log('eee', err);
					uni.showToast({ title: err, icon: 'none' });
				});
		}
	}
};
</script>

<style lang="scss">
.w100 {
	display: flex;
	flex-direction: column;
	padding-top: 10rpx;
}
.mc-btn-primary {
	width: 100%;
}
.mpd {
	padding: 0px 10rpx 10rpx;
}
</style>
