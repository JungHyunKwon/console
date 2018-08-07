/**
 * @name consoleFix
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */

'use strict';

//객체일때
if(!(window.console instanceof Object && window.console.constructor === Object)) {
	window.console = {
		method : [
			'assert',
			'clear',
			'count',
			'debug',
			'dir',
			'dirxml',
			'error',
			'exception',
			'group',
			'groupCollapsed',
			'groupEnd',
			'info',
			'log',
			'markTimeline',
			'profile',
			'profileEnd',
			'table',
			'time',
			'timeEnd',
			'timeStamp',
			'trace',
			'warn'
		],
		comment : []
	};

	for(var i = 0, consoleMethodLength = window.console.method.length; i < consoleMethodLength; i++) {
		//함수가아닐때
		if(typeof window.console[window.console.method[i]] !== 'function') {
			window.console[window.console.method[i]] = function() {
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