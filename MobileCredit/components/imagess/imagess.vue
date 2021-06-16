<template>
	<image class="pvImageClass" :src="src" :data-src="dataSrc" @error="errorHandle" @load="loadHandle" :mode="mode"></image>
</template>

<script>
export default {
	data() {
		return {
			rpreviewValue:'',
		};
	},
	mounted() {
		this.rpreviewValue = this.previewValue;
		var pvImageClass = this.$el.getElementsByTagName('img');
		pvImageClass[0].setAttribute('preview', this.rpreviewValue);
	},
	props: {
		src: {
			type: String
			// 图片资源地址
		},
		mode: {
			type: String,
			default: 'scaleToFill'
			// 图片裁剪、缩放的模式
		},
		dataSrc: {
			type: String,
			default: ''
		},
		previewValue: {
			default: ''
		}
	},
	watch:{
		previewValue(){
			this.rpreviewValue = this.previewValue;
		}
	},
	methods: {
		errorHandle(e) {
			this.$emit('error', e);
		},
		loadHandle(e) {
			this.$emit('load', e);
		}
	}
};
</script>

<style></style>
