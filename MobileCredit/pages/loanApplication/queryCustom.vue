<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">客户名称</span>
								<span class="mccontent">{{ item.cus_name ? item.cus_name : '-' }}</span>
							</view>
							<view>
								<span class="mclabel">客户号</span>
								<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件类型</span>
							<span class="mccontent">{{ item.cert_type ? getselectName('cert_typeall',item.cert_type) : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件号码</span>
							<span class="mccontent">{{ item.cert_code ? item.cert_code : '-' }}</span>
						</view>
						<view class="mcitem btnline">
							<button type="" class="mc-min-btn-primarybg">{{ item.cus_type ? getselectName('cus_typename',item.cus_type): '-' }}</button>
							<button type="" class="mc-min-btn-primarybg">{{ item.cus_status ? cusstatusname(item.cus_status) : '-' }}</button>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">客户主管经理</span>
							<span class="mccontent">{{ item.cust_mgr ? item.cust_mgr : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">主管机构</span>
							<span class="mccontent">{{ item.main_br_id ? item.main_br_id : '-' }}</span>
						</view>
					</view>
					<view class="inline-btn inline-btn-right"><button class="mc-min-btn-primary" @click="selectOne(item)">选定</button></view>
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData">{{ loadMoreText }}</view>
		</block>
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')" class="mcdrawer">
			<!-- <view class="height-status"> -->
			<!-- </view> -->
			<view class="height-status">
				<view class="headediv">
					<view class="floatleft" :hover-start-time="20" :hover-stay-time="70" @click="hide">&#215;</view>
					<view class="floatright" @click="resetSearch('btn')">重置</view>
				</view>
			</view>
			<view class="mcform">
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户名称</view>
					<input v-model="search.cus_name" type="text" class="uni-input" value="" placeholder="请输入客户名称" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">证件号码</view>
					<input v-model="search.cert_code" type="text" class="uni-input" value="" placeholder="请输入证件号码" />
				</view>
				<view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户号</view>
					<input v-model="search.cus_id" type="text" class="uni-input" value="" placeholder="请输入客户号" />
				</view>
				<view class="uni-form-item uni-column" v-if="condshow">
					<view class="title">客户类型</view>
					<view class="uni-input linebtn">
						<button
							@click="changeSelect('cus_type', '110')"
							type=""
							class="mc-min-btn-primaryplan"
							value="110"
							:class="{ checked: search.cus_type == '110' ? true : false }"
						>
							其他自然人
						</button>
						<button
							@click="changeSelect('cus_type', '140')"
							type=""
							class="mc-min-btn-primaryplan"
							value="140"
							:class="{ checked: search.cus_type == '140' ? true : false }"
						>
							小微企业主
						</button>
						<button
							@click="changeSelect('cus_type', '150')"
							type=""
							class="mc-min-btn-primaryplan"
							value="150"
							:class="{ checked: search.cus_type == '150' ? true : false }"
						>
							个体工商户
						</button>
					</view>
				</view>
				<view class="uni-form-item uni-column" v-if="condshow">
					<view class="title">客户状态</view>
					<view class="uni-input linebtn">
						<button
							@click="changeSelect('cus_status', '20')"
							type=""
							class="mc-min-btn-primaryplan"
							:class="{ checked: search.cus_status == '20' ? true : false }"
							value="20"
						>
							正式客户
						</button>
						<button
							@click="changeSelect('cus_status', '01')"
							type=""
							class="mc-min-btn-primaryplan"
							:class="{ checked: search.cus_status == '01' ? true : false }"
							value="01"
						>
							临时客户
						</button>
						<button
							@click="changeSelect('cus_status', '05')"
							type=""
							class="mc-min-btn-primaryplan"
							:class="{ checked: search.cus_status == '05' ? true : false }"
							value="05"
						>
							担保客户
						</button>
						<button
							@click="changeSelect('cus_status', '00')"
							type=""
							class="mc-min-btn-primaryplan"
							:class="{ checked: search.cus_status == '00' ? true : false }"
							value="00"
						>
							草稿客户(正式)
						</button>
						<button
							@click="changeSelect('cus_status', '02')"
							type=""
							class="mc-min-btn-primaryplan"
							:class="{ checked: search.cus_status == '02' ? true : false }"
							value="02"
						>
							草稿客户(担保)
						</button>
					</view>
				</view>
			</view>

			<view class="bottomBtn"><button type="" class="mc-btn-primary" @click="toSearch()">确定</button></view>
		</uni-drawer>
	</view>
</template>

<script>
import { selectdata } from '../customerMg/select.js';
export default {
	data() {
		return {
			selectdata: selectdata,
			accountInfo: {},
			listData: [], // 显示的列表数据
			firstQuery: true, //进入第一次请求数据
			search: {
				cus_name: '',
				cert_code: '',
				cus_id: '',
				cus_type: '110', //客户类型
				cus_status: '20' //客户状态
			},
			serchBtnClick: false, //是否点击确定按钮
			showRight: false,
			loadMoreText: '加载中...',
			showLoadMore: false,
			queryClick: false,
			numFinish: false,
			pageSize: 10, // 每页条数
			startCount: 1, // 开始记录数
			condshow: true,
			custstatus: ''
		};
	},
	computed: {},
	onPullDownRefresh() {
		//刷新初始化数据
		this.numFinish = false;
		this.pageSize = 10; // 每页条数
		this.startCount = 1; // 开始记录数
		this.showLoadMore = false;
		this.queryClick = false;
		this.firstQuery = true;
		//调用获取数据的函数
		this.queryList();
	},
	onReachBottom() {
		this.resetSearch('btn');
		if (this.numFinish) {
			this.loadMoreText = '没有更多数据了!';
			return;
		}
		this.showLoadMore = true;
		this.pageSize = 10;
		this.queryClick = false;
		this.startCount = this.pageSize * 1 + this.startCount * 1;
		setTimeout(() => {
			this.queryList();
		}, 0);
	},
	onNavigationBarButtonTap(e) {
		this.show();
	},
	onBackPress() {
		this.hide();
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		console.log(option); //打印出上个页面传递的参数。
		this.condshow = option.condshow ? JSON.parse(option.condshow) : true;
		this.custstatus = option.custstatus;
	},
	mounted() {
		(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
		var _this = this;
		uni.getStorage({
			key: 'isLoginAccount',
			success: function(res) {
				_this.accountInfo = res.data;
				_this.queryList();
			}
		});
		// this.listData = [1, 2, 3, 4, 5];
	},
	methods: {
		toLink(pageurl) {
			uni.navigateTo({
				url: pageurl
			});
		},
		queryList: function() {
			//客户信息列表查询 --
			this.$request
				.post({
					url: 'es/json/EsQueryCustInfoList',
					data: {
						cust_mgr_query: this.accountInfo.actorno, //	查询人客户经理号
						main_br_id_query: this.accountInfo.orgid, //	查询人机构号
						cust_mgr: '', //	主管客户经理号-不使用
						main_br_id: '', //	主管机构号-不使用
						cert_code: this.search.cert_code ? this.search.cert_code : '', //	证件号码  查询条件
						cus_id: this.search.cus_id ? this.search.cus_id : '', //	客户号 -不使用
						cus_name: this.search.cus_name ? this.search.cus_name : '', //	姓名  查询条件
						query_type: this.condshow ? '5' : this.custstatus, //	查询类型  1 共借人客户  2 担保人  3 贷款人  4 经营实体 99 代表全部客户
						cus_type: this.condshow ? (this.search.cus_type ? this.search.cus_type : '110') : '', //	客户类型 查询条件
						cus_status: this.condshow ? (this.search.cus_status !== '' ? this.search.cus_status : '20') : '', //	客户状态 查询条件
						start_count: this.startCount.toString(), //	开始记录数
						count: this.pageSize.toString() //	查询条数
					}
				})
				.then(res => {
					if (this.firstQuery) {
						this.listData = [];
					}
					if (res.response.header.returnCode == '00000000' && res.response.content.List.length) {
						console.log('所有数据', res);
						var listData = res.response.content.List;
						if (listData.length != this.pageSize * 1) {
							this.numFinish = true;
						}
						this.listData = this.listData.concat(listData);
					} else {
						this.numFinish = true;
						if (!this.firstQuery) {
							this.showLoadMore = true;
							this.loadMoreText = '没有更多数据了!';
						}
						if (this.queryClick) {
							this.showLoadMore = false;
						} else {
							if (res.response.header.returnCode != '00000000') {
								uni.showToast({
									title: res.response.header.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						}
					}
					this.firstQuery = false;
					uni.stopPullDownRefresh();
				})
				.catch(err => {
					this.numFinish = false;
					this.firstQuery = false;
					uni.stopPullDownRefresh();
				});
		},
		changeSelect(fname, fvalue) {
			this.search[fname] = fvalue;
		},
		selectOne(item) {
			item = {
				cus_name: item.cus_name,
				cus_id: item.cus_id,
				cert_type: item.cert_type,
				cert_code: item.cert_code
			};
			this.$store.commit('setcustmorSelect', item);
			uni.navigateBack();
		},
		toSearch() {
			this.serchBtnClick = true;
			this.showRight = false;
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			this.queryClick = true;
			this.firstQuery = true;
			this.queryList();
		},
		resetSearch(btn) {
			if (btn) {
				this.serchBtnClick = false;
			}
			console.log('点击重置按钮');
			this.search.cus_name = '';
			this.search.cert_code = '';
			this.search.cus_id = '';
			this.search.cus_type = '110';
			this.search.cus_status = '20';
		},
		show(e) {
			this.showRight = true;
		},
		hide() {
			console.log('hide');
			this.showRight = false;
		},
		// 关闭筛选条件
		closeDrawer(e) {
			if (!this.serchBtnClick) {
				this.resetSearch();
			}
			this.showRight = false;
		},
		cusstatusname(status) {
			switch (status) {
				case '00':
					return '草稿客户(正式)';
				case '01':
					return '临时客户';
				case '02':
					return '草稿客户(担保)';
				case '05':
					return '担保客户';
				case '20':
					return '正式客户';
			}
		},
		getselectName(sname,value) {
			for (var i = 0; i < this.selectdata[sname].length; i++) {
				var item = this.selectdata[sname][i];
				if (item.value == value) {
					return item.label;
				}
			}
		},
	}
};
</script>

<style scoped lang="scss">
uni-page-body {
	display: block;
	height: 100%;
}
.wrap {
	padding-top: 32rpx;
	box-sizing: border-box;
}
.uni-card {
	margin: 32rpx;
}
.uni-card:first-child {
	margin-top: 0;
}
.wrap .mc-min-btn-primarybg {
	padding: 0 2px;
	margin: 0;
	margin-right: 22rpx;
}
.mcitem.btnline {
	margin: 10rpx 0 14rpx;
	margin-left: 28rpx;
}
.mcdrawer .height-status {
	height: calc(44px + constant(safe-area-inset-top));
	height: calc(44px + env(safe-area-inset-top));
}
.headediv {
	display: flex;
	justify-content: space-between;
	padding: 0 40rpx;
	height: 100%;
	align-items: center;
}
.mcdrawer .floatleft {
	/* float: left; */
	color: rgb(0, 0, 0);
	font-size: 58rpx;
}
.mcdrawer .floatright {
	/* float: right; */
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	color: #626366;
}
.mcdrawer {
	/* position: relative; */
}
.bottomBtn {
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 80rpx;
}
.mcdrawer.uni-drawer /deep/ .uni-drawer__content {
	width: 80%;
}
.uni-input {
	height: auto;
}
.uni-input.linebtn {
	padding-right: 0;
	height: auto;
}
.mc-min-btn-primaryplan {
	border-color: $mc-text-weak;
	color: $mc-text-caption;
	margin-right: 14rpx;
	padding: 10rpx 12rpx;
	line-height: 1;
	margin-bottom: 20rpx;
}
.mc-min-btn-primaryplan.checked {
	background: $mc-color-babyblue;
	color: #ffffff;
	border-color: $mc-color-babyblue;
}
</style>
