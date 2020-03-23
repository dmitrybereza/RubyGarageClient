import React, { Component } from 'react'
import Project from './Project'

var parent
export default class ToDoList extends Component {
    constructor(props){
        super(props)

        parent = props.parent
    }
    render() {
        return (
            <div>
               <Projects Projects = {localStorage.getItem('projects')}/>
            </div>
        )
    }
}

function Projects(props){
    const projects = JSON.parse(props.Projects)
    var out = []
    for(var project in projects){
        out[project] = <ProjectFun url={projects[project].url} key={projects[project].url} Name = {projects[project].name} Tasks={projects[project].tasks}/>
    }
    return out
}

function ProjectFun(props){

    return <Project url = {props.url} parent = {parent} Name ={props.Name} Tasks={props.Tasks}/>
}