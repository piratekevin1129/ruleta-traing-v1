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

if(
    isset($_POST['id'])&&
    isset($_POST['curso'])
){
    $id = cleanVar($_POST['id']);
    $curso = cleanVar($_POST['curso']);

    $json_name = 'db_'.$id.'_'.$curso.'.json';
    $json_url = 'assets/files/'.$json_name;

    if(file_exists($json_url)){
        if($json_get = file_get_contents($json_url)){
            $json = json_decode($json_get,true);
            //guardar
            if(isset($_GET['action'])){
                $action = cleanVar($_GET['action']);

                if($action=='save_all'){
                    if(
                        isset($_POST['nombre'])&&
                        isset($_POST['final'])&&
                        isset($_POST['final2'])&&
                        isset($_POST['premio'])&&
                        isset($_POST['vidas'])&&
                        isset($_POST['ganar'])&&
                        isset($_POST['colores'])
                    ){
                        $nombre = cleanVar($_POST['nombre']);
                        $final = cleanVar($_POST['final']);
                        $final2 = cleanVar($_POST['final2']);
                        $premio = cleanVar($_POST['premio']);
                        $vidas = cleanVar($_POST['vidas']);
                        $ganar = cleanVar($_POST['ganar']);
    
                        $json['nombre'] = $nombre;
                        $json['data']['final'] = $final;
                        $json['data']['final2'] = $final2;
                        $json['datos_basicos'] = 'si';
                        //$json['data']['preguntas'][0]['disponible'] = 1;
                        
                        $preguntas = json_decode($_POST['preguntas'],true);
                        $preguntas_data = array();
                        for($i = 0;$i<count($preguntas);$i++){
                            $p = $i;

                            $pregunta = cleanVar($preguntas[$p]['pregunta']);
                            $tipo = cleanVar($preguntas[$p]['tipo']);
                            $respuestaa = cleanVar($preguntas[$p]['a']);
                            $respuestab = cleanVar($preguntas[$p]['b']);
                            $respuestac = cleanVar($preguntas[$p]['c']);
                            $respuestad = cleanVar($preguntas[$p]['d']);
                            $correcta = cleanVar($preguntas[$p]['correcta']);
                            $completo = cleanVar($preguntas[$p]['completo']);
                            $completo1 = 0;
                            if($completo==0){
                                $completo1 = 1;
                            }else{
                                $completo1 = 0;
                            }

                            array_push($preguntas_data,array(
                                'pregunta'=>$pregunta,
                                'tipo'=>$tipo,
                                'a'=>$respuestaa,
                                'b'=>$respuestab,
                                'c'=>$respuestac,
                                'd'=>$respuestad,
                                'rc'=>(int)$correcta,
                                'complete'=>$completo1,
                                'disponible'=>1
                            ));
                        }
                        $json['data']['preguntas'] = $preguntas_data;

                        $retos = json_decode($_POST['retos'],true);
                        $retos_data = array();
                        for($i = 0;$i<count($retos);$i++){
                            $r = $i;

                            $reto = cleanVar($retos[$r]['reto']);
                            $completo = cleanVar($retos[$r]['completo']);
                            $completo2 = 0;
                            if($completo==0){
                                $completo2 = 1;
                            }else{
                                $completo2 = 0;
                            }

                            array_push($retos_data,array(
                                'reto'=>$reto,
                                'complete'=>$completo2,
                                'disponible'=>1
                            ));
                        }
                        $json['data']['retos'] = $retos_data;

                        $colores = json_decode($_POST['colores'],true);
                        $colors = array();
                        for($i = 0;$i<count($colores);$i++){
                            $color = cleanVar($colores[$i]);
                            array_push($colors,$color);
                        }
                        $json['data']['colores'] = $colors;

                        if($premio=='on'){
                            $json['data']['premio'] = 1;
                        }else{
                            $json['data']['premio'] = 0;
                        }
                        $json['data']['vidas'] = $vidas;
                        $json['data']['ganar'] = $ganar;

                        $json_set = json_encode($json);
                        if(file_put_contents($json_url,$json_set)){
                            exit("success");
                        }else{
                            exit("error file_put");
                        }
                    }else{
                        exit("error datos_missing");
                    }
                    
                }
            }else{
                exit("error action no specifed");
            }
        }else{
            exit("error file_get");
        }
    }else{
        exit("no file");
    }
}else{
    exit("error account curso undefined");
}