

import React, { Component } from 'react';
import Chat from './components/Chat.js';
import Sign from './components/Sign.js';
// import SignIn from './components/signIn.js';
class App extends Component {

    render() {
        const token = window.localStorage.getItem("token");
        if(token) {

            return (
                <div className="container">
                    <Chat />
                </div>
            )

        } else {

            return (
                <div className="container">
                    <Sign />
                </div>
            )

        }
    }

}

export default App;
