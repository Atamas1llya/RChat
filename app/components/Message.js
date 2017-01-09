import React, { Component } from "react";
export default class Header extends Component {
    render() {
        return(
            <div className="message">
                <div className="nickname">[{this.props.rank}]  {this.props.nickname}:</div>
                <div className="message-text">{this.props.text}</div>
            </div>
        )
    }
}
