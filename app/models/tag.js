var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var Tag = new Schema({
    name: String
})

module.exports = mongoose.model('Tag', Tag)
