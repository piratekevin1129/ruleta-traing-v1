<?php 
$admin = true;
include '../vendor/autoload.php';
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" content="text/html" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Administrador Ruleta</title>
<style type="text/css">
    
</style>
<link rel="stylesheet" type="text/css" href="assets/css/reset.css" />
<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
<link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet">
<script src="assets/js/jquery-3.2.1.min.js"></script>

</head>

<body>

<form action="save.php" method="post" id="formulario">
<input type="hidden" name="account" value="<?php echo $default_data['id']?>" />
<input type="hidden" name="curse" value="<?php echo $default_data['curso']?>" />

<div id="trad_cont">
    <br />

    <h1 class="trad_title">Información básica</h1>
    <p class="trad_info">Diligencie los siguientes datos básicos para la actividad de repaso</p>
    <br />
    <h1 class="trad_title">Actividad</h1>
    <div class="trad_field">
        <p class="trad_label">Nombre de la actividad</p>
        <input type="text" autocomplete="off" maxlength="200" placeholder="Rueda de la fortuna" name="nombre" value="<?php echo $default_data['nombre']?>" id="nombre" />
    </div>

    <div id="trad_ruleta_parent">
        <div id="trad_ruleta">
            <!--<p class="trad_label" style="text-align:center">Previsualización de la ruleta</p>-->
            <div id="tra_ruleta">
                <div id="tra_ruleta_gira">
                    
                </div>
                <div id="tra_ruleta_marco"></div>
            </div>
        </div>
    </div>

    <div class="trad_field">
        <p class="trad_label">Incluir casilla extra (1.000.000 de puntos)</p>
        <p class="trad_info">Esta casilla no contiene pregunta o reto</p>
        <?php if($default_data['data']['premio']==0){?>
            <div class="trad_switch trad_switch_off" onclick="onSwtich(this,setPremioForm)" status="off" id="premio">
                <section></section>
                <input type="hidden" name="premio" value="off" />
            </div>
        <?php } else {?>
            <div class="trad_switch trad_switch_on" onclick="onSwtich(this,setPremioForm)" status="on" id="premio">
                <section></section>
                <input type="hidden" name="premio" value="on" />
            </div>
        <?php } ?>
    </div>

    <p class="trad_label">Colores</p>
    <div id="colores_content">
    <?php $colores = $default_data['data']['colores'];?>
    <?php for($i = 0;$i<count($colores);$i++){?>
        <div class="trad_field" id="color<?php echo $i?>_content">
            <input style="width:200px !important;" type="text" autocomplete="off" maxlength="6" placeholder="FF0000" name="<?php echo $i?>" value="<?php echo $default_data['data']['colores'][$i]?>" id="color<?php echo $i?>" onkeyup="changeColor(this)" />
            <div class="trad_color_picker" style="background-color:#<?php echo $default_data['data']['colores'][$i]?>" name="<?php echo $i?>" id="color<?php echo $i?>_color" status="off" onclick="clickColorPicker(this)"></div>
            <div class="trad_color_picker_div" name="<?php echo $i?>" id="color<?php echo $i?>_parent"></div>
            <div class="trad_color_picker_remover" name="<?php echo $i?>" id="color<?php echo $i?>_boton" onclick="removerColor(this)">Remover</div>
        </div>
    <?php } ?>
    </div>
    <div class="trad_color_picker_agregar" onclick="agregarColor(this)">Agregar +</div>

    <br />

    <div class="trad_field">
        <p class="trad_label">Número de preguntas para la ruleta</p>
        <select id="total_preguntas" name="total_preguntas" onchange="changeTotalPreguntas(this)">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    </div>

    <div class="trad_field">
        <p class="trad_label">Número de retos para la ruleta</p>
        <select id="total_retos" name="total_retos" onchange="changeTotalRetos(this)">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    </div>

    <br />

    <div class="trad_field">
        <p class="trad_label">Número de oportunidades para <b>reprobar</b> la actividad</p>
        <?php $vidas = $default_data['data']['vidas']?>
        <select id="vidas" name="vidas">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
    <div class="trad_field">
        <p class="trad_label">Preguntas correctas para <b>aprobar</b> la actividad</p>
        <?php $ganar = $default_data['data']['ganar']?>
        <select id="ganar" name="ganar">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
    
    <br />

    <h1 class="trad_title">Mensajes del juego</h1>
    <p class="trad_info">Escriba los mensajes personalizados para el final de la actividad</p>
    <br />
    <div class="trad_field">
        <p class="trad_label">Mensaje juego aprobado</p>
        <input type="text" autocomplete="off" maxlength="250" placeholder="Has llegado al final. Continua con el curso" name="final" value="<?php echo $default_data['data']['final']?>" id="final" />
    </div>
    <br />
    <div class="trad_field">
        <p class="trad_label">Mensaje juego NO aprobado</p>
        <input type="text" autocomplete="off" maxlength="250" placeholder="No has contestado correctamente a las preguntas. Vuelve a intentarlo" name="final2" value="<?php echo $default_data['data']['final2']?>" id="final2" />
    </div>

    <?php if($default_data['datos_basicos']=='no'){?>
        <!--<div class="trad_pregunta_next_btn trad_siguiente" id="guardar_btn0" onclick="siguientePregunta()">Continuar</div>-->
    <?php } else {?>
        <!--<div class="trad_pregunta_next_btn trad_siguiente" id="guardar_btn0" onclick="clickActualizarDatosBasicos()">Actualizar</div>-->
    <?php } ?>    

    <br />
    
    <div id="preguntas_respuestas_cont" class="preguntas_respuestas_cont_unlocked">
    
        <h1 class="trad_title">Preguntas y Retos</h1>
        <p class="trad_info">Por favor diligencie las preguntas y retos que se visualizarán en la <b>ruleta</b></p>
        <br />

        <h1 class="trad_title">Preguntas</h1>
        <br />
        <?php for($i = 1;$i<=10;$i++){?>
            <?php $pregunta_data = array(); ?>
            <?php if($i<=$total_preguntas){?>
                <?php $pregunta_data = $default_data['data']['preguntas'][$i-1]; ?>
                <div class="trad_col_pregunta" id="col_pregunta<?php echo $i?>" style="display:block">
            <?php } else {?>
                <?php $pregunta_data = array(
                    'pregunta'=>'',
                    'tipo'=>2,
                    'a'=>'',
                    'b'=>'',
                    'c'=>'',
                    'd'=>'',
                    'rc'=>1,
                    'complete'=>0,
                    'disponible'=>0
                ); ?>
                <div class="trad_col_pregunta" id="col_pregunta<?php echo $i?>" style="display:none">
            <?php } ?>
            
            
            <?php if($pregunta_data['complete']==1){?>
                <div id="title_pregunta<?php echo $i?>" class="trad_col_pregunta_title trad_col_pregunta_title_complete" onclick="openRespuesta(this,<?php echo $i?>)" status="off"><p>Pregunta <?php echo $i?></p></div>
            <?php } else {?>
                <div id="title_pregunta<?php echo $i?>" class="trad_col_pregunta_title trad_col_pregunta_title_incomplete" onclick="openRespuesta(this,<?php echo $i?>)" status="off"><p>Pregunta <?php echo $i?></p></div>
            <?php } ?>
            

            <?php if($pregunta_data['complete']==1){?>
                <div id="con_pregunta<?php echo $i?>" class="trad_col_pregunta_content trad_col_pregunta_content_off">
            <?php } else {?>
                <div id="con_pregunta<?php echo $i?>" class="trad_col_pregunta_content trad_col_pregunta_content_off">
            <?php } ?>
            
                    <div class="trad_field">
                        <p class="trad_label">Pregunta</p>
                        <input type="text" autocomplete="off" maxlength="265" placeholder="Escriba su pregunta aqui..." name="pregunta<?php echo $i?>" value="<?php echo $pregunta_data['pregunta']?>" id="pregunta<?php echo $i?>" onblur="checkComplete(<?php echo $i?>)" />
                    </div>
                    
                    <?php if($pregunta_data['tipo']==1){?>
                        <div class="trad_respuestas trad_respuestas_off">
                    <?php } else {?>
                        <div class="trad_respuestas trad_respuestas_on">
                    <?php } ?>
                        <div class="trad_field">
                            <p class="trad_label">Respuesta <b>A</b></p>
                            <input type="text" autocomplete="off" maxlength="255" placeholder="Opción A..." name="respuestaa<?php echo $i?>" value="<?php echo $pregunta_data['a'] ?>" id="respuestaa<?php echo $i?>" onblur="checkComplete(<?php echo $i?>)" />
                        </div>
                        <div class="trad_field">
                            <p class="trad_label">Respuesta <b>B</b></p>
                            <input type="text" autocomplete="off" maxlength="255" placeholder="Opción B..." name="respuestab<?php echo $i?>" value="<?php echo $pregunta_data['b'] ?>" id="respuestab<?php echo $i?>" onblur="checkComplete(<?php echo $i?>)" />
                        </div>
                        <div class="trad_field">
                            <p class="trad_label">Respuesta <b>C</b></p>
                            <input type="text" autocomplete="off" maxlength="255" placeholder="Opción C..." name="respuestac<?php echo $i?>" value="<?php echo $pregunta_data['c'] ?>" id="respuestac<?php echo $i?>" onblur="checkComplete(<?php echo $i?>)" />
                        </div>
                        <div class="trad_field">
                            <p class="trad_label">Respuesta <b>D</b></p>
                            <input type="text" autocomplete="off" maxlength="255" placeholder="Opción D..." name="respuestad<?php echo $i?>" value="<?php echo $pregunta_data['d'] ?>" id="respuestad<?php echo $i?>" onblur="checkComplete(<?php echo $i?>)" />
                        </div>
                    </div>
                    <div class="trad_field">
                        <p class="trad_label">Respuesta correcta</p>
                        <select name="respuesta<?php echo $i?>" id="respuesta<?php echo $i?>" autocomplete="off">
                        <?php if($pregunta_data['tipo']==1){ ?>
                            <?php if($pregunta_data['rc']==1){?>
                                <option value="1" selected>Verdadero</option>
                                <option value="2">Falso</option>
                            <?php } else {?>
                                <option value="1">Verdadero</option>
                                <option value="2" selected>Falso</option>
                            <?php } ?>
                        <?php } else { ?>
                            <?php if($pregunta_data['rc']==1){?>
                                <option value="1" selected>A</option>
                                <option value="2">B</option>
                                <option value="3">C</option>
                                <option value="4">D</option>
                            <?php } else if($pregunta_data['rc']==2){ ?>
                                <option value="1">A</option>
                                <option value="2" selected>B</option>
                                <option value="3">C</option>
                                <option value="4">D</option>
                            <?php } else if($pregunta_data['rc']==3){ ?>
                                <option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3" selected>C</option>
                                <option value="4">D</option>
                            <?php } else if($pregunta_data['rc']==4){ ?>
                                <option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3">C</option>
                                <option value="4" selected>D</option>
                            <?php } ?>
                        <?php } ?>
                        </select>
                    </div>

                </div>
            </div>
            
        <?php } ?>

        <br />

        <h1 class="trad_title">Retos</h1>
        <br />
        <?php for($i = 1;$i<=10;$i++){?>
            <?php $reto_data = array();?>
            <?php if($i<=$total_retos){?>
                <?php $reto_data = $default_data['data']['retos'][$i-1]?>
                <div class="trad_col_pregunta" id="col_reto<?php echo $i?>" style="display:block">
            <?php } else {?>
                <?php $reto_data = array(
                    'reto'=>'',
                    'complete'=>0,
                    'disponible'=>0
                );?>
                <div class="trad_col_pregunta" id="col_reto<?php echo $i?>" style="display:none">
            <?php } ?>
            
            <?php if($reto_data['complete']==1){?>
                <div id="title_reto<?php echo $i?>" class="trad_col_pregunta_title trad_col_pregunta_title_complete" onclick="openReto(this,<?php echo $i?>)" status="off"><p>Reto <?php echo $i?></p></div>
            <?php } else {?>
                <div id="title_reto<?php echo $i?>" class="trad_col_pregunta_title trad_col_pregunta_title_incomplete" onclick="openReto(this,<?php echo $i?>)" status="off"><p>Reto <?php echo $i?></p></div>
            <?php } ?>
            
            <?php if($reto_data['complete']==1){?>
                <div id="con_reto<?php echo $i?>" class="trad_col_pregunta_content trad_col_reto_content_off">
            <?php } else {?>
                <div id="con_reto<?php echo $i?>" class="trad_col_pregunta_content trad_col_reto_content_off">
            <?php } ?>
                    <div class="trad_field">
                        <textarea autocomplete="off" maxlength="500" placeholder="Escriba el reto aqui..." name="reto<?php echo $i?>" id="reto<?php echo $i?>" onblur="checkComplete2(<?php echo $i?>)"><?php echo $reto_data['reto']?></textarea>
                    </div>
                </div>
            </div>
            
        <?php } ?>
    </div>
    <br />

    <div style="display:block" id="guardar_btn" class="trad_guardar" onclick="guardarTodo()">Guardar</div>
    <div id="trad_back_picker" style="display:none" onclick="quitarPicker()"></div>
