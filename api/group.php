<?php 
require __DIR__ . '/Model.php';
$model = new Model();

// list of group 
if($_GET['type'] == 'list'){
    $list = $model->getFontGroupList();
    $data = array(
        'status' => false,
        'groups'  => ''
    );
    if(!empty($data)){
        $data = array(
            'status' => false,
            'groups'  => $list
        );
    }
    echo json_encode($data);
}

// insert group 
if($_GET['type'] == 'new'){
    $data['name'] = $_POST['name'];
    
}