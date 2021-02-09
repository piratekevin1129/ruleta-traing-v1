var i = 0
var j = 0
var k = 0

var game_width = 845
var game_height = 507
//tamaño del canvas, el marco es otro cuento
var ruleta_width = 400
var ruleta_height = 400
var tope_modal = 500
var total_confeti = 300
var casillas_data = []

var claves = [0,'Pregunta','Reto']
var score = 0

function Angle(grades){
  var pi = Math.PI;
  return grades * (pi/180);
}

var contenedor = document.getElementById('tra_contenedor')
var ruleta_gira = document.getElementById('tra_ruleta_gira')

var actual_dimension = 1
function prepareWindow(){
    if(window.innerWidth>=845){
        casillas_data = casillas_data_1

        actual_dimension = 1
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else if(window.innerWidth>=710&&window.innerWidth<845){
        casillas_data = casillas_data_2
        game_width = 710
        game_height = 426
        ruleta_width = 330
        ruleta_height = 330
        tope_modal = 410
        
        actual_dimension = 2
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else if(window.innerWidth>=530&&window.innerWidth<710){
        casillas_data = casillas_data_2
        game_width = 530
        game_height = 318
        ruleta_width = 270
        ruleta_height = 270
        tope_modal = 300

        actual_dimension = 3
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }else{
        casillas_data = casillas_data_3
        game_width = window.innerWidth
        game_height = 500
        ruleta_width = 270
        ruleta_height = 270
        tope_modal = 490
        
        actual_dimension = 4
        window.top.postMessage({'completado': false, 'alto': game_height}, '*' );
    }
    //alert(actual_dimension)
}

function initGame(){
    contenedor.style.width = game_width+'px'
    contenedor.style.height = game_height+'px'
    ruleta_gira.style.width = ruleta_width+'px'
    ruleta_gira.style.height = ruleta_height+'px'
    ruleta_gira.style.left = '50%'
    ruleta_gira.style.left = 'calc(50% - '+(ruleta_width/2)+'px)'
    ruleta_gira.style.left = '-moz-calc(50% - '+(ruleta_width/2)+'px)'
    ruleta_gira.style.top = '50%'
    ruleta_gira.style.top = 'calc(50% - '+(ruleta_height/2)+'px)'
    ruleta_gira.style.top = '-moz-calc(50% - '+(ruleta_height/2)+'px)'

    partirRuleta()
    setAnimationLeds(5000)
    animacionScore(1000)
    vidas_txt.innerHTML = vidas
    cargador.className = 'cargador_off'
    //setConfetti()
}

var rangos = []

function fillCasillas(){
    casillas = []
    var s = 0
    var patron = 0
    var rs = 0
    var ps = 0
    total_partes = total_preguntas+total_retos

    if(total_preguntas>total_retos){
        patron = parseInt(total_preguntas/total_retos)
        //alert(patron)
        while(casillas.length<total_partes){
            if(s==patron){
                if(rs<total_retos){
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
    }else if(total_preguntas<total_retos){
        patron = parseInt(total_retos/total_preguntas)
        //alert(patron)
        while(casillas.length<total_partes){
            if(s==patron){
                if(ps<total_preguntas){
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
        while(casillas.length<total_partes){
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
        total_partes++
    }    
}

function partirRuleta(){
    fillCasillas()
    var center = parseInt(ruleta_width/2)
    var ini_angle = 0
    var radians = (360/total_partes)
    var color = 0
    
    var canvas_plantillas = []//no sirve para nada
    var ini_rango = 0

    for(i = 0;i<total_partes;i++){
    //for(i = 0;i<1;i++){
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
        if(i==(total_partes-1)){
            //es el ultimo,
            if(color==0){
                color = 1
            }
        }
        ctx.fillStyle = '#'+colores[color]
        ctx.moveTo(center,center)
        ctx.lineTo(center,center)
        var angle = Angle(radians)
        ctx.arc(center,center,center,ini_angle,angle)
        ctx.closePath()
        ctx.fill()

        rangos.push({
            ini:ini_rango,
            fin:(radians*(i+1))
        })
        ini_rango+=radians

        var casilla_data = null
        if(casillas[i]==2){
            casilla_data = casillas_data[total_partes].reto
        }else{
            casilla_data = casillas_data[total_partes].pregunta
        }

        var texto_section = document.createElement('div')
        texto_section.className = 'ruleta_section'
        texto_section.style.width = '50%'
        texto_section.style.height = casilla_data.alto+'px'
        texto_section.style.top = '50%'
        texto_section.style.top = 'calc(50% - ('+casilla_data.alto+'px / 2))'
        texto_section.style.top = '-moz-calc(50% - ('+casilla_data.alto+'px / 2))'
        texto_section.style.left = '50%'

        texto_section.style.perspective = casilla_data.perspective+'px'
        texto_section.style.msPerspective = casilla_data.perspective+'px'
        texto_section.style.mozPerspective = casilla_data.perspective+'px'
        texto_section.style.webkitPerspective = casilla_data.perspective+'px'
        texto_section.style.oPerspective = casilla_data.perspective+'px'

        var texto_p = document.createElement('div')
        texto_p.className = 'ruleta_p'
        texto_p.style.height = casilla_data.alto+'px'
        texto_p.style.width = casilla_data.ancho+'%'
        texto_p.style.left = casilla_data.left+'%'

        if(casillas[i]==1){
            texto_p.classList.add('ruleta_p_pregunta')
        }else if(casillas[i]==2){
            texto_p.classList.add('ruleta_p_reto')
        }else if(casillas[i]==3){
            texto_p.classList.add('ruleta_p_millon')
        }

        /*var font_size = (radians*2)
        texto_p.style.fontSize = font_size+'px'
        texto_p.style.lineHeight = (radians*2)+'px'
        //texto_p.innerHTML = claves[casillas[i]]*/

        texto_p.style.transform = 'rotateY('+casilla_data.rotateY+'deg) scale('+casilla_data.scaleX+',1)'
        texto_p.style.msTransform = 'rotateY('+casilla_data.rotateY+'deg) scale('+casilla_data.scaleX+',1)'
        texto_p.style.mozTransform = 'rotateY('+casilla_data.rotateY+'deg) scale('+casilla_data.scaleX+',1)'
        texto_p.style.webkitTransform = 'rotateY('+casilla_data.rotateY+'deg) scale('+casilla_data.scaleX+',1)'
        texto_p.style.oTransform = 'rotateY('+casilla_data.rotateY+'deg) scale('+casilla_data.scaleX+',1)'

        var girar_texto = (radians/2)
        texto_section.style.transform = 'rotate('+girar_texto+'deg)'
        texto_section.style.msTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.mozTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.webkitTransform = 'rotate('+girar_texto+'deg)'
        texto_section.style.oTransform = 'rotate('+girar_texto+'deg)'

        texto_section.appendChild(texto_p)
        div_parent.appendChild(canvas)
        div_parent.appendChild(texto_section)

        /*var h6 = document.createElement('h6')
        h6.innerHTML = i
        h6.style.position = 'absolute'
        h6.style.fontSize = '20px'
        h6.style.top = '50%'
        h6.style.left = '80%'
        div_parent.appendChild(h6)*/

        ruleta_gira.appendChild(div_parent)

        var girar = (radians*i)
        div_parent.style.transform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.msTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.mozTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.webkitTransform = 'rotate('+(girar-90)+'deg)'
        div_parent.style.oTransform = 'rotate('+(girar-90)+'deg)'

        //canvas_plantillas.push(canvas)
        color++
        if(color==colores.length){
            color = 0
        }
    }

    console.log(rangos)

    /*html2canvas(document.querySelector("#tra_ruleta_gira")).then(canvas => {
        //remover otros canvas
        for(i = (canvas_plantillas.length-1);i>=0;i--){
            ruleta_gira.removeChild(canvas_plantillas[i])
        }
        canvas_plantillas = []
        ruleta_gira.appendChild(canvas)
    });*/
}

var animating = false
var girar_btn = document.getElementById('tra_spin_btn')
var animacion_boton_girar = null

function clickGirar(){
    if(!animating){
        click_girar_mp3.play()

        girar_btn.style.transform = 'scale(0.8)'
        girar_btn.style.msTransform = 'scale(0.8)'
        girar_btn.style.mozTransform = 'scale(0.8)'
        girar_btn.style.webkitTransform = 'scale(0.8)'
        girar_btn.style.oTransform = 'scale(0.8)'
        animating = true
        animacion_boton_girar = setTimeout(function(){
            clearTimeout(animacion_boton_girar)
            animacion_boton_girar = null
        
            girarRuleta()
            mensaje_txt.innerHTML = 'GIRANDO...'
            
            girar_btn.classList.add('tra_spin_btn_locked')
            girar_btn.style.transform = 'scale(1)'
            girar_btn.style.msTransform = 'scale(1)'
            girar_btn.style.mozTransform = 'scale(1)'
            girar_btn.style.webkitTransform = 'scale(1)'
            girar_btn.style.oTransform = 'scale(1)'

            /*animacion_boton_girar = setTimeout(function(){
                clearTimeout(animacion_boton_girar)
                animacion_boton_girar = null

            },400)*/
        },300)
    }   
}

var velocidad = 1000
var aceleracion = 10
var grados_actuales = 0
var animacion_girar_ruleta = null

function girarRuleta(){
    girando_mp3.currentTime = 0
    girando_mp3.volume = 0.8
    girando_mp3.play()

    unsetAnimationLeds()
    set_animacion_led = 4
    setAnimationLeds(6000)
    velocidad = getRand(1000,5000)
    grados_actuales = velocidad

    animacion_girar_ruleta = setInterval(function(){
        ruleta_gira.style.transform = 'rotate('+convertGrades(grados_actuales)+'deg)'
        ruleta_gira.style.msTransform = 'rotate('+convertGrades(grados_actuales)+'deg)'
        ruleta_gira.style.mozTransform = 'rotate('+convertGrades(grados_actuales)+'deg)'
        ruleta_gira.style.webkitTransform = 'rotate('+convertGrades(grados_actuales)+'deg)'

        grados_actuales-=aceleracion
        aceleracion-=0.05
        //grados_actuales = Math.floor(grados_actuales*10)/10

        if(aceleracion<1.5){
            girando_mp3.volume = 0.6
        }
        if(aceleracion<1){
            girando_mp3.volume = 0.4
        }
        if(aceleracion<0.5){
            girando_mp3.volume = 0.2
        }

        if(aceleracion<=0){
            clearInterval(animacion_girar_ruleta)
            animacion_girar_ruleta = null
            unsetAnimationLeds()
            
            var angulo_total = convertGrades((grados_actuales+90))
            console.log("angulo_total: "+angulo_total)
            var angle_set = 0
            for(i = 0;i<rangos.length;i++){
                if(
                    angulo_total>=rangos[i].ini
                ){
                    angle_set = i
                }
            }
            var casilla_selected = (total_partes-1)-angle_set

            aceleracion = 10
            girando_mp3.pause()
            checkCasillaSelected(casilla_selected)
        }
        //console.log(aceleracion)
    },30)
}

function convertGrades(grades){//710
    var numero4 = 0
    if(grades<0){
        numero4 = (360-(grades*-1))
    }else if(grades>=0&&grades<=360){
        numero4 = grades
    }else if(grades>360){
        var numero1 = parseInt(grades/360)
        var numero2 = (numero1*360)
        var numero3 = grades-numero2
        numero4 = numero3
    }
    
    //numero4 = Math.floor(numero3*1000)/1000
    //console.log(numero4)
    return numero4
}

///////////////////////////////SET PREGUNTAS/////////////////////////////
var preguntas_selecteds = []
var retos_selecteds = []
var pregunta_actual = null
var respuesta_actual = {div:null,r:0}

function getNewPregunta(){
    var p = getRand(0,(preguntas_data.length-1))
    var checked = checkPregunta(p)
    while(checked){
        p = getRand(0,(preguntas_data.length-1))
        checked = checkPregunta(p)
    }
    return p
}
function getNewReto(){
    var r = getRand(0,(retos_data.length-1))
    var checked = checkReto(r)
    while(checked){
        r = getRand(0,(retos_data.length-1))
        checked = checkReto(r)
    }
    return r
}

function checkPregunta(p){
    if(preguntas_selecteds.length>=preguntas_data.length){
        return false
    }else{
        var repe = 0
        for(i = 0;i<preguntas_selecteds.length;i++){
            if(preguntas_selecteds[i]==p){
                repe++
            }
        }
    
        if(repe==0){
            return false
        }else{
            return true
        }
    }
    
}
function checkReto(r){
    if(retos_selecteds.length>=retos_data.length){
        return false
    }else{
        var repe = 0
        for(i = 0;i<retos_selecteds.length;i++){
            if(retos_selecteds[i]==r){
                repe++
            }
        }
    
        if(repe==0){
            return false
        }else{
            return true
        }
    }
    
}

function checkCasillaSelected(casilla_selected){
    console.log(casilla_selected)
    var html = ""
    
    if(casillas[casilla_selected]==1){
        //preguntas
        mensaje_txt.innerHTML = 'PREGUNTA'
        var p_get = getNewPregunta()
        preguntas_selecteds.push(p_get)
        var pregunta_data = preguntas_data[p_get]
        pregunta_actual = pregunta_data
    
        html+='<div class="tra_modal_pregunta">'+pregunta_data.pregunta+'</div>'
        if(pregunta_data.a!=undefined&&pregunta_data.a!=null){
            if(Empty(pregunta_data.a)===false){
                html+=createRespuesta(pregunta_data.a,1,'A')
            }
        }
        if(pregunta_data.b!=undefined&&pregunta_data.b!=null){
            if(Empty(pregunta_data.b)===false){
                html+=createRespuesta(pregunta_data.b,2,'B')
            }
        }
        if(pregunta_data.c!=undefined&&pregunta_data.c!=null){
            if(Empty(pregunta_data.c)===false){
                html+=createRespuesta(pregunta_data.c,3,'C')
            }
        }
        if(pregunta_data.d!=undefined&&pregunta_data.d!=null){
            if(Empty(pregunta_data.d)===false){
                html+=createRespuesta(pregunta_data.d,4,'D')
            }
        }
        
        setModal({html:html,btn:false,type:'pregunta'})
    }else if(casillas[casilla_selected]==2){
        //retos
        mensaje_txt.innerHTML = 'RETO'
        var r_get = getNewReto()
        retos_selecteds.push(r_get)
        var reto_data = retos_data[r_get]

        html+='<div class="tra_modal_reto">'
            html+='<div class="tra_modal_reto_content">'+reto_data.reto+'</div>'
        html+='</div>'

        setModal({html:html,btn:true,callBack:'continuarReto',type:'reto'})
    }else if(casillas[casilla_selected]==3){
        mensaje_txt.innerHTML = '¡¡GANASTE 1.000.000!!'
        mensaje_txt.classList.add('tra_mensaje_txt_on')
        set_animacion_led = 5
        setAnimationLeds(2000)
        win_mp3.currentTime = 0
        win_mp3.play()
        animacionScore(1000000)
    }

    function createRespuesta(data,key,letra){
        var h = ""
        h+='<div class="tra_modal_respuesta" onmousedown="clickRespuesta(this,'+key+')">'
            //h+='<div class="tra_modal_respuesta_1">'
            //h+='</div>'

            //h+='<div class="tra_modal_respuesta_2">'
                //h+='<div class="tra_modal_respuesta_destello"></div>'
            //h+='</div>'

            //h+='<div class="tra_modal_respuesta_brillo1"></div>'
            //h+='<div class="tra_modal_respuesta_brillo2"></div>'
            //h+='<div class="tra_modal_respuesta_brillo3"></div>'
            //h+='<div class="tra_modal_respuesta_brillo4"></div>'
            h+='<div class="tra_modal_respuesta_letra">'+letra+'.</div>'
            h+='<p>'+data+'</p>'
        h+='</div>'
        return h
    }
}

var animacion_click_respuesta = null
var animating_click = false

function clickRespuesta(div,key){
    if(!animating_click){
        //click_girar_mp3.play()
        if(key==pregunta_actual.correcta){
            correct_mp3.play()
        }else{
            incorrect_mp3.play()
        }
        
        animating_click = true
        animacion_click_respuesta = setTimeout(function(){
            clearTimeout(animacion_click_respuesta)
            animacion_click_respuesta = null
        
            animacion_click_respuesta = setTimeout(function(){
                clearTimeout(animacion_click_respuesta)
                animacion_click_respuesta = null

                unsetModal({callBack:function(){
                    animating_click = false
                    if(key==pregunta_actual.correcta){
                        respuestaCorrecta()
                    }else{
                        respuestaIncorrecta()
                    }
                }})
            },200)
        },300)
    }
}

function continuarReto(div){
    if(!animating_click){
        click_girar_mp3.play()
        
        div.style.transform = 'scale(0.95)'
        div.style.msTransform = 'scale(0.95)'
        div.style.mozTransform = 'scale(0.95)'
        div.style.webkitTransform = 'scale(0.95)'
        div.style.oTransform = 'scale(0.95)'
        animating_click = true
        animacion_click_respuesta = setTimeout(function(){
            clearTimeout(animacion_click_respuesta)
            animacion_click_respuesta = null
        
            div.style.transform = 'scale(1)'
            div.style.msTransform = 'scale(1)'
            div.style.mozTransform = 'scale(1)'
            div.style.webkitTransform = 'scale(1)'
            div.style.oTransform = 'scale(1)'

            //animacion_click_respuesta = setTimeout(function(){
                //clearTimeout(animacion_click_respuesta)
                //animacion_click_respuesta = null

                unsetModal({callBack:function(){
                    //resetear todo pues
                    animating = false
                    animating_click = false
                    girar_btn.classList.remove('tra_spin_btn_locked')
                    mensaje_txt.innerHTML = 'Haz clic en el boton GIRAR'
                    mensaje_txt.classList.remove('tra_mensaje_txt_on')
                }})
            //},200)
        },300)
    }
    
}

var animacion_modal = null
function setModal(params){
    var modal = document.getElementById('tra_modal')
    var modal_btn = document.getElementById('tra_modal_btn')
    var content = document.getElementById('tra_modal_content')
    var cuadro = document.getElementById('tra_modal_cuadro')
    
    content.innerHTML = params.html
    if(params.btn==false){
        modal_btn.style.display = 'none'
    }else{
        modal_btn.style.display = 'block'
        if(params.callBack!=null&&params.callBack!=undefined){
            modal_btn.setAttribute('onmousedown',params.callBack+'(this)')
        }else{
            modal_btn.setAttribute('onclick','quitarModal(this)')
        }
    }

    var alto_modal = cuadro.offsetHeight
    var dif = parseInt((game_height-alto_modal)/2)
    //alert(alto_modal+'-'+tope_modal)
    if(alto_modal>tope_modal){
        dif = parseInt((game_height-tope_modal)/2)
        cuadro.classList.add('tra_modal_cuadro_height')
        if(params.type=='pregunta'){
            content.classList.add('tra_modal_content_height_pregunta')
        }else{
            content.classList.add('tra_modal_content_height_reto')
        }
    }
    cuadro.style.top = dif+'px'
    modal.className = 'tra_modal_on'
}

function unsetModal(params){
    var modal = document.getElementById('tra_modal')
    var cuadro = document.getElementById('tra_modal_cuadro')
    var content = document.getElementById('tra_modal_content')

    modal.className = 'tra_modal_off'
    cuadro.style.top = (0-game_height)+'px'
    animacion_modal = setTimeout(function(){
        cuadro.classList.remove('tra_modal_cuadro_height')
        content.classList.remove('tra_modal_content_height_pregunta')
        content.classList.remove('tra_modal_content_height_reto')
        clearTimeout(animacion_modal)
        animacion_modal = null

        if(params.callBack!=undefined&&params.callBack!=null){
            params.callBack()
        }
    },1000)
}
function quitarModal(btn){
    unsetModal({callBack:function(){
        //resetear todo pues
        animating = false
        girar_btn.classList.remove('tra_spin_btn_locked')
        mensaje_txt.innerHTML = 'Haz clic en el boton GIRAR'
        mensaje_txt.classList.remove('tra_mensaje_txt_on')
    }})
}

var mensaje_txt = document.getElementById('tra_mensaje_txt')
function respuestaCorrecta(){
    mensaje_txt.innerHTML = 'CORRECTO'
    mensaje_txt.classList.add('tra_mensaje_txt_on')
    set_animacion_led = 5
    setAnimationLeds(2000)
    win_mp3.currentTime = 0
    win_mp3.play()
    animacionScore(getRand(1000,10000))
    correctas++
    ganoJuego()
}
function respuestaIncorrecta(){
    mensaje_txt.innerHTML = 'INCORRECTO'
    mensaje_txt.classList.add('tra_mensaje_txt_on')
    set_animacion_led = 6
    setAnimationLeds(2000)
    game_over_mp3.currentTime = 0
    game_over_mp3.play()
    quitVidas()
    animacionScore2(getRand(500,1000))
}

//////////////////////////ANIMACIONES LEDS///////////////////////////////

var animacion_secuencia_leds = null
var counter_animation = null
var set_animacion_led = 1

function setAnimationLeds(time){
    clearInterval(animacion_secuencia_leds)
    animacion_secuencia_leds = null

    if(set_animacion_led==1){
        secuencia1()
    }else if(set_animacion_led==2){
        secuencia2()
    }else if(set_animacion_led==3){
        secuencia3()
    }else if(set_animacion_led==4){//gira
        secuenciaGira()
    }else if(set_animacion_led==5){//gana
        secuenciaGana()
    }else if(set_animacion_led==6){//pierde
        secuenciaPierde()
    }
    
    counter_animation = setTimeout(function(){
        if(set_animacion_led<4){
            //está en secuencia
            set_animacion_led++
            if(set_animacion_led>3){
                set_animacion_led = 1
            }
            setAnimationLeds(5000)
        }else{
            //alert("entra aqui")
            unsetAnimationLeds()
            if(set_animacion_led==5){
                //viene de ganar, resetemos
                animating = false
                girar_btn.classList.remove('tra_spin_btn_locked') 
                mensaje_txt.innerHTML = 'Haz clic en el boton GIRAR'
                mensaje_txt.classList.remove('tra_mensaje_txt_on')
            }else if(set_animacion_led==6){
                //viene de perder, resetemos
                animating = false
                girar_btn.classList.remove('tra_spin_btn_locked')
                mensaje_txt.innerHTML = 'Haz clic en el boton GIRAR'
                mensaje_txt.classList.remove('tra_mensaje_txt_on')
            }
            set_animacion_led = 1
            setAnimationLeds(5000)
        }
    },time)
}

function unsetAnimationLeds(){
    clearInterval(animacion_secuencia_leds)
    animacion_secuencia_leds = null
    clearTimeout(counter_animation)
    counter_animation = null
}

function secuencia1(){
    var mods = [0,5,10,15]
    var mod = 0
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]

            var is_led = false
            for(k = 0;k<mods.length;k++){
                if(j==(mods[k]+mod)){
                    is_led = true
                }
            }

            if(is_led){
                led.className = 'tra_led tra_led_on'
            }else{
                led.className = 'tra_led tra_led_off'
            }
        }
        mod++
        if(mod==5){
            mod = 0
        }
    },100)
}

function secuencia2(){
    var mod = false
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]
            if(!mod){
                if(j%2==0){
                    led.className = 'tra_led tra_led_on'
                }else{
                    led.className = 'tra_led tra_led_off'
                }
            }else{
                if(j%2==0){
                    led.className = 'tra_led tra_led_off'
                }else{
                    led.className = 'tra_led tra_led_on'
                }
            }
        }
        if(!mod){
            mod = true
        }else{
            mod = false
        }
    },150)
}

function secuencia3(){
    var mods = [
        [1,9,11,19],
        [2,8,12,18],
        [3,7,13,17],
        [4,6,14,16],
        [5,15],
        [4,6,14,16],
        [3,7,13,17],
        [2,8,12,18],
        [1,9,11,19],
        [0,10]
    ]
    var mod = 0
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]

            var is_led = false
            var secuencia = mods[mod]
            for(k = 0;k<secuencia.length;k++){
                if(j==(secuencia[k])){
                    is_led = true
                }
            }

            if(is_led){
                led.className = 'tra_led tra_led_on'
            }else{
                led.className = 'tra_led tra_led_off'
            }
        }
        mod++
        if(mod==mods.length){
            mod = 0
        }
    },100)
}

