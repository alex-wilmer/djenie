function range () {
	return function (items, prop, min, max) {
		var filtered = []
		if (items != null) {
			for (var i=0;i<items.length;i++) {
				if (items[i][prop] >= parseInt(min) && items[i][prop] <= parseInt(max)) {
					filtered.push(items[i])
				}
			}
		}
		return filtered
	}
}
angular
.module('app')
.filter('range', range)