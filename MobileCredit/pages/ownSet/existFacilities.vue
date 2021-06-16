<template>
	<view class="addImg-common">
		<form>
			<view class="addImg-list">
				<view class="cell-pd">
					<view class="uploader">
						<view class="uploader-head">
							<view>点击可添加或预览设备</view>
							<view class="count-info">共{{imageList.length}}张</view>
						</view>
						<!-- 上传图片框 -->
						<view class="uploader-body">
							<view class="uploader_files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uploader_file">
										<!-- 删除图标 -->
										<view class="icon-del" @tap="del(index)"></view>
										<!-- 上传的图片 -->
										<image class="uploader_img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<!-- 选择图片按钮 -->
								<view class="uploader_input-box">
									<view class="uploader_input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	// import touch from "@/common/touch.js"
	export default {

		data() {
			return {
				title: 'choose/previewImage',
				imageList: [],
				countIndex: 8,
				count: 1
			}
		},
		onUnload() {
			this.imageList = [],
				this.countIndex = 8;
		},
		methods: {
			countChange: function(e) {
				this.countIndex = e.detail.value;
			},

			chooseImage: async function() {
				uni.chooseImage({
					// count: this.imageList.length + this.count[this.countIndex] > 3 ? 3 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);

						var tempFilePaths = res.tempFilePaths;
						debugger;
						uni.saveFile({
							tempFilePath: tempFilePaths[0],
							success: function(res) {
								var savedFilePath = res.savedFilePath;
								console.log(JSON.stringify(res.savedFilePath));
							}
						});
						//localStorage.setItem('imageList', JSON.stringify(this.imageList))
					},

					fail: (err) => {
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
					}
				});
				localStorage.setItem('imageList', JSON.stringify(this.imageList))
			},
			/* saveFile:function(res){
			    var tempFilePaths = res.tempFilePaths;
			    uni.saveFile({
			      tempFilePath: tempFilePaths[0],
			      success: function (res) {
			        var savedFilePath = res.savedFilePath;
					res = {savedFilePath: './saveImg'}
					console.log(JSON.stringify(res.savedFilePath));
			      }
			    });
			}, */
			// 预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				});
				localStorage.setItem('imageList', JSON.stringify(this.imageList))
			},
			del(index) {
				let _self = this;
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: (res) => {
						debugger;
						if (res.confirm) {
							
							_self.imageList.splice(index, 1)
						}
					}
				});
				localStorage.setItem('imageList', JSON.stringify(this.imageList))
			},
			saveList() {
				localStorage.setItem('imageList', JSON.stringify(this.imageList))
			},
			// 检查权限
			/* async checkPermission(code) {
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			} */
		}
	}
</script>

<style>
	/* 整体 */
	.addImg-common {
		width: 100%;
		margin-top: 30rpx;
	}

	.addImg-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
	}

	/* .list-pd {
		margin-top: 50rpx;
	} */

	.cell-pd {
		padding: 22rpx 30rpx;
	}

	/* 上传 */
	.uploader {
		flex: 1;
		flex-direction: column;
		/* 灵活的项目将垂直显示，正如一个列一样。 */
	}

	.uploader-head {
		display: flex;
		/* 弹性布局 */
		flex-direction: row;
		/* 灵活的项目将水平显示，正如一个行一样。 */
		justify-content: space-between;
		/* 项目位于各行之间留有空白的容器内。 */
	}



	.count-info {
		color: #B2B2B2;
	}

	/* 上传图片框 */
	.uploader-body {
		margin-top: 18rpx;
		margin-bottom: 18rpx;
	}

	.uploader_files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uploader_file {
		position: relative;
		margin: 5rpx;
		width: 224rpx;
		height: 170rpx;
	}

	.uploader_img {
		display: block;
		width: 224rpx;
		height: 170rpx;
	}

	.uploader_input-box {
		position: relative;
		margin: 10rpx;
		width: 224rpx;
		height: 170rpx;
		/* border: 2rpx solid #D9D9D9; */
		background: url("@/static/img/addpic@2x.png") no-repeat center center;
		background-size: contain;
	}

	.uploader_input {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	/* 删除图标 */
	.icon-del {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		right: 6rpx;
		top: 5rpx;
		background: url(../../static/img/del@2x.png);
		background-size: cover;
		z-index: 999;
	}
</style>
