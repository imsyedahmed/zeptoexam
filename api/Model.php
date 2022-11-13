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
    }
    
    private function _dbConnect(){
        $this->_connect = new Medoo([
            'type' => 'mysql',
            'host' => $_ENV['HOSTNAME'],
            'database' => $_ENV['DBNAME'],
            'username' => $_ENV['DBUSER'],
            'password' => $_ENV['DBPASS']
        ]);
        var_dump($this->_connect->error);
    }
    
    private function _insertFont($data){
        return $this->_connect->insert("fonts", $data);
    }

    private function _insertFontGroup($data){
        return $this->_connect->insert("fontgroup", $data);
    }

    private function _insertFontGroupRow($data){
        return $this->_connect->insert("groupitems", $data);
    }


    public function uploadfile(){
        $this->_filename = $_FILES["file"]["name"];
        $this->_tmp = $_FILES["file"]["tmp_name"];
        $this->_uploadfile = $this->_src . basename($this->_filename);
        $filetype = explode(".",$this->_filename);
        $this->_type = $filetype[count($filetype)-1];
        if(strtolower($this->_type) == "ttf"){
            if(move_uploaded_file($this->_tmp, $this->_uploadFile)){
                $data['font_name'] = $this->_filename;
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