function secuenciaGira(){
    var mod = 15
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]
            if(j==mod){
                led.className = 'tra_led tra_led_on'
            }else{
                led.className = 'tra_led tra_led_off'
            }
        }
        mod++
        if(mod==leds.length){
            mod = 0
        }
    },50)
}

function secuenciaGana(){
    var mod = false
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]
            if(!mod){
                led.className = 'tra_led tra_led_on'
            }else{
                led.className = 'tra_led tra_led_off'
            }
        }
        if(!mod){
            mod = true
        }else{
            mod = false
        }
    },100)
}

function secuenciaPierde(){
    var mod = true
    animacion_secuencia_leds = setInterval(function(){
        for(j = 0;j<leds.length;j++){
            var led = leds[j]
            if(mod){
                led.className = 'tra_led tra_led_on'
            }else{
                led.className = 'tra_led tra_led_off'
            }
        }
        mod = false
    },100)
}


///////////////////////////////////////////////////////////////

function convertScore(val){
    var valor = String(val)
    var str = []
    var array = valor.split("")
    var unidades = 0
    for(var s = (array.length-1);s>=0;s--){
        str.push(array[s])
        unidades++
        if(unidades==3){
            if(s==0){
                
            }else{
                if(array[s-1]!='-'){
                    str.push('.')
                }
            }
            unidades = 0
        }
    }

    //devolver
    var new_str = ""
    for(var n = (str.length-1);n>=0;n--){
        //console.log(str[n])
        //if(str[n]=='.'&&n==0){

        //}else{
            new_str+=str[n]
        //}
    }
    return new_str
}

