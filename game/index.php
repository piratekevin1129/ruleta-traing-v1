<?php 
$admin = false;
include '../vendor/autoload.php';
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" content="text/html" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Juego Ruleta</title>
<style type="text/css">
    
</style>
<link rel="stylesheet" type="text/css" href="assets/css/reset.css" />
<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
<link rel="stylesheet" type="text/css" href="assets/css/responsive.css" />
<link rel="stylesheet" type="text/css" href="assets/spider/sprites/sprite.css" />
<link rel="stylesheet" type="text/css" href="assets/spider/sprites/fotograma.css" />
<link href="https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap" rel="stylesheet">
<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="assets/spider/sprites/sprite.js"></script>
<script src="assets/spider/sprites/fotograma.js"></script>

<script>
function getRand(min,max){
    return Math.round(Math.random() * (max - min) + min);
}

var total_preguntas = Number(<?php echo count($default_data['data']['preguntas'])?>);
var total_retos = Number(<?php echo count($default_data['data']['retos'])?>);
var total_partes = parseInt(total_preguntas)+parseInt(total_retos);
var millon_switch = Number(<?php echo $default_data['data']['premio']?>);
</script>
<script src="assets/js/preguntas.js"></script>
<script src="assets/js/core.js"></script>
<script>
<?php for($i = 0;$i<$total_preguntas;$i++){?>
preguntas_data.push({
    tipo:Number(<?php echo $default_data['data']['preguntas'][$i]['tipo']?>),
    pregunta:'<?php echo $default_data['data']['preguntas'][$i]['pregunta']?>',
    a:'<?php echo $default_data['data']['preguntas'][$i]['a']?>',
    b:'<?php echo $default_data['data']['preguntas'][$i]['b']?>',
    c:'<?php echo $default_data['data']['preguntas'][$i]['c']?>',
    d:'<?php echo $default_data['data']['preguntas'][$i]['d']?>',
    correcta:Number(<?php echo $default_data['data']['preguntas'][$i]['rc']?>)
})
<?php }?>

<?php for($i = 0;$i<$total_retos;$i++){?>
retos_data.push({
    reto:'<?php echo $default_data['data']['retos'][$i]['reto']?>'
})
<?php }?>

colores = []
<?php for($i = 0;$i<count($default_data['data']['colores']);$i++){?>
colores.push('<?php echo $default_data['data']['colores'][$i]?>')
<?php }?>

__final__ = "<?php echo $default_data['data']['final']?>";
__final_mal__ = "<?php echo $default_data['data']['final2']?>";
vidas = Number(<?php echo $default_data['data']['vidas']?>);
correctas = 0
tope_correctas = Number(<?php echo $default_data['data']['ganar']?>);
</script>

</head>

<body>
    <div id="tra_contenedor">
        <div id="tra_opciones">
            <div id="tra_puntos">
                <h1>Puntos</h1>
                <div id="tra_puntos_mc">
                    <p id="tra_puntos_txt">0</p>
                </div>
            </div>
            <div id="tra_spin">
                <div id="tra_spin_btn" onmousedown="clickGirar()">GIRAR</div>
            </div>            
        </div>

        <div id="tra_opciones2">
            <div id="tra_oportunidades">
                <h1>Oportunidades</h1>
                <div id="tra_oportunidades_mc">
                    <p id="tra_oportunidades_txt">0</p>
                </div>
            </div>
            <div id="tra_mensaje">
                <!--<h1>Mensajes</h1>-->
                <div id="tra_mensaje_mc">
                    <p id="tra_mensaje_txt">Haz clic en el boton GIRAR</p>
                </div>
            </div>
        </div>

        <div id="tra_partes">
            <!--<div id="tra_corner2"></div>-->
            <div id="tra_ruleta">
                <div id="tra_ruleta_gira">
                    
                </div>
                <div id="tra_ruleta_bizel"></div>
                <div id="tra_ruleta_marco">
                    <div class="tra_led tra_led_off" id="tra_led1"></div>
                    <div class="tra_led tra_led_off" id="tra_led2"></div>
                    <div class="tra_led tra_led_off" id="tra_led3"></div>
                    <div class="tra_led tra_led_off" id="tra_led4"></div>
                    <div class="tra_led tra_led_off" id="tra_led5"></div>
                    <div class="tra_led tra_led_off" id="tra_led6"></div>
                    <div class="tra_led tra_led_off" id="tra_led7"></div>
                    <div class="tra_led tra_led_off" id="tra_led8"></div>
                    <div class="tra_led tra_led_off" id="tra_led9"></div>
                    <div class="tra_led tra_led_off" id="tra_led10"></div>
                    <div class="tra_led tra_led_off" id="tra_led11"></div>
                    <div class="tra_led tra_led_off" id="tra_led12"></div>
                    <div class="tra_led tra_led_off" id="tra_led13"></div>
                    <div class="tra_led tra_led_off" id="tra_led14"></div>
                    <div class="tra_led tra_led_off" id="tra_led15"></div>
                    <div class="tra_led tra_led_off" id="tra_led16"></div>
                    <div class="tra_led tra_led_off" id="tra_led17"></div>
                    <div class="tra_led tra_led_off" id="tra_led18"></div>
                    <div class="tra_led tra_led_off" id="tra_led19"></div>
                    <div class="tra_led tra_led_off" id="tra_led20"></div>
                    <!--<div id="raya"></div>
                    <div id="raya2"></div>-->
                </div>
            </div>
            <div id="tra_centro"></div>
            <div id="tra_flecha"></div>
        </div>

        <div id="tra_modal" class="tra_modal_off">
            <div id="tra_modal_cuadro">
                <div id="tra_modal_content">
                </div>
                <div id="tra_modal_btn">CONTINUAR</div>
            </div>
        </div>

        <div id="tra_confetti"></div>
        
        <div id="cargador" class="cargador_on">
            <p id="cargador_txt">Cargando...</p>
        </div>

        <div class="tra_led_on loader"></div>
    </div>

