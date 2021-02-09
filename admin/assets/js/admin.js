var i = 0
var j = 0
var k = 0

var _name = 'Quien quiere ser millonario'
var opciones_fv = '<option value="1">Verdadero</option><option value="2">Falso</option>'
var opciones_sm = '<option value="1">A</option><option value="2">B</option><option value="3">C</option><option value="4">D</option>'

function cambiarTipoPregunta(select,pre){
    var pregunta_div = document.getElementById('col_pregunta'+pre)
    var respuestas = pregunta_div.getElementsByClassName('trad_respuestas')[0]
    var select_respuestas = document.getElementById('respuesta'+pre)
    if(select.value==1){
        respuestas.className = 'trad_respuestas trad_respuestas_off'
        select_respuestas.innerHTML = opciones_fv
    }else{
        respuestas.className = 'trad_respuestas trad_respuestas_on'
        select_respuestas.innerHTML = opciones_sm
    }
    updateHeightIframe()
}

function onSwtich(div,callBack){
    var status = div.getAttribute('status')
    var input = div.getElementsByTagName('input')[0]
    if(status=="off"){
        div.className = "trad_switch trad_switch_on"
        div.setAttribute("status","on")
        input.value = "on"
    }else{
        div.className = "trad_switch trad_switch_off"
        div.setAttribute("status","off")
        input.value = "off"
    }
    if(callBack!=null){
        callBack(input.value)
    }
}
function getSwitch(div){
    var doc = document.getElementById(div)
    return doc.getAttribute('status')
}

function setPremioForm(value){
    if(value=="on"){
        millon_switch = 1
    }else{
        millon_switch = 0
    }
    changeRuletaPreview()
}

var actual_respuesta_open = -1
function openRespuesta(title,id){
    var estado = title.getAttribute('status')
    var content = document.getElementById('con_pregunta'+id)
    if(estado=="off"){
        if(actual_respuesta_open!=-1&&actual_respuesta_open!=id){
            var actual_respuesta_open_content = document.getElementById('con_pregunta'+actual_respuesta_open)
            var actual_respuesta_open_title = document.getElementById('title_pregunta'+actual_respuesta_open)
            actual_respuesta_open_content.className = 'trad_col_pregunta_content trad_col_pregunta_content_off'
            actual_respuesta_open_title.setAttribute('status','off')
        }
        actual_respuesta_open = id

        content.className = 'trad_col_pregunta_content trad_col_pregunta_content_on'
        title.setAttribute('status','on')
        updateHeightIframe()
    }else if(estado=="on"){
        content.className = 'trad_col_pregunta_content trad_col_pregunta_content_off'
        title.setAttribute('status','off')

        actual_respuesta_open = -1
        updateHeightIframe()
    }else{
        console.log("locked")
    }
}

var actual_reto_open = -1
function openReto(title,id){
    var estado = title.getAttribute('status')
    var content = document.getElementById('con_reto'+id)
    if(estado=="off"){
        if(actual_reto_open!=-1&&actual_reto_open!=id){
            var actual_reto_open_content = document.getElementById('con_reto'+actual_reto_open)
            var actual_reto_open_title = document.getElementById('title_reto'+actual_reto_open)
            actual_reto_open_content.className = 'trad_col_pregunta_content trad_col_pregunta_content_off'
            actual_reto_open_title.setAttribute('status','off')
        }
        actual_reto_open = id

        content.className = 'trad_col_pregunta_content trad_col_reto_content_on'
        title.setAttribute('status','on')
        updateHeightIframe()
    }else if(estado=="on"){
        content.className = 'trad_col_pregunta_content trad_col_reto_content_off'
        title.setAttribute('status','off')

        actual_reto_open = -1
        updateHeightIframe()
    }else{
        console.log("locked")
    }
}

function changeTotalPreguntas(select){
    total_preguntas_num = parseInt(select.value)
    
    for(k = 1;k<=10;k++){
        var pregunta_cont = document.getElementById('col_pregunta'+k)
        if(k<=total_preguntas_num){
            pregunta_cont.style.display = 'block'
        }else{
            pregunta_cont.style.display = 'none'
        }
    }
    changeRuletaPreview()
}
function changeTotalRetos(select){
    total_retos_num = parseInt(select.value)

    for(k = 1;k<=10;k++){
        var reto_cont = document.getElementById('col_reto'+k)
        if(k<=total_retos_num){
            reto_cont.style.display = 'block'
        }else{
            reto_cont.style.display = 'none'
        }
    }
    changeRuletaPreview()
}

