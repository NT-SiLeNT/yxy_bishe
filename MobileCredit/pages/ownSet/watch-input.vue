<template>
	<view class="main-list oBorder">
		<!-- 文本框 -->
		<input 
			class="main-input" 
			:value="value" 
			:type="_type" 
			:maxlength="maxlength" 
			:placeholder="placeholder" 
			:password="type==='password'&&!showPassword" 
			@input="onInput"
		/>
		<!-- 是否可见密码 -->
		<!-- <image 
			v-if="_isShowPass&&type==='password'&&!_isShowCode"
			class="img cuIcon" 
			:class="showPassword?'cuIcon-attention':'cuIcon-attentionforbid'" 
			@tap="showPass"
		></image> -->
		<!-- 倒计时 -->
		<!-- <view 
			v-if="_isShowCode&&!_isShowPass"
			:class="['vercode',{'vercode-run': second>0}]" 
			@click="setCode"
		>{{ getVerCodeSecond }}</view> -->
		
	</view>
</template>

<script>
	var _this, countDown;
	export default{
		data(){
			return{
			}
		},
		props:{
			type: String, //类型
			value: String, //值
			placeholder: String, //框内提示
			maxlength: {
				//最大长度
				type: [Number,String],
				default: 20,
			},
			isShowCode:{
				//是否显示获取验证码（二选一）
				type: [Boolean,String],
				default: false,
			},
			codeText:{
				type: String,
				default: "获取验证码",
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		mounted() {
			_this=this
			//准备触发
			/* this.$on('runCode',(val)=>{
                this.runCode(val);
            }); */
			clearInterval(countDown);//先清理一次循环，避免缓存
		},
		methods:{
			showPass(){
				//是否显示密码
				this.showPassword = !this.showPassword
			},
			onInput(e) {
				//传出值
				this.$emit('input', e.target.value)
			},
			setCode(){
				//设置获取验证码的事件
				/* if(this.isRunCode){
					//判断是否开始倒计时，避免重复点击
					return false;
				} */
				this.$emit('setCode')
			},
			
		},
		computed:{
			_type(){
				//处理值
				const type = this.type
				return type == 'password' ? 'text' : type
			},
			_isShowPass() {
				//处理值
				return String(this.isShowPass) !== 'false'
			},
			_isShowCode() {
				//处理值
				return String(this.isShowCode) !== 'false'
			},
			_setTime() {
				//处理值
				const setTime = Number(this.setTime)
				return setTime>0 ? setTime : 60
			},
		}
	}
</script>

<style>
	
	.main-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 36upx;   /* Input 高度宽度 */
		width: 75%;
		color: #333333;
		padding: 32upx;
		margin-top:24upx;
		margin-bottom: 24upx;
	}
	
	.main-input{
		flex: 1;
		text-align: left;
		font-size: 28upx;
		/* line-height: 100upx; */
		padding-right: 10upx;
		margin-left: 20upx;
	}
	
	.oBorder{
	    border: none;
	    border-radius: 2.5rem ;
		background-color: #FFFFFF;
	    -webkit-box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
	    box-shadow: 0 0 60upx 0 rgba(43,86,112,.1) ;
	}
</style>
