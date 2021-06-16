<template>
	<view class="wrap">
		<view class="mc-tabWrap">
			<view class="mc-tabitem" :class="{ active: isactiveTab == '00' ? true : false }" @click="toChangeQuery('00')">草稿客户(正式)</view>
			<view class="mc-tabitem" :class="{ active: isactiveTab == '02' ? true : false }" @click="toChangeQuery('02')">草稿客户(担保)</view>
			<!-- <button class="mc-min-btn-primary" @click="toChangeQuery('00')">草稿客户(正式)</button> -->
			<!-- <button class="mc-min-btn-primary" @click="toChangeQuery('02')">草稿客户(担保)</button> -->
		</view>
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<view class="scrollView" v-if="listData.length">
			<view class="custPartTitle">客户待办</view>
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
							<span class="mccontent">{{ item.cert_type ? getselectName('cert_typeall', item.cert_type) : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件号码</span>
							<span class="mccontent">{{ item.cert_code ? item.cert_code : '-' }}</span>
						</view>
						<view class="mcitem btnline">
							<button type="" v-if="item.cus_type" class="mc-min-btn-primarybg">{{ item.cus_type ? getselectName('cus_typename', item.cus_type) : '-' }}</button>
							<button type="" v-if="item.cus_status" class="mc-min-btn-primarybg">{{ item.cus_status ? cusstatusname(item.cus_status) : '-' }}</button>
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
					<view class="inline-btn inline-btn-right">
						<button class="mc-min-btn-waring" :disabled="item.cus_status != '00' && item.cus_status != '01' && item.cus_status != '02'"
						 @click="deleteCust(item, index)">
							作废
						</button>
						<button class="mc-min-btn-primary" @click="changeCust({ cus_id: item.cus_id, cus_status: item.cus_status })">修改</button>
					</view>
				</template>
			</uni-card>
		</view>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData" @click="numFinish ? '' : loadMore()">{{ loadMoreText }}</view>
		</block>
	</view>
</template>

<script>
	import {
		selectdata
	} from './select.js';
	export default {
		data() {
			return {
				selectdata: selectdata,
				accountInfo: {},
				listData: [], // 显示的列表数据
				firstQuery: true, //进入第一次请求数据
				loadMoreText: '加载中...',
				showLoadMore: false,
				numFinish: false,
				cus_status: '00', // 客户状态
				isactiveTab: '00', //当前选中的tab
				pageSize: 10, // 每页条数
				startCount: 1, // 开始记录数
				isErrorEmpty: false //接口错误导致
			};
		},
		computed: {},
		onShow() {
			var _this = this;
			uni.getStorage({
				key: 'scrollSave',
				success: function(res) {
					console.log('res', res);
					if (res.data) {
						if (_this.$androidenv) {
							document.getElementsByTagName('body')[0].scrollTop = res.data;
							return;
						}
						document.getElementsByTagName('html')[0].scrollTop = res.data;
					}
				}
			});
		},
		onPullDownRefresh() {
			this.cus_status = this.isactiveTab;
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			this.showLoadMore = false;
			this.firstQuery = true;
			//调用获取数据的函数
			this.queryList();
		},
		onReachBottom() {
			if (this.numFinish) {
				this.loadMoreText = '没有更多数据了!';
				return;
			}
			this.showLoadMore = true;
			this.pageSize = 10;
			this.startCount = this.pageSize * 1 + this.startCount * 1;
			setTimeout(() => {
				this.queryList();
			}, 0);
		},
		onNavigationBarButtonTap(e) {
			this.toLink('/pages/customerMg/customType');
		},
		onBackPress() {
			uni.setStorage({
				key: 'scrollSave',
				data: 0,
				success: function() {}
			});
		},
		onLoad: function(option) {
			var _this = this;
			uni.getStorage({
				key: 'isLoginAccount',
				success: function(res) {
					_this.accountInfo = res.data;
				}
			});
			//option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
		},
		mounted() {
			uni.setStorage({
				key: 'scrollSave',
				data: 0,
				success: function() {}
			});
			// this.listData = [1, 2, 3, 4, 5];
			(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
			this.startCount = 1; // 开始记录数
			this.showLoadMore = false;
			this.firstQuery = true;
			//调用获取数据的函数
			this.queryList();
		},
		methods: {
			toLink(pageurl) {
				uni.navigateTo({
					url: pageurl
				});
			},
			toChangeQuery(cus_status) {
				this.isactiveTab = cus_status;
				this.cus_status = cus_status;
				this.numFinish = false;
				this.pageSize = 10;
				this.startCount = 1;
				this.showLoadMore = false;
				this.firstQuery = true;
				//调用获取数据的函数
				this.queryList();
			},
			queryList: function() {
				//客户信息列表查询 --
				this.$request
					.post({
						url: 'es/json/EsQueryCustInfoList',
						data: {
							cust_mgr_query: this.accountInfo.actorno, //	查询人客户经理号
							main_br_id_query: this.accountInfo.orgid, //	查询人机构号
							cust_mgr: this.accountInfo.actorno, //	主管客户经理号
							main_br_id: this.accountInfo.orgid, //	主管机构号
							cert_type: '', //证件类型
							cert_code: '', //	证件号码  查询条件
							cus_id: '', //	客户号 -不使用
							cus_name: '', //	姓名  查询条件
							query_type: '5', //	查询类型  1 共借人客户  2 担保人  3 贷款人  4 经营实体 5 个人客户 99 代表全部客户
							cus_type: '', //	客户类型 查询条件
							cus_status: this.cus_status ? this.cus_status : '', //	客户状态 查询条件
							start_count: this.startCount.toString(), //	开始记录数
							count: this.pageSize.toString() //	查询条数
						}
					})
					.then(res => {
						if (this.firstQuery) {
							this.listData = [];
						}
						if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length) {
							console.log('所有数据', res);
							var listData = res.response.content.List;
							if (listData.length != this.pageSize * 1 || listData.length < this.pageSize * 1) {
								this.numFinish = true;
								this.showLoadMore = true;
								this.loadMoreText = '没有更多数据了!';
							}
							this.listData = this.listData.concat(listData);
						} else {
							this.numFinish = true;
							if (!this.firstQuery) {
								this.showLoadMore = true;
								this.loadMoreText = '没有更多数据了!';
							}
							if (res.response.header.returnCode != '00000000') {
								uni.showToast({
									title: res.response.header.returnMsg,
									icon: 'none',
									duration: 1500
								});
							}
						}
						this.firstQuery = false;
						uni.stopPullDownRefresh();
					})
					.catch(err => {
						this.numFinish = true;
						this.firstQuery = false;
						uni.stopPullDownRefresh();
					});
			},
			deleteCust(item, index) {
				uni.showModal({
					content: '是否删除本条客户信息?',
					success: e => {
						if (e.confirm) {
							this.$request
								.post({
									url: 'es/json/EsDeleteCustTemp',
									data: {
										cus_id: item.cus_id //	客户号
									}
								})
								.then(res => {
									if (res.response.header.returnCode == '00000000') {
										this.listData.splice(index, 1);
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1500
										});
									} else {
										uni.showToast({
											title: res.response.header.returnMsg,
											icon: 'none',
											duration: 1500
										});
									}
								})
								.catch(err => {});
						}
					},
					fail: () => {}
				});
			},
			changeCust(item) {
				var type = item.cus_type;
				var _this = this;
				uni.setStorage({
					key: 'scrollSave',
					data: _this.$androidenv ? document.getElementsByTagName('body')[0].scrollTop : document.getElementsByTagName(
						'html')[0].scrollTop,
					success: function() {
						console.log('eeeeee', _this.$androidenv ? document.getElementsByTagName('body')[0].scrollTop : document.getElementsByTagName(
							'html')[0].scrollTop);
						_this.toLink('/pages/customerMg/customerAdd?isChange=true&custStatus=' + item.cus_status + '&cusId=' + item.cus_id);
					}
				});
			},
			loadMore: function() {
				console.log('onReachBottom');
				if (this.numFinish) {
					this.showLoadMore = true;
					this.loadMoreText = '没有更多数据了!';
					return;
				}
				this.showLoadMore = true;
				this.pageSize = 10;
				this.startCount = this.pageSize * this.startCount + 1;
				setTimeout(() => {
					this.queryList();
				}, 0);
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
			getselectName(sname, value) {
				for (var i = 0; i < this.selectdata[sname].length; i++) {
					var item = this.selectdata[sname][i];
					if (item.value == value) {
						return item.label;
					}
				}
			},
			// 审批历史点击事件
			tBtnHandle: function(id) {
				this.toLink('/pages/ApprovalHistory/ApprovalHistory?serno=' + id);
			}
		}
	};
</script>

<style scoped>
	uni-page-body {
		display: block;
		height: 100%;
	}

	.wrap {
		/* padding-top: 32rpx; */
		box-sizing: border-box;
	}

	.mc-tabWrap {
		box-shadow: 0 2px 16px 0 rgba(48, 49, 51, 0.06);
		z-index: 1;
		position: fixed;
		width: 100%;
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
		width: 100%;
	}

	uni-view.scrollView {
		height: 100%;
		overflow: auto;
		padding-top: 88rpx;
	}

	.emptyData {
		padding-top: 120rpx;
	}
</style>
