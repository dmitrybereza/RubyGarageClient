import {getCookie} from '../App.js'

export function sendRequest(method, url, body = null){

    return new Promise((resolve, reject) =>{
        var xhr = new XMLHttpRequest()
        xhr.open(method, url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization' , 'Token ' + getCookie('token'))
        xhr.onload = () =>{
            if(xhr.status >=400){
                reject(xhr.response)
            }else{     
                resolve(xhr.response)
            }
        }
        xhr.onerror = () =>{
            reject(xhr.response)
        }
        xhr.send(JSON.stringify(body));
    })
}