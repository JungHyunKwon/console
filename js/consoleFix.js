/**
 * @name consoleFix
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */

(function(console) {
	'use strict';

	/**
	 * @name 형태 얻기
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {string || undefined}
	 */
	function _getType(value) {
		var result;
		
		//매개변수가 있을 때
		if(arguments.length) {
			//null 일 때
			if(value === null) {
				result = 'null';
			
			//undefined 일 때
			}else if(value === undefined) {
				result = 'undefined';
			}else{
				result = Object.prototype.toString.call(value).toLowerCase().replace('[object ', '').replace(']', '');
				
				//Invalid Date 일 때
				if(result === 'date' && isNaN(new Date(value))) {
					result = 'Invalid Date';
				
				//숫자 일 때
				}else if(result === 'number') {
					//NaN 일 때
					if(isNaN(value)) {
						result = 'NaN';
					
					//Infinity 일 때
					}else if(!isFinite(value)) {
						result = value.toString();
					}
				
				//콘솔 일 때
				}else if(result === 'console') {
					result = 'object';
				
				//요소 일 때
				}else if(result.indexOf('element') > -1) {
					result = 'element';
				
				//문서 일 때
				}else if(result.indexOf('document') > -1) {
					result = 'document';
				}
			}
		}

		return result;
	}

	//객체가 아닐 때
	if(_getType(console) !== 'object') {
		var methodNames = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
			methodCode = '';
			
		window.console = {
			replacement : []
		};

		for(var i = 0, methodsLength = methodNames.length; i < methodsLength; i++) {
			var methodName = methodNames[i];

			methodCode += 'window.console[\'' + methodName + '\'] = function() {\n';
			methodCode += '\tvar result = [],\n';
			methodCode += '\t\targumentsLength = arguments.length;\n\n';

			//매개변수가 두 개 이상일 때
			methodCode += '\tif(argumentsLength > 1) {\n';
			methodCode += '\t\tfor(var i = 0; i < argumentsLength; i++) {\n';
			methodCode += '\t\t\tresult.push(arguments[i]);\n';
			methodCode += '\t\t}\n';

			//매개변수가 한 개일 때
			methodCode += '\t}else if(argumentsLength === 1) {\n';
			methodCode += '\t\tresult = arguments[0];\n';
			methodCode += '\t}\n\n';

			//매개변수가 있을 때
			methodCode += '\tif(argumentsLength) {\n';
			methodCode += '\t\tthis.replacement.push({\n';
			methodCode += '\t\t\tmethodName : \'' + methodName + '\',\n';
			methodCode += '\t\t\tvalue : result\n';
			methodCode += '\t\t});\n';
			methodCode += '\t}\n\n';
			methodCode += '\treturn this.replacement;\n';
			methodCode += '};\n\n';
		}
		
		//마지막 개행 제거
		methodCode = methodCode.replace(/\n$/, '');

		//함수 기입
		eval(methodCode);
	}
})(window.console);