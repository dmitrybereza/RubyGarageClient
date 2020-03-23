import React, { Component } from 'react'
import Task from './Task'
import './ComponentsStyle/Project.css'
import { sendRequest } from '../Connection/sendRequest'
import { LoadProjects } from '../App'
import swal from '@sweetalert/with-react'

export default class Project extends Component {
    constructor(props){
        super(props)

        this.Name = props.Name
        this.Url = props.url
        this.state = {isLoaded: false}
        this.parent = props.parent 
        this.deleteProject = this.deleteProject.bind(this)
        this.editProject = this.editProject.bind(this)
        this.addTask = this.addTask.bind(this)
        this.customTask = this.customTask.bind(this)
        this.inputId = 'newTaskInput' + this.Name
    }

    customTask(){
        swal(
            <div className="swal">
              <p>Введите текст новой задачи</p>
              <input id="swalInput"></input>
              <p>Задайте дедлайн для задачи</p>
              <input id="swalDate" type="date"></input>
            </div>,
            {
                title: 'Создание новой задачи'
            }
        )
        .then(()=>{
            console.log()
            if(Boolean(document.getElementById('swalInput').value) === true){
                if(Boolean(document.getElementById('swalDate').value) === true){
                    let url = this.Url + 'create_task/'
                    sendRequest('POST', url, {
                        'text' : document.getElementById('swalInput').value,
                        'deadline' : document.getElementById('swalDate').value
                    })
                    .then(value =>{
                        localStorage.setItem('isLoaded', 'false')
                        LoadProjects(this.parent)
                        document.getElementById(this.inputId).value = ''
                        swal({
                            title: "Задание добавлено!",
                            icon: "success"
                        })
                    })
                }
                else{
                    alert('Заполните дедлайн!')
                }   
            }
            else{
                alert('Заполните текст задачи!')
            }
        })      
    }

    addTask(){
        let taskText = document.getElementById(this.inputId).value
        if(!taskText){
            alert("Введите текст задания!")
        }
        else{
            let url = this.Url + 'create_task/'
            sendRequest('POST', url,{
                'text' : taskText
            })
            .then(value =>{
                localStorage.setItem('isLoaded', 'false')
                LoadProjects(this.parent)
                document.getElementById(this.inputId).value = ''
                swal({
                    title: "Задание добавлено!",
                    icon: "success"
                })
            })
            .catch(() => {
                swal({
                    title: "Что-то пошло не так!",
                    icon: "error"
                })
            })
        }
    }

    editProject(){
        swal({
            text: "Введите новое имя списка задач",
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
                sendRequest('PUT', this.Url, {
                    'name' : text 
                })
                .then(data=>{
                    this.Name = data.name
                    localStorage.setItem('isLoaded', 'false')
                    LoadProjects(this.parent)
                    swal({
                        title: "Проект был изменен",
                        icon: "success"
                    })
                })
            }
        })
    }

    deleteProject(){
        sendRequest('DELETE', this.Url)
        .then(()=>{
            localStorage.setItem('isLoaded', 'false')
            LoadProjects(this.parent)
           
            swal({
                title: "Проект был удален",
                icon: "success"
            })
        })
    }

    render() {
        return (
            <div className="Project">
                <div className="ProjectTitle">
                    {this.Name}
                    <div className="TitleButtons">
                        <i onClick={this.editProject} className="far fa-edit"></i>
                        <i onClick= {this.deleteProject} className="far fa-trash-alt"></i>
                    </div>
                </div>
                <div className="AddNewTask">
                    <i onClick ={this.customTask} title="Задание с параметрами" className="fas fa-plus AdditionalProps"></i>
                    <input id={this.inputId}  placeholder="Введите новое задание"></input>
                    <button onClick={this.addTask}>Add Task</button>
                </div>
                <div className="ProjectTasks">
                    <Tasks Tasks = {this.props.Tasks} Project ={this}
                    parent = {this.parent}/>
                </div>
            </div>
        )
    }
}



function Tasks(props){
    var out = []
    for(var task in props.Tasks){
       out[task] = <TaskFun key = {props.Tasks[task].url} url = {props.Tasks[task].url}
       Text = {props.Tasks[task].text} isDone = {props.Tasks[task].is_done}
       Project = {props.Project} parent ={props.parent} deadline={props.Tasks[task].deadline}
       index ={task}/>
    }
    return out
}

function TaskFun(props){
    return <Task Text = {props.Text} Project = {props.Project}
     url ={props.url} isDone ={props.isDone}
     parent = {props.parent} deadline = {props.deadline} index={props.index}/>
}