function convertTime(time){
    var minutos = parseInt((time/60))
    var segundos_restantes = time-(minutos*60)
    var str = ""
    if(minutos>=0&&minutos<=9){
        str+='0'+minutos
    }else{
        str+=minutos
    }
    str+=':'
    if(segundos_restantes>=0&&segundos_restantes<=9){
        str+='0'+segundos_restantes
    }else{
        str+=segundos_restantes
    }
    return str
}


var animacion_score = null
var score_txt = document.getElementById('tra_puntos_txt')
function animacionScore(new_score){
    var tope = (score+new_score)
    var dif = (tope - score)
    var seg = parseInt((dif/100))
    
    var score_parcial = score
    animacion_score = setInterval(function(){
        score_parcial+=seg
        score_txt.innerHTML = convertScore(score_parcial)
        if(score_parcial>tope){
            clearInterval(animacion_score)
            animacion_score = null

            score = tope
            score_txt.innerHTML = convertScore(score)
        }
    },20)
}
function animacionScore2(new_score){
    var tope = (score-new_score)
    var dif = (score-tope)
    var seg = parseInt((dif/100))
    
    var score_parcial = score
    animacion_score = setInterval(function(){
        score_parcial-=seg
        score_txt.innerHTML = convertScore(score_parcial)
        if(score_parcial<tope){
            clearInterval(animacion_score)
            animacion_score = null

            score = tope
            score_txt.innerHTML = convertScore(score)
        }
    },20)
}

