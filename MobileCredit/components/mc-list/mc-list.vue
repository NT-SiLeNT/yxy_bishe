<template>
	<view style="width:100%">
		<slot></slot>
		<!-- <view class="mcitems"> 
			<view class="mcitem mcrowOne">
				<span class="mclabel">55555555555</span>
				<span class="mccontent">dshfkjahfjdj</span>
			</view>
			<view class="mcitem">
				<span class="mclabel">55555555555</span>
				<span class="mccontent">dshfkjahfjdj</span>
			</view>
			<view class="mcitem">
				<span class="mclabel">55555555555</span>
				<span class="mccontent">dshfkjahfjdj</span>
			</view>
			<view class="mcitem mcrowOne">
				<span class="mclabel">客户姓名</span>
				<span class="mccontent">和实施</span>
				<span class="mclabel">客户编号</span>
				<span class="mccontent">dshfkjahf555jdj</span>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.mcitems{
		display: flex;
		flex-wrap: wrap;
		
	}
	.mcitem{
		width: 50%;
		display: flex;
	}
	.mcitem .mclabel{
		display: inline-block;
		color: $mc-text-caption;
		font-size: 28rpx;
		line-height:56rpx;
		text-align: left;
		margin-right:5px;
		margin-left: 40rpx;
	}
	.mcitem .mccontent{
		display: inline-block;
		color: $mc-text-checkOption;
		font-size: 28rpx;
		line-height:56rpx;
		text-align: left;
		margin-right:5px;
		word-break: break-all;
		
	}
	.mcrowOne{
		width:100%;
	}

</style>
