var html_tl = ""

function spdCreateTimeline(div,video,params){
    //alert(video.duration)
    html_tl = ""
    spd_video_cc = params.cc
    spd_video_cc_name = params.ccname
    spd_video = video
    
    html_tl+='<div id="spd_playstop_btn" class="spd_stop_btn" status="playing" onclick="spdClickPlayStopTimeline(this)"><div class="spd_playstop_btn1"></div><div class="spd_playstop_btn2"></div><div class="spd_playstop_btn3"></div></div>'
    html_tl+='<div id="spd_durationbar_btn">'
        html_tl+='<div id="spd_totalbar_btn">'
        html_tl+='</div>'
        html_tl+='<div id="spd_playedbar_btn">'
        html_tl+='</div>'
        html_tl+='<div id="spd_circlebar_btn">'
        html_tl+='</div>'
        html_tl+='<div id="spd_zone_btn">'
        html_tl+='</div>'
    html_tl+='</div>'
    html_tl+='<div id="spd_total_current">'
        html_tl+='<div id="spd_current_txt">00:00</div>'
        html_tl+='<div id="spd_separador_txt">/</div>'
        html_tl+='<div id="spd_total_txt">'+spdConvertToTime(video.duration)+'</div>'
    html_tl+='</div>'
    html_tl+='<div id="spd_buttons">'
        html_tl+='<div id="spd_cc_btn" class="spd_cc_on_btn" status="on" onclick="spdShowHideCC(this)"></div>'
        html_tl+='<div id="spd_sound_btn" class="spd_sound_on_btn" status="on" onclick="spdSoundTimeline(this)"></div>'
        html_tl+='<div id="spd_fullscreen_btn" class="spd_fullscreen_btn" onclick="spdFullScreenTimeline(this)"></div>'
    html_tl+='</div>'
    
    document.getElementById(div).innerHTML = html_tl
    document.getElementById('spd_zone_btn').addEventListener('click',spdClickTimeline,false)
    spdStartPlayAnimation(video)
    video.play()
}

var timeline_animation = null
var spd_video = null
var spd_video_cc = null
var spd_video_cc_name = null
var spd_actual_current = 0
var spd_is_loading = false

function spdStartPlayAnimation(){
    if(timeline_animation!=null){
        clearInterval(timeline_animation)
    }
    timeline_animation = setInterval(spd_timeline_animation,100)
}

