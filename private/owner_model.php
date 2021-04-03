<?php 

class Owner{

    private $name;
    private $phone;    
    private $id;

    public function __set($parametro, $valor){
        return $this->$parametro = $valor;
    }
    public function __get($parametro){
        return $this->$parametro;
    }
    
}

?>