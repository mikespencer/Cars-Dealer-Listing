<?php

$dealer = $_GET['dealer'];

if(isset($_GET['file'])){
    $JSONfile = $_GET['file'];
} else{
    $JSONfile = 'http://www.washingtonpost.com/wp-adv/cars/json/carData.json';
}

$today = getdate();
$filePath = 'JSON_data/';

//check if hours is < 6 (server is using west coast time, so this is < than 9 est, so cache will clear at 9 est)
if($today[hours] < 6){
    $fileName = str_replace(' ', '_', $dealer) . '_' . $today[year] . $today[yday] . ".txt";
}
else{
    $fileName = str_replace(' ', '_', $dealer) . '_' . $today[year] . ( $today[yday]+1 ) . ".txt";
}

if (file_exists($filePath . $fileName)) {
    $return_value = file_get_contents($filePath . $fileName);
} else {
    $json = json_decode( file_get_contents($JSONfile), true );
    $json_string = json_encode( $json[ $dealer ] );
    
    if($json_string != 'null'){
        $fh = fopen($filePath . $fileName, 'w') or die("can't open file");
        fwrite($fh, $json_string);
        fclose($fh);
    }
    $return_value = $json_string;
}

if(isset($_GET['callback'])){
    header('Content-Type: application/javascript; charset=utf-8');
    echo $_GET['callback'] . '(' . $return_value . ');';
} else{
    header('Content-Type: application/json; charset=utf-8');
    echo $return_value;
}