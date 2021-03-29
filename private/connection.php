<?php

class Connection{

    private $dsn = '';
    private $user = '';
    private $pass = '';

    public function conn() {
        try {
            $conn = new PDO($this->dsn,$this->user,$this->pass);
            //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo 'Conexão bem sucedida<br>';
            return $conn;
        }catch(PDOException $e) { //CASO DÊ ALGUM ERRO NA CONEXÃO
                echo 'ERRO!<br>'; 
                $m = $e->getMessage();
                $c = $e->getCode();
                echo '<pre>';
                echo 'Código: ' .$c. ' | Mensagem: '.$m;
                echo '</pre>';
        }
    }
}

?>