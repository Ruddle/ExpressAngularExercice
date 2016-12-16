'use strict'
var DATABASE = require('./mg_schema')

module.exports.use = (application) => {

    var contacts_get = (req, res) => {
        var username = req.param('username');
        if (username == undefined) {
            DATABASE.getAll((err, users) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' })
                    res.end("Error")
                }
                var resp = []
                users.map((user) => resp.push({ "username": user.username }))
                res.json(resp)
            })
        }
        else {
            DATABASE.get({ username: username }, (err, user) => {
                if (err || user == null) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' })
                    res.end("Error")
                }
                else
                    res.json({ username: user.username, password: user.password })
            })
        }
    }

    var contacts_delete = (req, res) => {
        var username = req.param('username');
        if (username == undefined) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end("user to delete not specified, so not found")
        }
        else {
            DATABASE.delete(username, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' })
                    res.end("Error")
                }
                else {
                    res.writeHead(201, { 'Content-Type': 'text/plain' })
                    res.end(username + " has been deleted of the DATABASE")
                }
            })
        }
    }

    var contacts_post = (req, res) => {

        var bodyReceived = false
        req.on('data', (data) => {
            bodyReceived = true
            var json = undefined
            try { json = JSON.parse(data); } catch (e) { }
            console.log("test1 =" + json)
            if (json == undefined || json.username == undefined) {
                console.log("test2 =" + json)
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end("body not valid")
            }
            else {
                DATABASE.get({ username: json.username }, (err, us) => {
                    if (us != null) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' })
                        res.end("user already exists")
                    }
                    else {
                        DATABASE.post(new DATABASE.User(json))
                        res.writeHead(201, { 'Content-Type': 'text/plain' })
                        res.end("\"" + json.username + "\"" + " has been added to the DATABASE")
                    }
                })
            }
        })
        setTimeout(() => {
            if (!bodyReceived) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end("body not sent in 200 ms")
            }
        }, 200)

    }

    var contacts_put = (req, res) => {
        var bodyReceived = false
        req.on('data', (data) => {
            bodyReceived = true
            var json = undefined
            try { json = JSON.parse(data); } catch (e) { }
            if (json == undefined || json.username == undefined) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end("body not valid")
            }
            else {
                DATABASE.put({ username: json.username }, json, (err) => {
                    if (err) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' })
                        res.end("user already exists")
                    }
                    else {
                        res.writeHead(201, { 'Content-Type': 'text/plain' })
                        res.end("\"" + json.username + "\"" + " has been updated to the DATABASE")
                    }
                })
            }
        })
        setTimeout(() => {
            if (!bodyReceived) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end("body not sent in 200 ms")
            }
        }, 200)
    }
    application.get('/contacts/', contacts_get)
    application.post('/contacts/', contacts_post)
    application.delete('/contacts/', contacts_delete)
    application.put('/contacts/', contacts_put)
}