var vidas_txt = document.getElementById('tra_oportunidades_txt')
function quitVidas(){
    vidas--
    vidas_txt.innerHTML = vidas
    if(vidas==0){
        //perdiste
        mensaje_txt.innerHTML = 'GAME OVER'
        var html = ""
        html+='<div class="tra_modal_reto">'
            html+='<div class="tra_modal_reto_content">'+__final_mal__+'</div>'
        html+='</div>'

        setModal({html:html,btn:true,callBack:'clickRepetir',type:'final'})
    }
}
function ganoJuego(){
    if(correctas==tope_correctas){
        //ganaste
        mensaje_txt.innerHTML = '<span>¡¡</span>MUY BIEN<span>!!</span>'
        var html = ""
        html+='<div class="tra_modal_reto">'
            html+='<div class="tra_modal_reto_content">'+__final__+'</div>'
        html+='</div>'

        aplausos_mp3.play()
        if(actual_dimension!=4){
            setConfetti()
        }
        
        setModal({html:html,btn:false,type:'final'})
    }
}

/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })

    /*var player = new Audio();

    player.oncanplaythrough = function(){
        data.callBack(player)
    }
    player.src = url;*/
}

function clickRepetir(div){
    if(!animating_click){
        click_girar_mp3.play()
        
        div.style.transform = 'scale(0.95)'
        div.style.msTransform = 'scale(0.95)'
        div.style.mozTransform = 'scale(0.95)'
        div.style.webkitTransform = 'scale(0.95)'
        div.style.oTransform = 'scale(0.95)'
        animating_click = true
        animacion_click_respuesta = setTimeout(function(){
            clearTimeout(animacion_click_respuesta)
            animacion_click_respuesta = null
        
            div.style.transform = 'scale(1)'
            div.style.msTransform = 'scale(1)'
            div.style.mozTransform = 'scale(1)'
            div.style.webkitTransform = 'scale(1)'
            div.style.oTransform = 'scale(1)'

            //animacion_click_respuesta = setTimeout(function(){
                //clearTimeout(animacion_click_respuesta)
                //animacion_click_respuesta = null

                unsetModal({callBack:function(){
                    //resetear todo pues
                    location.reload()
                }})
            //},200)
        },300)
    }
}

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

