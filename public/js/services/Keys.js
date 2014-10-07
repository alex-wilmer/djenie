function Keys () {
	return ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G']
}

angular
	.module('app')
	.service('Keys', Keys)