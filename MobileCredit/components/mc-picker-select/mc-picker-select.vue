<template>
	<view class="mcselect" :class="{ areaCity: mode == 'area' }">
		<picker
			v-if="mode == 'area'"
			mode="multiSelector"
			@click="addressClickHandle"
			@change="addressHandle"
			@cancel="addressCance"
			@columnchange="bindMultiPickerColumnChange"
			:value="multiIndex"
			range-key="CNNAME"
			:range="multiArray"
			:disabled="disabled"
			id="showpoppickselect"
		>
			<view v-if="value == '-'" class="uni-input">-</view>
			<block v-else>
				<view v-if="address === ''" class="uni-input placehold">-请选择-</view>
				<block v-else>
					<view class="uni-input areaCity">{{ showAddress }}</view>
					<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
				</block>
				<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
				<!-- &#xe623; -->
				<span class="iconfont icons" v-else>&#xe606;</span>
				<!-- &#xe606; -->
			</block>
		</picker>
		<picker
			v-if="mode == 'selector'"
			@click="disabled == false ? (isOpen = true) : ''"
			:range-key="rangeKey"
			@cancel="DateCance"
			@change="bindDateChange($event, 'temporary.indiv_country')"
			:value="index"
			:range="range"
			:disabled="disabled"
			class="showpoppickselect"
		>
			<view v-if="value == '-'" class="uni-input">-</view>
			<block v-else>
				<view v-if="index === ''" class="uni-input placehold">-请选择-</view>
				<block v-else>
					<view class="uni-input">{{ range[index][rangeKey] }}</view>
					<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
				</block>
				<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
				<!-- &#xe623; -->
				<span class="iconfont icons" v-else>&#xe606;</span>
				<!-- &#xe606; -->
			</block>
		</picker>
		<picker
			:disabled="disabled"
			v-if="mode == 'date'"
			mode="date"
			start=""
			end=""
			:fields="fields"
			@click="disabled == false ? (isOpen = true) : ''"
			@cancel="DateCance"
			:value="value"
			@change="bindDateChange($event, 'value')"
			class="showpoppickselect"
		>
			<view v-if="value == '-'" class="uni-input">-</view>
			<block v-else>
				<view v-if="value === ''" class="uni-input placehold">-请选择-</view>
				<block v-else>
					<view class="uni-input">{{ value }}</view>
					<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
				</block>
				<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
				<!-- &#xe623; -->
				<span class="iconfont icons" v-else>&#xe606;</span>
				<!-- &#xe606; -->
			</block>
		</picker>
		<view class="pickJob" v-if="mode == 'industry'">
			<view class="uni-padding-wrap" @click="disabled ? '' : toshowPick()">
				<view v-if="value == '-'" class="uni-input">-</view>
				<block v-else>
					<span v-if="showStrData === ''" class="uni-input placehold">-请选择-</span>
					<block v-else>
						<span class="uni-input uni-title">{{ showStrData }}</span>
						<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
					</block>
					<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
					<!-- &#xe623; -->
					<span class="iconfont icons" v-else>&#xe606;</span>
					<!-- &#xe606; -->
				</block>
			</view>
			<uni-popup :maskClick="true" ref="showpopup" class="maxwrap showpopuppopselect" type="bottom" @onClose="cancel()">
				<view class="pickertempltete">
					<view class="showSpanWrap bottomborderGap">
						<view class="uni-tip-title-row topborderGap">
							<text class="uni-tip-title">请选择</text>
							<span class="uni-tip-close iconfont" @click="cancel('', 'popup')">&#xe601;</span>
							<!-- &#xe518; -->
						</view>
						<ul class="selectItems">
							<li
								class="selectItem"
								@click="saveArrData[0] == undefined ? '' : chooseAgin(0)"
								:class="{
									haveValue: currentIndex * 1 !== 0,
									active: saveArrData[0] != undefined ? true : false,
									active1: saveArrData[0] != undefined ? (saveArrData[1] != undefined ? false : true) : false
								}"
							>
								<!-- haveValue: saveArrData[0] != undefined ? true : false, -->
								<span v-if="saveArrData[0] == undefined">请选择一级行业名称</span>
								<span v-else>{{ industryData[saveArrData[0]].CNNAME }}</span>
							</li>
							<li
								v-if="saveArrData[0] != undefined"
								class="selectItem"
								@click="saveArrData[1] == undefined ? '' : chooseAgin(1)"
								:class="{
									haveValue: currentIndex != 1,
									active: saveArrData[1] != undefined ? true : false,
									active1: saveArrData[1] != undefined ? (saveArrData[2] != undefined ? false : true) : false
								}"
							>
								<span v-if="saveArrData[1] == undefined">请选择二级行业名称</span>
								<span v-else>{{ industryData[saveArrData[0]].zchild[saveArrData[1]].CNNAME }}</span>
							</li>
							<li
								v-if="saveArrData[1] != undefined"
								class="selectItem"
								@click="saveArrData[2] == undefined ? '' : chooseAgin(2)"
								:class="{
									haveValue: currentIndex != 2,
									active: saveArrData[2] != undefined ? true : false,
									active1: saveArrData[2] != undefined ? (saveArrData[3] != undefined ? false : true) : false
								}"
							>
								<span v-if="saveArrData[2] == undefined">请选择三级行业名称</span>
								<span v-else>{{ industryData[saveArrData[0]].zchild[saveArrData[1]].zchild[saveArrData[2]].CNNAME }}</span>
							</li>
							<li
								v-if="saveArrData[2] != undefined"
								class="selectItem"
								@click="saveArrData[3] == undefined ? '' : chooseAgin(3)"
								:class="{
									haveValue: currentIndex != 3,
									active: saveArrData[3] != undefined ? true : false,
									active1: saveArrData[3] != undefined ? true : false
								}"
							>
								<span v-if="saveArrData[3] == undefined">请选择四级行业名称</span>
								<span v-else>{{ industryData[saveArrData[0]].zchild[saveArrData[1]].zchild[saveArrData[2]].zchild[saveArrData[3]].CNNAME }}</span>
							</li>
						</ul>
					</view>
					<view class="selectJobWrap">
						<view class="pickerWrap">
							<view class="titleTip">请选择</view>
							<ul ref="scrollUl" class="selectshowItems" style="height: 138px;margin-left: 48rpx;overflow: auto;">
								<li
									class="selectshowItem"
									v-for="(item, indexs) in showArray"
									:key="indexs"
									@click="toSureValue(indexs, item)"
									:class="{ active: indexs == saveArrData[currentIndex] }"
								>
									{{ item.CNNAME }}
								</li>
							</ul>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="pickJob" v-if="mode == 'tenindustry'">
			<view class="uni-padding-wrap" @click="disabled ? '' : toshowPick()">
				<view v-if="value == '-'" class="uni-input">-</view>
				<block v-else>
					<span v-if="showStrData === ''" class="uni-input placehold">-请选择-</span>
					<block v-else>
						<span class="uni-input uni-title">{{ showStrData }}</span>
						<span class="iconfont icons clear" v-if="clearable && disabled == false" @click.stop="clearValue()">&#xe612;</span>
					</block>
					<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
					<!-- &#xe623; -->
					<span class="iconfont icons" v-else>&#xe606;</span>
					<!-- &#xe606; -->
				</block>
			</view>
			<uni-popup :maskClick="true" ref="showpopup" class="maxwrap showpopuppopselect" type="bottom" @onClose="cancel()">
				<view class="pickertempltete">
					<view class="showSpanWrap bottomborderGap">
						<view class="uni-tip-title-row topborderGap">
							<text class="uni-tip-title">请选择</text>
							<span class="uni-tip-close iconfont" @click="cancel('', 'popup')">&#xe601;</span>
							<!-- &#xe518; -->
						</view>
						<ul class="selectItems">
							<li
								class="selectItem"
								@click="saveArrData[0] == undefined ? '' : chooseAgin(0)"
								:class="{
									haveValue: currentIndex * 1 !== 0,
									active: saveArrData[0] != undefined ? true : false,
									active1: saveArrData[0] != undefined ? (saveArrData[1] != undefined ? false : true) : false
								}"
							>
								<!-- haveValue: saveArrData[0] != undefined ? true : false, -->
								<span v-if="saveArrData[0] == undefined">请选择一级行业名称</span>
								<span v-else>{{ tenindustryData[saveArrData[0]].CNNAME }}</span>
							</li>
							<li
								v-if="saveArrData[0] != undefined"
								class="selectItem"
								@click="saveArrData[1] == undefined ? '' : chooseAgin(1)"
								:class="{
									haveValue: currentIndex != 1,
									active: saveArrData[1] != undefined ? true : false,
									active1: saveArrData[1] != undefined ? (saveArrData[2] != undefined ? false : true) : false
								}"
							>
								<span v-if="saveArrData[1] == undefined">请选择二级行业名称</span>
								<span v-else>{{ tenindustryData[saveArrData[0]].zchild[saveArrData[1]].CNNAME }}</span>
							</li>
							<li
								v-if="saveArrData[1] != undefined && tenindustryData[saveArrData[0]].zchild[saveArrData[1]].zchild != undefined"
								class="selectItem"
								@click="saveArrData[2] == undefined ? '' : chooseAgin(2)"
								:class="{
									haveValue: currentIndex != 2,
									active: saveArrData[2] != undefined ? true : false,
									active1: saveArrData[2] != undefined ? (saveArrData[3] != undefined ? false : true) : false
								}"
							>
								<span v-if="saveArrData[2] == undefined">请选择三级行业名称</span>
								<span v-else>{{ tenindustryData[saveArrData[0]].zchild[saveArrData[1]].zchild[saveArrData[2]].CNNAME }}</span>
							</li>
						</ul>
					</view>
					<view class="selectJobWrap">
						<view class="pickerWrap">
							<view class="titleTip">请选择</view>
							<ul ref="scrollUl" class="selectshowItems" style="height: 138px;margin-left: 48rpx;overflow: auto;">
								<li
									class="selectshowItem"
									v-for="(item, indexs) in showArray"
									:key="indexs"
									@click="toSureValue(indexs, item)"
									:class="{ active: indexs == saveArrData[currentIndex] }"
								>
									{{ item.CNNAME }}
								</li>
							</ul>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="pickJob" v-if="mode == 'listSelection'">
			<view class="uni-padding-wrap" @click="disabled ? '' : toshowmultiplePick()">
				<view v-if="value == '-'" class="uni-input">-</view>
				<block v-else>
					<view class="" style="position: relative;width: 100%;">
						<span v-if="value != ''" class="uni-input uni-title maxWidth">{{ value }}</span>
						<span v-else class="uni-input placehold">-请选择-</span>
					</view>
					<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
					<!-- &#xe623; -->
					<span class="iconfont icons" v-else>&#xe606;</span>
					<!-- &#xe606; -->
				</block>
			</view>
			<uni-popup :maskClick="true" ref="showpopupmultiple" class="maxwrap showpopuppopselect" type="bottom" @onClose="cancelMulti()">
				<view class="pickertempltete slotList">
					<view class="showSpanWrap">
						<view class="uni-tip-title-row topborderGap slotList">
							<span class="uni-tip-close iconfont rigth" @click="cancelMulti('', 'popup')">&#xe601;</span>
							<!-- &#xe518; -->
						</view>
					</view>
					<view class="selectJobWrap slotList">
						<view class="pickerWrap height100"><slot></slot></view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="pickJob" v-if="mode == 'multiple'">
			<view class="uni-padding-wrap" @click="disabled ? '' : toshowmultiplePick()">
				<view v-if="value == '-'" class="uni-input">-</view>
				<block v-else>
					<view class="" style="position: relative;width: 100%;">
						<span v-if="multiStrData != ''" class="uni-input uni-title maxWidth">{{ multiStrData }}</span>
						<span v-else class="uni-input placehold">-请选择-</span>
					</view>
					<span class="iconfont icons" v-if="!isOpen">&#xe623;</span>
					<!-- &#xe623; -->
					<span class="iconfont icons" v-else>&#xe606;</span>
					<!-- &#xe606; -->
				</block>
			</view>
			<uni-popup :maskClick="true" ref="showpopupmultiple" class="maxwrap showpopuppopselect" type="bottom" @onClose="cancelMulti()">
				<view class="pickertempltete pickertemplteteM">
					<view class="ownPickHand">
						<view class="" @click="cancelMulti">取消</view>
						<view class="" @click="surelMulti">确定</view>
					</view>
					<view class="selectJobWrap">
						<view class="pickerWrap">
							<ul ref="scrollUl" class="selectshowItems" style="height: 138px;overflow: auto;">
								<li
									class="selectshowItem"
									v-for="(item, indexs) in range"
									:key="indexs"
									@click="toSelectMultiValue(indexs, item)"
									:class="{ active: item.selected == true }"
								>
									{{ item[rangeKey] }}
								</li>
							</ul>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import { citydatas } from '@/common/cityDatas.js';
