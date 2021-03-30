<?php


//CRUD
class OsService {

	private $conn;
    private $os;

    public function __construct(Os $os, Connection $conn){
        $this->os = $os;
        $this->conn = $conn->conn();
    }


    public function insert(){ 
        $query = "INSERT INTO os (servico, valor, pagamento, cliente_id_cliente) VALUES (:servico,:valor,:pagamento,1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':servico', $this->os->__get('service'));
        $stmt->bindValue(':valor', $this->os->__get('price'));
        $stmt->bindValue(':pagamento', $this->os->__get('paymentMethod'));
        $stmt->execute();
    }
    public function delete(){ 
        $query  =  "DELETE FROM `os` WHERE `id_os` = :id";
        $stmt  = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->os->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT * FROM os';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        /*echo $print[1]['id_os'];
        echo $print[1]['data'];
        echo $print[1]['hora'];
        echo $print[1]['servico'];
        echo $print[1]['valor'];
        echo $print[1]['pagamento'];
        echo $print[1]['cliente_id_cliente'];*/
        
        
        
    }
    public function update(){
		if ($this->os->__get('service')) {
			$query  =  "UPDATE `os` SET `servico` = :servico WHERE `id_os` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':servico', $this->os->__get('service'));
			$stmt->bindValue(':id', $this->os->__get('id'));
			$stmt->execute(); 
			//echo "debug service";
		}
		if ($this->os->__get('price')) {
			$query  =  "UPDATE `os` SET `valor` = :valor WHERE `id_os` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':valor', $this->os->__get('price'));
			$stmt->bindValue(':id', $this->os->__get('id'));
			$stmt->execute();   
			//echo "debug price";
		}
		if ($this->os->__get('paymentMethod')) {
			$query  =  "UPDATE `os` SET `pagamento` = :pagamento WHERE `id_os` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':pagamento', $this->os->__get('paymentMethod'));
			$stmt->bindValue(':id', $this->os->__get('id'));
			$stmt->execute();   
			//echo "debug payment";
		}  
    }
}

?>