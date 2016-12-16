'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var xmlBodyParser = require('express-xml-bodyparser')
var expressDomain = require('express-domain-middleware')
var cors = require('cors')

module.exports = configuration => {

    var application = express()
   application.use(cors())

    // Configure security
    // if (configuration && configuration.secured) {
    // application.use(authentication())
    // }

    // Configure content parsers
    application.use(bodyParser.json())
    // XML
    application.use(xmlBodyParser())


    // Configure domain middleware for errors
    if (configuration && configuration.useDomain) {
        application.use(expressDomain)
    }

    application.use(function (req, res, next) {
        console.log('t:', Date.now())
             next()
        })

    var route = require("./route")
    route.use(application)


    // Configure generic error handler
    application.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })
    return application
}
