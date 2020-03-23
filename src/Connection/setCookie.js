export function setCookie(type, value, options = {}){
    options ={
        path: '/'
    }

    if(options.expires instanceof Date){
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = type +'=' + encodeURIComponent(value)

    for(let optionKey in options){
        updatedCookie += '; ' + optionKey
        let optionValue = options[optionKey]
        if(optionValue !== true){
            updatedCookie += '=' + optionValue
        }
    }
    document.cookie = updatedCookie
}