<script src="assets/js/html2canvas.min.js"></script>
<script src="assets/js/casillas_data.js"></script>
<script src="assets/js/game.js"></script>

<script>

var leds = [
    document.getElementById('tra_led1'),
    document.getElementById('tra_led2'),
    document.getElementById('tra_led3'),
    document.getElementById('tra_led4'),
    document.getElementById('tra_led5'),
    document.getElementById('tra_led6'),
    document.getElementById('tra_led7'),
    document.getElementById('tra_led8'),
    document.getElementById('tra_led9'),
    document.getElementById('tra_led10'),
    document.getElementById('tra_led11'),
    document.getElementById('tra_led12'),
    document.getElementById('tra_led13'),
    document.getElementById('tra_led14'),
    document.getElementById('tra_led15'),
    document.getElementById('tra_led16'),
    document.getElementById('tra_led17'),
    document.getElementById('tra_led18'),
    document.getElementById('tra_led19'),
    document.getElementById('tra_led20')
]
var cargador = document.getElementById('cargador')
var cargador_txt = document.getElementById('cargador_txt')

prepareWindow()
var click_girar_mp3 = null
var girando_mp3 = null
var win_mp3 = null
var game_over_mp3 = null

var aplausos_mp3 = null
var confetti_mp3 = null
var correct_mp3 = null
var incorrect_mp3 = null

window.onload = function(){
    loadAudio({src:'assets/media/click_girar.mp3',callBack:function(data){
    click_girar_mp3 = data
    loadAudio({src:'assets/media/girando.mp3',callBack:function(data){
    girando_mp3 = data
    loadAudio({src:'assets/media/win.mp3',callBack:function(data){
    win_mp3 = data 
    loadAudio({src:'assets/media/game_over.mp3',callBack:function(data){
    game_over_mp3 = data 

    loadAudio({src:'assets/media/aplausos.mp3',callBack:function(data){
    aplausos_mp3 = data 
    loadAudio({src:'assets/media/confetti.mp3',callBack:function(data){
    confetti_mp3 = data
    loadAudio({src:'assets/media/correct.mp3',callBack:function(data){
    correct_mp3 = data
    loadAudio({src:'assets/media/incorrect.mp3',callBack:function(data){
    incorrect_mp3 = data

    initGame()
    /*loadAudio({src:'assets/media/respuesta_incorrecta.mp3',callBack:function(data){
    respuesta_incorrecta_mp3 = data 
    loadAudio({src:'assets/media/intro.mp3',callBack:function(data){
    intro_mp3 = data 
    loadAudio({src:'assets/media/despues_intro.mp3',callBack:function(data){
    despues_intro_mp3 = data 

        loadAudio({src:'assets/media/50_50.mp3',callBack:function(data){
        cincuenta_cincuenta_mp3 = data
        loadAudio({src:'assets/media/llamada.mp3',callBack:function(data){
        llamada_mp3 = data
        loadAudio({src:'assets/media/publico.mp3',callBack:function(data){
        publico_mp3 = data
        loadAudio({src:'assets/media/cambio.mp3',callBack:function(data){
        cambio_mp3 = data

            
        }})
        }})
        }})
        }})*/
    }})
    }})
    }})
    }})
    
    }})
    }})
    }})
    }})
}

window.onresize = function(){
    var dimension = 1
    if(window.innerWidth>=845){
        dimension = 1
    }else if(window.innerWidth>=710&&window.innerWidth<845){
        dimension = 2
    }else if(window.innerWidth>=530&&window.innerWidth<710){
        dimension = 3
    }else{
        dimension = 4
    }

    //console.log(actual_dimension+'-'+dimension)
    if(actual_dimension!=dimension){
        window.onresize = null
        window.location = window.location;
    }
}

</script>
</body>
</html>