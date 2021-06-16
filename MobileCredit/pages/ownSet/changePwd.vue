<template>
	<view class="w100">
		<view>
			<view class="codeView">
				<!-- <input type="text" class="uni-input " placeholder="输入新密码" password="true" /> -->
				<wInput v-model="passData" type="text" placeholder="请输入新密码" password="true"></wInput>
			</view>

			<!-- 验证码 -->
			<view class="codeView">
				<wInput v-model="verCode" type="text " maxlength="4" placeholder="请输入下列验证码">
				</wInput>
				<view class="canvas-img-code" @click="refresh()">
					<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas"
						@error="canvasIdErrorCallback"></canvas>
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<view class="bottomBtn">
			<button class="mc-btn-primary" @click.native="sure()">确 定</button>
		</view>

	</view>

</template>

<script>
	var _this;	
	import wInput from '../../pages/ownSet/watch-input.vue'
	export default {			
		data() {
			return {
				verCode: "", //验证码
				passData: '', //密码
				width: 120,
				height: 45,
				custInfo: this.$store.state.accountInfos,
			}
		},
		components: {
			wInput,
			// wButton,
		},
		onShow() {
			_this = this;
			setTimeout(function() {
				_this.init();
			}, 200)
		},

		methods: {
			sure() {
				//点击确定按钮
				/* if (this.isRotate) {
					return false;
				} */
				if (this.passData == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '新密码不能为空'
					});
					return false;
				}

				if (this.verCode.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入验证码'
					});
					return false;
				}
				if (this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}	
				let custInfo = this.custInfo.result;
				uni.request({
					url: 'http://localhost:8888/web/user/updatePassword',
					method: 'POST',
					data: {
						'head':{},
						'content':{
							'cert_code': custInfo.certCode,
							'passWord':this.passData
						}
					},
					success: (res) => {
						console.log(res.data);
					}
				});
				setTimeout(function() {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '修改成功'
					});

					_this.isRotate = false
				}, 500)
			},

			// 初始化验证码
			init: function() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q",
						"R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					// context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn: function(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			refresh: function() {
				this.init();
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			}
		}

	}
</script>

<style>
	.bottomBtn {
		position: absolute;
		width: 100%;
		left: 0;
		top: 520rpx;
	}

	.codeView {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.canvas-img-code {
		margin-top: 10px;
	}
</style>
