对http请求的根路径进行提取在store->index.js的state中进行配置。

### 1.http根路径--prodUrl：
   prodUrl:'http://10.10.48.108:8080',//该路径为测试环境emm地址
   prodUrl:'http://39.1.195.28:8085',//该路径为生产环境emm地址

### 1.第一级域名--firstlevelName：
   firstlevelName:'/cvm',// 和prodUrl会一起拼成请求公共的前半部分

### 1.第一级域名--imgUrlReplace：
   imgUrlReplace:true,// 在影像平台返回影像数据中本地展示时替换网址到端口部分为prodUrl，为false不进行替换，使用原始返回url进行展示
