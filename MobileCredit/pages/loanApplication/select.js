export const selectdata = {
	//产品编号
	prd_code:[
		{value:'022022', label:'个人经营贷款', name:'个人经营贷款',img:'../../static/dqsq/grjydk1@2x.png'},
		{value:'022007', label:'个人消费贷款-住房', name:'住房',img:'../../static/dqsq/zhufang2@2x.png'},
		{value:'022009', label:'个人消费贷款-商用房', name:'商用房',img:'../../static/dqsq/syf2@2x.png'},
		{value:'022010', label:'个人消费贷款-汽车消费', name:'汽车消费',img:'../../static/dqsq/car2@2x.png'},
		{value:'022012', label:'个人消费贷款-住房装修', name:'住房装修',img:'../../static/dqsq/housezx2@2x.png'},
		{value:'022015', label:'个人消费贷款-耐用品', name:'耐用品',img:'../../static/dqsq/nyp2@2x.png'},
		{value:'022016', label:'个人消费贷款-综合消费额度贷款', name:'综合消费额度贷款',img:'../../static/dqsq/zhxfdk2@2x.png'},
		{value:'022019', label:'个人消费贷款-留学', name:'留学',img:'../../static/dqsq/liuxue2@2x.png'},
		{value:'022021', label:'个人消费贷款-留学保证金', name:'留学保证金',img:'../../static/dqsq/lxbzj2@2x.png'},
		{value:'022020', label:'个人消费贷款-其他', name:'其他',img:'../../static/dqsq/ohter2@2x.png'},
	],
	//业务品种细分 ----全部
	biz_type_subAll:[
		{value:"022016", label:"其他消费贷款"},
		{value:"022022", label:"其他个人经营贷款"},
		{value:"022024", label:"税e融"},
		{value:"022204", label:"网易贷-差额放款"},
		{value:"022241", label:"网易贷-网银自助放款"},
		{value:"022242", label:"小微企业汽车贷款"},
		{value:"022243", label:"其他固定资产贷款"},
		{value:"022244", label:"租车贷"},
		{value:"022245", label:"京小贷"},
	],
	//业务品种细分 - 经营性
	biz_type_sub:[
		{value:'022022', label:'其他个人经营贷款'},
		{value:'022242', label:'小微企业汽车贷款'},
		{value:'022241', label:'网易贷-网银自助放款'},
		{value:"022244", label:"租车贷"},
	],
	//业务品种细分 - 消费
	biz_type_subxf:[
		{value:"022016", label:"其他消费贷款"},
		{value:"022204", label:"网易贷-差额放款"},
	],
	bal_loan_sub_prd:[
		{value:"02220401", label:"一般网易贷-差额放款"},
		{value:"02220402", label:"积金易贷"},
	],
	//贷款形式
	loan_form:[
		{value:'1', label:'新增贷款'},
		{value:'3', label:'借新还旧'},
	],
	//授信额度使用标识
	limit_ind:[
		{value:'1', label:'不使用授信额度'},
		{value:'2', label:'使用授信额度'},
	],
	//是否国家限制行业
	contry_limit_flag:[
		{value:'1', label:"是"},
		{value:'2', label:"否"},
	],
	//能源类型
	loan_start_date:[
		{value:"1", label:"新能源"},
		{value:"2", label:"传统能源"},
	],
	//币种
	apply_cur_type:[
		{value:"CNY", label:"人民币"},
		{value:"GBP", label:"英镑"},
		{value:"HKD", label:"港币"},
		{value:"JPY", label:"日元"},
		{value:"EUR", label:"欧元"},
		{value:"MOP", label:"澳门币"},
		{value:"RUB", label:"俄国卢布"},
		{value:"USD", label:"美元"},
		{value:"KRW", label:"韩元"},
	],
	//利率定价类型
	base_type:[
		{value:"01", label:"基准利率"},
		{value:"02", label:"LPR（贷款报价利率）"},
	],
	//期限时间类型
	term_time_type:[
		{value:"01", label:"日"},
		{value:"02", label:"月"},
	],
	//创业通达
	cytd:[
		{value:"01", label:"智领通"},
		{value:"02", label:"聚赢通"},
		{value:"03", label:"链贷通"},
		{value:"04", label:"蓝宝通"},
	],
	//业务模式
	pro_mode:[
		{value:"01", label:"一般类"},
		{value:"02", label:"无间贷"},
		{value:"03", label:"税贷通"},
	],
	// 抵质押类：
	pledge:[
		{value:"D01", label:"房易贷"},
		{value:"D03", label:"国有土地使用权抵押贷款"},
		{value:"D04", label:"经营性物业抵押贷款"},
		{value:"D05", label:"船舶抵押融资贷款"},
		{value:"D06", label:"机械设备按揭贷款"},
		{value:"D07", label:"林权抵押融资"},
		{value:"D08", label:"海域使用权抵押融资"},
		{value:"D09", label:"采矿权抵押融资"},
		{value:"D10", label:"企业股权质押融资业务"},
		{value:"D11", label:"知识产权质押融资业务"},
		{value:"D12", label:"合同能源管理融资"},
		{value:"D13", label:"股票质押融资"},
		{value:"D14", label:"股权质押融资"},
		{value:"D15", label:"全额质押（保证金）"},
		{value:"D16", label:"理财产品质押融资"},
		{value:"D17", label:"艺术品质押融资"},
		{value:"D18", label:"小微企业经营性汽车贷款"},
	],
	// 交易类：
	TransactionClass:[
		{value:"J01", label:"政府采购供应商融资"},
		{value:"J02", label:"保单融资"},
		{value:"J03", label:"订单融资"},
		{value:"J04", label:"应收账款质押融资"},
		{value:"J05", label:"存货质押融资"},
		{value:"J06", label:"出口退税账户托管融资"},
		{value:"J07", label:"国内保理业务"},
		{value:"J08", label:"银行承兑汇票委托代理贴现"},
		{value:"J09", label:"保兑仓"},
		{value:"J10", label:"保易安"},
		{value:"J11", label:"厂商银"},
		{value:"J12", label:"未来货权融资"},
		{value:"J13", label:"保易通"},
		{value:"J14", label:"银租通"},
	],
	// 固定资产类：
	fixed_assets:[
		{value:"G01", label:"法人房产按揭贷款"},
		{value:"G02", label:"厂房构建贷款"},
		{value:"G03", label:"国内法人机械设备贷款"},
	],
	// 政策类：
	policy:[
		{value:"Z02", label:"助保贷"},
		{value:"Z03", label:"农民住房财产权抵押贷款"},
		{value:"Z01", label:"小额担保贷款"},
		{value:"Z04", label:"农村承包土地经营权抵押贷款"},
		{value:"Z05", label:"富民生产贷"},
		{value:"Z06", label:"富民农户贷"},
		{value:"Z07", label:"人才贷"},
		{value:"Z08", label:"政e融"},
		{value:"Z09", label:"农村股权贷"},
	],
	// 保险类：
	insurance:[
		{value:"B01", label:"履约保证保险融资"},
		{value:"B02", label:"政银保"},
	],
	// 其他特色类：
	other_features:[
		{value:"Q01", label:"租金贷"},
		{value:"Q02", label:"押余融"},
		{value:"Q03", label:"银团贷款"},
		{value:"Q06", label:"法人车辆设备租赁贷款"},
		{value:"Q07", label:"法人账户透支"},
		{value:"Q04", label:"并购贷款"},
		{value:"Q05", label:"联合贷款"},
		{value:"Q08", label:"联保贷款"},
		{value:"Q09", label:"其它"},
		{value:"Q10", label:"税e融转线下"},
		{value:"Q11", label:"烟草商户贷"},
	],
	//担保方式
	assure_means:[
		{value:"00", label:"信用"},
		{value:"10", label:"抵押"},
		{value:"20", label:"质押"},
		{value:"30", label:"保证"},
	],
	//利率浮动类型
	floating_type:[
		{value:"1", label:"利率浮动比"},
		{value:"2", label:"利率浮动点数"},
	],
	//利率调整模式
	rate_exe_model:[
		{value:"11", label:"固定利率"},
		{value:"12", label:"浮动利率"},
	],
	//利率调整方式
	ir_adjust_mode:[
		{value:"0", label:"固定调整方式"},
		{value:"1", label:"机动调整方式"},
		{value:"2", label:"定期调整方式"},
		{value:"3", label:"年初调整方式"},
		{value:"4", label:"放款日起定期机动"},
		{value:"5", label:"任意日起定期机动"},
	],
	//定价基准参照日
	ir_match_type:[
		{value:"01", label:"合同签订日"},
		{value:"02", label:"贷款发放日"},
	],
	//还款方式
	repayment_mode:[
		{value:"101", label:"利随本清"},
		{value:"201", label:"等额本金"},
		{value:"202", label:"等额本息"},
		{value:"203", label:"分期归还法"},
		{value:"204", label:"一次性归还"},
	],
	//付息方式
	discount_typ:[
		{value:"2", label:"前期免本息，后期按揭"},
		{value:"3", label:"前期只周期付息，后期按揭"},
	],
	//结息方式
	interest_acc_mode:[
		{value:"08", label:"每月21日结息"},
		{value:"09", label:"每季21日结息"},
		{value:"10", label:"每半年21日结息"},
		{value:"11", label:"每年21日结息"},
		{value:"12", label:"贷放日结息 "},
		{value:"13", label:"定日结息 "},
		{value:"14", label:"利随本清"},
	],
	//缴息周期
	pay_cycle:[
		{value:"01", label:"按月结息"},
		{value:"03", label:"按季结息"},
		{value:"06", label:"按半年结息"},
		{value:"12", label:"按年结息"},
	],
	//缴息日期
	pay_period:[
		{value:"1",label:"1"},
		{value:"2",label:"2"},
		{value:"3",label:"3"},
		{value:"4",label:"4"},
		{value:"5",label:"5"},
		{value:"6",label:"6"},
		{value:"7",label:"7"},
		{value:"8",label:"8"},
		{value:"9",label:"9"},
		{value:"10",label:"10"},
		{value:"11",label:"11"},
		{value:"12",label:"12"},
		{value:"13",label:"13"},
		{value:"14",label:"14"},
		{value:"15",label:"15"},
		{value:"16",label:"16"},
		{value:"17",label:"17"},
		{value:"18",label:"18"},
		{value:"19",label:"19"},
		{value:"20",label:"20"},
		{value:"21",label:"21"},
		{value:"22",label:"22"},
		{value:"23",label:"23"},
		{value:"24",label:"24"},
		{value:"25",label:"25"},
		{value:"26",label:"26"},
		{value:"27",label:"27"},
		{value:"28",label:"28"},
		{value:"29",label:"29"},
		{value:"30",label:"30"},
		{value:"31",label:"31"},
	],
	//涉农类型
	agriculture_type:[
		{value:"00", label:"不涉农"},
		{value:"10", label:"农村企业涉农"},
		{value:"20", label:"农村组织涉农"},
		{value:"30", label:"城市企业涉农"},
		{value:"40", label:"城市组织涉农"},
		{value:"50", label:"个人涉农"},
	],
	//涉农用途
	agriculture_use:[
		{value:"1", label:"农林牧渔业贷款"},
		{value:"2", label:"支农贷款 - 农田基本建设"},
		{value:"3", label:"支农贷款 - 农产品加工"},
		{value:"4", label:"支农贷款 - 农业生产资料制造"},
		{value:"5", label:"支农贷款 - 农业物资和农副产品流通贷款（农产品出口）"},
		{value:"6", label:"支农贷款 - 农业物资和农副产品流通贷款（其他）"},
		{value:"7", label:"支农贷款 - 农业科技贷款"},
		{value:"8", label:"支农贷款 - 农村基础设施建设贷款"},
		{value:"9", label:"其他贷款"},
	],
	//支付方式
	payment_type:[
		{value:"1", label:"自主支付"},
		{value:"2", label:"受托支付"},
	],
	//行内模式
	etp_in_tx_typ:[
		{value:"1", label:"自动"},
		{value:"2", label:"手动"},
	],
	//行外模式
	etp_out_tx_typ:[
		{value:"1", label:"同城支付"},
		{value:"2", label:"大小额支付"},
		{value:"3", label:"外币渠道"},
	],
	//风险分类初分意见
	cla_result:[
		{value:"10", label:"正常"},
		{value:"20", label:"关注"},
		{value:"30", label:"次级"},
		{value:"40", label:"可疑"},
		{value:"50", label:"损失"},
	],
	//十级分类
	ten_result:[
		{value:"01", label:"正常一"},
		{value:"02", label:"正常二"},
		{value:"03", label:"正常三"},
		{value:"04", label:"关注一"},
		{value:"05", label:"关注二"},
		{value:"06", label:"次级一"},
		{value:"07", label:"次级二"},
		{value:"08", label:"可疑一"},
		{value:"09", label:"可疑二"},
		{value:"10", label:"损失"},
	],
	//证件类型
	cert_type: [
		{value: '10',label: "身份证"},
		{value: '12',label: "护照"},
		{value: '13',label: "军官证"},
		{value: '14',label: "士兵证"},
		{value: '15',label: "港澳居民来往内地通行证"},
		{value: '16',label: "台湾同胞来往内地通行证"},
		{value: '18',label: "外国人居留证"},
		{value: '19',label: "警官证"},
	],
	public_cert_type:[
		{value: '22',label: "营业执照号码(统一社会信用代码)"},
		{value: '23',label: "民办非企业登记证书"},
		{value: '24',label: "其他批文或证明"},
		{value: '25',label: "预先核准通知书"},
		{value: '26',label: "事业单位法人证书"},
		{value: '27',label: "政府批文"},
		{value: '28',label: "境外企业证书"},
		{value: '29',label: "社会团体法人登记证书"},
		{value: '30',label: "工会法人资格证书"},
		{value: '1X',label: "其他证件"},
	],
	cert_type1: [
		{value: '10',label: "身份证"},
		{value: '11',label: "户口簿"},
		{value: '12',label: "护照 "},
		{value: '13',label: "军官证"},
		{value: '14',label: "士兵证"},
		{value: '15',label: "港澳居民来往内地通行证"},
		{value: '16',label: "台湾同胞来往内地通行证"},
		{value: '17',label: "临时身份证"},
		{value: '18',label: "外国人居留证"},
		{value: '19',label: "警官证"},
		{value: '1X',label: "其他证件"},
		{value: '20',label: "组织机构代码"},
		{value: '21',label: "贷款卡编码"},
		{value: '22',label: "营业执照号码(统一社会信用代码)"},
		{value: '23',label: "民办非企业登记证书"},
		{value: '24',label: "其他批文或证明"},
		{value: '25',label: "预先核准通知书"},
		{value: '26',label: "事业单位法人证书"},
		{value: '27',label: "政府批文"},
		{value: '28',label: "境外企业证书"},
		{value: '29',label: "社会团体法人登记证书"},
		{value: '30',label: "工会法人资格证书"},
	],
	
	cert_type_all:[
		{value:"10", label:"身份证"},
		{value:"11", label:"户口簿"},
		{value:"12", label:"护照"},
		{value:"13", label:"军官证"},
		{value:"14", label:"士兵证"},
		{value:"15", label:"港澳居民来往内地通行证"},
		{value:"16", label:"台湾同胞来往内地通行证"},
		{value:"17", label:"临时身份证"},
		{value:"18", label:"外国人居留证"},
		{value:"19", label:"警官证"},
		{value:"1X", label:"其他证件"},
		{value:"20", label:"组织机构代码"},
		{value:"21", label:"贷款卡编码"},
		{value:"22", label:"营业执照号码(统一社会信用代码)"},
		{value:"23", label:"民办非企业登记证书"},
		{value:"24", label:"其他批文或证明"},
		{value:"25", label:"预先核准通知书"},
		{value:"26", label:"事业单位法人证书"},
		{value:"27", label:"政府批文"},
		{value:"28", label:"境外企业证书"},
		{value:"29", label:"社会团体法人登记证书"},
		{value:"30", label:"工会法人资格证书"},
		{value:"99", label:"中征码"},
	],
	//车辆产地
	vch_place:[
		{value:"1",	label:"国产"},
		{value:"2",	label:"进口"},
	],
	//购买用途
	buy_purpose:[
		{value:"1",	label:"自用"},
		{value:"2",	label:"经营"},
	],
	//车况
	carinfo:[
		{value:"01", label:"新车"},
		{value:"02", label:"二手车"},
	],
	//房屋属性
	houses_nature:[
		{value:"1",	label:"一手房"},
		{value:"2",	label:"二手房"},
	],
	//房屋用途
	housing_purpose:[
		{value:"1",	label:"自用"},
		{value:"3",	label:"商住两用"},
		{value:"5",	label:"闲置"},
		{value:"9",	label:"其他"},
	],
	//房屋状况
	housing_status:[
		{value:"1",	label:"现房"},
		{value:"2",	label:"期房"},
	],
	//房屋类型
	housing_type:[
		{value:"01", label:"普通住宅"},
		{value:"02", label:"高档住宅"},
		{value:"03", label:"商业用房"},
		{value:"04", label:"别墅"},
		{value:"05", label:"高档公寓"},
		{value:"06", label:"经济适用房"},
		{value:"07", label:"廉租房"},
		{value:"08", label:"商住两用房"},
		{value:"11", label:"安居工程房"},
		{value:"12", label:"临街门市"},
		{value:"13", label:"房改房"},
		{value:"14", label:"回迁安置房"},
		{value:"15", label:"其他商铺"},
		{value:"16", label:"办公用房"},
		{value:"17", label:"厂房"},
		{value:"99", label:"其它"},
	],
	//房屋计价方式
	housing_val_typ:[
		{value:"01", label:"按套内建筑面积"},
		{value:"02", label:"按建筑面积"},
		{value:"03", label:"按单套计算"},
	],
	//房屋结构
	housing_arc:[
		{value:"01", label:"钢结构"},
		{value:"02", label:"钢和钢混"},
		{value:"03", label:"钢混"},
		{value:"04", label:"混合"},
		{value:"05", label:"砖木"},
		{value:"06", label:"其他"},
		{value:"07", label:"简易结构"},
		{value:"08", label:"砖混结构"},
	],
	//土地使用方式
	land_use_way:[
		{value:"1",	label:"国有划拨"},
		{value:"2",	label:"国有出让"},
		{value:"3",	label:"集体用地"},
		{value:"4",	label:"宅基地"},
		{value:"5",	label:"集体流转"},
		{value:"6",	label:"其他"},
	],
	//房屋区位
	housing_position:[
		{value:"01", label:"地理位置优越且周边配套设施完善"},
		{value:"02", label:"地理位置尚可且周边配套设施基本完善"},
		{value:"03", label:"地段偏远或周边配套设施较差"},
	],
	//消费内容
	spd_content:[
		{value:"10", label:"耐用品消费"},
		{value:"20", label:"留学消费"},
		{value:"30", label:"住房装修消费"},
		{value:"40", label:"综合消费额度贷"},
		{value:"50", label:"其它消费"},
		{value:"60", label:"购珠宝"},
		{value:"70", label:"购古董"},
		{value:"80", label:"旅游"},
	],
	is_send_flag:[
		{value:'1', label:'是'},
		{value:'2', label:'否'}
	],
	//担保人类型
	add_cust_type:[
		{value:"10001", label:"合作方担保"},
		{value:"10002", label:"个人"},
		{value:"10003", label:"企业"},
	],
	guaranty_type:[
		{value:"10001", label:"单人担保"},
		{value:"10002", label:"多人保证"},
		{value:"10003", label:"多人分保"},
	],
	guarantee_type:[
		{value:"10001", label:"连带责任保证"},
		{value:"10002", label:"一般责任保证"},
	],
	cust_type_role:[
		{value:"01", label:"申请人"},
		{value:"02", label:"申请人配偶"},
		{value:"03", label:"法定代表人/负责人"},
		{value:"04", label:"法定代表人/负责人配偶"},
		{value:"05", label:"实际控制人"},
		{value:"06", label:"实际控制人配偶信息"},
		{value:"07", label:"保证/抵质押人"},
		{value:"08", label:"保证/抵质押人配偶"},
		{value:"09", label:"保证/抵质押企业法定代表人/负责人"},
		{value:"10", label:"保证/抵质押企业法定代表人/负责人配偶"},
		{value:"11", label:"保证/抵质押企业实际控制人"},
		{value:"12", label:"保证/抵质押企业实际控制人配偶"},
		{value:"13", label:"共同债务人"},
		{value:"14", label:"共同债务人配偶"},
		{value:"15", label:"经营实体角色"},
	],
	account_status:[
		{value:"0", label:"出帐未确认"},
		{value:"1", label:"正常"},
		{value:"3", label:"扣款未兑付"},
		{value:"4", label:"转贴现"},
		{value:"5", label:"核销"},
		{value:"6", label:"垫款"},
		{value:"7", label:"已扣款"},
		{value:"8", label:"退回未用"},
		{value:"9", label:"销户/核销"},
	],
	
	ccr_scoreresult:[
		{value:"SA", label:"自动批准"},
		{value:"SRA", label:"建议批准"},
		{value:"SR", label:"人工审核"},
		{value:"SRD", label:"审慎审核"},
		{value:"SD", label:"自动拒绝"},
	],
	ccr_lastresult:[
		{value:"A", label:"自动批准"},
		{value:"RA", label:"建议批准"},
		{value:"R", label:"人工审核"},
		{value:"RD", label:"审慎审核"},
		{value:"D", label:"自动拒绝"},
	],
	ccr_advicetype:[
		{value:"1", label:"建议"},
		{value:"2", label:"半自动"},
		{value:"3", label:"自动"},
	],
	ccr_doworktype:[
		{value:"1", label:"人工处理"},
		{value:"2", label:"系统处理"},
	],
	ccr_score_status:[
		{value:"01", label:"生效"},
		{value:"02", label:"失效"},
	],
	result_code:[
		{value:"0000", label:"成功"},
		{value:"1", label:"失败"},
		{value:"2", label:"人行无记录"},
	]
}