import { indusdatas } from '@/common/indusdatas.js';
import { newTenind } from '@/common/newTenind.js';
var cityFormat = [];
var indusFormat = [];
var tenindusFormat = [];
export default {
	data() {
		return {
			currentIndex: 0,
			industryData: [], //行业所有数据
			tenindustryData: [], //十强行业所有数据
			showArray: [], // 当前展示的选择数组
			saveArrData: [], // 保存的选择下标
			showStrData: '', // 展示的文字
			showStrDataArr: [], // 展示的文字数组
			showIntData: [], //值的数组
			index: '',
			isOpen: false,
			address: '',
			showAddress: '',
			multiArray: [], // 地址选择的数据存放数组
			multiIndex: [0, 0, 0], //[0, 0, 0] 地址初始选择
			multiIntData: [],
			multiStrData: [], // 展示的文字
			multiStrDataArr: [] // 展示的文字数组
		};
	},
	props: {
		mode: {
			type: String,
			default: 'area'
		},
		value: {
			// type:String,
			default: ''
		},
		range: {
			type: Array,
			default: function() {
				return [];
			}
		},
		rangeKey: {
			type: String,
			default: 'label'
		},
		rangId: {
			type: String,
			default: 'value'
		},
		fields: {
			type: String,
			default: 'day'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		}
	},
	computed: {},
	// destroyed() {
	// 	if (this.mode == 'multiple' || this.mode == 'listSelection') {
	// 		this.cancelMulti();
	// 	} else if (this.mode == 'industry') {
	// 		this.cancel();
	// 	}
	// },
	mounted() {
		if (this.mode == 'selector') {
			if (this.value) {
				this.range.forEach((element, index) => {
					if (element[this.rangId] == this.value) {
						this.index = index;
					}
				});
			}
		} else if (this.mode == 'area') {
			this.multiArray = [[], [], []];
			cityFormat = this.doFormateTreeFun(citydatas, '');
			// console.log('返回城市数据chulihou', cityFormat);
			this.multiArray[0] = cityFormat[0].zchild;
			this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
			this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild ? this.multiArray[1][this.multiIndex[1]].zchild : [];
			if (this.value !== '') {
				var contentadd = [];
				if (this.value.toString().indexOf(',') == -1) {
					var search = this.value;
					var values = '';
					for (var i = 0; i < citydatas.length; i++) {
						if (search == citydatas[i].ENNAME) {
							values = citydatas[i].LOCATE;
							break;
						}
					}
					var arr = values.split(',');
					arr = arr.splice(1, arr.length - 1);
					contentadd = arr;
				} else {
					contentadd = this.value.split(',');
				}
				for (var i = 0; i < this.multiArray[0].length; i++) {
					if (this.multiArray[0][i].ENNAME == contentadd[0]) {
						this.bindMultiPickerColumnChange1(0, i);
					}
				}
				for (var i = 0; i < this.multiArray[1].length; i++) {
					if (this.multiArray[1][i].ENNAME == contentadd[1]) {
						this.bindMultiPickerColumnChange1(1, i);
					}
				}
				for (var i = 0; i < this.multiArray[2].length; i++) {
					if (this.multiArray[2][i].ENNAME == contentadd[2]) {
						this.multiIndex[2] = i;
					}
				}
				this.addressHandle();
			} else {
				this.address = '';
			}
		} else if (this.mode == 'industry') {
			var contentadd = [];
			indusFormat = this.doFormateTreeFun(indusdatas, '');
			// console.log('返回行业数据chulihou', indusFormat);
			this.industryData = indusFormat[0].zchild;
			if (this.value != '') {
				var search = this.value;
				var values = '';
				for (var i = 0; i < indusdatas.length; i++) {
					if (search == indusdatas[i].ENNAME) {
						values = indusdatas[i].LOCATE;
						break;
					}
				}
				var arr = values.split(',');
				arr = arr.splice(1, arr.length - 1);
				contentadd = arr;
				this.showIntData = contentadd;
				if (this.showIntData.length > 0) {
					this.saveArrData = this.getSud();
					var showStrData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						showStrData.push(this.showStrDataArr[i].CNNAME);
					}
					this.showStrData = showStrData.join('->');
				}
			} else {
				contentadd = this.value.split(',');
				this.showIntData = contentadd;
				this.showArray = indusFormat[0].zchild;
			}
		} else if (this.mode == 'multiple') {
			var arr = [];
			var arr1 = [];
			var arr2 = [];
			var value = this.value;
			var list = value.split(',');
			for (var i = 0; i < this.range.length; i++) {
				if (list.indexOf(this.range[i].value) != -1) {
					this.range[i].selected = true;
					arr.push(this.range[i].value);
					arr1.push(this.range[i].label);
					arr2.push(this.range[i]);
				} else {
					this.range[i].selected = false;
				}
			}
			this.$emit('input', arr.join(','));
			this.multiStrData = arr1.join(',');
			this.$emit('getName', arr1.join(','));
			this.$emit('getitems', arr2);
			this.$forceUpdate();
		} else if (this.mode == 'tenindustry') {
			var contentadd = [];
			tenindusFormat = this.doFormateTreeFun(newTenind, '');
			// console.log('返回行业数据chulihou', tenindusFormat);
			this.tenindustryData = tenindusFormat[0].zchild;
			if (this.value != '') {
				var search = this.value;
				var values = '';
				for (var i = 0; i < newTenind.length; i++) {
					if (search == newTenind[i].ENNAME) {
						values = newTenind[i].LOCATE;
						break;
					}
				}
				var arr = values.split(',');
				arr = arr.splice(1, arr.length - 1);
				contentadd = arr;
				this.showIntData = contentadd;
				if (this.showIntData.length > 0) {
					this.saveArrData = this.getSud();
					var showStrData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						showStrData.push(this.showStrDataArr[i].CNNAME);
					}
					this.showStrData = showStrData.join('->');
				}
			} else {
				contentadd = this.value.split(',');
				this.showIntData = contentadd;
				this.showArray = tenindusFormat[0].zchild;
			}
		}
	},
	watch: {
		index() {
			if (this.mode == 'selector') {
				if (this.index === '') {
					this.$emit('input', '');
					this.$emit('getName', '');
				} else {
					this.$emit('input', this.range[this.index][this.rangId]);
					this.$emit('getName', this.range[this.index][this.rangeKey]);
				}
			} else if (this.mode == 'date') {
				this.$emit('input', this.index);
			}
		},
		value() {
			if (this.mode == 'selector') {
				if (this.value !== '') {
					this.range.forEach((element, index) => {
						if (element[this.rangId] == this.value) {
							this.index = index;
						}
					});
				}
			} else if (this.mode == 'area') {
				this.multiArray[0] = cityFormat[0].zchild;
				this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
				this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild ? this.multiArray[1][this.multiIndex[1]].zchild : [];
				if (this.value !== '') {
					var contentadd = [];
					if (this.value.toString().indexOf(',') == -1) {
						var search = this.value;
						var values = '';
						for (var i = 0; i < citydatas.length; i++) {
							if (search == citydatas[i].ENNAME) {
								values = citydatas[i].LOCATE;
								break;
							}
						}
						var arr = values.split(',');
						arr = arr.splice(1, arr.length - 1);
						contentadd = arr;
					} else {
						contentadd = this.value.split(',');
					}
					for (var i = 0; i < this.multiArray[0].length; i++) {
						if (this.multiArray[0][i].ENNAME == contentadd[0]) {
							this.bindMultiPickerColumnChange1(0, i);
						}
					}
					for (var i = 0; i < this.multiArray[1].length; i++) {
						if (this.multiArray[1][i].ENNAME == contentadd[1]) {
							this.bindMultiPickerColumnChange1(1, i);
						}
					}
					for (var i = 0; i < this.multiArray[2].length; i++) {
						if (this.multiArray[2][i].ENNAME == contentadd[2]) {
							this.multiIndex[2] = i;
						}
					}
					this.addressHandle();
				} else {
					this.address = '';
				}
			} else if (this.mode == 'industry') {
				var search = this.value;
				var values = '';
				for (var i = 0; i < indusdatas.length; i++) {
					if (search == indusdatas[i].ENNAME) {
						values = indusdatas[i].LOCATE;
						break;
					}
				}
				var arr = values.split(',');
				arr = arr.splice(1, arr.length - 1);
				contentadd = arr;
				this.showIntData = contentadd;
				if (this.showIntData.length > 0) {
					this.saveArrData = this.getSud();
					var showStrData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						showStrData.push(this.showStrDataArr[i].CNNAME);
					}
					this.showStrData = showStrData.join('->');
				}
				if (this.value === '') {
					this.$emit('input', '');
					this.$emit('getName', '');
				} else {
					this.$emit('input', this.showIntData[this.showIntData.length - 1].toString());
					this.$emit('getName', this.showStrData);
				}
			} else if (this.mode == 'multiple') {
				var arr = [];
				var arr1 = [];
				var arr2 = [];
				var value11 = this.value;
				var arr11 = value11.split(',');
				for (var i = 0; i < this.range.length; i++) {
					if (arr11.indexOf(this.range[i].value) != -1) {
						this.range[i].selected = true;
						arr.push(this.range[i].value);
						arr1.push(this.range[i].label);
						arr2.push(this.range[i]);
					} else {
						this.range[i].selected = false;
					}
				}
				this.$emit('input', arr.join(','));
				this.multiStrData = arr1.join(',');
				this.$emit('getName', arr1.join(','));
				this.$emit('getitems', arr2);
				this.$forceUpdate();
			} else if (this.mode == 'tenindustry') {
				var search = this.value;
				var values = '';
				for (var i = 0; i < newTenind.length; i++) {
					if (search == newTenind[i].ENNAME) {
						values = newTenind[i].LOCATE;
						break;
					}
				}
				var arr = values.split(',');
				arr = arr.splice(1, arr.length - 1);
				contentadd = arr;
				this.showIntData = contentadd;
				if (this.showIntData.length > 0) {
					this.saveArrData = this.getSud();
					var showStrData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						if (this.showStrDataArr[i].zchild && this.showStrDataArr[i].zchild.length) {
							showStrData.push(this.showStrDataArr[i].CNNAME);
						} else {
							showStrData.push(this.showStrDataArr[i].CNNAME);
							break;
						}
						// showStrData.push(this.showStrDataArr[i].CNNAME);
					}
					this.showStrData = showStrData.join('->');
				}
				if (this.value === '') {
					this.$emit('input', '');
					this.$emit('getName', '');
				} else {
					this.$emit('input', this.showIntData[this.showIntData.length - 1].toString());
					this.$emit('getName', this.showStrData);
				}
			}
			this.$forceUpdate();
		}
	},
	methods: {
		toshowPick: function() {
			this.$nextTick(() => {
				this.$refs['showpopup'].open();
				this.isOpen = true;
				if (this.showIntData.length > 0) {
					this.saveArrData = this.getSud();
					this.$forceUpdate();
				}
			});
		},
		toshowmultiplePick: function() {
			this.$nextTick(() => {
				this.$refs['showpopupmultiple'].open();
				this.isOpen = true;
			});
		},
		clearValue() {
			if (this.mode == 'selector' || this.mode == 'date') {
				this.index = '';
				this.$emit('input', '');
				this.$forceUpdate();
			} else if (this.mode == 'industry') {
				var contentadd = this.value.split(',');
				this.showIntData = contentadd;
				this.showArray = indusFormat[0].zchild;
				this.showStrData = '';
				this.getSud();
				this.currentIndex = 0;
				this.$emit('input', '');
				this.$emit('getName', '');
			} else if (this.mode == 'area') {
				this.address = '';
				this.multiArray[0] = cityFormat[0].zchild;
				this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
				this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild ? this.multiArray[1][this.multiIndex[1]].zchild : [];
				this.multiIndex = [0, 0, 0];
				this.addressHandle();
				this.$emit('input', '');
				this.showAddress = '';
				this.$emit('getName', '');
			} else if (this.mode == 'tenindustry') {
				var contentadd = this.value.split(',');
				this.showIntData = contentadd;
				this.showArray = tenindusFormat[0].zchild;
				this.showStrData = '';
				this.getSud();
				this.currentIndex = 0;
				this.$emit('input', '');
				this.$emit('getName', '');
			}
		},
		getSud() {
			var indexarr = [];
			if (this.mode == 'industry') {
				if (this.showIntData[0] != undefined) {
					for (var i = 0; i < this.industryData.length; i++) {
						var items = this.industryData[i];
						if (this.showIntData[0] == items.ENNAME) {
							indexarr[0] = i;
							this.showStrDataArr[0] = items;
							this.currentIndex = 0;
							this.showArray = this.industryData;
							break;
						}
					}
				}
				if (this.showIntData[1] != undefined) {
					for (var i = 0; i < this.industryData[indexarr[0]].zchild.length; i++) {
						var items = this.industryData[indexarr[0]].zchild[i];
						if (this.showIntData[1] == items.ENNAME) {
							indexarr[1] = i;
							this.showStrDataArr[1] = items;
							this.currentIndex = 1;
							this.showArray = this.industryData[indexarr[0]].zchild;
							break;
						}
					}
				}
				if (this.showIntData[2] != undefined) {
					for (var i = 0; i < this.industryData[indexarr[0]].zchild[indexarr[1]].zchild.length; i++) {
						var items = this.industryData[indexarr[0]].zchild[indexarr[1]].zchild[i];
						if (this.showIntData[2] == items.ENNAME) {
							indexarr[2] = i;
							this.showStrDataArr[2] = items;
							this.currentIndex = 2;
							this.showArray = this.industryData[indexarr[0]].zchild[indexarr[1]].zchild;
							break;
						}
					}
				}
				if (this.showIntData[3] != undefined) {
					for (var i = 0; i < this.industryData[indexarr[0]].zchild[indexarr[1]].zchild[indexarr[2]].zchild.length; i++) {
						var items = this.industryData[indexarr[0]].zchild[indexarr[1]].zchild[indexarr[2]].zchild[i];
						if (this.showIntData[3] == items.ENNAME) {
							indexarr[3] = i;
							this.showStrDataArr[3] = items;
							this.currentIndex = 3;
							this.showArray = this.industryData[indexarr[0]].zchild[indexarr[1]].zchild[indexarr[2]].zchild;
							break;
						}
					}
				}
			} else {
				if (this.showIntData[0] != undefined) {
					for (var i = 0; i < this.tenindustryData.length; i++) {
						var items = this.tenindustryData[i];
						if (this.showIntData[0] == items.ENNAME) {
							indexarr[0] = i;
							this.showStrDataArr[0] = items;
							this.currentIndex = 0;
							this.showArray = this.tenindustryData;
							break;
						}
					}
				}
				if (this.showIntData[1] != undefined) {
					for (var i = 0; i < this.tenindustryData[indexarr[0]].zchild.length; i++) {
						var items = this.tenindustryData[indexarr[0]].zchild[i];
						if (this.showIntData[1] == items.ENNAME) {
							indexarr[1] = i;
							this.showStrDataArr[1] = items;
							this.currentIndex = 1;
							this.showArray = this.tenindustryData[indexarr[0]].zchild;
							break;
						}
					}
				}
				if (this.showIntData[2] != undefined) {
					for (var i = 0; i < this.tenindustryData[indexarr[0]].zchild[indexarr[1]].zchild.length; i++) {
						var items = this.tenindustryData[indexarr[0]].zchild[indexarr[1]].zchild[i];
						if (this.showIntData[2] == items.ENNAME) {
							indexarr[2] = i;
							this.showStrDataArr[2] = items;
							this.currentIndex = 2;
							this.showArray = this.tenindustryData[indexarr[0]].zchild[indexarr[1]].zchild;
							break;
						}
					}
				}
			}
			return indexarr;
		},
		// getcurrentIndexArr(){
		// 	if(this.currentIndex*1 === 0){
		// 		this.show this.industryData[i]
		// 	}
		// },
		chooseAgin(index) {
			this.currentIndex = index;
			if (this.mode == 'industry') {
				if (this.currentIndex == 0) {
					this.showArray = this.industryData;
				} else if (this.currentIndex == 1) {
					this.showArray = this.industryData[this.saveArrData[0]].zchild;
				} else if (this.currentIndex == 2) {
					this.showArray = this.industryData[this.saveArrData[0]].zchild[this.saveArrData[1]].zchild;
				} else if (this.currentIndex == 3) {
					if (this.mode == 'industry') {
						this.showArray = this.industryData[this.saveArrData[0]].zchild[this.saveArrData[1]].zchild[this.saveArrData[2]].zchild;
					}
				}
			} else {
				if (this.currentIndex == 0) {
					this.showArray = this.tenindustryData;
				} else if (this.currentIndex == 1) {
					this.showArray = this.tenindustryData[this.saveArrData[0]].zchild;
				} else if (this.currentIndex == 2) {
					this.showArray = this.tenindustryData[this.saveArrData[0]].zchild[this.saveArrData[1]].zchild;
				}
			}
			this.$refs.scrollUl.scrollTop = 0;
			this.$forceUpdate();
		},
		toSureValue(value, item) {
			this.showStrDataArr[this.currentIndex] = item;
			this.saveArrData[this.currentIndex] = value;
			this.showArray = this.showArray[this.saveArrData[this.currentIndex]].zchild;
			if (this.mode == 'industry') {
				if (this.currentIndex == 3) {
					var showStrData = [];
					var showIntData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						showStrData.push(this.showStrDataArr[i].CNNAME);
						showIntData.push(this.showStrDataArr[i].ENNAME);
					}
					this.showStrData = showStrData.join('->');
					this.showIntData = showIntData;
					this.$emit('input', showIntData[showIntData.length - 1].toString());
					this.$emit('getName', this.showStrData);
					this.cancel();
				}
			} else {
				if (this.currentIndex == 2 || (!this.showStrDataArr[this.currentIndex].zchild || this.showStrDataArr[this.currentIndex].zchild.length == 0)) {
					var showStrData = [];
					var showIntData = [];
					for (var i = 0; i < this.showStrDataArr.length; i++) {
						if (this.showStrDataArr[i].zchild && this.showStrDataArr[i].zchild.length) {
							showStrData.push(this.showStrDataArr[i].CNNAME);
							showIntData.push(this.showStrDataArr[i].ENNAME);
						} else {
							showStrData.push(this.showStrDataArr[i].CNNAME);
							showIntData.push(this.showStrDataArr[i].ENNAME);
							break;
						}
					}
					this.showStrData = showStrData.join('->');
					this.showIntData = showIntData;
					this.$emit('input', showIntData[showIntData.length - 1].toString());
					this.$emit('getName', this.showStrData);
					this.cancel();
					this.$forceUpdate();
				}
			}
			if (this.mode == 'industry') {
				if (this.currentIndex <= 3) {
					this.currentIndex += 1;
				}
			} else {
				if (this.currentIndex <= 2) {
					this.currentIndex += 1;
				}
			}
			this.saveArrData = this.saveArrData.splice(0, this.currentIndex);
			// this.$refs.scrollUl.style = 'transition-duration:scroll 5s';
			this.$refs.scrollUl.scrollTop = 0;
			this.$forceUpdate();
		},
		cancel(type, open) {
			// this.$emit('getShowChange', false);
			this.$refs['showpopup'].close();
			this.isOpen = false;
			this.saveArrData = [];
			this.currentIndex = 0;
			if (this.mode == 'industry') {
				this.showArray = this.industryData;
			} else {
				this.showArray = this.tenindustryData;
			}
		},
		toSelectMultiValue(indexs, item) {
			if (this.range[indexs].selected) {
				this.range[indexs].selected = false;
			} else {
				this.range[indexs].selected = true;
			}
			this.$forceUpdate();
		},
		cancelMulti(type, open) {
			// this.$emit('getShowChange', false);
			this.$refs['showpopupmultiple'].close();
			this.isOpen = false;
			if (this.mode != 'listSelection') {
				this.$refs.scrollUl.scrollTop = 0;
			}
		},
		surelMulti() {
			var arr = [];
			var arr1 = [];
			var arr2 = [];
			for (var i = 0; i < this.range.length; i++) {
				if (this.range[i].selected) {
					arr.push(this.range[i][this.rangId]);
					arr1.push(this.range[i][this.rangeKey]);
					arr2.push(this.range[i]);
				}
			}
			this.$emit('input', arr.join(','));
			this.multiStrData = arr1.join(',');
			this.$forceUpdate();
			this.$emit('getName', arr1.join(','));
			this.$emit('getitems', arr2);
			this.cancelMulti();
		},
		bindChange: function(e) {
			const val = e.detail.value;
			this.saveArrData[this.currentIndex] = val;
		},
		DateCance: function(e) {
			this.isOpen = false;
			this.index = this.index;
		},
		bindDateChange: function(e) {
			this.isOpen = false;
			this.index = e.target.value;
		},
		addressClickHandle: function() {
			if (this.disabled == false) {
				this.isOpen = true;
				this.multiArray[0] = cityFormat[0].zchild;
				this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
				this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild ? this.multiArray[1][this.multiIndex[1]].zchild : [];
				var contentadd = this.address;
				for (var i = 0; i < this.multiArray[0].length; i++) {
					if (this.multiArray[0][i].ENNAME == contentadd[0]) {
						this.bindMultiPickerColumnChange1(0, i);
					}
				}
				for (var i = 0; i < this.multiArray[1].length; i++) {
					if (this.multiArray[1][i].ENNAME == contentadd[1]) {
						this.bindMultiPickerColumnChange1(1, i);
					}
				}
				for (var i = 0; i < this.multiArray[2].length; i++) {
					if (this.multiArray[2][i].ENNAME == contentadd[2]) {
						this.multiIndex[2] = i;
					}
				}
			}
		},
		addressHandle: function(e) {
			this.isOpen = false;
			var address = [];
			var showAddress = [];
			for (var ai = 0; ai < this.multiArray.length; ai++) {
				for (var i = 0; i < this.multiArray[ai].length; i++) {
					if (i == this.multiIndex[ai]) {
						var item = this.multiArray[ai][i];
						address[ai] = item.ENNAME;
						showAddress[ai] = item.CNNAME;
						break;
					}
				}
			}
			console.log('addressaddressaddress:', address);
			console.log('addressaddressaddress:', showAddress);
			this.address = address;

			// this.$emit('input', this.address.join(','));
			this.$emit('input', address[address.length - 1].toString());
			this.showAddress = showAddress.join('->');
			this.$emit('getName', this.showAddress);
		},
		addressCance: function(e) {
			this.isOpen = false;
		},
		bindMultiPickerColumnChange: function(e) {
			// 地区选择
			this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0: //拖动第1列
					this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
					this.multiArray[2] = this.multiArray[1][0].zchild;
					this.multiIndex.splice(1, 1, 0);
					this.multiIndex.splice(2, 1, 0);
					break;
				case 1: //拖动第2列
					this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild;
					this.multiIndex.splice(2, 1, 0);
					break;
			}
			this.$forceUpdate();
		},
		bindMultiPickerColumnChange1: function(ecolum, eid) {
			// 地区选择
			this.multiIndex[ecolum] = eid;
			switch (ecolum) {
				case 0: //拖动第1列
					this.multiArray[1] = this.multiArray[0][this.multiIndex[0]].zchild;
					this.multiArray[2] = this.multiArray[1][0].zchild;
					this.multiIndex.splice(1, 1, 0);
					this.multiIndex.splice(2, 1, 0);
					break;
				case 1: //拖动第2列
					this.multiArray[2] = this.multiArray[1][this.multiIndex[1]].zchild;
					this.multiIndex.splice(2, 1, 0);
					break;
			}
			this.$forceUpdate();
		},
		doFormateTreeFun: function(data, parentId) {
			// 将一维数组转为树形数组
			var t = this;
			var tree = [];
			var temp;
			for (var i = 0; i < data.length; i++) {
				if (data[i].ABVENNAME == parentId) {
					var obj = data[i];
					temp = t.doFormateTreeFun(data, data[i].ENNAME);
					if (temp.length > 0) {
						obj.zchild = temp;
					}
					tree.push(obj);
				}
			}
			return tree;
		}
	},
	beforeDestroy() {
		if (this.mode == 'multiple' || this.mode == 'listSelection' || this.mode == 'industry' || this.mode == 'tenindustry') {
			var pop = document.getElementsByClassName('showpopuppopselect');
			if (pop[0]) {
				pop[0].style.display = 'none';
			}
		}
	}
};
</script>

