var json_cc = []

var franja = null

function spdLoadClosedCaption(params) {
    var url = params.url

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode

            //console.log(xobj.responseText)
            json_cc = JSON.parse(xobj.responseText);
            if(params.callBack!=null){
                params.callBack()
            }
        }else{
            //alert("error puto "+xobj.status+" "+xobj.readyState)
        }
    };
    xobj.send(null);
}

function spdLoadJsonActivity(params){
    var url = params.url

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode

            //console.log(xobj.responseText)
            var json = JSON.parse(xobj.responseText);
            //if(params.callBack!=null){
                params.callBack(json)
            //}
        }else{
            //params.callBack(null)
            console.log("error cargando el json")
            //alert("error puto "+xobj.status+" "+xobj.readyState)
        }
    };
    xobj.send(null);
}

var audio_cc = null
var cc_finished = false

function spdLoadAudio(params){
    var url = params.url

    audio_cc = document.createElement('audio')
    audio_cc.setAttribute('src',url)
    audio_cc.load()
    audio_cc.addEventListener('loadeddata',function(){
        //alert("cargo")
        if(params.autoplay=='on'){
            audio_cc.play()
        }
        if(params.callBack!=null){
            params.callBack()
        }
    })
    audio_cc.addEventListener('error',function(){
        console.log("error audio "+url)
    })
}

function spdLoadFx(params){
    var url = params.url

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        params.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error")
        params.callBack(audio_fx)
    })
}

function spdPlayClosedCaptionOnly(params){

}

function spdPlayClosedCaption(params){
    if(!cc_finished){
        document.getElementById('cc').className = "cc_on"

        var is_continue = false
        //mirar si continua o si empieza otra vez
        if(params.continue!=null&&params.continue!=undefined){
            if(params.continue=='on'){
                is_continue = true
            }
        }

        franja = document.getElementById(params.franja_name)
        if(params.audio=='on'){
            audio_cc.play()
            if(!is_continue){
                audio_cc.addEventListener('ended',function (){
                    spdEndAudio()
                    spdStopSprite()
                    /*if(params.avatar_name!=null){
                        spdSetFrameSprite(3,params.avatar_name)
                    }*/ //ya no sirve esto porque el se para solito
                    if(params.callBack!=null&&params.callBack!=undefined){
                        params.callBack()
                    }
                })
            }//si esta continuando no añadimos el evento porque ya se añadió antes
        }

        if(!is_continue){
            animation_cc_seconds = 0
        }//si no esta continuando no reseteamos el cc
        
        clearInterval(animation_cc)
        animation_cc = setInterval(function(){
            var texto = ""
            var actual_secs = (Math.round(animation_cc_seconds*10)/10)

            for(var i = 0;i<json_cc.length;i++){
                var obj_json = json_cc[i]
                var ini = parseFloat(obj_json.ini)
                var fin = parseFloat(obj_json.fin)
                var label = obj_json.label

                //var actual_secs = Math.floor((animation_cc_seconds/1000)*10)/10    
                //console.log(actual_secs)
                if(actual_secs>=ini&&actual_secs<fin){
                    franja.innerHTML = label
                }
                
            }

            //hacemos esto para que la rayita no quede fea
            if(franja.innerHTML==""||franja.innerHTML==" "){
                franja.innerHTML = '...'
            }

            if(params.audio=='on'){
                var time_audio = audio_cc.currentTime
                animation_cc_seconds = time_audio
                //spdSetCcSeconds(time_audio)
                //setear segundos del avatar con este parametro sabemos si hay que sincronizar audio con sprite
                if(params.avatar!=null){
                    spdSpriteSetSecond(params.llaves,params.avatar_name,time_audio)
                }
            }
            //animation_cc_seconds+=100
        },20)
    }//si ya finalizo el cc
}

var animation_cc = null
var animation_cc_seconds

function spdEndAudio(){
    cc_finished = true
    //alert("termino")
    if(audio_cc!=null){
        audio_cc.pause()
        audio_cc.currentTime = 0
    }
    clearInterval(animation_cc)
}

function spdStopCcAnimation(){
    if(audio_cc!=null){
        audio_cc.pause()
    }
    if(animation_cc!=null){
        clearInterval(animation_cc)
    }
}

