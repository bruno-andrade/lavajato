<?php 

class Os{
    private $date;
    private $time;    
    private $service;
    private $price;
    private $paymentMethod;
    private $id;

    public function __set($parametro, $valor){
        return $this->$parametro = $valor;
    }
    public function __get($parametro){
        return $this->$parametro;
    }
    
}

?>