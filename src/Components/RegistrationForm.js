import React, { Component } from 'react'
import {setCookie} from '../Connection/setCookie.js'
import {sendRequest} from '../Connection/sendRequest.js'

var parent
export default class RegistrationForm extends Component {
    constructor(props){
        super(props)
        parent = props.parent
    }
    render() {
        return (
            <div className="RegistrationForm">
                <div className="RegistrationFormName">
                    <h1>Регистрация</h1>
                </div>
                <div className="RegistrationFormForm">
                    <input id="login" placeholder="Введите логин"></input>
                    <input type="password" id="password" placeholder="Введите пароль"></input>
                    <input type="password" id="repeatPassword" placeholder = "Повторите пароль"></input>
                    <button onClick={confirmRegistration}>Зарегистрироваться</button>
                </div>
            </div>
        )
    }
}

const token = '492377c179fbd7816a1d153f2fd165f2d4926a97'

function confirmRegistration(){

    const login = document.getElementById("login")
    const password = document.getElementById("password")
    const repeatPassword = document.getElementById("repeatPassword")
    
    if(login.value.length === 0 || password.value.length === 0 || repeatPassword.value.length === 0){
        alert("Заполните все поля!")
        login.value = ''
        password.value = ''
        repeatPassword.value = ''
    }
    else{
        setCookie('token', token)
        if(checkPassword()){
            checkLogin(login.value, password.value)
        .then( value => {
            const login = document.getElementById("login")
            const password = document.getElementById("password")
            setCookie('isLogined', 'true')
            getToken(login.value, password.value)
            .then(token =>{
                setCookie('token', token.token)
                parent.setState({logined: true})
            })
        })
        .catch( () => {
            alert("Пользователь уже существует!")
            login.value = ''
            password.value = ''
            repeatPassword.value = ''
        })
        }
    }
}

export function getToken(_login, _password){
    return new Promise((resolve, reject) => {
        sendRequest('POST', 'https://dmitrybereza.pythonanywhere.com/api/token', {
            'username' : document.getElementById("login").value,
            'password' : document.getElementById("password").value
        })
        .then(good => resolve(good))
        .catch(err => reject(err))
    })
}

function checkLogin(_login, _password){
    return new Promise((resolve, reject) => {
        sendRequest('POST', 'https://dmitrybereza.pythonanywhere.com/api/users/', {
            'username' : document.getElementById("login").value,
            'password' : document.getElementById("password").value
        })
        .then(good => resolve(good))
        .catch(err => reject(err))
    })
}


function checkPassword(){
    if(document.getElementById("password").value.length < 4){
        alert("Пароль должен содержать 4 и более символов")
        document.getElementById("password").value = ''
        document.getElementById("repeatPassword").value = ''
        return false
    }
    else{
        if(document.getElementById("password").value !== document.getElementById("repeatPassword").value){
            alert("Пароли не совпадают!")
            document.getElementById("password").value = ''
            document.getElementById("repeatPassword").value = ''
            return false
        }
        return true
    }
}