function spdSetCcSeconds(tiempo){
    animation_cc_seconds = tiempo
}

function printFranjacc(){
    var actual_secs = (Math.round(animation_cc_seconds*10)/10)
    var texto = ""
    
    for(var i = 0;i<json_cc.length;i++){
        var obj_json = json_cc[i]
        var ini = parseFloat(obj_json.ini)
        var fin = parseFloat(obj_json.fin)
        var label = obj_json.label
        
        //console.log(actual_secs+" "+ini+" "+actual_secs+" "+fin)
        if(actual_secs>=ini&&actual_secs<fin){
            if(franja!=null){
                texto = label
            }
        }        
    }
    //console.log("("+texto+")")

    //hacemos esto para que la rayita no quede fea
    if(texto==""||texto==" "){
        if(franja!=null){
            franja.innerHTML = '...'
        }
    }else{
        if(franja!=null){
            franja.innerHTML = texto
        }
    }
    //console.log("("+franja.innerHTML+")")
}

function spdContinueCcAnimation(franja_name){
    franja = document.getElementById(franja_name)

    animation_cc = setInterval(function(){
        //console.log("animation cc 2")
        
        var texto = ""
        var actual_secs = (Math.round(animation_cc_seconds*10)/10)

        for(var i = 0;i<json_cc.length;i++){
            var obj_json = json_cc[i]
            var ini = parseFloat(obj_json.ini)
            var fin = parseFloat(obj_json.fin)
            var label = obj_json.label

            //var actual_secs = Math.floor((animation_cc_seconds/1000)*10)/10
            
            //console.log(actual_secs)
            if(actual_secs>=ini&&actual_secs<fin){
                franja.innerHTML = label
            }
        }

        //hacemos esto para que la rayita no quede fea
        if(franja.innerHTML==""||franja.innerHTML==" "){
            franja.innerHTML = '...'
        }
        //animation_cc_seconds+=100
    },100)
}

function spdShowHideCC(btn){
    var status = btn.getAttribute("status")
    var cc = document.getElementById('cc')
    if(status=="on"){
        btn.setAttribute("status","off")
        btn.className = "spd_cc_off_btn"
        cc.className = "cc_off"
    }else{
        btn.setAttribute("status","on")
        btn.className = "spd_cc_on_btn"
        cc.className = "cc_on"
    }
}

function spdRemoveCc(){
    json_cc = []
    audio_cc = null
    animation_cc_seconds = 0
    if(animation_cc!=null){
        clearInterval(animation_cc)
    }
    animation_cc = null
    document.getElementById('cc_txt').innerHTML = ""
}

function spdResetCcFinished(){
    cc_finished = false
}

function spdPlayAudioCc(params){
    if(!cc_finished){
        
        var is_continue = false
        //mirar si continua o si empieza otra vez
        if(params.continue!=null&&params.continue!=undefined){
            if(params.continue=='on'){
                is_continue = true
            }
        }

        if(params.audio!=null){
            if(audio_cc!=null){
                audio_cc.pause()
                audio_cc.currentTime = 0
            }
            audio_cc = params.audio
            audio_cc.play()
            if(!is_continue){
                audio_cc.addEventListener('ended',function (){
                    spdEndAudio()
                    /*//spdStopSprite()
                    if(params.avatar_name!=null){
                        spdSetFrameSprite(3,params.avatar_name)
                    }*/ //ya no sirve esto porque el se para solito
                    if(params.callBack!=null&&params.callBack!=undefined){
                        params.callBack()
                    }
                })
            }//si esta continuando no añadimos el evento porque ya se añadió antes
        }

        if(!is_continue){
            animation_cc_seconds = 0
        }//si no esta continuando no reseteamos el cc
        
        clearInterval(animation_cc)
        animation_cc = setInterval(function(){
            if(params.audio!=null){
                var time_audio = audio_cc.currentTime
                //spdSetCcSeconds(time_audio)
                animation_cc_seconds = time_audio
                //setear segundos del avatar con este parametro sabemos si hay que sincronizar audio con sprite
                if(params.avatar!=null){
                    spdSpriteSetSecond(params.llaves,params.avatar_name,time_audio)
                }
            }
            //animation_cc_seconds+=100
        },30)
    }//si ya finalizo el cc
}