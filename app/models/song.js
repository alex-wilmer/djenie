var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var Song = new Schema({
    artist: String
  ,	title: String
  ,	bpm: Number
  , key: String
  ,	year: Number
  ,	tags: [String]
})

module.exports = mongoose.model('Song', Song)
