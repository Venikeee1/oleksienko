<?php 

$file = fopen('form-requests.csv', 'a');
$request = array(date("Y-m-d h:i:sa"), $_POST['FIRST_NAME'], $_POST['LAST_NAME'], $_POST['EMAIL'], $_POST['ORGANISATION_NAME'], $_POST['COUNTRY'], $_SERVER['REMOTE_ADDR']);
fputcsv($file, $request);
fclose($file);



$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => 'https://service.capsulecrm.com/service/newlead',
    CURLOPT_NOBODY => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($_POST),
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_VERBOSE => true,
    CURLOPT_STDERR => $verbose,
    CURLOPT_FAILONERROR => '1',
    CURLOPT_FOLLOWLOCATION => '1',
    CURLINFO_HEADER_OUT => true
));

$response = curl_exec($ch);
if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {
    echo '{"result": "success"}';
} else {
    header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
    echo 'Not found';
}