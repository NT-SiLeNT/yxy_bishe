/**
数据验证（表单验证）
*/
module.exports = {
	error: '',
	check: function(data, rule) {
		for (var i = 0; i < rule.length; i++) {
			if (!rule[i].name) {
				return true;
			}
			if (!rule[i].checkType) {
				rule[i].checkType = 'notnull'
			}
			if (!rule[i].errorMsg) {
				return true;
			}
			// if (!data[rule[i].name]) {
			// 	this.error = rule[i].errorMsg;
			// 	return false;
			// }
			if (!rule[i].notrequire && !data[rule[i].name]) {
				this.error = rule[i].errorMsg;
				return false;
			}
			switch (rule[i].checkType) {
				case 'string':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (rule[i].checkRule) {
							var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
						} else {
							var reg = new RegExp('^.$');
						}
						if (this.check(data, rule[i])) {
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'int':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (rule[i].checkRule) {
							var reg = new RegExp('^[0-9]{' + rule[i].checkRule + '}$');
						} else {
							var reg = new RegExp('^[0-9]*$');
						}
						if (this.check(data, rule[i])) {
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'intNot0':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (rule[i].checkRule) {
							var reg = new RegExp('^[1-9]{' + rule[i].checkRule + '}$');
						} else {
							var reg = new RegExp('^[1-9]*$');
						}
						if (this.check(data, rule[i])) {
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'int1':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (rule[i].checkRule) {
							var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
						} else {
							var reg = new RegExp('^(-[1-9]|[1-9])[0-9]$');
						}
						if (this.check(data, rule[i])) {
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'between':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (!this.isNumber(data[rule[i].name])) {
							this.error = rule[i].errorMsg;
							return false;
						}
						var minMax = rule[i].checkRule.split(',');
						minMax[0] = Number(minMax[0]);
						minMax[1] = Number(minMax[1]);
						if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'betweenD':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						var reg = /^-?[1-9][0-9]?$/;
						if (!reg.test(data[rule[i].name])) {
							this.error = rule[i].errorMsg;
							return false;
						}
						var minMax = rule[i].checkRule.split(',');
						minMax[0] = Number(minMax[0]);
						minMax[1] = Number(minMax[1]);
						if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'betweenF':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
						if (!reg.test(data[rule[i].name])) {
							this.error = rule[i].errorMsg;
							return false;
						}
						var minMax = rule[i].checkRule.split(',');
						minMax[0] = Number(minMax[0]);
						minMax[1] = Number(minMax[1]);
						if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'same':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (data[rule[i].name] != rule[i].checkRule) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'notsame':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (data[rule[i].name] == rule[i].checkRule) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'email':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'phoneno':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'phoneno1':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = /^(0?[0-9]{2,3}-?){0,1}[0-9]{7,8}(-[0-9]{1,4}){0,1}$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'zipcode':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						var reg = /^[0-9]{6}$/;
						if (!reg.test(data[rule[i].name])) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'reg':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = new RegExp(rule[i].checkRule);
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'in':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'postcode':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = /^[0-9]\d{5}(?!\d)$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'certcode':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg =
								/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}

						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'year':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							var reg = /^[1-9][0-9][0-9][0-9]$/;
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}

						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'money':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							if (rule[i].checkRule) {
								var reg = new RegExp('(^[1-9]([0-9]+)?(\.[0-9]{' + rule[i].checkRule + '})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{' +
									rule[i].checkRule + '}?$)');
							} else {
								var reg = /(^[1-9]([0-9]+)?(\.[0-9]*)?$)|(^(0){1}$)|(^[0-9]\.[0-9]*?$)/;
								// var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}?$)/;
							}
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'squaremeter':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							if (rule[i].checkRule) {
								var reg = new RegExp('(^[1-9]([0-9]+)?(\.[0-9]{' + rule[i].checkRule + '})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{' +
									rule[i].checkRule + '}?$)');
							} else {
								var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}?$)/;
							}
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'percent':
					if (!rule[i].notrequire || (rule[i].notrequire && data[rule[i].name] != '')) {
						if (this.check(data, rule[i])) {
							if (rule[i].checkRule) {
								var reg = new RegExp('(^[1-9]([0-9]+)?(\.[0-9]{' + rule[i].checkRule + '})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{' +
									rule[i].checkRule + '}?$)');
							} else {
								var reg = /(^[1-9]([0-9]+)?(\.[0-9]*)?$)|(^(0){1}$)|(^[0-9]\.[0-9]*?$)/;
							}
							if (!reg.test(data[rule[i].name])) {
								this.error = rule[i].error;
								return false;
							}
						} else {
							this.error = rule[i].errorMsg;
							return false;
						}
					}
					break;
				case 'notnull':
					if (!rule[i].notrequire) {
						if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
							this.error = rule[i].errorMsg;
							return false;
						}
					} else if (rule[i].notrequire && data[rule[i].name] != '') {
						if (rule[i].checkRule) {
							var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
						} else {
							var reg = new RegExp('^.*$');
						}
						if (!reg.test(data[rule[i].name])) {
							this.error = rule[i].error;
							return false;
						}
					}
					break;
			}
		}
		return true;
	},
	iscertcode: function(checkVal) {
		var reg =
			/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		if (!reg.test(checkVal)) {
			this.error = '身份证号码格式错误';
			return false;
		}
		return true;
	}
}
