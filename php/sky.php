<?php

    $data = [];

    $c['user'] = $_POST['user'];
    $c['star'] = $_POST['star'];
    $c['time'] = $_POST['time'];

    array_push($data,$c);

    $json_string = json_encode($data);
    $json = json_decode(file_get_contents('test.json'),true);

    if($json == null){
        file_put_contents('test.json',$json_string);
    }else{
        $json = json_encode(array_merge($data,$json));
        file_put_contents('test.json',$json);
    } 

    $json_arr = json_decode(file_get_contents('test.json'),true);

    $flag = array();
    foreach($json_arr as $a){
        $flag[] = $a['star'];
    }
    array_multisort($flag,SORT_DESC,$json_arr);
    // print_r($json_arr);

    echo json_encode($json_arr);



?>