<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<!-- 搜索栏 -->
			<view class="search-all">
				<input v-model="card" type="idcard" class="search-cert_code" placeholder=" 输入证件号码进行查找" />
				<button class="search-btn" @click="toSearch()">搜索</button>
			</view>
			
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)"
				:isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">客户姓名</span>
								<span class="mccontent">{{ item.cusName ? item.cusName : '-' }}</span>
							</view>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件类型</span>
							<span
								class="mccontent">{{ item.certType ? getselectName('cert_type',item.certType) : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件号码</span>
							<span class="mccontent">{{ item.certCode ? item.certCode : '-' }}</span>
						</view>
					</view>
					<view class="inline-btn inline-btn-right">
						<button class="mc-min-btn-waring"
							
							@click="deleteCust(item, index)">
							作废
						</button>

					</view>
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData">{{ loadMoreText }}</view>
		</block>

		

	</view>
</template>

<script>
	import {
		selectdata
	} from '../customerMg/select.js';
	export default {
		data() {
			return {
				selectdata: selectdata,
				accountInfo: {},
				listData: [], // 显示的列表数据
				firstQuery: true, //进入第一次请求数据			
				card:'',
				// ???????
				search: {
					//cus_name: '',
					//cert_code: '',
					// cus_id: '',
					// cus_type: '110', //客户类型
					// cus_status: '20' //客户状态
				},
				serchBtnClick: true, //是否点击确定按钮
				loadMoreText: '加载中...',
				showLoadMore: false,
				queryClick: false,
				numFinish: false,
				pageSize: 5, // 每页条数
				startCount: 1 // 开始记录数
			}
		},
		computed: {},
		onShow() {
			var _this = this;
			uni.getStorage({
				key: 'scrollSave',
				success: function(res) {
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
			// this.resetSearch('btn');
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 5; // 每页条数
			this.startCount = 1; // 开始记录数
			this.showLoadMore = false;
			this.firstQuery = true;
			this.queryClick = false;
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
			this.queryClick = false;
			setTimeout(() => {
				this.queryList();
			}, 0);
		},
		/* onNavigationBarButtonTap(e) {
			this.show();
		}, */
		onBackPress() {
			this.hide();
			uni.setStorage({
				key: 'scrollSave',
				data: 0,
				success: function() {}
			});
		},
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
		},
		mounted() {
			uni.setStorage({
				key: 'scrollSave',
				data: 0,
				success: function() {}
			});
			(this.listData = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
			var _this = this;
			uni.getStorage({
				key: 'isLoginAccount',
				success: function(res) {
					_this.accountInfo = res.data;
				}
			});
			// this.listData = [1, 2, 3, 4, 5];
			this.queryList();
		},
		methods: {
			toLink(pageurl) {
				// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
				uni.navigateTo({
					url: pageurl
				});
			},
			queryList: function() {

				//客户信息列表查询 --
				this.$request
					.post({
						url: 'http://localhost:8888/web/user/selectAllUser',
						data: {cert_code: this.search.cert_code ? this.search.cert_code : '', //	证件号码  查询条件
								cus_id: this.search.cus_id ? this.search.cus_id : '', //	客户号 -不使用
								cus_name: this.search.cus_name ? this.search.cus_name : '', //	姓名  查询条件
								// query_type: '5', //	查询类型  1 共借人客户  2 担保人  3 贷款人  4 经营实体 99 代表全部客户
								cus_type: this.search.cus_type ? this.search.cus_type : '110', //	客户类型 查询条件
								cus_status: this.search.cus_status ? this.search.cus_status : '20', //	客户状态 查询条件
								start_count: this.startCount.toString(), //	开始记录数
								count: this.pageSize.toString(),
								keyWords: this.card,
								}//	查询条数
					}) 
					 .then(res => {
						if (this.firstQuery) {
							this.listData = [];
						}
						//if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length) {
						if (1 == 1) {
							console.log('所有数据', res);
							var listData = res;
							if (listData.length != this.pageSize * 1 || listData.length < this.pageSize * 1) {
								this.numFinish = true;
								if (this.queryClick && listData.length == 0) {
									this.showLoadMore = false;
								} else {
									this.showLoadMore = true;
									this.loadMoreText = '没有更多数据了!';
								}
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
			
			deleteCust(item, index) {
				uni.showModal({
					content: '是否删除本条客户信息?',
					success: e => {
						if (e.confirm) {
							this.$request
								.post({
									url: 'web/user/delete',
									data: {
										cert_code: item.certCode //	证件号码
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
			changeSelect(fname, fvalue) {
				this.search[fname] = fvalue;
			},
			toSearch() {
				this.serchBtnClick = true;
				//刷新初始化数据
				this.numFinish = false;
				this.pageSize = 5; // 每页条数
				this.startCount = 1; // 开始记录数
				this.queryClick = true;
				this.firstQuery = true;
				this.queryList();
			},
			
			getselectName(sname, value) {
				for (var i = 0; i < this.selectdata[sname].length; i++) {
					var item = this.selectdata[sname][i];
					if (item.value == value) {
						return item.label;
					}
				}
			},


		}
	}
</script>

<style>
	.search-all {
		display: flex;
		height: 50rpx;
		margin-top: 20rpx;
		flex-direction: row;
	}

	.search-cert_code {
		display: flex;
		margin: 0rpx 30rpx 0rpx 35rpx;
		width: 90%;
		background-color: white;
		border-radius: 10px;
		height: 50rpx;
	}

	.search-btn {
		display: flex;
		margin-right: 35rpx;
		background-color: #588bf1;
		color: white;
		font-size: 14px;
		width: 150rpx;
		line-height: 50rpx;
		justify-content: center;
	}
</style>
