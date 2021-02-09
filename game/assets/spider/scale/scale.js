var corner1 = document.createElement('div')
corner1.className = "spd_scale_mark_h"
var corner2 = document.createElement('div')
corner2.className = "spd_scale_mark_v"

var spd_infos_text = []

function spdSetScale(params){
    var div = document.getElementById(params.div)
    var tipo = params.type
    var id = params.id
    var restrict = params.restrict

    var extra = params.extra
    if(extra!=undefined&&extra!=null){
        extraFunction = params.funcion
    }

    if(tipo=="move"){
        div.classList.add("spd_move_mark")
        div.setAttribute("onmousedown","spdDownObject(event,this,0,true,"+id+",'"+restrict+"','"+extra+"')")
    }else if(tipo=="resize"){
        div.classList.add("spd_scale_mark")
        div.setAttribute("onmousedown","spdDownObject(event,this,1,false,"+id+",'"+restrict+"','"+extra+"')")
    }else if(tipo=="move-resize"){
        div.classList.add("spd_scale_mark")
        var marco = document.createElement('div')
        marco.className = "spd_scale_marco"
        div.appendChild(marco)
        marco.setAttribute("onmousedown","spdDownObject(event,this.parentNode,1,true,"+id+",'"+restrict+"','"+extra+"')")
    }else if(tipo=="move-scale"){
        div.classList.add("spd_scale_mark")
        var marco = document.createElement('div')
        marco.className = "spd_scale_marco"
        div.appendChild(marco)
        marco.setAttribute("onmousedown","spdDownObject(event,this.parentNode,2,true,"+id+",'"+restrict+"','"+extra+"')")
    }

    if(params.info!=null&&params.info!=undefined){
        spd_infos_text.push(params.info)
        //spd_infos_text[params.id] = params.info
    }else{
        spd_infos_text.push(null)
        //spd_infos_text[params.id] = null
    }
}

var spd_dif_x = 0
var spd_dif_y = 0
var spd_object_move = null
var spd_object_move_before = null
var spd_object_parent = null
var spd_info_text = null

var extraFunction = null
var extra_funcion = "no"

function spdDownObject(event,object,corners,marco,id,restrict,extra){
    //console.log("presionando marco")
    //quitar primero los corners del anterior
    if(corner1.parentNode!=null){
        var padre_corner1 = corner1.parentNode
        padre_corner1.removeChild(corner1)
    }
    if(corner2.parentNode!=null){
        var padre_corner2 = corner2.parentNode
        padre_corner2.removeChild(corner2)
    }
    
    spd_object_move = object
        
    spd_object_parent = object.parentNode
    //spd_object_move.style.zIndex = 10000

    var rect_object = spd_object_move.getBoundingClientRect()

    var posx = event.pageX
    var posy = event.pageY

    spd_dif_x = posx-rect_object.left
    spd_dif_y = posy-rect_object.top

    if(extra!=null&&extra!=undefined){
        extra_funcion = "si"
    }else{
        extra_funcion = "no"
    }

    if(corners==1){
        spdSetCorners(restrict)
        corner1.setAttribute("onmousedown","spdDownCorner1(event,this)");
        corner2.setAttribute("onmousedown","spdDownCorner2(event,this)");
    }else if(corners==2){
        spdSetCorners(restrict)
        corner1.setAttribute("onmousedown","spdDownCorner3(event,this)");
        corner2.setAttribute("onmousedown","spdDownCorner4(event,this)");
    }
    
    if(marco){
        window.addEventListener('mousemove',spdMoveObject,false)
        window.addEventListener('mouseup',spdUpObject,false)
    }

    if(corners==1||corners==2){
        spd_object_move_before = spd_object_move
    }else{
        //si el elemento downeado no tiene corners, se pone esto de before en null para que el proximo objeto seleccionado se le pongan las esquinas
        spd_object_move_before = null
    }

    spd_info_text = spd_infos_text[id]
    /*console.log("---"+id+"---")
    console.log(spd_infos_text)
    console.log(spd_info_text)*/
    if(spd_info_text!=null){
        if(getE(spd_info_text.x)!=null){
            getE(spd_info_text.x).value = Math.round(formatPx(spd_object_move.style.left))
        }
        if(getE(spd_info_text.y)!=null){
            getE(spd_info_text.y).value = Math.round(formatPx(spd_object_move.style.top))
        }
        if(getE(spd_info_text.width)!=null){
            getE(spd_info_text.width).value = Math.round(formatPx(spd_object_move.style.width))
        }
        if(getE(spd_info_text.height)!=null){
            getE(spd_info_text.height).value = Math.round(formatPx(spd_object_move.style.height))
        }
    }
}