function spd_timeline_animation(){
    var current = spd_video.currentTime
    var current_formated = Math.round(current)//esta variable es para redondear al final de duration
    var duration_formated = Math.round(spd_video.duration)
    var set_pared = false
    //console.log(current+" - "+spd_actual_current)
    if(current==spd_actual_current){
        //verificar que no sea 0 y que no sea el final del vidio
        if(current!=0&&current_formated!=duration_formated){
            //mirar que no sea porque se le dio click al boton pausar
            if(spd_paused==false){
                //console.log("esta parado")
                set_pared = true
            }
        }
    }
    if(set_pared){
        document.getElementById('fondo_preloader').className = "fondo_preloader_on"
        spd_is_loading = true
    }else{
        document.getElementById('fondo_preloader').className = ""
        spd_is_loading = false
    }
    spd_actual_current = current
    spdSetCcSeconds(current)
    var total = spd_video.duration

    var percent1 = (current*100)/total
    var percent = Math.floor(percent1*10)/10

    document.getElementById('spd_playedbar_btn').style.width = percent+'%'
    var style_circle = 'left:'+percent+'%; left:calc('+percent+'% - 10px); left:-moz-calc('+percent+'% - 10px);'
    document.getElementById('spd_circlebar_btn').setAttribute("style",style_circle)

    document.getElementById('spd_current_txt').innerHTML = spdConvertToTime(current)
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

var spd_paused = false

function spdClickPlayStopTimeline(btn){
    var estado = btn.getAttribute("status")
    if(estado=="playing"){
        btn.setAttribute("status","stopped")
        btn.className = "spd_play_btn"
        spd_video.pause()
        spd_paused = true
        if(spd_video_cc){
            spdStopCcAnimation()
        }
    }else if(estado=="stopped"){
        btn.setAttribute("status","playing")
        btn.className = "spd_stop_btn"
        spd_video.play()
        spd_paused = false
        if(spd_video_cc){
            spdContinueCcAnimation(spd_video_cc_name)
        }
    }else{
        //repetir
        spdSetCurrentTime(0,function(){
            btn.setAttribute("status","playing")
            btn.className = "spd_stop_btn"
            spd_video.play()
            spd_paused = false
            spdSetCcSeconds(0)
            spdContinueCcAnimation(spd_video_cc_name)

            spdStartPlayAnimation()
        })
    }
}

function spdStopVideo(){
    spd_video.pause()
}

function spdClearAnimationTimeline(){
    document.getElementById('spd_playstop_btn').setAttribute("status","repeat")
    document.getElementById('spd_playstop_btn').className = "spd_repeat_btn"

    spdStopVideo()
    clearInterval(timeline_animation)
    timeline_animation = null
    if(spd_video_cc){
        clearInterval(animation_cc)
    }
}

function spdSoundTimeline(btn){
    var status = btn.getAttribute("status")
    
    if(status=="on"){
        btn.setAttribute("status","off")
        btn.className = "spd_sound_off_btn"
        spd_video.muted = true
    }else{
        btn.setAttribute("status","on")
        btn.className = "spd_sound_on_btn"
        spd_video.muted = false
    }
}

function spdFullScreenTimeline(btn){
    /*if(spd_video.requestFullscreen){
        spd_video.requestFullscreen();
    }else if(spd_video.mozRequestFullScreen){
        spd_video.mozRequestFullScreen();
    }else if(spd_video.webkitRequestFullscreen){
        spd_video.webkitRequestFullscreen();
    }*/

    
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
         (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {  
            document.documentElement.requestFullScreen();  
          } else if (document.documentElement.mozRequestFullScreen) {  
            document.documentElement.mozRequestFullScreen();  
          } else if (document.documentElement.webkitRequestFullScreen) {  
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
          }  
          btn.className = "spd_fullscreen_off_btn"
        } else {  
          if (document.cancelFullScreen) {  
            document.cancelFullScreen();  
          } else if (document.mozCancelFullScreen) {  
            document.mozCancelFullScreen();  
          } else if (document.webkitCancelFullScreen) {  
            document.webkitCancelFullScreen();  
          }  
          btn.className = "spd_fullscreen_btn"
        }  
      
}

function spdClickTimeline(e){
    if(spd_is_loading==false){
        var padre = e.target
        var rect_padre = padre.getBoundingClientRect()

        var posx = e.pageX-rect_padre.left
        var posy = e.pageY-rect_padre.top

        var percent = (posx*100)/rect_padre.width

        //detener linea de tiempo
        var btn_playstop = document.getElementById('spd_playstop_btn')
        btn_playstop.setAttribute("status","stopped")
        btn_playstop.className = "spd_play_btn"
        spd_video.pause()
        //optener segundos
        var tiempo1 = (percent*spd_video.duration)/100
        var tiempo = Math.floor(tiempo1*10)/10
        
        if(spd_video_cc){
            spdStopCcAnimation()
            }
        
        spdSetCurrentTime(tiempo,function(){
            btn_playstop.setAttribute("status","playing")
            btn_playstop.className = "spd_stop_btn"
            spd_video.play()
            //puede que sea null porque ya se acabo el video
            if(timeline_animation==null){
                timeline_animation = setInterval(spd_timeline_animation,100)
            }

            if(spd_video_cc){
                //spdSetCcSeconds((tiempo*1000))
                spdSetCcSeconds(tiempo)
                printFranjacc()
                spdContinueCcAnimation(spd_video_cc_name)
            }
        })

        //console.log(posx+" "+posy)
    }
    
}

function spdSetCurrentTime(tiempo,callBack){
    spd_video.currentTime = tiempo
    callBack()
}

function spdRemoveTimeline(){
    if(timeline_animation!=null){
        clearInterval(timeline_animation)
    }
    timeline_animation = null
    spd_video = null
    spd_video_cc = null
    spd_video_cc_name = null
    spd_paused = false
    
    //pendiente salir de full screen
    var timelin = document.getElementById('timeline')
    if(timelin!=null){
        timelin.innerHTML = ""
    }
    spd_is_loading = false
}