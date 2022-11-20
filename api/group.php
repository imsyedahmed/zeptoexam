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
            'status' => true,
            'groups'  => $list
        );
    }
    echo json_encode($data);
}

// insert group 
if($_GET['type'] == 'new'){
    $postdata = $_POST;
    $data['name'] = $postdata['group_name'];
    
    $result = array();
    $fonts_id = $postdata['fonts_id'];
    $fonts_name = $postdata['fonts_name'];
    for($i=0; $i < count($fonts_id); $i++){
        if(!empty($fonts_id[$i])){
            $result[] = array(
                'id' => $fonts_id[$i],
                'name' => $fonts_name[$i]
            );
        }
    }
    $data['files'] = json_encode($result);

    $output = array(
        'status' => false,
        'msg' => 'Please try again'
    );

    if(!empty($data['name']) && !empty($result)){
        $insert = $model->insertFontGroup($data);

        if($insert){
            $output = array(
                'status' => true,
                'msg' => 'Group Created successfully'
            );
        }else{
            $output = array(
                'status' => false,
                'msg' => 'Something wrong try again later'
            );
        }

    }else{
        $output = array(
            'status' => false,
            'msg' => 'Group Name & Font Selection is Required'
        );
    }

    echo json_encode($output);
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
        $delete = $model->deleteGroup($id);
        if($delete){
            $data = array(
                'status' => true,
                'msg'  => 'Deleted'
            );
        }
    }
    echo json_encode($data);
}

