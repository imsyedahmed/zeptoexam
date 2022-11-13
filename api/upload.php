<?php
require __DIR__ . '/Model.php';
$model = new Model();

if (isset($_FILES['file'])) {
    $result = $model->uploadfile();
    echo json_encode($result);
} else {
    $result = array(
        'status' => false,
        'msg' => 'need to upload a file'
    );
    echo json_encode($result);
}
