function Empty(value){
    var arr = value.split("")
    var repe = 0
    for(var ii = 0;ii<arr.length;ii++){
        if(arr[ii]==" "){
            repe++
        }
    }
    if(repe==arr.length||arr.length==0){
        return true
    }else{
        return false
    }
    
}
function ifNumber(value){
    var arr = value.split("")
    var repe = 0
    for(var ii = 0;ii<arr.length;ii++){
        if(
            arr[ii]!=1&&
            arr[ii]!=2&&
            arr[ii]!=3&&
            arr[ii]!=4&&
            arr[ii]!=5&&
            arr[ii]!=6&&
            arr[ii]!=7&&
            arr[ii]!=8&&
            arr[ii]!=9&&
            arr[ii]!=0
        ){
            repe++
        }
    }
    if(repe>0){
        return false
    }else{
        return true
    }
}