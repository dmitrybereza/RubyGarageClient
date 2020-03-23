import React, { Component } from 'react'
import './/ComponentsStyle/LoginPage.css'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm.js'

export default class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {isRegistered: true}
        this.parent = props.parent
        this.notRegistered = this.notRegistered.bind(this)
        this.Registered = this.Registered.bind(this)
    }

    notRegistered(){
       this.setState({isRegistered: false})
    }

    Registered(){
        this.setState({isRegistered: true})
    }

    render() {
        const isRegistered = this.state.isRegistered
        if(isRegistered){
            return (
                <>
                    <LoginForm parent={this.parent}/>
                    <button className="changeForm" onClick={this.notRegistered}>Еще не зарегистрированы?</button>
                </>
            )
        }
        else{
            return(
                <>
                    <RegistrationForm parent={this.parent}/>
                    <button className="changeForm" onClick={this.Registered}>Уже есть аккаунт?</button>
                </>
            ) 
        }
    }
}