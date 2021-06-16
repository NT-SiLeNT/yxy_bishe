<script>
	import {
		RecordStart,
		RecordPause,
		RecordStop,
		PlayStop,
		PlayStart,
		PlayPause,
		RecordClear,
		RecordCancel,
		getVoiceTime
	} from '@/common/Mobile/MobileUtils.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');

			uni.getStorage({
					key: 'AccountandPwd',
					success: function(res) {
						console.log(res.data);
						// 不是第一次登录
						if (res.data) {
							uni.reLaunch({
								url: '/pages/home/home'
							});

						}
					}
			})

		},
		onPageNotFound: function() {
			// uni.reLaunch({
			// 	url: '/pages/login/login'
			// });
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/* 重新覆盖原有样式 */
	@import './common/css/cover-origin-css.scss';
	/*兼容样式 */
	@import './common/css/compatible.css';
	/*每个页面公共css */
	@import './common/css/global.scss';

	uni-app {
		background: $mc-bg-color;
		/* uni-app不可以增加-overflow-x:hidden-会导致任意位置下拉触发下拉刷新 */
	}

	uni-page {}
</style>
