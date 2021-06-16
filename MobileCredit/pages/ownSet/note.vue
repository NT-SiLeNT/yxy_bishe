<template>
	<view class="content">
		<view class="note-header">
			<!-- 状态栏左侧 -->
			<view class="note-header_left">
				<text class="left-headerText-color">{{ text }}</text>
				<text>共 {{ listData.length }} 条</text>
			</view>
			<!-- 状态栏右侧 -->
			<view class="note-header_right" v-for="(item, index) in tabList" :key="index">
				<view class="right-headerText" :class="{ 'right-headerText-color': tabRight == index }"
					@click="clickTab(item, index)">{{ item }}</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="text-content" v-for="(item, index) in listData" :key="item.title">
			<view class="text-list" :class="{ 'text-finish': item.select }" @click="do_done(item, index)">
				<view class="text-list_checkbox">
					<view class="checkbox" @change="savaList()"></view>
				</view>
				<view class="text-list_content">{{ item.title }}</view>
			</view>
			<!-- 删除 -->
			<image class="del" src="../../static/delete-1.png" @click="del(index)"></image>
		</view>
		<!-- 新建按钮 -->
		<view class="add-text" @click="add"></view>
		<!-- 输入框 -->
		<view class="add-content" v-if="addInput" :class="{ 'add-show': textShow }">
			<view class="add-content-box">
				<view class="add-input"><input type="text" v-model="InputValue" placeholder="请输入您要记录的信息" /></view>
				<view class="add-button" @click="submitInput">新建</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputValue: '',
				addInput: false,
				tabRight: 0,
				textShow: false,
				text: '全部',
				tabList: ['全部', '待办', '完成'],
				list: [{
					title: '这是一条待办测试',
					select: false
				}, {
					title: '这是一条完成测试',
					select: true
				}]
			};
		},
		// 下拉刷新
		 onLoad: function (options) {
		        setTimeout(function () {
		            console.log('start pulldown');
		        }, 500);
		        uni.startPullDownRefresh();
		    },
		    onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 500);
		    },
		computed: {
			listData() {
				let list = JSON.parse(JSON.stringify(this.list)); //深拷贝对象，修改数据对其他无影响
				let newList = [];
				//点击全部
				if (this.tabRight == 0) {
					return list;
				}
				//点击待办
				if (this.tabRight == 1) {
					list.forEach(n => {
						if (!n.select) {
							newList.push(n);
						}
					});
					return newList;
				}
				//点击已完成
				if (this.tabRight == 2) {
					list.forEach(n => {
						if (n.select) {
							newList.push(n);
						}
					});
					return newList;
				}
			}
		},
		methods: {
			//切换tab
			clickTab(item, index) {
				this.text = item;
				this.tabRight = index;
			},
			//点击列表完成或待办
			do_done(item, index) {
				this.list[index].select = !this.list[index].select;
				localStorage.setItem('listData', JSON.stringify(this.listData));
			},
			//打开输入框
			add() {
				if (this.addInput) {
					this.close();
				} else {
					this.open();
				}
				localStorage.setItem('listData', JSON.stringify(this.listData))
			},
			//打开动画
			open() {
				this.addInput = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.textShow = true;
					}, 50);
				});
			},
			//关闭动画
			close() {
				this.textShow = false;
				this.$nextTick(() => {
					setTimeout(() => {
						this.addInput = false;
					}, 350);
				});
			},
			//点击创建
			submitInput() {
				if (this.InputValue == '') {
					uni.showToast({
						title: '输入的内容不能为空',
						icon: 'none'
					});
				} else {
					this.addInput = false;
					this.list.unshift({
						title: this.InputValue,
						select: false
					});
					this.InputValue = '';
					this.close();
				}
				localStorage.setItem('listData', JSON.stringify(this.listData))
			},
			// 存储
			saveList() {
				localStorage.setItem('listData', JSON.stringify(this.listData))
			},

			del(index) { //删除
				this.list.splice(index,1) //从list数组中删除1个元素
				localStorage.setItem('listData', JSON.stringify(this.listData))
			},
		},
		mounted() {
			//json字符串转成json对象
			var list = JSON.parse(localStorage.getItem('listData'))
			//判断list是否存在
			if (list) {
				//如果存在，将获取到的list保存刷新后的list中
				this.list = list;
			}
		}
	};
</script>

<style>
	/* @import '../../common/icon.css'; */
	.note-header {
		display: flex;
		align-items: center;
		padding: 0 15px;
		font-size: 12px;
		color: #333333;
		height: 45px;
		box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
	}

	.note-header_left {
		width: 100%;
	}

	.left-headerText-color {
		/* font-size: 14px; */
		color: #279abf;
		padding-right: 10px;
	}

	.note-header_right {
		display: flex;
		/* flex的收缩规则 */
		flex-shrink: 0;
	}

	.right-headerText {
		padding: 0 5px;
	}

	.right-headerText-color {
		color: #279abf;
	}

	.text-content {
		position: relative;
	}

	.text-list {
		position: relative;
		display: flex;
		align-items: center;
		padding: 15px;
		margin: 15px;
		width: 78%;
		color: #0b3651;
		font-size: 14px;
		border-radius: 10px;
		background: #cfebfc;
		/* X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(248, 248, 248) inset;
		overflow: hidden;
	}

	.text-list::after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		width: 5px;
		background: #91d1e8;
	}

	.text-list_checkbox {
		padding-right: 15px;
	}

	.checkbox {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
	}

	.text-finish .checkbox {
		position: relative;
		background: #eee;
	}

	.text-finish .checkbox::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		margin: auto;
		background: #cfebfd;
		box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.2) inset;
	}

	.text-finish .text-list_content {
		color: #999;
	}

	.text-finish.text-list:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 40px;
		right: 10px;
		height: 2px;
		margin: auto 0;
		background: #bdcdd8;
	}

	.text-finish.text-list:after {
		background: #ccc;
	}

	.add-text {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 30px;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #bbd5e3;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(248, 248, 248) inset;
	}

	/* .iconhao1 {
		font-size: 30px;
		color: #add8e6;
	} */

	.add-content {
		position: fixed;
		bottom: 105px;
		left: 20px;
		right: 20px;
		transition: all 0.3s;
		opacity: 0;
		transform: scale(0) translateY(200%);
	}

	.add-show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.add-content-box {
		display: flex;
		align-items: center;
		padding: 0 15px;
		padding-right: 0;
		border-radius: 50px;
		background: #cfebfc;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(248, 248, 248) inset;
		z-index: 2;
	}

	.add-input {
		width: 100%;
		padding-right: 15px;
		color: #0b3651;
	}

	.add-button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 50px;
		width: 80px;
		border-radius: 50px;
		font-size: 16px;
		color: #6aa7b8;
		box-shadow: -2px 0px 2px 1px rgba(0, 0, 0, 0.1);
	}

	.add-content:after {
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		bottom: -8px;
		width: 20px;
		height: 20px;
		transform: rotate(45deg);
		margin: 0 auto;
		box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
		z-index: -1;
	}

	.add-content-box:after {
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		bottom: -8px;
		width: 20px;
		height: 20px;
		background: #cae7f0;
		transform: rotate(45deg);
		margin: 0 auto;
	}

	/* .iconhao1 {
		transition: transform 0.3s; 
	} */

	.add-text-active {
		transform: rotate(135deg);
	}

	.del {
		display: flex;
		z-index: 999;
		width: 50rpx;
		height: 50rpx;
		float: right;
		position: relative;
		margin-top: -55px;
		right: 2%
	}
</style>
