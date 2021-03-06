/**
 * @name console
 * @author JungHyunKwon
 * @since 2018-08-02
 * @version 1.0.0
 */
(function(console) {
	'use strict';

	//콘솔이 없을 때
	if(!console) {
		var method = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
			alt = [],
			slice = Array.prototype.slice;
			
		window.console = {
			alt : alt
		};

		for(var i = 0, methodLength = method.length; i < methodLength; i++) {
			(function(method) {
				console[method] = function() {
					var value = slice.call(arguments);

					alt.push({
						method : method,
						value : value
					});

					return value;
				};			
			})(method[i]);
		}
	}
})(window.console);