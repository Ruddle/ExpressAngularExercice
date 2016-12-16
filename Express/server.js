'use strict'

var db = require('./mg_connect')
db.connect(     () => {

    var http = require('http')

    var  appBuilder = require('./expresso')

    var app = appBuilder({useDomain: true})

    var server = http.Server(app)

    server.listen(1337)

    console.log('server up')

    }
)



