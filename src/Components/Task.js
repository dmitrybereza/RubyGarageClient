import React, { Component } from 'react'
import './ComponentsStyle/Task.css'
import { sendRequest } from '../Connection/sendRequest'
import swal from 'sweetalert';
import { LoadProjects } from '../App'

export default class Task extends Component {
    constructor(props){
        super(props)
        this.Text = props.Text
        this.state = {isDone: props.isDone, isLoaded: false}
        this.isDoneFun = this.isDoneFun.bind(this)
        this.editTask = this.editTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.Project = props.Project
        this.Url = props.url
        this.parent = props.parent
        this.deadline = props.deadline
        if(this.deadline !== null){
            this.Text = this.Text + ' до ' + this.deadline
        }
    }

    moveUp(){
        let url = this.Project.Url + 'move_task/'
        sendRequest('POST', url, {
            'index' : this.props.index,
            'up' : true
        })
        .then(value =>{
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(this.parent)
        })
    }

    moveDown(){
        let url = this.Project.Url + 'move_task/'
        sendRequest('POST', url, {
            'index' : this.props.index,
            'up' : false
        })
        .then(value =>{
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(this.parent)
        })
    }

    editTask(){
        swal({
            text: "Введите новый текст для задачи",
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
                sendRequest('PATCH', this.Url, {
                    'text' : text
                })
                .then(value =>{
                  this.Text = value.text
                  if(this.deadline !== null){
                        this.Text = this.Text + ' до ' + this.deadline
                    }
                  localStorage.setItem('isLoaded', 'false')
                  LoadProjects(this.parent)  
                  swal({
                        title: "Задание изменено!",
                        icon: "success"
                    })
                })
            }
        })  
    }

    deleteTask(){
        sendRequest('DELETE', this.Url)
        .then(() =>{
          sendRequest('GET', this.Project.Url)
          .then(value =>{
            this.Project.Tasks = value.tasks
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(this.parent)  
            swal({
                  title: "Задание удалено!",
                  icon: "success"
            })
          })
        })
    }

    isDoneFun(){
        sendRequest('PATCH', this.Url, {
            'text' : this.Text,
            'is_done' : true
        })
        .then(() => {
            this.setState({isDone: true})
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(this.parent)  
            swal({
                  title: "Задание сделано!",
                  icon: "success"
            })
        })
    }

    render() {
        let isDone = this.state.isDone
        if(isDone){
            return (
                <div className="Task">
                    <div className="TaskWrap">
                        <div className="TaskText">
                            <p className="doneStatus">Done</p>
                            <p>{this.Text}</p>
                        </div>
                        <div className="TaskButtons">
                            <i onClick={this.moveUp} className="fas fa-sort-up"></i>
                            <i onClick={this.moveDown} className="fas fa-sort-down"></i>
                            <i onClick={this.editTask} className="far fa-edit"></i>
                            <i onClick={this.deleteTask} className="far fa-trash-alt"></i>
                        </div>
                    </div>
                    <hr className="TaskHr"/>
                </div>
            )
        }
        else{
            return (
                <div className="Task">
                    <div className="TaskWrap">
                        <div className="TaskText">
                            <input type="checkbox" onClick={this.isDoneFun}></input>
                            <p>{this.Text}</p> 
                        </div>
                        <div className="TaskButtons">
                            <i onClick={this.moveUp} className="fas fa-sort-up"></i>
                            <i onClick={this.moveDown} className="fas fa-sort-down"></i>
                            <i onClick={this.editTask} className="far fa-edit"></i>
                            <i onClick={this.deleteTask} className="far fa-trash-alt"></i>
                        </div>
                    </div>
                    <hr className="TaskHr"/>
                </div>
            )
        }
    }
}