</div>

</form>

<script src="assets/js/validation.js"></script>
<script src="assets/js/admin.js"></script>
<script>

var global_id = '<?php echo $default_data['id']?>';
var global_curso = '<?php echo $default_data['curso']?>';

var select_vidas = document.getElementById('vidas')
select_vidas.value = Number(<?php echo $vidas?>)

var select_ganar = document.getElementById('ganar')
select_ganar.value = Number(<?php echo $ganar?>)

var select_total_preguntas = document.getElementById('total_preguntas')
select_total_preguntas.value = Number(<?php echo $total_preguntas?>)

var select_total_retos = document.getElementById('total_retos')
select_total_retos.value = Number(<?php echo $total_retos?>)


var millon_switch = <?php echo $default_data['data']['premio']?>;

var total_preguntas_num = <?php echo $total_preguntas?>;
var total_retos_num = <?php echo $total_retos?>;
var total_partes_num = parseInt(total_preguntas_num)+parseInt(total_retos_num)

var colores = []
<?php for($i = 0;$i<count($colores);$i++){?>
    colores.push('<?php echo $colores[$i]?>')
<?php } ?>

var pickers = document.getElementsByClassName('trad_color_picker_div')
var image_picker = new Image()
image_picker.onload = function(){
    image_picker.onload = null
    image_picker.onerror = null
    var c = 0
    for(c = 0;c<pickers.length;c++){
        pickers[c].style.display = 'none'
        var html = ""
        html+='<canvas width="267" height="169" onmousemove="movePicker(this,event)" onclick="clickPicker()"></canvas>'
        pickers[c].innerHTML = html
    }
    for(c = 0;c<pickers.length;c++){
        var canv = pickers[c].getElementsByTagName('canvas')[0]
        var ctx = canv.getContext('2d')
        ctx.drawImage(image_picker,0,0)
    }
}
image_picker.onerror = function(){
    console.log("error loading picker")
    image_picker.onload = null
    image_picker.onerror = null
}
image_picker.src = 'assets/images/color_picker.png'
function updatePicker(canv){
    var padre = canv.parentNode
    padre.style.display = 'none'
    var ctx = canv.getContext('2d')
    ctx.drawImage(image_picker,0,0)
}


var completado = false
<?php if($completas1==$total_preguntas&&$completas2==$total_retos){?>
completado = true;

//mirar si los datos basicos están completos
if(completeDatosBasicos()===false){
    completado = false
}
<?php } ?>

console.log("completado: "+completado)

<?php if(isset($_GET['f'])){?>
    <?php if($_GET['f']=='e'){?>
        alert("Error guardando el archivo")
    <?php } ?>
<?php }?>

window.addEventListener('message', (event) => {
    //console.log('mensaje del admin',event.data)
    var msg_data = event.data
    if(msg_data.update === true){
        guardarTodo()
    }
});

changeRuletaPreview()

</script>
</body>
</html>