<style scoped lang="scss">
.icons {
	color: #939599;
	font-size: 40rpx;
	vertical-align: text-top;
	margin-left: 20rpx;
	padding: 20rpx 0;
	line-height: normal;
}
.icons.clear {
	color: #ccc;
	font-size: 32rpx;
	vertical-align: middle;
	margin: auto;
	margin-left: 10px;
}
.mcselect .uni-input {
	padding-left: 0 !important;
}
.mcselect /deep/ uni-picker > div:last-child {
	height: 88rpx;
	// line-height: 88rpx;
	display: flex;
}
.mcselect.areaCity /deep/ uni-picker > div:last-child {
	height: auto;
	line-height: 1.5;
	display: flex;
}
.mcform .uni-form-item.onerow .mcselect.areaCity.uni-input {
	height: auto !important;
	line-height: 1.5;
}
.mcform .uni-form-item.onerow .mcselect.areaCity /deep/ uni-picker > div:last-child .uni-input.areaCity {
	height: auto;
	padding: 20rpx 0;
	line-height: 1.5 !important;
}

.uni-padding-wrap .placehold {
	color: #c4c7cc;
}
.uni-padding-wrap {
	height: 43px;
	// line-height: 43px;
	display: flex;
	width: 100%;
	padding: 0;
}
.pickertempltete {
	padding: 0 32rpx;
	background: #fff;
	text-align: left;
}
.pickertemplteteM {
	text-align: center;
	overflow: hidden;
	border-radius: 26rpx 26rpx 0 0;
}
.showSpanWrap {
	background: #fff;
}
.pickerWrap {
	background: #ffffff;
	// background: #F8F9FD;
	box-shadow: 0 0 0 0 #e3e5e8;
}
.pickerWrap.height100,
.pickerWrap.height100 > ul,
.pickerWrap.height100 uni-scroll-view {
	height: 100% !important;
}
.pickerWrap .titleTip {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: #939599;
	line-height: 28rpx;
	margin-top: 40rpx;
	margin-bottom: 30rpx;
}
.uni-tip-title-row {
	// display: flex;
	// justify-content: space-between;
	position: relative;
	padding: 30rpx 30rpx 20rpx;
	line-height: 1;
	background: #ffffff;
	text-align: center;
}
.uni-tip-title-row > .uni-tip-close {
	position: absolute;
	right: 30rpx;
	top: 24rpx;
}
.uni-tip-title-row.topborderGap {
	border: none;
	// border-bottom: 1px solid #dddddd;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	color: $mc-text-title;
	font-weight: bold;
	font-size: 32rpx;
	letter-spacing: 0;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
}
.bottomborderGap {
	border-bottom: 1px solid #dddddd;
}
.selectItems {
	font-family: PingFang-SC-Bold;
	font-size: 28rpx;
	color: #333333;
	line-height: 72rpx;
	font-weight: bold;
	position: relative;
	padding-left: 32rpx;
}
.selectItems:before {
	content: '';
	display: inline-block;
	width: 4rpx;
	background: #c4c7cc;
	position: absolute;
	left: 0;
	box-sizing: border-box;
	height: 100%;
	border: 30rpx solid #ffffff;
	border-left: none;
	border-right: none;
}
.selectItems .selectItem.haveValue {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: #333333;
	font-weight: normal;
}
.selectItem {
	position: relative;
}
.selectItem:before {
	content: '';
	display: inline-block;
	width: 16rpx;
	height: 16rpx;
	background: #c4c7cc;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	left: -31rpx;
	z-index: 1;
}
.selectItem.active:before {
	background: #3673ff;
}
.selectItem.active1::after {
	display: none;
}
.selectItem.active:after {
	content: '';
	position: absolute;
	width: 4rpx;
	height: 100%;
	background: #3673ff;
	left: -32rpx;
	top: 34rpx;
	box-sizing: border-box;
}
.selectItem:first-child:after {
	// border-top:16px solid #ffffff;
}
.selectItem:last-child:after {
	// border-bottom:16px solid #ffffff;
	display: none;
}
.selectshowItems {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: #333333;
	line-height: 72rpx;
}
.selectshowItems .selectshowItem.active {
	color: #3673ff;
}
.ownPickHand {
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 100%;
	font-size: 28rpx;
	height: 45px;
	line-height: 45px;
	background-color: #fff;
}
.ownPickHand::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	clear: both;
	border-bottom: 1px solid #e5e5e5;
	color: #e5e5e5;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
.ownPickHand > uni-view {
	color: #888;
}
.ownPickHand > uni-view:last-child {
	color: #007aff;
}
.maxWidth {
	position: absolute;
	left: 0;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.uni-tip-title-row.slotList {
	display: block;
	position: relative;
	text-align: center;
	width: 100%;
	height: 45px;
	background-color: #fff;
	padding: 0;
}
.pickertempltete.slotList {
	border: none;
}
.uni-tip-title-row.slotList::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	clear: both;
	border-bottom: 1px solid #e5e5e5;
	color: #e5e5e5;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
.uni-tip-title-row.slotList .left {
	float: left;
	color: #888;
}
.uni-tip-title-row.slotList .rigth {
	float: right;
	// color: #007aff;
	color: #888;
}
.selectJobWrap.slotList {
	position: relative;
	display: block;
	width: 100%;
	height: 238px;
	overflow: auto;
	background-color: #fff;
}
</style>
