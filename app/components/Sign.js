import React, { Component } from "react";
    const NewErr = (text) => {
        $('.errTab').html(text);
        $('.errTab').animate({opacity: "1"}, 200, () => {
            setTimeout(() => {
                $('.errTab').animate({opacity: "0"}, 200)
            }, 2000);
        });
    }
export default class Sign extends Component {

    SignIn() {
        const data = {
            login: document.getElementById('login_in').value,
            password: document.getElementById('password_in').value
        }

        if (data.password.length >= 6) {
            fetch("/signIn", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
                })
            .then((res) => {
               return res.json();
             })
              .then((json) => {
                    switch (json.status) {
                        case 500:
                            NewErr('Пользователь не найден');
                            break;


                        case 300:
                            NewErr("Неправильный пароль");
                            break;


                        case 200:

                            localStorage.setItem("token", json.token);
                            localStorage.setItem("nickname", data.login);
                            localStorage.setItem("rank", data.rank);
                            location.reload();
                            break;

                        default:

                    }

                })
              .catch((err) => {
                  console.log(err);
              })
        } else {
            NewErr("Минимальная длина пароля - 6 символов!")
        }

    }

    SignUp() {
        const data = {
            login: document.getElementById('login_up').value,
            password: document.getElementById('password_up').value,
            password2: document.getElementById('password_up2').value,
        }

        if (data.login.length >= 2 && data.password === data.password2 && data.password.length >= 6 && data.password2.length >= 6) {
            fetch("/signUp", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
                })
            .then((res) => {
               return res.json();
             })
              .then((json) => {

                    if (json.status === 200) {
                        localStorage.setItem("token", json.token);
                        localStorage.setItem("nickname", data.login);
                        location.reload();
                    }
                    else {
                        NewErr('Никнейм уже занят!')
                    }

                })
              .catch((err) => {
                  NewErr('Упс. Возникла ошибка.')
              })
        } else {
            NewErr("Проверьте данные. Минимальная длина пароля - 6 символов")
        }

    }
    GoSignUp() {
        this.setState({
            mode: "signUp"
        });
    }
    constructor() {
        super()
        this.state = {
            mode: "signIn"
        }
    }
    render() {
        const {mode} = this.state
        if (mode == "signIn") {

            return(
                <div className="SignIn_Overlay">
                    <input type="text" className="input_in focused" id="login_in" />
                    <input type="text" className="input_in focused" id="password_in" />
                    <button className="input_in button_in" onClick={this.SignIn.bind(this)}>Войти</button>
                    <button className="button_in GoSignUp" onClick={this.GoSignUp.bind(this)}>или зарегестрируйтесь</button>

                    <div className="button_in errTab">Some Error</div>
                </div>
            )

        } else {

            return(
                <div className="SignUp_Overlay">
                    <input type="text" className="input_up focused" id="login_up" />
                    <input type="text" className="input_up focused" id="password_up" />
                    <input type="text" className="input_up focused" id="password_up2" />
                    <button className="input_up button_up" onClick={this.SignUp.bind(this)}>Регистрация</button>

                    <div className="button_up errTab">Some Error</div>
                </div>
            )

        }
    }
}
