function Main ($scope, $http) {

	$scope.editing = false
	$scope.formStep = 0
	$scope.grids = 12
	$scope.bpmMin = 100
	$scope.bpmMax = 140
	$scope.yearMin = 2000
	$scope.yearMax = new Date().getFullYear()

	$scope.keys = [
	   {name: 'Ab', active: true}
	 , {name: 'A', active: true}
	 , {name: 'Bb', active: true}
	 , {name: 'B', active: true}
	 , {name: 'C', active: true}
	 , {name: 'Db', active: true}
	 , {name: 'D', active: true}
	 , {name: 'Eb', active: true}
	 , {name: 'E', active: true}
	 , {name: 'F', active: true}
	 , {name: 'F#', active: true}
	 , {name: 'G', active: true}
	]

	$http.get('/api/songs').success(function(data) {
		$scope.songs = data
	})

	$http.get('/api/tags').success(function(data) {
		$scope.tags = data
	})

	$scope.validated = true
	$scope.next = function() {
		if ($scope.formStep == 0) $scope.newSong = {tags: []}
		if ($scope.formStep == 1 && $scope.newSong.artist == undefined) {
			$scope.validated = false
			$scope.artistWrong = true
		} else {
			$scope.artistWrong = false
		}
		if ($scope.formStep == 2 && $scope.newSong.title == undefined) {
			$scope.validated = false
			$scope.titleWrong = true
		} else {
			$scope.titleWrong = false
		}
		if ($scope.formStep == 3 && isNaN(parseInt($scope.newSong.bpm))) {
			$scope.validated = false
			$scope.bpmWrong = true
			$scope.newSong.bpm = ''
		} else {
			$scope.bpmWrong = false
		}
		if ($scope.formStep == 4 && $scope.newSong.key.length > 2) {
				$scope.validated = false 
				$scope.keyWrong = true
				$scope.newSong.key = ''
		} else {
			$scope.keyWrong = false
		}
		if ($scope.formStep == 5 && isNaN(parseInt($scope.newSong.year))) {
			$scope.validated = false
			$scope.yearWrong = true
			$scope.newSong.year = ''
		} else {
			$scope.yearWrong = false
		}
		if ($scope.formStep == 6) {
			$scope.newSong.tags.push($scope.tag)
			$scope.tag = ''
		}
		if ($scope.validated)
			$scope.formStep = $scope.formStep < 6 ? $scope.formStep + 1 : 6
		$scope.validated = true
	}

	$scope.save = function() {
		newSong = $scope.newSong
		var song = {
		    artist: newSong.artist
		  , title: newSong.title
		  , bpm: parseInt(newSong.bpm)
		  , key: newSong.key
		  , year: parseInt(newSong.year)
		  , tags: newSong.tags
		}
		for (var i=0;i<newSong.tags.length;i++) {
			var exists = false
			for (var j=0;j<$scope.tags.length;j++) {
				if (newSong.tags[i] === $scope.tags[j].name) exists = true
			}
			if (!exists) {
				var newTag = { name: newSong.tags[i] }
				$scope.tags.push(newTag)
				$http.post('/api/tags', newTag)
			}
		}
		$scope.songs.push(song)
		$scope.formStep = 0
		$scope.newSong = {}
		$http.post('/api/songs', song)
	}

	$scope.remove = function(id) {
		for (var i=0; i<$scope.songs.length; i++) {
			if ($scope.songs[i]._id == id) {
				$scope.songs.splice(i, 1)
				break
			}
		}
		$http.delete('/api/songs/' + id)
	}

	$scope.edit = function(song) {
		$scope.editing = true
		$scope.song = song
	}

	$scope.toggleKey = function(index) {
		if ($scope.keys[index].active) {
			$scope.keys[index].active = false
			$scope.grids--
		} else {
			$scope.keys[index].active = true
			$scope.grids++	
		}
	}
}

angular
  .module('app')
  .controller('Main', Main)