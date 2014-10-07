function autoFocus($timeout) {
	return function(scope, element, attrs) {
		scope.$watch('formStep', function () { 
			$timeout(function() {
			    element[0].focus()
			})
		},true)
	}
}

angular
	.module('app')
	.directive('autoFocus', autoFocus)