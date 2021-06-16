<template>
	<view class="bgchange">
		<form>
			<view style="text-align: center;">
				<image class="logoIcon" src="../../static/img/star.png" mode=""></image>
				<view class="logoText">欢迎登录移动管理!</view>
			</view>
			<view class="input-group">
				<view class="uni-form-item uni-column">
					<view class="title">用户名</view>
					<input class="uni-input" focus v-model="account" @keypress.enter="loginNow()" placeholder="请输入员工号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>
					<input class="uni-input" @keypress.enter="loginNow()" v-model="password" type="password" placeholder="请输入登录密码" />
				</view>
			</view>
		</form>
		<checkbox-group class="remember" @change="checkChange">
			<label>
				<checkbox value="1" :checked="remember" />
				记住账号密码
			</label>
		</checkbox-group>
		<view class="btn-row topMarg"><button type="" class="mc-btn-primary" @tap="loginNow" :disabled="!canUse">登录</button></view>
		<!-- <navigator url="/pages/home/home"><button type="" class="mc-btn-primary">首页</button></navigator> -->
	</view>
</template>

<script>
	// import md5 from '@/common/js/md5.js';

	// 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
	// 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性。
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				account: '',
				password: '',
				remember: false
			};
		},
		computed: {
			canUse() {
				if (this.account && this.password) {
					return true;
				} else {
					return false;
				}
			}
		},
		onLoad: function() {},
		mounted() {
			this.isLoginPageChange(true);
			uni.setStorage({
				key: 'isLoginPage',
				data: true,
				success: function() {}
			});
			uni.getStorage({
				key: 'AccountandPwd',
				success: function(res) {
					if (res.data.account) {
						this.remember = true;
						this.account = res.data.account;
					}
				}
			});
		},
		destroyed() {
			uni.setStorage({
				key: 'isLoginPage',
				data: false,
				success: function() {}
			});
			this.isLoginPageChange(false);
		},
		onHide() {
			document.body.style.paddingBottom = 0 + 'px';
		},
		methods: {
			...mapMutations(['userAcc', 'loginInfo', 'isLoginPageChange']),
			validInput: function() {
				// var reg = /^[0-9]{4}$/g;
				var reg = /.{1,10}/g;
				if (!reg.test(this.account)) {
					uni.showModal({
						content: '请输入正确的工号！',
						showCancel: false
					});
					return false;
				} else if (this.password == '') {
					uni.showModal({
						content: '请输入密码！',
						showCancel: false
					});
					return false;
				} /* else if ((this.account != true) || (this.password != true)) {
					uni.showModal({
						content: '账号或密码错误！',
						showCancel: false
					});
					return false;
				} */

				return true;
			},
			loginNow: function() {
				if (!this.validInput()) {
					return;
				}
				if (this.remember) {
					var data = {
						account: this.account
					};
					console.log('data:', data);
					uni.setStorage({
						key: 'AccountandPwd',
						data: data,
						success: function() {}
					});
					this.userAcc(data);
				}
				console.log('点击登录');
				this.$request
					.post({
						url: 'web/login',
						data: {
							account: this.account,
							password: this.password,
							// password: this.password ? md5(this.account.toString() + this.password.toString()).toUpperCase() : ''
							}
					})
					.then(res => {
						console.log('res:', res);
						if (res.code == '200') {
							console.log('登录成功');
							/* "orgname": "环翠区"
							"actorno": "1001"
							"ErrMsg": "success"
							"RetCode": "0"
							"actorname": "yangxinyi"
							"orgid": "123456789" */

							// 登录成功后存储登录用户的信息，用于做免登录验证（登录时间起15天后登录状态失效）
							uni.setStorage({
								key: 'AccountandPwd',
								data: res,
								success: function() {
									console.log('success');
								}
							});
							document.body.style.paddingBottom = 0 + 'px';
							this.loginInfo(res);
							uni.reLaunch({
								url: '/pages/home/home'
							});
						} else {
							uni.showModal({
								title: '提示',
								content: res,
								showCancel: false
							});
						}
					})
					.catch(err => {
						console.log('err:', err);
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 1500
						});
					});
			},

			// 记住用户名密码
			checkChange: function() {
				this.remember = !this.remember;
			}
		},
	};

</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.bgchange {
		background: #fff;
		width: 100%;
		height: 100%;
	}

	.logoIcon {
		width: 155rpx;
		height: 155rpx;
		margin: 80rpx auto;
	}

	.logoText {
		font-family: PingFang-SC-Bold;
		font-size: 48rpx;
		color: $mc-text-title;
		letter-spacing: 0;
		text-align: center;
		line-height: 48rpx;
		margin-bottom: 120rpx;
	}

	.input-group {
		width: 75%;
		margin: 0 auto;
	}

	.uni-input {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0;
		font-size: 28rpx;
		border-bottom: 1px solid $mc-division;
	}

	.uni-input-placeholder {
		color: $mc-text-weak;
	}

	.uni-form-item .title {
		padding-left: 0;
		font-size: 32rpx;
		color: $mc-text-title;
		letter-spacing: 0;
		line-height: 32rpx;
	}

	.uni-form-item {
		margin-bottom: 10rpx;
	}

	.uni-label-pointer {
		font-size: 28rpx;
		color: $mc-text-color;
		line-height: 32rpx;
	}

	.remember {
		width: 75%;
		margin: 14rpx auto 82rpx;
	}

	.remember .uni-label-pointer /deep/ uni-checkbox .uni-checkbox-input {
		width: 32rpx;
		height: 32rpx;
	}

	.topMarg {
		margin-top: 82rpx;
	}
</style>
