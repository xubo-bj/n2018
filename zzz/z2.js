let exec= function(arg){

    if(typeof arg == "string"){

    }
    if(typeof arg == "function"){
        arg(exec,getState)
    }

}