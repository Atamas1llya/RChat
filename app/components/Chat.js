import React, { Component } from "react"
import Message from './Message.js';

let isLocked = false;
let nickname = window.localStorage.getItem("nickname"), rank = "Player";
let socket = io('http://crowley.goodteamdev.ru:7000/');

export default class Chat extends Component {
    constructor() {
        super()
        this.state = {
            MESSAGES: [

            ]
        }
    }
    componentDidMount() {
        $('.messages-box').niceScroll();
        document.onkeyup = () => {
            if (event.key == "Enter") {
                console.log("KEYUP");
                this.sendMessage();
            }
        }
        $(".text-input").keyup(function() {
            if (this.value.length > 70) {
                this.value = this.value.substr(0, 70);
            }
        });
        socket.emit("TokenCheck", {token: window.localStorage.getItem("token")})
        socket.on('connected', (data) => {
            for (var i = 0; i < data.data.length; i++) {
                this.state.MESSAGES.push(data.data[i]);
            }
            setTimeout(() => {
                document.getElementsByClassName('messages-box')[0].scrollTop = document.getElementsByClassName('messages-box')[0].scrollHeight;
            }, 1000);
            this.setState({});
        })
        socket.on('NewMessage', (data) => {
            this.state.MESSAGES.push(data);
            this.setState({});
            document.getElementsByClassName('messages-box')[0].scrollTop = document.getElementsByClassName('messages-box')[0].scrollHeight;
        })
        socket.on("WrongToken", (data) => {
            localStorage.removeItem("token");
            location.reload();
        })
    }
    sendMessage() {
        if (!isLocked) {
            isLocked = true;
            setTimeout(() => {
                isLocked = false;
            }, 2000);
            let text = document.getElementsByClassName('text-input')[0].value;
            text = text.substr(0, 70);

            if (text) {
                let leaveExp = 	new RegExp('/leave')
                let hits = text.match(leaveExp);
                if (hits) {
                    window.localStorage.removeItem("token");
                    location.reload();
                } else {
                    socket.emit('message', {text: text, author: nickname, rank: rank, token: window.localStorage.getItem("token")});
                    $('#text-input').val("");
                }
            }
        } else {

        }
    }
    render() {
        return(
            <div className="chatBox">
                <div className='messages-box'>
                    <div className='messages-scroll'>
                        {
                            this.state.MESSAGES.map((elem) => {
                                return <Message rank={elem.rank} nickname={elem.author} text={elem.text} />;
                            })
                        }
                    </div>
                </div>
                <div className='text-panel'>
                    <input maxlength="5" type="text" className="text-input" id="text-input" placeholder="Напишите сообщение..." />
                    <button className="text-submit" id="text" onClick={this.sendMessage.bind(this)}></button>
                </div>
            </div>
        )
    }
}
