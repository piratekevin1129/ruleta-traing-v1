<?php
function cleanVar($str){
    $str = str_replace("'","",$str);
    $str = str_replace('"',"",$str);
    $str = str_replace('<',"",$str);
    $str = str_replace('>',"",$str);
    $str = str_replace('/',"",$str);
    $str = str_replace('\\',"",$str);
    return $str;
}

$a = 0;
$c = 0;
$logo = '';
if(isset($_GET['a'])){
    $a = cleanVar($_GET['a']);
}
if(isset($_GET['c'])){
    $c = cleanVar($_GET['c']);
}
if(isset($_GET['logo'])){
    $logo = $_GET['logo'];
}
$file_json = '../admin/assets/files/db_'.$a.'_'.$c.'.json';

$preguntas = array();
$total_preguntas = 10;
$completas1 = 0;
for($i = 0;$i<$total_preguntas;$i++){
    array_push($preguntas,array(
        'pregunta'=>'',
        'tipo'=>2,
        'a'=>'',
        'b'=>'',
        'c'=>'',
        'd'=>'',
        'rc'=>1,
        'complete'=>0,
        'disponible'=>0
    ));
}
$retos = array();
$total_retos = 10;
$completas2 = 0;
for($i = 0;$i<$total_retos;$i++){
    array_push($retos,array(
        'reto'=>'',
        'complete'=>0,
        'disponible'=>0
    ));
}
$colores = array('c900fb','ed1c24','fcd70c','0391ff','01cd44');

$default_data = array(
    'nombre'=>'',
    'id'=>$a,
    'curso'=>$c,
    'datos_basicos'=>'no',
    'data'=>array(
        'preguntas'=>$preguntas,
        'retos'=>$retos,
        'colores'=>$colores,
        'final'=>'',
        'final2'=>'',
        'vidas'=>5,
        'ganar'=>5,
        'total_partes'=>0,
        'premio'=>0
    )
);

if(file_exists($file_json)){
    if(file_get_contents($file_json)){
        $str = file_get_contents($file_json);
        $json = json_decode($str, true);
        //print_r($json);
        $default_data['id'] = $json['id'];
        $default_data['nombre'] = $json['nombre'];
        $default_data['curso'] = $json['curso'];
        $default_data['datos_basicos'] = $json['datos_basicos'];
                
        $default_data['data']['final'] = $json['data']['final'];
        $default_data['data']['final2'] = $json['data']['final2'];
        $default_data['data']['vidas'] = $json['data']['vidas'];
        $default_data['data']['ganar'] = $json['data']['ganar'];
        //$default_data['data']['total_partes'] = $json['data']['total_partes'];
        $default_data['data']['premio'] = $json['data']['premio'];

        $json_colores = $json['data']['colores'];
        $colores = array();
        for($i = 0;$i<count($json_colores);$i++){
            array_push($colores,$json['data']['colores'][$i]);
            
        }
        $default_data['data']['colores'] = $colores;

        $json_preguntas = $json['data']['preguntas'];
        $preguntas = array();
        for($i = 0;$i<count($json_preguntas);$i++){
            $pregunta_push = array();
            if($json['data']['preguntas'][$i]['tipo']==2){
                $pregunta_push = array(
                    'pregunta'=>$json_preguntas[$i]['pregunta'],
                    'tipo'=>$json_preguntas[$i]['tipo'],
                    'a'=>$json_preguntas[$i]['a'],
                    'b'=>$json_preguntas[$i]['b'],
                    'c'=>$json_preguntas[$i]['c'],
                    'd'=>$json_preguntas[$i]['d'],
                    'rc'=>$json_preguntas[$i]['rc'],
                    'complete'=>$json_preguntas[$i]['complete'],
                    'disponible'=>$json_preguntas[$i]['disponible']
                );
            }else{
                $pregunta_push = array(
                    'pregunta'=>$json_preguntas[$i]['pregunta'],
                    'tipo'=>$json_preguntas[$i]['tipo'],
                    'rc'=>$json_preguntas[$i]['rc'],
                    'complete'=>$json_preguntas[$i]['complete'],
                    'disponible'=>$json_preguntas[$i]['disponible']
                );
            }
            if($json['data']['preguntas'][$i]['complete']==1){
                $completas1++;
            }
            array_push($preguntas,$pregunta_push);
        }
        $default_data['data']['preguntas'] = $preguntas;
        $total_preguntas = count($preguntas);

        $json_retos = $json['data']['retos'];
        $retos = array();
        for($i = 0;$i<count($json_retos);$i++){
            $reto_push = array(
                'reto'=>$json_retos[$i]['reto'],
                'disponible'=>$json_retos[$i]['disponible'],
                'complete'=>$json_retos[$i]['complete']
            );
            if($json['data']['retos'][$i]['complete']==1){
                $completas2++;
            }
            array_push($retos,$reto_push);
        }
        $default_data['data']['retos'] = $retos;
        $total_retos = count($retos);
    }
}else{
    if($admin){
        //crear
        $xample = '{"id":"'.$default_data['id'].'","curso":'.$default_data['curso'].',"nombre":"'.$default_data['nombre'].'","datos_basicos":"'.$default_data['datos_basicos'].'","data":{"preguntas":[';
        for($i = 0;$i<$total_preguntas;$i++){
            $xample.='{"pregunta":"'.$default_data['data']['preguntas'][$i]['pregunta'].'",';
            $xample.='"tipo":'.$default_data['data']['preguntas'][$i]['tipo'].',';
            $xample.='"a":"'.$default_data['data']['preguntas'][$i]['a'].'",';
            $xample.='"b":"'.$default_data['data']['preguntas'][$i]['b'].'",';
            $xample.='"c":"'.$default_data['data']['preguntas'][$i]['c'].'",';
            $xample.='"d":"'.$default_data['data']['preguntas'][$i]['d'].'",';
            $xample.='"rc":'.$default_data['data']['preguntas'][$i]['rc'].',';
            $xample.='"complete":'.$default_data['data']['preguntas'][$i]['complete'].',';
            $xample.='"disponible":'.$default_data['data']['preguntas'][$i]['disponible'].'}';
            if($i<($total_preguntas-1)){
                $xample.=',';
            }
        }
        $xample.='],"retos":[';
        for($i = 0;$i<$total_retos;$i++){
            $xample.='{"reto":"'.$default_data['data']['retos'][$i]['reto'].'",';
            $xample.='"disponible":'.$default_data['data']['retos'][$i]['disponible'].',';
            $xample.='"complete":'.$default_data['data']['retos'][$i]['complete'].'}';
            
            if($i<($total_retos-1)){
                $xample.=',';
            }
        }

        $xample.='],"colores":[';
        for($i = 0;$i<count($colores);$i++){
            $xample.='"'.$colores[$i].'"';
            
            if($i<(count($colores)-1)){
                $xample.=',';
            }
        }
        
        $xample.='],"final":"'.$default_data['data']['final'].'","final2":"'.$default_data['data']['final2'].'","vidas":"'.$default_data['data']['vidas'].'","ganar":"'.$default_data['data']['ganar'].'","total_partes":0,"premio":'.$default_data['data']['premio'];
        $xample.='}}';
        $json = $xample;
        if(file_put_contents('assets/files/db_'.$a.'_'.$c.'.json',$json)){
            
        }else{
            exit("error create_json_xample");
        }
    }else{
        exit("No file! ".$file_json);
    }
}
?>