<template>
	<view>
		<view class="topClass">
			<view class="height-status"></view>
			<view class="logo">
				<view class="logoicon"></view>
				<view class="logoText">
					<view class="bantouming">
						<button class="mc-min-btn-primary">
							<!-- <a style="color: #db9a19;">{{custInfo.result.cusName}} -->
						</a></button>
					</view>
					<!-- <span class="">{{custInfo}}</span> -->
					<span class="exit" @click="toLink('/pages/login/login')"></span>
					<view class="welcome">
						<span type="">欢迎您</span>
					</view>
				</view>
			</view>
		</view>


		<!-- 客户管理 -->
		<view class="postion-top">
			<uni-card>
				<view class="menuwrap">
					<h5 class="menuTitle">客户管理</h5>
					<ul class="menulist clearfix">
						<!-- 新增客户 -->
						<li @click="toLink('/pages/customer/customerInsert')">
							<view class="menu-icon">
								<image src="../../static/img/xzkh@2x.png" mode=""></image>
							</view>
							<view class="menu-text">新增客户</view>
						</li>
						<!-- 客户查询 -->
						<li @click="toLink('/pages/customer/customerFind')">
							<view class="menu-icon">
								<image src="../../static/img/khcx@2x.png" mode=""></image>
							</view>
							<view class="menu-text">客户查询</view>
						</li>
						<li @click="toLink('/pages/customer/customerUpdate')">
							<view class="menu-icon">
								<image src="../../static/img/update.png" mode=""></image>
							</view>
							<view class="menu-text">修改客户信息</view>
						</li>
						<li @click="toLink('/pages/customer/customerDel')">
							<view class="menu-icon">
								<image src="../../static/img/del@2x.png" mode=""></image>
							</view>
							<view class="menu-text">删除客户</view>
						</li>
					</ul>
				</view>
			</uni-card>

			<!-- 广告 -->
			<uni-card class="lunbo">
				<view>
					<swiper :indicator-dots="indicatorDots"  :indicator-color="indicatorColor"
						 :indicator-active-color="indicatorActiveColor"    autoplay="autoplay" :interval="interval"
						 :duration="duration" :circular="true">
						<swiper-item>
							<view class="lunboImg">
								<image src="../../static/img/lunbo1.jpg"  mode=""></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="lunboImg">
								<image src="../../static/img/lunbo2.jpg"  mode=""></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="lunboImg">
								<image src="../../static/img/lunbo3.jpg"  mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</uni-card>

			<!-- 个人设置 -->
			<uni-card>
				<view class="menuwrap">
					<h5 class="menuTitle">个人管理</h5>
					<ul class="menulist clearfix">
						<li @click="toLink('/pages/ownSet/shop')">
							<view class="menu-icon">
								<image src="../../static/dqsq/ohter2@2x.png" mode=""></image>
							</view>
							<view class="menu-text">积分商城</view>
						</li>
						<li @click="toLink('/pages/ownSet/offerList')">
							<view class="menu-icon">
								<image src="../../static/img/jyxdksq@2x.png" mode=""></image>
							</view>
							<view class="menu-text">我的订单</view>
						</li>
						<li @click="toLink('/pages/ownSet/upload')">
							<view class="menu-icon">
								<image src="../../static/img/xfdkcx@2x.png" mode=""></image>
							</view>
							<view class="menu-text">已有设备展示</view>
						</li>
						<li @click="toLink('/pages/ownSet/my')">
							<view class="menu-icon">
								<image src="../../static/img/mine.png" mode=""></image>
							</view>
							<view class="menu-text">个人中心</view>
						</li>
					</ul>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				custInfo: this.$store.state.accountInfos,

				// 图片轮播
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff"
			};
		},
		mounted() {
			uni.setStorage({
				key: 'isLoginPage',
				data: false,
				success: function() {}
			});
			this.isLoginPageChange(false);
		},
		methods: {

			...mapMutations(['isLoginPageChange']),

			/* loginOut() {

				this.$request
					.post({
						url: 'web/exit',
						data: {
							actorno: this.custInfo.actorno,
						}
					})
					.then(res => {
						console.log('退出登录', res);
						res = res.result[0];
						if (res.head.returnCode == '00000000') {
							uni.reLaunch({
								url: '/pages/login/login'
							});
							uni.clearStorage();
						} else {
							uni.showToast({
								title: res.head.returnMsg,
								icon: 'none',
								duration: 1500
							});
						}
					})
					.catch(err => {});
			}, */
			toLink(pageurl) {
				uni.navigateTo({
					url: pageurl
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.height-status {
		// height: calc(44px + constant(safe-area-inset-top));
		// height: calc(44px + env(safe-area-inset-top));
	}

	.topClass {
		// height: calc(44px + constant(safe-area-inset-top)+352rpx);
		// height: calc(44px + env(safe-area-inset-top)+352rpx);
		height: calc(440rpx);
		background: url('@/static/img/bg1-3.png') #dde0ff no-repeat center;
		background-size: 100% 100%;
	}

	.logo {
		position: relative;
		padding-top: 160rpx;
	}

	.logoicon {
		position: absolute;
		margin-left: 32rpx;
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
		background: url('@/static/img/homeLogo.png') white no-repeat center;
		background-size: 100% 100%;
	}

	.logoText {
		padding-left: 156rpx;
		font-family: PingFang-SC-Bold;
		font-size: 40rpx;
		color: #ffffff;
		line-height: 64rpx;
	}

	.exit {
		font-size: 32rpx;
		margin-left: 32rpx;
		position: absolute;
		right: 32rpx;
		top: 18rpx;
		width: 32rpx;
		height: 32rpx;
		background: url(../../static/img/exit3.png) no-repeat center;
		background-size: contain;
	}
	
	// 设置半透明
	.logo .mc-min-btn-primary {
		background: rgba(255, 255, 255, 0.5);
	}

	.postion-top {
		position: relative;
		top: -124rpx;
	}

	.uni-card {
		margin: 32rpx;
		border-radius: 32rpx;
	}

	.menuTitle {
		font-family: PingFang-SC-Bold;
		font-size: 32rpx;
		color: $mc-text-title;
		letter-spacing: 0;
		font-weight: bold;
		text-align: left;
		line-height: 98rpx;
		margin: 0 32rpx;
		margin-bottom: 14rpx;
	}

	.menulist {
		margin: 0 32rpx;
		margin-bottom: 32rpx;
	}

	.menulist>li {
		width: 25%;
		float: left;
		text-align: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-bottom: 20px;
	}

	.menulist .menu-icon {
		width: 48rpx;
		height: 48rpx;
		margin: auto;
		margin-bottom: 20rpx;
	}

	.menulist .menu-icon uni-image {
		width: 100%;
		height: 100%;
	}

	.menulist .menu-text {
		font-family: PingFang-SC-Regular;
		font-size: 24rpx;
		color: $mc-text-color;
		letter-spacing: 0;
		line-height: 32rpx;
	}

	.lunbo /deep/ .uni-card__content--pd {
		padding: 0;
	}

	.lunboImg {
		width: 100%;
		height: 100%;
	}

	.lunboImg uni-image {
		width: 100%;
		height: 100%;
	}

	.welcome {
		margin-left: 8px;
		text-shadow: 2px 1px 1px #757575;
	}
</style>
