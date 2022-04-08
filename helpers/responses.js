const resOk = (data,nameModel='Record') => {
    let message = 'ok', error = false
    if(data===null) {
        message = `${nameModel} not founded`
        error = true
    }
    if(data instanceof Array){
        if(data.length===0) {
            data=null
            message = 'No records founds'
            error = false
        }
    }
    return {data,message,error}
}

const resError = (error,data=null) => {
    if(error instanceof Array){
        return {data,message:error,error:true}
    }
    let stringError = error.toString()
    return {data,message:stringError,error:true}
}

const resLoing = (token,message='Authorized')=>{
    return {token:token,message,error:false}
}

const responses = {
    resOk,resError,resLoing
}

module.exports = responses