var aleluyas = new Array()

var animacion_aleluyas = null

var confeti_modal = document.getElementById('tra_confetti')
confeti_modal.style.display = 'none'
var y_aleluyas = [103.39,89.5,75.92,63.12,51.52,41.39,32.75,25.5,19.46,14.44,10.27,6.81,3.92,1.51,-0.49,-2.15,-3.52,-4.63,-5.53,-6.24,-6.78,-7.17,-7.44,-7.59,-7.64,-7.11,-6.58,-6.05,-5.52,-4.99,-4.45,-3.92,-3.39,-2.86,-2.31,-1.78,-1.24,-0.71,-0.16,0.37,0.91,1.45,2,2.54,3.08,3.62,4.18,4.72,5.27,5.81,6.37,6.92,7.47,8.02,8.57,9.13,9.68,10.24,10.79,11.36,11.92,12.47,13.03,13.59,14.16,14.73,15.29,15.86,16.43,17,17.57,18.14,18.71,19.28,19.87,20.44,21.02,21.6,22.18,22.77,23.35,23.93,24.52,25.1,25.7,26.29,26.88,27.47,28.06,28.65,29.26,29.86,30.45,31.05,31.66,32.26,32.86,33.47,34.08,34.69,35.3,35.91,36.52,37.14,37.76,38.38,38.99,39.61,40.23,40.86,41.48,42.11,42.74,43.37,44,44.62,45.26,45.89,46.52,47.16,47.81,48.45,49.09,49.73,50.37,51.01,51.66,52.3,52.95,53.6,54.26,54.91,55.57,56.22,56.88,57.53,58.19,58.85,59.51,60.17,60.83,61.5,62.16,62.84,63.51,64.18,64.84,65.51,66.19,66.86,67.53,68.21,68.88,69.56,70.24,70.92,71.6,72.28,72.96,73.65,74.33,75.01,75.71,76.4,77.09,77.77,78.46,79.15,79.85,80.54,81.23,81.93,82.62,83.32,84.01,84.71,85.41,86.11,86.81,87.51,88.21,88.91,89.61,90.32,91.02,91.72,92.43,93.14,93.84,94.55,95.26,95.97,96.68,97.39,98.1,98.81,99.52,100.23,100.95,101.66]
var confeti_colors = ['f6b7bd','d3deba','70d0d0','e1d5dd','f5e9be']

