/**
 * @name consoleFix
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */

(function(console) {
	'use strict';

	/**
	 * @name 형태얻기
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {string || undefined}
	 */
	function _getType(value) {
		var result;
		
		//매개변수가 있을때
		if(arguments.length) {
			//null일때
			if(value === null) {
				result = 'null';
			
			//undefined일때
			}else if(value === undefined) {
				result = 'undefined';
			}else{
				result = Object.prototype.toString.call(value).toLowerCase().replace('[object ', '').replace(']', '');
				
				//Invalid Date일때
				if(result === 'date' && isNaN(new Date(value))) {
					result = 'Invalid Date';
				
				//숫자일때
				}else if(result === 'number') {
					//NaN일때
					if(isNaN(value)) {
						result = 'NaN';
					
					//Infinity일때
					}else if(!isFinite(value)) {
						result = value.toString();
					}
				
				//콘솔일때
				}else if(result === 'console') {
					result = 'object';
				
				//요소일때
				}else if(result.indexOf('element') > -1) {
					result = 'element';
				
				//문서일때
				}else if(result.indexOf('document') > -1) {
					result = 'document';
				}
			}
		}

		return result;
	}

	//객체가 아닐때
	if(_getType(console) !== 'object') {
		var methodNames = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

		window.console = {
			replace : []
		};

		for(var i = 0, methodsLength = methodNames.length; i < methodsLength; i++) {
			var methodName = methodNames[i];

			//함수가 아닐때
			if(typeof window.console[methodName] !== 'function') {
				var methodCode = 'window.console[\'' + methodName + '\'] = function() {\n';

				methodCode += '\tvar result = [],\n';
				methodCode += '\t\targumentsLength = arguments.length;\n\n';
				methodCode += '\tif(argumentsLength > 1) {\n';
				methodCode += '\t\tfor(var i = 0; i < argumentsLength; i++) {\n';
				methodCode += '\t\t\tresult.push(arguments[i]);\n';
				methodCode += '\t\t}\n';
				methodCode += '\t}else if(argumentsLength === 1) {\n';
				methodCode += '\t\tresult = arguments[0];\n';
				methodCode += '\t}\n\n';
				methodCode += '\tif(argumentsLength) {\n';
				methodCode += '\t\tthis.replace.push({\n';
				methodCode += '\t\t\tmethodName : \'' + methodName + '\',\n';
				methodCode += '\t\t\tvalue : result\n';
				methodCode += '\t\t});\n';
				methodCode += '\t}\n\n';
				methodCode += '\treturn this.replace;\n';
				methodCode += '};';

				eval(methodCode);
			}
		}
	}
})(window.console);