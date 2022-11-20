<?php 
require __DIR__ . '/vendor/autoload.php';

use Medoo\Medoo;

class Model {
    private $_src =  "./fonts/";
    private $_tmp;
    private $_filename;
    private $_type;
    private $_uploadfile;
    private $_connect;

    public function __construct(){
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        $this->_connect = new Medoo([
            'type' => 'mysql',
            'host' => $_ENV['HOSTNAME'],
            'database' => $_ENV['DBNAME'],
            'username' => $_ENV['DBUSER'],
            'password' => $_ENV['DBPASS']
        ]);
    }

    private function _insertFont($data){
        return $this->_connect->insert("fonts", $data);
    }

    public function getFontList(){
        return $this->_connect->select("fonts", "*");
    }

    public function getFontInfo($id){
        return $this->_connect->select("fonts", "*", array('id' => $id));
    }

    public function deleteFont($id){
        return $this->_connect->delete("fonts", array('id'=> $id));
    }

    // for font group 
    public function getFontGroupList(){
        return $this->_connect->select("fontgroups", "*");
    }
    
    public function insertFontGroup($data){
        return $this->_connect->insert("fontgroups", $data);
    }

    public function deleteGroup($id){
        return $this->_connect->delete("fontgroups", array('id'=> $id));
    }

    public function uploadfile(){
        $this->_filename = $_FILES["file"]["name"];
        $this->_tmp = $_FILES["file"]["tmp_name"];
        $this->_uploadfile = $this->_src . basename($this->_filename);
        $filetype = explode(".", $this->_filename);
        $this->_type = $filetype[count($filetype)-1];
        if(strtolower($this->_type) == "ttf"){
            if(move_uploaded_file($this->_tmp, $this->_uploadfile)){
                $lfilename = array_pop($filetype);
                $data['name'] = implode(' ', $filetype);
                $data['file_name'] = $this->_filename;
                $ins = $this->_insertFont($data);
                if($ins){
                    return array(
                        'status' => true,
                        'msg'=> 'Data Inserted Successfully'
                    );
                }else{
                    return array(
                        'status' => false,
                        'msg'=> 'Data Inserted Failed'
                    );
                }
            }else{
                return array(
                    'status' => false,
                    'msg'=> 'Upload Failed'
                );
            }
        }else{
            return array(
                'status' => false,
                'msg'=> 'Only ttf Fonts are allowed'
            );
        }
        
    }


    

}