var spd_timer_total = 0
var spd_timer_animation = null
var spd_timer_seconds = 0
var spd_callback_end = null
var spd_timer_tiempo_txt = null
var spd_tiempo_inicial = 0

function spdSetTimer(id_tim,callBack){
    var tim_mc = document.getElementById(id_tim)
    spd_timer_total = parseInt(tim_mc.getAttribute("tiempo"))
    spd_timer_seconds = spd_timer_total
    spd_callback_end = callBack

    /*var html_timer = ''
    html_timer+='<div class="spd_timer_cont">'
        html_timer+='<p id="spd_timer_tiempo_txt">'+spdConvertToTime(spd_timer_total)+'</p>'
        html_timer+='<div class="spd_timer_reloj"></div>'
    html_timer+='</div>'*/

    spd_tiempo_inicial = spd_timer_total
    tim_mc.innerHTML = spdConvertToTime(spd_timer_total)
    spd_timer_tiempo_txt = tim_mc

    if(spd_timer_animation!=null){
        clearInterval(spd_timer_animation = null)
    }
    spd_timer_animation = setInterval(spdTimerAnimation,1000)
}

function spdTimerAnimation(){
    spd_timer_seconds--
    
    if(spd_timer_seconds<0){
        //spdStopTimer()
        clearInterval(spd_timer_animation)
        spd_timer_animation = null
        if(spd_callback_end!=null){
            spd_callback_end()
        }
    }else{
        var time_actual = spdConvertToTime(spd_timer_seconds)
        if(spd_timer_tiempo_txt!=null){
            spd_timer_tiempo_txt.innerHTML = time_actual
        }
    }
}

function spdStopTimer(){
    clearInterval(spd_timer_animation)
    //spd_timer_seconds = spd_timer_total
    //document.getElementById('spd_timer_tiempo_txt').innerHTML = spdConvertToTime(spd_timer_total)
}

function spdResetTimer(){
    spdStopTimer()
    
    spd_timer_total = spd_tiempo_inicial
    spd_timer_seconds = spd_timer_total
    
    tim_mc.innerHTML = spdConvertToTime(spd_timer_total)
    //spd_timer_tiempo_txt = tim_mc
}

function spdContinueTimer(){
    spd_timer_animation = setInterval(spdTimerAnimation,1000)
}

function spdConvertToTime(seconds){
    var minutos = parseInt(seconds/60)
    var sobrantes = parseInt(seconds-(minutos*60))

    var minutes = ""
    var segundos = ""
    if(minutos<=9){
        minutes = "0"+minutos
    }else{
        minutes = minutos
    }
    if(sobrantes<=9){
        segundos = "0"+sobrantes
    }else{
        segundos = sobrantes
    }

    var str = minutes+':'+segundos
    return str
}