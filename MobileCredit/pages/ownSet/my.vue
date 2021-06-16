<template>
	<view>
		<!-- 修改头像 -->
		<view class="my">
			<view class="headImg" @click="upfile()"></view>
		</view>
		<!-- 登录账号显示 -->
		<view>
			<!-- <span class="name_no">{{custInfo.result.cusName}}</span> -->
		</view>
		<!-- 个人信息设置 -->
		<view class="w100">
			<view>
				<!-- 修改密码 -->
				<uni-card class="pwdBg" @click="toLink('/pages/ownSet/changePwd')"><span class="myset">修改密码</span>
				</uni-card>
				<!-- 计算器 -->
				<uni-card class="calculatorBg">
					<span class="myset" type="default" @tap="openCalculatorPopup">
						计算器
					</span>
					<uni-popup type="center" ref="calculator" :maskClick="false">
						<xl-calculator @closeCalculatorPopup="closeCalculatorPopup"></xl-calculator>
					</uni-popup>
				</uni-card>
				<!--  -->
				<uni-card><span class="myset" @click="Remaining()">剩余积分</span></uni-card>
				<uni-card class="noteBg"><span class="myset" @click="toLink('/pages/ownSet/note')">备忘录</span></uni-card>
			</view>
		</view>
		<view class="foot-all">
			<span class="foot">2009-2021 © 商业银行 版权所有 鲁ICP备05010523号</span>
			<br />
			<span class="foot">
				<image src="../../static/img/foot.png" style="width: 39rpx; height: 39rpx; vertical-align: middle;">
				</image>
				鲁公网安备 37100202000180号 IPv6
			</span>
			<br />
			<span class="foot">地址： 威海市宝泉路9号财政大厦 邮编：264200</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				custInfo: this.$store.state.accountInfos,
				search: {}
			}
		},
		methods: {
			// 上传头像
			upfile() {
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						console.log(res.tempFilePaths[0]); //成功则返回图片的本地文件路径列表 tempFilePaths
						uni.uploadFile({ //将本地资源上传到开发者服务器
							// url: 'web/com.yxy.login.dao.UserDao', //接口地址
							filePath: res.tempFilePaths[0], //图片地址
							name: 'file',
							formData: {
								accessToken: uni.getStorageSync('accessToken'), //加入token
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								if (data.code == 1) {
									this.my_avatar = data.data.url; //上传成功后返回的图片地址
								}
							}
						});
					}
				});
			},

			// 页面跳转
			toLink(pageurl) {
				uni.navigateTo({
					url: pageurl,
					// url:(window.location.href = "http://www.whccb.com/")
				});
			},
			// 打开计算器弹窗
			openCalculatorPopup() {
				this.$refs.calculator.open();
			},
			closeCalculatorPopup() {
				this.$refs.calculator.close();
			},

			// 剩余积分
			Remaining: function() {				
				// alert("您的剩余积分为" + data)
				var custInfo = this.custInfo;
				console.log(custInfo);
				uni.request({
					url: 'http://localhost:8888/web/user/queryIntegral',
					method: 'POST',
					// data: {"head":{},"content"{}},
					data: {
						'head': {},
						'content': {
							"cert_code":custInfo.result.certCode
						}
					},
					success: (res) => {
						console.log(res);
						alert('剩余积分:' + res.data.result);											
					}
				});
			},


		},
	}
</script>

<style>
	.my {
		display: flex;
		justify-content: center;
	}

	.headImg {
		display: flex;
		justify-content: center;
		border-radius: 50%;
		background: url('@/static/img/homeLogo.png') no-repeat center;
		background-size: 100% 100%;
		width: 200rpx;
		height: 200rpx;
		margin-top: 30rpx;
	}

	.name_no {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
		font-size: 18px;
		font-weight: bold;
		color: #808080;
	}

	.myset {
		display: flex;
		justify-content: center;
		font-size: 18px;
	}

	.foot {
		margin: 20rpx;
	}

	.foot-all {
		position: absolute;
		bottom: 0px;
		padding-top: 20rpx;
		color: #b8b8b8;
		font-size: 12px;
		text-align: center;
		width: 100%;
		height: 70px;
		background-color: #fefefe;
	}

	.pwdBg {
		background-color: #deecff;
	}

	.calculatorBg {
		background-color: #f1ffe5;
	}

	.noteBg {
		background-color: #f7e6ec;
	}
</style>
