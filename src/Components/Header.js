import React, { Component } from 'react'
import './ComponentsStyle/Header.css'
import {Navbar , Container, Button} from 'react-bootstrap'
import './/ComponentsStyle/Header.css'
import {setCookie} from '../Connection/setCookie.js'
import swal from 'sweetalert';
import { sendRequest } from '../Connection/sendRequest'
import { LoadProjects } from '../App'


var parent 
export default class Header extends Component {
    constructor(props){
        super(props)
        parent = props.parent
    }
    render() {
        return (
            <>
            <Navbar fixedtop="true" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>
                    <i className="fas fa-list-alt"></i>
                    RubyGarage ToDo List
                </Navbar.Brand>
                <div className="headerButtons">
                    <Button inline = "true" variant="light" onClick={addtodo}><i className="fas fa-plus"></i>Add TODO</Button>
                    <Button inline = "true" variant="light" onClick={exit}>Exit</Button>
                </div>
                </Container>
            </Navbar>
            </>
        );
    }
}

function exit(){
    setCookie('token', '',{
       'max-age': -1
    })
    localStorage.clear()
    setCookie('isLogined', 'false')
    parent.setState({logined: false})
    
}

function addtodo(){
    swal({
        text: "Введите название списка задач",
        content: "input",
       button: {
        text: "ОК",
        closeModal: true,
      }
    })
    .then(text => {
        if(!text){
            swal.close();
        }
        else{
            sendNewProject(text)
        }
    })
}

function sendNewProject(text){
    sendRequest('POST', 'https://dmitrybereza.pythonanywhere.com/api/projects/',{
        'name' : text
    })
    .then(()=>{
        swal({
            title: "Проект был добавлен",
            icon: "success"
        })
        localStorage.setItem('isLoaded', 'false')
        LoadProjects(parent)
    })
}