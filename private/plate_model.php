<?php 

class Plate{
    private $plate;
    private $vehicle;
    private $color;    
    private $id;

    public function __set($parametro, $valor){
        return $this->$parametro = $valor;
    }
    public function __get($parametro){
        return $this->$parametro;
    }    
}

?>