function spdMoveObject(event){
    var rect_parent = spd_object_parent.getBoundingClientRect()
    var rect_object = spd_object_move.getBoundingClientRect()
    
    var posx = event.pageX-(rect_parent.left)
    var posy = event.pageY-(rect_parent.top)

    if(spd_object_move!=null){
        var new_x = (posx-spd_dif_x)
        var new_y = (posy-spd_dif_y)
        spd_object_move.style.left = new_x+'px'
        spd_object_move.style.top = new_y+'px'

        if(new_x<0){
            new_x = 0
            spd_object_move.style.left = new_x+'px'
        }
        if((new_x+rect_object.width)>rect_parent.width){
            new_x = (rect_parent.width-rect_object.width)
            spd_object_move.style.left = new_x+'px'
        }

        if(new_y<0){
            new_y = 0
            spd_object_move.style.top = new_y+'px'
        }
        if((new_y+rect_object.height)>rect_parent.height){
            new_y = (rect_parent.height-rect_object.height)
            spd_object_move.style.top = new_y+'px'
            
        }
    }

    //remove this after recycling
    if(spd_info_text!=null){
        getE(spd_info_text.x).value = Math.round(new_x)
        getE(spd_info_text.y).value = Math.round(new_y)
    }
    
    if(extra_funcion=="si"){
        if(extraFunction!=null){
            extraFunction()
        }
    }
}

function spdUpObject(event){
    window.removeEventListener('mousemove',spdMoveObject,false)
    window.removeEventListener('mouseup',spdUpObject,false)   
}

/*************************SET CORNERS*************************/

var spd_corner1_difx = 0
var spd_corner1_dify = 0
var spd_corner1_pw = 0
var spd_corner1_ph = 0

var spd_corner2_difx = 0
var spd_corner2_dify = 0
var spd_corner2_pw = 0
var spd_corner2_ph = 0

function spdSetCorners(restrict){
    if(spd_object_move_before!=null){
        if(corner1.parentNode!=null){
            spd_object_move_before.removeChild(corner1)
        }
        if(corner2.parentNode!=null){
            spd_object_move_before.removeChild(corner2)
        }
    }
    
    corner1.style.visibility = 'visible'
    corner2.style.visibility = 'visible'
    spd_object_move.appendChild(corner1)
    spd_object_move.appendChild(corner2)

    if(restrict=="x"){
        corner2.style.visibility = 'hidden'
    }
    if(restrict=="y"){
        corner1.style.visibility = 'hidden'
    }
}

function spdSetMarco(){
    marco.style.visibility = 'visible'
    spd_object_move.appendChild(marco)
}

function resetCorners(){//esta funcion no sirve pa culo
    if(spd_object_move_before!=null){
        spd_object_move_before.removeChild(corner1)
        spd_object_move_before.removeChild(corner2)
    }
    spd_object_move_before = null
    spd_corner1_difx = 0
    spd_corner1_dify = 0
    spd_corner1_pw = 0
    spd_corner1_ph = 0
    
    spd_corner2_difx = 0
    spd_corner2_dify = 0
    spd_corner2_pw = 0
    spd_corner2_ph = 0

    spd_dif_x = 0
    spd_dif_y = 0
    spd_object_move = null
    spd_object_parent = null
    spd_info_text = null
}

function spdRemoveInfos(limit){
    console.log(spd_infos_text.length)
    spd_infos_text.length = limit
    console.log(spd_infos_text.length)
    spd_info_text = null
}

///////////////////////////////////////

function spdDownCorner1(event,este){
    var padre = spd_object_move
    var rect_padre = padre.getBoundingClientRect()
    spd_corner1_pw = rect_padre.width
    spd_corner1_ph = rect_padre.height
    
    window.addEventListener('mousemove',spdMoveCorner1,false)
    window.addEventListener('mouseup',spdUpCorner1,false)
}
function spdMoveCorner1(event){
    var padre = spd_object_move
    var continer = padre.parentNode
    var rect_padre = padre.getBoundingClientRect()
    var rect_continer = continer.getBoundingClientRect()
    var left = formatPx(padre.style.left)

    var posx = (event.pageX-window.scrollX)-rect_continer.left
    var posy = (event.pageY-window.scrollY)-rect_continer.top
    
    var ancho = posx-formatPx(padre.style.left)
    ancho = Math.round(ancho)
    var percent = (ancho*100)/spd_corner1_pw
    var alto = (spd_corner1_ph*percent)/100
    alto = Math.round(alto)

    padre.style.width = ancho+'px'
    padre.style.height = alto+'px'

    //remove this after recycling
    if(spd_info_text!=null){
        var width_info = getE(spd_info_text.width)
        if(width_info!=null){
            width_info.value = Math.round(ancho)
        }
        var height_info = getE(spd_info_text.height)
        if(height_info!=null){
            height_info.value = Math.round(alto)
        }
    }
    
}
function spdUpCorner1(event){
    window.removeEventListener('mousemove',spdMoveCorner1,false)
    window.removeEventListener('mouseup',spdUpCorner1,false)
}

