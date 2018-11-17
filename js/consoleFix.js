/**
 * @name consoleFix
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */

(function(console) {
	'use strict';

	//콘솔이 없을 때
	if(!console) {
		var methodNames = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
			methodCode = '';
			
		window.console = {
			replacement : []
		};

		console = window.console;

		for(var i = 0, methodsLength = methodNames.length; i < methodsLength; i++) {
			var methodName = methodNames[i];

			methodCode += 'console[\'' + methodName + '\'] = function() {\n';
			methodCode += '    var result = [],\n';
			methodCode += '        argumentsLength = arguments.length,\n';
			methodCode += '        replacement = this.replacement;\n\n';

			//매개변수가 두 개 이상일 때
			methodCode += '    if(argumentsLength > 1) {\n';
			methodCode += '        for(var i = 0; i < argumentsLength; i++) {\n';
			methodCode += '            result.push(arguments[i]);\n';
			methodCode += '        }\n';

			//매개변수가 한 개일 때
			methodCode += '    }else if(argumentsLength === 1) {\n';
			methodCode += '        result = arguments[0];\n';
			methodCode += '    }\n\n';

			//매개변수가 있을 때
			methodCode += '    if(argumentsLength) {\n';
			methodCode += '        replacement.push({\n';
			methodCode += '            methodName : \'' + methodName + '\',\n';
			methodCode += '            value : result\n';
			methodCode += '        });\n';
			methodCode += '    }\n\n';
			methodCode += '    return replacement;\n';
			methodCode += '};\n\n';
		}
		
		//마지막 개행 제거
		methodCode = methodCode.replace(/\n$/, '');

		//함수 기입
		eval(methodCode);
	}
})(window.console);