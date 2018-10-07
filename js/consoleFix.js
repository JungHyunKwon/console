/**
 * @name consoleFix
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */

(function() {
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
	if(_getType(window.console) !== 'object') {
		window.console = {
			method : ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
			comment : []
		};

		for(var i = 0, consoleMethodLength = window.console.method.length; i < consoleMethodLength; i++) {
			var methodI = window.console.method[i];

			//함수가아닐때
			if(typeof window.console[methodI] !== 'function') {
				window.console[methodI] = function() {
					var result = [],
						argumentsLength = arguments.length;
				
					//매개변수가 2개이상일때
					if(argumentsLength > 1) {
						for(var i = 0; i < argumentsLength; i++) {
							result.push(arguments[i]);
						}
					
					//매개변수가 한개일때
					}else if(argumentsLength === 1) {
						result = arguments[0];
					}
				   
					//console.comment에 기입
					if(argumentsLength) {
						this.comment.push(result);
					}

					return result;
				};
			}
		}
	}
})();