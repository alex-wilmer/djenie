var Song = require('./models/song')
var Tag = require('./models/tag')

module.exports = function(app) {

	/*
	app.get('/api/authenticate', function(req, res) {
		if (req.body.password === 'password')
			res.json({status: 'ok'})
	})
	*/	

	//songs
	app.get('/api/songs', function(req, res) {
		Song.find(function(err, songs) {
			if (err) res.send(err)
			res.json(songs) 
		})
	})

	app.post('/api/songs', function(req, res) {
		var song = new Song()
		song.artist = req.body.artist
		song.title = req.body.title
		song.bpm = req.body.bpm
		song.key = req.body.key
		song.year = req.body.year	
		song.tags = req.body.tags	
		song.save(function(err) {
			if (err) res.send(err)
			res.json({ message: 'Song created!'})
		})
	})

	app.put('/api/songs/:songID', function(req, res) {
		Song.findById(req.params.songID, function(err, song) {
			if (err) res.send(err)
			song.save(function(err) {
				if (err)
					res.send(err)
				res.json({ message: 'Song updated!' })
			})
		})
	})

	app.delete('/api/songs/:songID', function(req, res) {
		Song.remove({_id: req.params.songID}, function(err, bear) {
			if (err) res.send(err)
			res.json({ message: 'Successfully deleted.' })
		})
	})

	//tags
	app.get('/api/tags', function(req, res) {
		Tag.find(function(err, tags) {
			if (err) res.send(err)
			res.json(tags)
		})
	})

	app.post('/api/tags', function(req, res) {
		//write code to check if tag already exists first
		console.log(req.body.name)
		var tag = new Tag()
		tag.name = req.body.name
		tag.save(function(err) {
			if (err) console.log(err)
			res.json({ message: 'Tag created!'})
		})
	})

	// frontend routes 
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html') 
	})

}
