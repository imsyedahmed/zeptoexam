<?php
require __DIR__ . '/Model.php';
$model = new Model();

// this is for font upload 
if($_GET['type'] == 'upload'){
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
}

// this is for font list 
if($_GET['type'] == 'list'){
    $items = $model->getFontList();
    $data = array(
        'status' => false,
        'items'  => ''
    );
    if(!empty($items)){
        $data = array(
            'status' => true,
            'items'  => $items
        );
    }
    echo json_encode($data);
}

// this is for font list 
if($_GET['type'] == 'delete'){
    $id = $_GET['id'];
    $data = array(
        'status' => false,
        'msg'  => 'Delete failed'
    );
    if(!empty($id)){
        $id = (int) $id;
        $row = $model->getFontInfo($id);
        $filename = __DIR__ .'/fonts/'.$row[0]['file_name'];
        $delete = $model->deleteFont($id);
        if($delete){
            unlink($filename);
            $data = array(
                'status' => true,
                'msg'  => 'Deleted'
            );
        }
    }
    echo json_encode($data);
}


