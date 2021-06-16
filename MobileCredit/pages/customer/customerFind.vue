<template>
	<view class="wrap">
		<view v-if="!firstQuery && !listData.length" class="emptyData">暂无数据</view>
		<block v-if="listData.length">
			<uni-card v-for="(item, index) in listData" :key="index" @tBtnHandle="tBtnHandle(item.serno)" :isBgImg="true">
				<template>
					<view class="mcitems">
						<view class="mcitem mcrowOne mcrowItemcanwrap">
							<view>
								<span class="mclabel">客户姓名</span>
								<span class="mccontent">{{ item.cusName ? item.cusName : '-' }}</span>
							</view>
							<!-- <view>
								<span class="mclabel">客户号</span>
								<span class="mccontent">{{ item.cus_id ? item.cus_id : '-' }}</span>
							</view> -->
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件类型</span>
							<span class="mccontent">{{ item.certType ? getselectName('cert_type',item.certType) : '-' }}</span>
						</view>
						<view class="mcitem mcrowOne">
							<span class="mclabel">证件号码</span>
							<span class="mccontent">{{ item.certCode ? item.certCode : '-' }}</span>
						</view>
						<!--
						<view class="mcitem btnline mcrowOne">
							 <button type="" class="mc-min-btn-primarybg">{{ item.cus_type ? getselectName('cus_typename',item.cus_type) : '-' }}</button> 
							<button type="" class="mc-min-btn-primarybg">{{ item.cus_status ? cusstatusname(item.cus_status) : '-' }}</button>
						</view>
						-->
					</view>
					<view class="inline-btn inline-btn-right">
						<button class="mc-min-btn-primary" @click="queryCust({ cus_id: item.cus_id, cus_status: item.cus_status })">查看</button>
						<!-- <button
							class="mc-min-btn-waring"
							:disabled="item.cus_status != '00' && item.cus_status != '01' && item.cus_status != '02'"
							@click="deleteCust(item, index)"
						>
							作废
						</button>
						
						<button class="mc-min-btn-primary" :disabled="item.cus_status == '20'" @click="changeCust({cus_status: item.cus_status })">
							修改
						</button> -->
					</view>
				</template>
			</uni-card>
		</block>
		<block v-if="listData.length">
			<view v-if="showLoadMore" class="loadingData">{{ loadMoreText }}</view>
		</block>
		
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')" class="mcdrawer">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
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
				<!-- <view class="uni-form-item uni-column onerow bottomGap">
					<view class="title">客户号</view>
					<input v-model="search.cus_id" type="text" class="uni-input" value="" placeholder="请输入客户号" />
				</view> -->
				
				<!-- <view class="uni-form-item uni-column">
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
					</view>
				</view> -->
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
				
				
				// ???????
				search: {
					//cus_name: '',
					//cert_code: '',
					// cus_id: '',
					// cus_type: '110', //客户类型
					// cus_status: '20' //客户状态
				},
				serchBtnClick: false, //是否点击确定按钮
				showRight: false,
				loadMoreText: '加载中...',
				showLoadMore: false,
				queryClick: false,
				numFinish: false,
				pageSize: 10, // 每页条数
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
			this.resetSearch('btn');
			//刷新初始化数据
			this.numFinish = false;
			this.pageSize = 10; // 每页条数
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
		onNavigationBarButtonTap(e) {
			this.show();
		},
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
							//url: 'web/user/select',
							url: 'web/user/selectAllUser',
							data: {
								// cust_mgr_query: this.accountInfo.actorno, //	查询人客户经理号
								// main_br_id_query: this.accountInfo.orgid, //	查询人机构号
								// cust_mgr: this.accountInfo.actorno, //	主管客户经理号
								// main_br_id: this.accountInfo.orgid, //	主管机构号
								cert_code: this.search.cert_code ? this.search.cert_code : '', //	证件号码  查询条件
								cus_id: this.search.cus_id ? this.search.cus_id : '', //	客户号 -不使用
								cus_name: this.search.cus_name ? this.search.cus_name : '', //	姓名  查询条件
								// query_type: '5', //	查询类型  1 共借人客户  2 担保人  3 贷款人  4 经营实体 99 代表全部客户
								cus_type: this.search.cus_type ? this.search.cus_type : '110', //	客户类型 查询条件
								cus_status: this.search.cus_status ? this.search.cus_status : '20', //	客户状态 查询条件
								start_count: this.startCount.toString(), //	开始记录数
								count: this.pageSize.toString() //	查询条数
							}
						})
						.then(res => {
							if (this.firstQuery) {
								this.listData = [];
							}
							//if (res.response.header.returnCode == '00000000' && res.response.content.List && res.response.content.List.length) {
							if (1==1) {	
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
				// 修改客户
				/* changeCust(item) {
					// var type = item.cus_type;
					var _this = this;
					uni.setStorage({
						key: 'scrollSave',
						data: _this.$androidenv ? document.getElementsByTagName('body')[0].scrollTop : document.getElementsByTagName('html')[0].scrollTop,
						success: function() {
							_this.toLink('/pages/customer/customer01zs?isChange=true&isquery=true&custStatus=' + item.cus_status);
						}
					});
				}, */
				queryCust(item) {
					// var type = item.cus_type;
					var _this = this;
					uni.setStorage({
						key: 'scrollSave',
						data: _this.$androidenv ? document.getElementsByTagName('body')[0].scrollTop : document.getElementsByTagName('html')[0].scrollTop,
						success: function() {
							_this.toLink('/pages/customer/cus_toFind?isQueryDetail=true&isquery=true&custStatus=' + item.cus_status);
						}
					});
				},
				/* deleteCust(item, index) {
					uni.showModal({
						content: '是否删除本条客户信息?',
						success: e => {
							if (e.confirm) {
								this.$request
									.post({
										url: 'web/delete',
										data: {
											cert_code: item.cert_code //	证件号码
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
				}, */
				changeSelect(fname, fvalue) {
					this.search[fname] = fvalue;
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
					// this.search.cus_id = '';
					// this.search.cus_type = '110'; //客户类型
					// this.search.cus_status = '20'; //客户状态
				},
				show(e) {
					this.showRight = true;
				},
				hide() {
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
						case '01':
							return '临时客户';
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
	}
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
	font-size: 32rpx;
	color: #626366;
}
.mcdrawer {
	/* position: relative; */
}
.bottomBtn {
	position: absolute;
	width: 100%;
	left: 0;
	top: 200px;
}
.mcdrawer.uni-drawer /deep/ .uni-drawer__content {
	width: 80%;
}
.uni-input.linebtn {
	padding-right: 0;
	height: auto;
}
.mc-min-btn-primaryplan {
	border-color: $mc-text-weak;
	color: $mc-text-caption;
	margin-right: 14rpx;
	line-height: 48rpx;
	padding: 0 12rpx;
	font-size: 24rpx;
	margin-bottom: 14rpx;
}
.mc-min-btn-primaryplan.checked {
	background: $mc-color-babyblue;
	color: #ffffff;
	border-color: $mc-color-babyblue;
}
.inline-btn-right {
	margin-right: 20rpx;
}
.inline-btn .mc-min-btn-waring {
	float: left;
	margin-left: 30rpx;
}
</style>
