'use strict'
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// Define our user schema
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model("Users", userSchema)

module.exports.User = User

module.exports.deleteAll = (callback) => {
  User.remove(callback)
}

module.exports.delete = (username,callback) => {
  User.remove({username:username} , callback)
}

module.exports.getAll = (callback) => {
  User.find (callback)
}

module.exports.get = (query,callback) => {
  User.findOne  (query, callback)
}

module.exports.post = (user,callback) => {
  user.save (callback)
}

module.exports.put = (query,update,callback) => {
  User.findOneAndUpdate(query,update,callback) 
}