var ruleta_width = 280
var ruleta_height = 280

var casillas = []
var ruleta_gira = document.getElementById('tra_ruleta_gira')

function Angle(grades){
    var pi = Math.PI;
    return grades * (pi/180);
}

function fillCasillas(){
    casillas = []
    var s = 0
    var patron = 0
    var rs = 0
    var ps = 0
    total_partes_num = total_preguntas_num+total_retos_num

    if(total_preguntas_num>total_retos_num){
        patron = parseInt(total_preguntas_num/total_retos_num)
        //alert(patron)
        while(casillas.length<total_partes_num){
            if(s==patron){
                if(rs<total_retos_num){
                    casillas.push(2)
                }else{
                    casillas.push(1)
                }
                rs++
                s = 0
            }else{
                casillas.push(1)
                s++
            }
        }
    }else if(total_preguntas_num<total_retos_num){
        patron = parseInt(total_retos_num/total_preguntas_num)
        //alert(patron)
        while(casillas.length<total_partes_num){
            if(s==patron){
                if(ps<total_preguntas_num){
                    casillas.push(1)
                }else{
                    casillas.push(2)
                }
                ps++
                s = 0
            }else{
                casillas.push(2)
                s++
            }
        }
    }else{
        patron = 1
        while(casillas.length<total_partes_num){
            if(s==patron){
                casillas.push(2)
                s = 0
            }else{
                casillas.push(1)
                s++
            }
        }
    }

    if(millon_switch==1){
        casillas.push(3)
        total_partes_num++
    }    
}

function changeRuletaPreview(){
    fillCasillas()
    clearRuletaPreview()
    
    var center = parseInt(ruleta_width/2)
    var ini_angle = 0
    var radians = (360/total_partes_num)
    var color = 0
    var colors = []
    for(i = 0;i<colores.length;i++){
        if(colores[i]!=null){
            colors.push(colores[i])
        }
    }
    
    for(i = 0;i<total_partes_num;i++){
        var div_parent = document.createElement('div')
        div_parent.className = 'ruleta_div'
        div_parent.style.width = ruleta_width+'px'
        div_parent.style.height = ruleta_height+'px'

        var canvas = document.createElement('canvas')
        canvas.width = ruleta_width
        canvas.height = ruleta_height
        canvas.className = 'ruleta_canv'
        var ctx = canvas.getContext('2d')
        //ctx.rotate(20 * Math.PI / 180);

        ctx.beginPath()
        if(i==(total_partes_num-1)){
            //es el ultimo,
            if(color==0){
                color = 1
            }
        }
        ctx.fillStyle = '#'+colors[color]
        ctx.moveTo(center,center)
        ctx.lineTo(center,center)
        var angle = Angle(radians)
        ctx.arc(center,center,center,ini_angle,angle)
        ctx.closePath()
        ctx.fill()

        div_parent.appendChild(canvas)

        var texto_section = document.createElement('div')
        texto_section.className = 'ruleta_section'
        texto_section.style.width = '50%'
        texto_section.style.height = '20px'
        texto_section.style.top = '50%'
        texto_section.style.top = 'calc(50% - (20px / 2))'
        texto_section.style.top = '-moz-calc(50% - (20px / 2))'
        texto_section.style.left = '50%'

        texto_section.style.perspective = '10px'
        texto_section.style.msPerspective = '10px'
        texto_section.style.mozPerspective = '10px'
        texto_section.style.webkitPerspective = '10px'
        texto_section.style.oPerspective = '10px'

        var texto_p = document.createElement('div')
        texto_p.className = 'ruleta_p'
        texto_p.style.height = '20px'
        texto_p.style.width = '100%'
        texto_p.style.left = '-5%'

        if(casillas[i]==1){
            texto_p.classList.add('ruleta_p_pregunta')
        }else if(casillas[i]==2){
            texto_p.classList.add('ruleta_p_reto')
        }else if(casillas[i]==3){
            texto_p.classList.add('ruleta_p_millon')
        }

        texto_p.style.transform = 'rotateY(-4deg) scale(0.6,1)'
        texto_p.style.msTransform = 'rotateY(-4deg) scale(0.6,1)'
        texto_p.style.mozTransform = 'rotateY(-4deg) scale(0.6,1)'
        texto_p.style.webkitTransform = 'rotateY(-4deg) scale(0.6,1)'
        texto_p.style.oTransform = 'rotateY(-4deg) scale(0.6,1)'

        var girar_texto = (radians/2)
        texto_section.style.transform = 'rotate('+girar_texto+'deg)'
        texto_section.style.msTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.mozTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.webkitTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.oTransform = 'rotate('+girar_texto+'deg)'

        texto_section.appendChild(texto_p)
        div_parent.appendChild(texto_section)

        ruleta_gira.appendChild(div_parent)

        var girar = (radians*i)
        div_parent.style.transform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.msTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.mozTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.webkitTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.oTransform = 'rotate('+(girar-90)+'deg)'

        //canvas_plantillas.push(canvas)
        color++
        if(color==colors.length){
            color = 0
        }
    }
    
}

