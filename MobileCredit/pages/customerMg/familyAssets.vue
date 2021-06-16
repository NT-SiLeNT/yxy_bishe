<template>
	<view style="height: 100%;width: 100%;" id="pageCheckID">
		<view class="w100">
			<view class="mianRadius mcform">
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">资产类别</view>
					<mc-pop-select :disabled="isDetail" class="uni-input" v-model="familyAssets.indiv_ass_type" :data="selectdata.indiv_ass_type"></mc-pop-select>
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title">资产名称</view>
					<input :disabled="isDetail" v-model="familyAssets.indiv_ass_name" type="text" class="uni-input" value="" placeholder="请输入资产名称" />
				</view>
				<view class="uni-form-item uni-column nopb bottomGap">
					<view class="title">资产单位</view>
					<textarea class="autoHeightArea" auto-height :disabled="isDetail" v-model="familyAssets.indiv_ass_plr" maxlength="80" placeholder="请输入资产单位" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title">资产数量</view>
					<input :disabled="isDetail" v-model="familyAssets.indiv_ass_num" type="number" class="uni-input" value="" placeholder="请输入资产数量" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">资产估价(元)</view>
					<input :disabled="isDetail" v-model="familyAssets.indiv_ass" type="number" class="uni-input" value="" placeholder="请输入资产估价(元)" />
				</view>
				<view class="uni-form-item uni-column onerow nopb bottomGap">
					<view class="title requireIcon">抵押状况</view>
					<mc-pop-select :disabled="isDetail" class="uni-input" v-model="familyAssets.com_ass_status" :data="selectdata.com_ass_status"></mc-pop-select>
				</view>
				<view class="uni-form-item uni-column lastRow">
					<view class="title">资产描述</view>
					<textarea :disabled="isDetail" class="oneTextarea" v-model="familyAssets.indiv_ass_des" maxlength="250" placeholder="请输入(500字以内)" />
				</view>
			</view>
			<button type="" class="mc-btn-primary" :disabled="isDetail" @click="sureBtn">确定</button>
		</view>
	</view>
</template>

<script>
import { selectdata } from './select.js';
import { requestParams } from './requestParams.js';
export default {
	data() {
		return {
			selectdata: selectdata,
			// ass_list: requestParams.paramsAllAssList,
			familyAssets: JSON.parse(JSON.stringify(requestParams.familyAssets)), //临时客户参数
			familyAssetsRequired: JSON.parse(JSON.stringify(requestParams.familyAssetsRequired)), //临时客户必填项
			isDetail: false,
			isAdd: false,
			isChange: false,
			indexItem: ''
		};
	},
	onLoad: function(option) {
		// custType 1临时  2 正式  3 担保
		// var option = JSON.parse(option);
		this.isChange = option.isChange ? JSON.parse(option.isChange) : false;
		this.indexItem = option.index ? JSON.parse(option.index) : '';
		this.isAdd = option.isAdd ? JSON.parse(option.isAdd) : false;
		this.isDetail = option.isDetail ? JSON.parse(option.isDetail) : false;
		this.currentcustno = option.cusId; // 客户编号
		if (this.isChange) {
			uni.setNavigationBarTitle({
				title: '修改家庭资产'
			});
		} else if (this.isDetail) {
			uni.setNavigationBarTitle({
				title: '查看家庭资产'
			});
		}
	},
	computed: {
		indiv_ass_flag() {
			if (this.isAdd) {
				return '0';
			}
			if (this.isChange) {
				return '1';
			}
		}
	},
	mounted() {
		this.$store.commit('delassListInfo');
		if (this.isChange || this.isDetail) {
			this.showData();
		}
	},
	methods: {
		//
		sureBtn() {
			var formData = this.familyAssets;
			var rule = this.familyAssetsRequired;
			var checkRes = this.$graceChecker.check(formData, rule);
			if (!checkRes) {
				uni.showToast({ title: this.$graceChecker.error, icon: 'none' });
				return;
			}
			// 0新增
			// 1修改
			// 2删除
			this.familyAssets.indiv_ass_flag = this.indiv_ass_flag;
			var data = requestParams.paramsAllSave;
			data.ass_list = [this.familyAssets];
			this.$request
				.post({
					url: 'es/json/EsCustAddOrModify',
					data: data
				})
				.then(res => {
					console.log('提交结果', res);
					if (res.response.header.returnCode == '00000000') {
						requestParams.paramsAllSave.cus_id = res.response.content.cus_id;
						if (this.isAdd) {
							this.$store.commit('setassListInfo', { add: true });
						}
						if (this.isChange) {
							this.$store.commit('setassListInfo', { change: true });
							Object.assign(requestParams.paramsAllAssList[this.indexItem], this.familyAssets);
						}

						uni.navigateBack({});
					} else {
						uni.showToast({
							title: res.response.header.returnMsg,
							icon: 'none'
						});
					}
				})
				.catch(err => {});
		},
		showData() {
			/* if (this.isChange || this.isDetail) {
				if (this.indexItem !== '') {
					this.familyAssets = requestParams.paramsAllAssList[this.indexItem];
					for (var i = 0; i < this.ass_list.length; i++) {
						if ((this.ass_list[i].indiv_ass_id = this.indexItem)) {
							this.familyAssets = this.ass_list[i];
						}
					}
				}
			} */
		}
	}
};
</script>

<style lang="scss" scoped>
.nopb.bottomGap {
	padding-bottom: 0;
}
#pageCheckID .mc-btn-primary {
	width: 100%;
}
#pageCheckID .w100 {
	display: flex;
	flex-direction: column;
}
#pageCheckID .mcform {
	margin-bottom: 40rpx;
}
#pageCheckID .mcform .infoTipTitle {
	font-weight: 600;
}
.bottomGap {
	padding-bottom: 28rpx;
}
.mcform .oneTextarea {
	flex: 1;
	height: 200rpx;
}
.mcform .uni-form-item.onerow.minHeight {
	height: 40rpx;
}
.mcform .uni-form-item .uni-input {
	text-align: right;
}
.textLeft {
	text-align: left !important;
}
.lastRow {
	margin-bottom: 40rpx;
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
.maxwrap /deep/ .uni-popup__wrapper-box {
	max-width: 80%;
}
.select-dialog-wrap {
	padding: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.uni-tip-title-row {
	display: flex;
	justify-content: space-between;
}
.uni-tip-title {
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: $mc-text-color;
	letter-spacing: 0;
	line-height: 100rpx;
}
.uni-tip-close {
	color: $mc-text-color;
	font-size: 40rpx;
	line-height: 100rpx;
}
.uni-column .minHeight1 {
	line-height: 1.5;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.iconfont.icons {
	color: #939599;
	font-size: 40rpx;
	line-height: 1;
	vertical-align: text-top;
	margin-left: 20rpx;
}
#pageCheckID .placeholderss {
	color: #c4c7cc;
}
</style>
