import React, { Component } from 'react'
import './App.css'
import Header from './Components/Header.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './Components/LoginPage'
import ToDoList from './Components/ToDoList'
import {sendRequest} from './Connection/sendRequest.js'

export default class App extends Component {
  constructor(){
    super()
    this.state = {loaded: false, logined: false}
    localStorage.setItem('isLoaded', 'false')
  }

  render() {
    if(this.state.logined === true){
      return (
        <div onLoad ={LoadProjects(this)}>
          <Header parent={this}/>
          <div className="App">
            <ToDoList parent = {this}/>
          </div>
        </div>
      )
    }
    else{   
      return (
        <>
        <LoginPage parent ={this}/>
        </>
      )
    }
  }
}

export function LoadProjects(object){
  if(localStorage.getItem('isLoaded') !== 'true'){
    sendRequest('GET', 'https://dmitrybereza.pythonanywhere.com/api/projects')
    .then(data => {
      localStorage.setItem('projects', JSON.stringify(data))
      object.setState({loaded: true})
      localStorage.setItem('isLoaded', 'true')   
    })
  }
}

export function getCookie(name){
  let user = document.cookie.match(new RegExp(
     // eslint-disable-next-line
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  
  return user ? decodeURIComponent(user[1]) : undefined
}