function clearRuletaPreview(){
    var canvases = ruleta_gira.getElementsByClassName('ruleta_div')
    
    for(i = (canvases.length-1);i>=0;i--){
        ruleta_gira.removeChild(canvases[i])
    }
    ruleta_gira.innerHTML = ""
}

function changeColor(input){
    var color = input.value
    var name = Number(input.getAttribute('name'))
    var color_div = document.getElementById('color'+name+'_color')

    var arr = color.split("")
    if(arr.length==6){
        colores[name] = color
        color_div.style.backgroundColor = '#'+color
        changeRuletaPreview()
    }
}

var colores_content = document.getElementById('colores_content')
function removerColor(btn){
    var colors = 0
    for(i = 0;i<colores.length;i++){
        if(colores[i]!=null){
            colors++
        }
    }

    if(colors==1){
        alert("No se puede eliminar mas")
    }else{
        var name = Number(btn.getAttribute('name'))
        var content = document.getElementById('color'+name+'_content')
        colores_content.removeChild(content)
        colores[name] = null
        changeRuletaPreview()
    }
}

function agregarColor(btn){
    var div = document.createElement('div')
    div.className = 'trad_field'
    div.id = 'color'+colores.length+'_content'
    var html = ""
    html+='<input style="width:200px !important;" type="text" autocomplete="off" maxlength="6" placeholder="FF0000" name="'+colores.length+'" value="FFFFFF" id="color'+colores.length+'" onkeyup="changeColor(this)" />'
    html+='<div class="trad_color_picker" style="background-color:#FFFFFF" name="'+colores.length+'" id="color'+colores.length+'_color" onclick="clickColorPicker(this)"></div>'
    html+='<div class="trad_color_picker_div" name="'+colores.length+'" id="color'+colores.length+'_parent">'
        html+='<canvas width="267" height="169" onmousemove="movePicker(this,event)" onclick="clickPicker()"></canvas>'
    html+='</div>'
    html+='<div class="trad_color_picker_remover" name="'+colores.length+'" id="color'+colores.length+'_boton" onclick="removerColor(this)">Remover</div>'
    div.innerHTML = html
    colores_content.appendChild(div)
    
    var canvas = document.getElementById('color'+colores.length+'_parent').getElementsByTagName('canvas')[0]
    updatePicker(canvas)
    colores.push('FFFFFF')
    changeRuletaPreview()
}

var actual_color = null
var actual_div = null
var back_picker = document.getElementById('trad_back_picker')
function clickColorPicker(div){
    var name = div.getAttribute('name')
    var input = document.getElementById('color'+name)
    var canvas = document.getElementById('color'+name+'_parent')
    var status = div.getAttribute('status')

    if(status=="on"){
        canvas.style.display = 'none'
        div.setAttribute('status','off')
        
        div.style.backgroundColor = '#'+actual_color
        input.value = actual_color
        actual_color = null
        back_picker.style.display = 'none'
    }else{
        canvas.style.display = 'block'
        div.setAttribute('status','on')
        actual_color = input.value
        actual_div = name
        back_picker.style.display = 'block'
    }
}
function quitarPicker(){
    var div = document.getElementById('color'+actual_div+'_color')
    var canvas = document.getElementById('color'+actual_div+'_parent')
    var input = document.getElementById('color'+actual_div)
    canvas.style.display = 'none'
    div.setAttribute('status','off')
    
    div.style.backgroundColor = '#'+actual_color
    input.value = actual_color
    actual_color = null
    back_picker.style.display = 'none'
}