function setConfetti(){
    var ancho_c = 0
    var alto_c = 0
    var left_c = 0
    var top_c = 0
    var color_c = 0
    var delay_c = 0
    var rotate_c = 0
    var blur_c = 0
    var alfa_c = 0
    var direccion_c = 0
    var border_c = 0
    
    for(i = 0;i<total_confeti;i++){
        var confeti = document.createElement('div')
        confeti.className = 'confetti'

        color_c = getRand(0,(colores.length-1))
        ancho_c = getRand(5,15)
        alto_c = getRand(5,15)
        rotate_c = getRand(0,360)
        delay_c = getRand(0,100)
        delay_c*=-1
        rotate_c = getRand(1,4)
        blur_c = getRand(0,2)
        alfa_c = getRand(1,10)
        direccion_c = getRand(1,2)
        left_c = getRand(0,game_width)
        border_c = getRand(0,15)
        top_c = getRand(0,game_height)
        
        confeti.style.width = ancho_c+'px'
        confeti.style.height = alto_c+'px'
        confeti.style.filter = 'blur('+blur_c+'px)'
        confeti.style.msFilter = 'blur('+blur_c+'px)'
        confeti.style.mozFilter = 'blur('+blur_c+'px)'
        confeti.style.webkitFilter = 'blur('+blur_c+'px)'
        confeti.style.oFilter = 'blur('+blur_c+'px)'
        //confeti.style.opacity = (alfa_c/10)
        
        var confeti_div = document.createElement('div')
        confeti_div.style.backgroundColor = '#'+confeti_colors[color_c]
        if(rotate_c==1){
            confeti_div.className = 'confeti_rotate_x1'
        }else if(rotate_c==2){
            confeti_div.className = 'confeti_rotate_x2'
        }else if(rotate_c==3){
            confeti_div.className = 'confeti_rotate_y1'
        }else if(rotate_c==4){
            confeti_div.className = 'confeti_rotate_y2'
        }
        confeti_div.style.borderRadius = border_c+'px'
        confeti_div.style.msborderRadius = border_c+'px'
        confeti_div.style.mozborderRadius = border_c+'px'
        confeti_div.style.webkitborderRadius = border_c+'px'
        confeti_div.style.oborderRadius = border_c+'px'
        confeti.appendChild(confeti_div)
        
        confeti.style.transform = 'rotate('+rotate_c+'deg)'
        confeti.style.msTransform = 'rotate('+rotate_c+'deg)'
        confeti.style.mozTransform = 'rotate('+rotate_c+'deg)'
        confeti.style.webkitTransform = 'rotate('+rotate_c+'deg)'
        confeti.style.oTransform = 'rotate('+rotate_c+'deg)'
        confeti.style.left = left_c+'px'
        confeti.style.top = y_aleluyas[0]+'%'
        confeti.style.top = 'calc('+y_aleluyas[0]+'% + '+top_c+'px)'
        confeti.style.top = '-moz-calc('+y_aleluyas[0]+'% + '+top_c+'px)'
        
        //confeti.style.top = '90%'
        
        confeti_modal.appendChild(confeti)
        
        aleluyas.push({obj:confeti,x:left_c,y:top_c,child:confeti_div,delay:delay_c,ind:0,direccion:direccion_c})
    }

    var confeti_subida = 0
    animacion_aleluyas = setInterval(function(){
        var complete = 0
        for(var a = 0;a<aleluyas.length;a++){
            /*if(confeti_subida>0&&confeti_subida<25){
                var sonido = getRand(1,2)
                if(sonido==1){
                    var mp3_nuevo = confetti_mp3
                    mp3_nuevo.play()
                }
            }*/
            var confeti_obj = aleluyas[a].obj

            var distancia = getRand(1,5)

            var ind = aleluyas[a].ind
            //if(aleluyas[a].delay<0){
                //aleluyas[a].delay = (aleluyas[a].delay+1)
            //}else{
                confeti_obj.style.top = y_aleluyas[ind]+'%'
                confeti_obj.style.top = 'calc('+y_aleluyas[ind]+'% + '+aleluyas[a].y+'px)'
                confeti_obj.style.top = '-moz-calc('+y_aleluyas[ind]+'% + '+aleluyas[a].y+'px)'
                var left = 0
                if(aleluyas[a].direccion==1){
                    left = getLeft(confeti_obj.style.left)+(distancia/10)
                }else{
                    left = getLeft(confeti_obj.style.left)-(distancia/10)
                }
                confeti_obj.style.left = left+'px'
                if(aleluyas[a].ind<y_aleluyas.length){
                    aleluyas[a].ind = aleluyas[a].ind+1
                }else{
                    complete++
                }
            //}
        }
        confeti_subida++
        
        if(complete==aleluyas.length){
            clearInterval(animacion_aleluyas)
            animacion_aleluyas = null
            //alert("complete")
        }
    },20)

    confeti_modal.style.display = 'block'
}
function getLeft(obj){
    var number = String(obj)
    var number1 = number.replace('px','')
    var number2 = Number(number1)
    //console.log(number2)
    return number2
}