/////////////////////////////////////////

function spdDownCorner2(event){
    var padre = spd_object_move
    var rect_padre = padre.getBoundingClientRect()
    spd_corner2_pw = rect_padre.width
    spd_corner2_ph = rect_padre.height
        
    window.addEventListener('mousemove',spdMoveCorner2,false)
    window.addEventListener('mouseup',spdUpCorner2,false)
}
function spdMoveCorner2(event){
    var padre = spd_object_move
    var continer = padre.parentNode
    var rect_padre = padre.getBoundingClientRect()
    var rect_continer = continer.getBoundingClientRect()
    var top = formatPx(padre.style.top)

    var posx = (event.pageX-window.scrollX)-rect_continer.left
    var posy = (event.pageY-window.scrollY)-rect_continer.top
    
    var alto = posy-formatPx(padre.style.top)
    alto = Math.round(alto)
    var percent = (alto*100)/spd_corner2_ph
    var ancho = (spd_corner2_pw*percent)/100
    ancho = Math.round(ancho)

    padre.style.width = ancho+'px'
    padre.style.height = alto+'px'

    //remove this after recycling
    var width_info = getE(spd_info_text.width)
    if(width_info!=null){
        width_info.value = Math.round(ancho)
    }
    var height_info = getE(spd_info_text.height)
    if(height_info!=null){
        height_info.value = Math.round(alto)
    }
}
function spdUpCorner2(event){
    window.removeEventListener('mousemove',spdMoveCorner2,false)
    window.removeEventListener('mouseup',spdUpCorner2,false)
}

/////////////////////////////////////////

function spdDownCorner3(event){
    var padre = spd_object_move
    var rect_padre = padre.getBoundingClientRect()
            
    window.addEventListener('mousemove',spdMoveCorner3,false)
    window.addEventListener('mouseup',spdUpCorner3,false)
}
function spdMoveCorner3(event){
    var padre = spd_object_move
    var continer = padre.parentNode
    var rect_padre = padre.getBoundingClientRect()
    var rect_continer = continer.getBoundingClientRect()
    var left = formatPx(padre.style.left)

    var posx = (event.pageX-window.scrollX)-rect_continer.left
    var posy = (event.pageY-window.scrollY)-rect_continer.top
    
    var ancho = posx-formatPx(padre.style.left)
    ancho = Math.round(ancho)
    
    padre.style.width = ancho+'px'
    
    //remove this after recycling
    if(spd_info_text!=null){
        var width_info = getE(spd_info_text.width)
        if(width_info!=null){
            width_info.value = Math.round(ancho)
        }
    }
}
function spdUpCorner3(event){
    window.removeEventListener('mousemove',spdMoveCorner3,false)
    window.removeEventListener('mouseup',spdUpCorner3,false)
}

/////////////////////////////////////////

function spdDownCorner4(event){
    var padre = spd_object_move
    var rect_padre = padre.getBoundingClientRect()
        
    window.addEventListener('mousemove',spdMoveCorner4,false)
    window.addEventListener('mouseup',spdUpCorner4,false)
}
function spdMoveCorner4(event){
    var padre = spd_object_move
    var continer = padre.parentNode
    var rect_padre = padre.getBoundingClientRect()
    var rect_continer = continer.getBoundingClientRect()
    var top = formatPx(padre.style.top)

    var posx = (event.pageX-window.scrollX)-rect_continer.left
    var posy = (event.pageY-window.scrollY)-rect_continer.top
    
    var alto = posy-formatPx(padre.style.top)
    alto = Math.round(alto)
    
    padre.style.height = alto+'px'

    //remove this after recycling
    if(spd_info_text!=null){
        var height_info = getE(spd_info_text.height)
        if(height_info!=null){
            height_info.value = Math.round(alto)
        }
    }
}
function spdUpCorner4(event){
    window.removeEventListener('mousemove',spdMoveCorner4,false)
    window.removeEventListener('mouseup',spdUpCorner4,false)
}

///////////////////////////////