var temp_color = null
function movePicker(canv,event){
    var parent = canv.parentNode
    //var parent_parent = parent.parentNode
    var name = parent.getAttribute('name')
    var rect_canv = canv.getBoundingClientRect()
    var posx = event.pageX-(rect_canv.left+window.scrollX)
    var posy = event.pageY-(rect_canv.top+window.scrollY)

    var c = canv.getContext('2d')
    var p = c.getImageData(posx,posy,1,1).data
    var hex = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    
    var input = document.getElementById('color'+name)
    var div = document.getElementById('color'+name+'_color')
    input.value = hex
    div.style.backgroundColor = '#'+hex
    temp_color = hex
}
function clickPicker(){
    var input = document.getElementById('color'+actual_div)
    var div = document.getElementById('color'+actual_div+'_color')
    input.value = temp_color
    div.style.backgroundColor = '#'+temp_color
    colores[actual_div] = temp_color

    //ocultar
    var canvas = document.getElementById('color'+actual_div+'_parent')
    div.setAttribute('status','off')
    canvas.style.display = 'none'
    back_picker.style.display = 'none'
    changeRuletaPreview()
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


function guardarTodo(){
    var msg = ""
    
    var nombre = document.getElementById('nombre').value
    var final = document.getElementById('final').value
    var final2 = document.getElementById('final2').value
    var premio = getSwitch('premio')
    var vidas = document.getElementById('vidas').value
    var ganar = document.getElementById('ganar').value
    
    if(Empty(nombre)){
        msg = "Escribe un nombre para la actividad de repaso"
    }
    if(Empty(final)){
        msg = "Escribe un mensaje para el final de la actividad de repaso"
    }
    if(Empty(final2)){
        msg = "Escribe un mensaje para el mensaje final cuando el usuario no finalice la actividad de repaso"
    }

    var data_questions = []
    for(k = 1;k<=total_preguntas_num;k++){
        var pregunta_txt = document.getElementById('pregunta'+k).value
        var pregunta_completa = 0
        if(Empty(pregunta_txt)){
            msg = "Escribe la pregunta"
            pregunta_completa++
        }
        //var tipo = document.getElementById('tipo'+k).value
        var tipo = 2
        var correcta = document.getElementById('respuesta'+k).value
        var respuesta_a = document.getElementById('respuestaa'+k).value
        var respuesta_b = document.getElementById('respuestab'+k).value
        var respuesta_c = document.getElementById('respuestac'+k).value
        var respuesta_d = document.getElementById('respuestad'+k).value
        
        if(tipo==1){
            //falso verdadero
        }else if(tipo==2){
            if(
                Empty(respuesta_a)&&
                Empty(respuesta_b)&&
                Empty(respuesta_c)&&
                Empty(respuesta_d)
            ){
                msg = "Debes escribir las 4 respuestas posibles"
                pregunta_completa++
            }
        }
        data_questions.push({
            pregunta:pregunta_txt,
            tipo:tipo,
            correcta:correcta,
            a:respuesta_a,
            b:respuesta_b,
            c:respuesta_c,
            d:respuesta_d,
            completo:pregunta_completa
        })
    }

    var data_retos = []
    for(k = 1;k<=total_retos_num;k++){
        var reto_txt = document.getElementById('reto'+k).value
        var reto_completo = 0
        if(Empty(reto_txt)){
            msg = "Escribe el reto"
            reto_completo++
        }
        
        data_retos.push({
            reto:reto_txt,
            completo:reto_completo
        })
    }
    var data_colors = []
    for(k = 0;k<colores.length;k++){
        if(colores[k]!=null){
            data_colors.push(colores[k])
        }
    }
    
    var data_questions2 = JSON.stringify(data_questions)
    var data_retos2 = JSON.stringify(data_retos)
    var data_colors2 = JSON.stringify(data_colors)

    $.ajax({
        type:'post',
        url:'save.php?action=save_all',
        data:{
            nombre:nombre,
            final:final,
            final2:final2,
            premio:premio,
            vidas:vidas,
            ganar:ganar,
            colores:data_colors2,
            preguntas:data_questions2,
            retos:data_retos2,
            id:global_id,
            curso:global_curso
        },
        success: function(result){
            if(result=="success"){
                if(Empty(msg)){
                    //muestra mensaje bien
                    //ya el modal se quito
                    console.log("igual guarda bien")
                    alert("Guardó bien")
                }else{
                    //no muestra mensaje pero igual guardo
                    console.log("guarda bien pero le faltaron campos")
                    alert("Los datos se guardaron pero hay campos que faltan por llenar")
                }
            }else{
                window.top.postMessage({
                    'w': global_width,
                    'h': global_height,
                    'name': _name,
                    'alerta': true,
                    'completed': completado,
                    'title': 'Error!',
                    'text': 'Ocurrió un error guardando los datos',
                    'icon' : 'error',
                    'button': 'Ok'
                }, '*' );
            }
        },
        error: function(xhr){
            console.log(xhr.responseText)
            window.top.postMessage({
                'w': global_width,
                'h': global_height,
                'name': _name,
                'alerta': true,
                'completed': completado,
                'title': 'Error!',
                'text': 'Ocurrió un error guardando los datos',
                'icon' : 'error',
                'button': 'Ok'
            }, '*' );
        }
    })

    if(Empty(msg)){
        console.log("trueeeee")
        completado = true
        window.top.postMessage({
            'w': global_width,
            'h': global_height,
            'name': _name,
            'alerta': true,
            'completed': true,
            'title': 'Muy bien!',
            'text': 'Los datos de la actividad se han guardado correctamente',
            'icon' : 'success',
            'button': 'Ok'
        }, '*' );
    }else{
        console.log("falta "+msg)
        window.top.postMessage({
            'w': global_width,
            'h': global_height,
            'name': _name,
            'alerta': true,
            'completed': completado,
            'title': 'Recuerda!',
            'text': 'Faltan datos por completar! Puedes terminar en otro momento',
            'icon' : 'warning',
            'button': 'Ok'
        }, '*' );
    }
    
}


function completeDatosBasicos(){
    var msg = ""
    
    var nombre = document.getElementById('nombre').value
    var final = document.getElementById('final').value
    var final2 = document.getElementById('final2').value
    
    if(Empty(nombre)){
        msg = "Escribe un nombre para la actividad de repaso"
    }
    if(Empty(final)){
        msg = "Escribe un mensaje final para ser visualizado una vez el usuario aprueba la actividad"
    }
    if(Empty(final2)){
        msg = "Escribe un mensaje final para ser visualizado cuando el usuario no apruebe la actividad"
    }
    
    if(Empty(msg)){
        return true
    }else{
        return false
    }
}

var animacion_algo = null
var global_height = null
var global_width = 705

function updateHeightIframe(){
    clearTimeout(animacion_algo)
    animacion_algo = null

    animacion_algo = setTimeout(function(){
        clearTimeout(animacion_algo)
        animacion_algo = null

        var alto = document.body.getBoundingClientRect()
        global_height = alto.height
        //console.log(alto.height)
        //window.top.postMessage({'h': alto.height}, '*');
        window.top.postMessage({
            'w': global_width,
            'h': global_height,
            'name': _name,
            'alerta': false,
            'completed': completado,
            'title': '',
            'text': '',
            'icon' : '',
            'button': ''
        }, '*' );
    },300)

}
updateHeightIframe()

function checkComplete(campo){
    var msg = ""
    var pregunta_txt = document.getElementById('pregunta'+campo).value
    var pregunta_completa = 0
    if(Empty(pregunta_txt)){
        msg = "Escribe la pregunta"
        pregunta_completa++
    }
    var tipo = 2
    var correcta = document.getElementById('respuesta'+campo).value
    var respuesta_a = document.getElementById('respuestaa'+campo).value
    var respuesta_b = document.getElementById('respuestab'+campo).value
    var respuesta_c = document.getElementById('respuestac'+campo).value
    var respuesta_d = document.getElementById('respuestad'+campo).value
    
    if(tipo==1){
        //falso verdadero
    }else if(tipo==2){
        if(
            Empty(respuesta_a)&&
            Empty(respuesta_b)&&
            Empty(respuesta_c)&&
            Empty(respuesta_d)
        ){
            msg = "Debes escribir todas las respuestas"
            pregunta_completa++
        }
    }

    var div_title = document.getElementById('title_pregunta'+campo)

    if(pregunta_completa==0){
        div_title.className = 'trad_col_pregunta_title trad_col_pregunta_title_complete'
        //return true
    }else{
        div_title.className = 'trad_col_pregunta_title trad_col_pregunta_title_incomplete'
        //return false
    }
}

function checkComplete2(campo){
    var msg = ""
    var reto_txt = document.getElementById('reto'+campo).value
    var pregunta_completa = 0
    if(Empty(reto_txt)){
        msg = "Escribe el reto"
        pregunta_completa++
    }
    
    var div_title = document.getElementById('title_reto'+campo)

    if(pregunta_completa==0){
        div_title.className = 'trad_col_pregunta_title trad_col_pregunta_title_complete'
        //return true
    }else{
        div_title.className = 'trad_col_pregunta_title trad_col_pregunta_title_incomplete'
        //return false
    }
}