<template>
	<div class="box">
		<div class="upDiv">
			<ul class="upload-list">
				<li class="upload-list-item" v-for="(item, index) in ImageList" :key="index"
					:class="{ loading: index == ImageList.length - 1 && loading }">
					<img :src="item.imagePath" alt="" @tap="previewImage"/>
					<a class="icon-del" @tap="del(index)"></a>
				</li>
			</ul>
			<div class="inputBox" @click="loading === false ? onUploadClick() : tipLoading()">
				<input ref="uploadInput" type="file" class="upinp" name="file" value=""
					accept="image/gif,image/jpeg,image/jpg,image/png" @change="selectImg($event)" />
			</div>
		</div>
	</div>
</template>
<script>
	import {
		jsdelivr
	} from 'vuex';
	export default {
		props: {
			originImg: {
				type: Array,
				default: function() {
					return [];
				},
			},
		},
		data() {
			return {
				title: 'choose/previewImage',
				ImageList: [],
				useMock: false, // 真正用的使用这个 改为 false  或者删掉useMock判断为true的代码,  base64:这个变量可以删掉
				loading: false,
				base64: "",
			};
		},
		mounted() {
			this.ImageList = [];
			this.getImage();
			console.log(this.labTex);
		},
		// input的change回调第一个参数是event对象
		methods: {
			getImage() {
				var _this = this;
				// 发送请求
				let xhr = new XMLHttpRequest();
				xhr.open("post", "http://localhost:8888/web/selectAllImg");
				xhr.send();
				xhr.onload = function() {
					// 获取服务器端返回的数据并转为json对象格式的数据
					var res = JSON.parse(xhr.responseText);
					if (_this.useMock) {
						res = [{
							imagePath: _this.base64,
						}, ];
					}
					_this.ImageList = _this.ImageList.concat(res);
				};
			},
			onUploadClick() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePath = res.tempFilePaths[0];
						
						uni.request({
							url: tempFilePath,
							method: 'GET',
							responseType: 'arraybuffer',
							success: ress => {
								let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
								base64 = 'data:image/png;base64,' + base64 //不加上这串字符，在页面无法显示的哦
								console.log(base64)
								let ItemImage = {}
								ItemImage.imagePath = base64;
								let newImageList = [];
								newImageList.push(ItemImage)
								_this.ImageList = _this.ImageList.concat(newImageList);
								_this.selectImg(base64);
							},
							fail: (e) => {
								console.log("图片转换失败");
							}
						})
						
					}
				});
			},
			selectImg(tempFilePath) {
				var _this = this;
				this.loading = true;
				uni.request({
					url: 'http://localhost:8888/web/importImg',
					method: 'POST',
					data: {
						path: tempFilePath
					},
					success: (res) => {
						console.log(res.data);
					}
				});
				this.loading = false;
			},
			// 预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.ImageList
				});
			},
			del(index) {
				let _self= this;
				let id = _self.ImageList[index].id
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: (res) => {
						if (res.confirm) {
							_self.ImageList.splice(index, 1);
							uni.request({
								url: 'http://localhost:8888/web/deleteImg',
								method: 'POST',
								// data: {"head":{},"content"{}},
								data: {
									'id':id
								}, 
								success: (res) => {
									console.log(res.data);
								}
							});
						}
					}
				});
			},
			tipLoading() {
				alert("图片正在上传中");
			},
		},
	};
</script>
<style>
	.box{
		margin: 15px;
	}
	
	.upDiv .upinp {
		display: none;
	}

	.upDiv .inputBox {
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		box-sizing: border-box;
		width: 148px;
		height: 148px;
		cursor: pointer;
		line-height: 146px;
		vertical-align: top;
		display: inline-block;
		text-align: center;
		outline: none;
		background-image: url("add.png");
		background-repeat: no-repeat;
		background-position: center;
	}

	.upload-list {
		margin: 0;
		display: inline;
		vertical-align: top;
	}

	.upload-list .upload-list-item {
		overflow: hidden;
		background-color: #fff;
		border: 1px solid #c0ccda;
		border-radius: 6px;
		box-sizing: border-box;
		width: 150px;
		height: 150px;
		margin: 0 15px 15px 0;
		display: inline-block;
	}

	.upload-list-item>img {
		width: 100%;
		height: 100%;
	}

	.upload-list-item.loading {
		position: relative;
	}

	.upload-list-item.loading:after {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background: rgba(0, 0, 0, 0.4);
	}
	/* 删除图标 */
	.icon-del {
		position: fixed;
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		background: url(../../static/img/del@2x.png);
		background-size: cover;
		z-index: 999;
		margin: 5rpx -38rpx;
	}
</style>
