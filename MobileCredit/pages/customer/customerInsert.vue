<template>
	<!-- 	
	<view class="w100">
		<view class="mianRadius mcform">
			<view class="mc-tabWrap">
				<view class="mc-tabitem" :class="{ active: isactiveTab == '00' ? true : false }" @click="toChangeQuery('00')">草稿客户(正式)</view>
				<view class="mc-tabitem" :class="{ active: isactiveTab == '02' ? true : false }" @click="toChangeQuery('02')">草稿客户(担保)</view>
			</view>
			暂无数据
		</view>
		aaa
	</view>
	 -->

	<view class="wrap" style="height: 100%;">
		<view class="custPartTitle">请选择客户分类</view>
		<button type="" class="mc-btn-primary widthBig primary" @click="toLink('/pages/customer/customerNew?custType=2')">正式客户</button>
		<button type="" class="mc-btn-primary widthBig orange" @click="toLink('/pages/customer/customerNew?custType=1')">临时客户</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toLink(pageurl) {
				uni.redirectTo({
					url: pageurl
				});
			},
		}
	}
</script>

<style scoped lang="scss">
.custPartTitle {
	margin-top: 48rpx;
	margin-bottom: 40rpx;
}
button.widthBig {
	width: auto;
	margin: 30rpx;
	height: 120rpx;
	line-height: 120rpx;
	font-size: 40rpx;
	margin-bottom: 40rpx;
}
.primary {
	background: url('@/static/img/zskhbg.png') no-repeat center center;
	background-size: cover;
}
.orange {
	background: image-set(url('@/static/img/dbkhbg.png') 1x, url('@/static/img/dbkhbg.png') 2x, url('@/static/img/dbkhbg.png') 3x) no-repeat center center;
	background-size: cover;
}

</style>
