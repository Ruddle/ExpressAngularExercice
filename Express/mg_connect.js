'use strict'
var mongoose = require('mongoose')

var connect = () => {
    var options = {server : { socketOptions : { keepAlive :1 }}}
    mongoose.connect('mongodb://localhost/contacts',options)
}

mongoose.connection.on('error',console.log)
mongoose.connection.on('disconnected',connect)

module.exports = {
    connect: callback => {
        mongoose.connection.on('connected' , ref => callback(ref))
        connect()
    },

    disconnect : callback =>{
        mongoose.disconnect(callback)
    }
}