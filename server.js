const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const token = "qq1ww2as21ffasd983nsd8fnmzxn8u654asduamsaldpM13QW03DOoiasfIUQWUSABD123uebzzdQW1ASDad31sfsqiwnd122pweoinsfdml";

import mongoose from 'mongoose';
import User from './bd/models/User.js'
import Message from './bd/models/Message.js'

mongoose.connect('mongodb://localhost/UsersDev');

let app = module.exports.app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

let server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(7000);

io.on('connection', (socket) => {
    Message.find((err, data) => {
        socket.emit('connected', {data: data})
    });

    socket.on('message', (data) => {
        if (data.token === token) {
            socket.broadcast.emit('NewMessage', {text: data.text, author: data.author, rank: data.rank})
            socket.emit('NewMessage', {text: data.text, author: data.author, rank: data.rank})

            let {author, text, rank} = data;
            let date = new Date;
            const message = new Message({
                author: author,
                rank: rank,
                text: data.text,
                date: date
            })
            message.save();
        } else {
            socket.emit("WrongToken", {message: "Error"})
            console.log("WrongToken");
        }
    })
    socket.on("TokenCheck", (data) => {
        if (data.token === token) {

        } else {
            socket.emit("WrongToken", {message: "Error"})
            console.log("WrongToken");
        }
    })

})

const CreateUser = (data) => {
    return new Promise((resolve, reject) => {
        let {login, password} = data;
        const user = new User({
            login: login,
            password: password,
            rank: "Player"
        })
        User.findOne({login}, (err, data) => {
            if (data === null) {
                user.save();
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

app.post('/signIn', (req, res) => {
    console.log("SignIn");
    let body = req.body;
    const {login, password} = body;
    User.findOne({login}, (err, data) => {
        if (data === null) {
            res.send({status: 500})
            res.end();
            console.log("User not found");
        } else {
            if (data.password === password) {
                console.log("User found, password is TRUE!");
                res.send({status: 200, token: token, rank: data.rank})
                res.end();
            } else {
                res.send({status: 300})
                res.end();
                console.log("User found, password is FALSE!");
            }

        }
    })
})
app.post('/signUp', (req, res) => {
    let body = req.body;
    const {login, password, password2} = body;
    CreateUser(body)
        .then((isCreated) => {
            if (isCreated) {
                console.log("Created new user");
                res.send({status: 200, token: token});
                res.end();
            } else {
                console.log("Error with creation new user");
                res.send({status: 500});
                res.end();
            }
        })
})
