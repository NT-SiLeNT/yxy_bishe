<template>
	<view class="mcform">
		<checkbox-group @change="radioChange($event, 'dd', 'popup')" class="mcradio" ref="radioGroup">
			<slot v-if="!data.length"></slot>
			<label v-else class="uni-list-cell uni-list-cell-pd" :class="{disabledtext:disabled}" v-for="(item, index) in data" :key="item.value">
				<view>
					<checkbox
						:value="item.value + '~m~~~~c~' + item.label"
						:disabled="disabled == true ? true : current.value.indexOf(notValue) != -1 && notValue != item.value ? true : false"
						:checked="current.value.indexOf(item.value) != -1"
					/>
				</view>
				<view>{{ item.label }}</view>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
import { citydatas } from '@/common/cityDatas.js';
var cityFormat = [];
var onlyNum = 0;
export default {
	data() {
		return {
			current: {},
			isOpen: false,
			dataArr: []
		};
	},
	created() {
		if (this.value.indexOf(this.notValue) != -1) {
			this.current.value = this.notValue;
		}
		this.current.value = this.value;
		this.dataArr = this.data;
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '-请选择-'
		},
		left: {
			type: Boolean,
			default: false
		},
		notValue: {
			default: 'not'
		},
		data: {
			type: Array,
			default: function() {
				return [];
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		this.$refs.radioGroup.$children.map((item, index) => {
			this.$refs.radioGroup.$children[index]._data.leftbtnt = this.left;
			this.$refs.radioGroup.$children[index]._data.current = this.current.value;
			this.$refs.radioGroup.$children[index]._data.notValue = this.notValue;
		});
	},

	methods: {
		radioChange: function(evt, type, open) {
			console.log('ec', evt);
			var arr = evt.target.value;
			var arrdata = [];
			for (var i = 0; i < arr.length; i++) {
				var spres = arr[i].split('~m~~~~c~');
				arrdata.push(spres[0]);
			}
			var arr1 = JSON.parse(JSON.stringify(arrdata));
			if (arrdata.indexOf(this.notValue) != -1) {
				arr1 = [this.notValue];
				this.current.value = this.notValue.toString();
			} else {
				this.current.value = arrdata.join(',');
			}
			console.log('this.current。value', this.current.value);
			if (this.current.value.indexOf(this.notValue) != -1) {
				this.current.value = this.notValue;
			}
			this.$forceUpdate();
			this.$emit('input', arr1.join(','));
		}
	},
	watch: {
		value() {
			this.$refs.radioGroup.$children.map((item, index) => {
				this.$refs.radioGroup.$children[index]._data.current = this.value;
			});
			var arr = this.value.split(',');
			var arrdata = [];
			for (var i = 0; i < arr.length; i++) {
				var spres = arr[i].split('~m~~~~c~');
				arrdata.push(spres[0]);
			}
			var arr1 = JSON.parse(JSON.stringify(arrdata));
			if (arrdata.indexOf(this.notValue) != -1) {
				arr1 = [this.notValue];
				this.current.value = this.notValue.toString();
			} else {
				this.current.value = arrdata.join(',');
			}
			this.current.value = arrdata.join(',');
			console.log('this.current.value', this.current.value);
			if (this.current.value.indexOf(this.notValue) != -1) {
				this.current.value = this.notValue;
			}
			this.$forceUpdate();
			this.$emit('input', arr1.join(','));
			this.$forceUpdate();
		}
	}
};
</script>

<style scoped lang="scss">
.mcform {
	padding: 0;
	touch-action: pan-y;
}
.bottomGap::after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}
.mcform .uni-form-item.onerow.minHeight {
	height: 40rpx;
}
.mcform .uni-form-item.onerow.minHeight .uni-input {
	line-height: 40rpx;
	height: 40rpx;
}
.mcform .uni-list-cell::after {
	display: none !important;
}
.mcform uni-radio-group,
.mcform uni-checkbox-group {
	font-size: 28rpx;
	color: $mc-text-checkTitle;
}
.mcform.left uni-radio-group,
.mcform.left uni-checkbox-group {
	display: flex;
}
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
	min-width: 60%;
	max-height: 50%;
	overflow: auto;
	border-radius: 20rpx;
}
.mcradio /deep/ uni-radio .uni-radio-input.uni-radio-input-checked:before {
	content: '';
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background: #fff;
}
.mcradio-wrap {
	height: 100%;
	overflow: auto;
}
.mcradio .uni-list-cell {
	justify-content: space-between;
	padding: 0;
	line-height: 90rpx;
	padding: 0 30rpx;
	color: $mc-text-title;
	font-family: PingFang-SC-Bold;
}
.select-dialog-wrap {
	background-color: #fff;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}
.uni-tip-title-row {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 30rpx 20rpx;
	line-height: 1;
}
.uni-tip-title-row.topborderGap {
	border: none;
	border-bottom: 1px solid #dddddd;
}
.mcselect {
	line-height: 88rpx;
	height: 88rpx;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-color;
	letter-spacing: 0;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
}
.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
.topborderGap {
	border-top: 1px solid #dddddd;
}
.uni-list-cell:first-child {
	border: none;
}
.mcradio .uni-list-cell {
	justify-content: flex-start;
	line-height: 60rpx;
}
</style>
