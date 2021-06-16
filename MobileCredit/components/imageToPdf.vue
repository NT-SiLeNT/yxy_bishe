<template>
	<view class="">
		<mc-image
			class="mianRadius"
			@getImageData="checkItem[1].currentImageList = $event"
			:ownData="{ type: checkItem[1].id, serno: currentserno, date: apply_date, pvalue: currentserno + 'pdf' }"
			:countMax="checkItem[1].max"
			:uploaderTitle="checkItem[1].tip"
			:requireClass="'requireIcon'"
			:echoImgList="checkItem[1].echoImgList"
			:imageListArr="checkItem[1].currentImageList"
			:canAddImg="true"
		></mc-image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentserno: '',
			apply_date: '',
			checkItem: [
				// 经营性贷款现场核查需收集的照片数据
				{
					label: '基本资料',
					id: '010302',
					requird: true,
					tip: '基本资料',
					max: 0,
					echoImgList: [],
					currentImageList: []
				},
				{
					label: '其他资料',
					id: '010304',
					requird: true,
					tip: '其他资料',
					max: 0,
					echoImgList: [],
					currentImageList: []
				}
			]
		};
	},
	props: {
		ownData: {
			type: Object,
			default: function() {
				return {
					serno: '',
					apply_date: ''
				};
			}
		}
	},
	mounted() {
		this.currentserno = this.ownData.serno;
		this.apply_date = this.ownData.apply_date;
	}
};
</script>

<style></style>
