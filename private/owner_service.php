<?php


//CRUD
class OwnerService {

	private $conn;
    private $owner;

    public function __construct(Owner $owner, Connection $conn){
        $this->owner = $owner;
        $this->conn = $conn->conn();
    }


    public function insert(){ 
        $query = 'INSERT INTO cliente (nome, telefone) VALUES (:nome,:telefone)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':nome', $this->owner->__get('name'));
        $stmt->bindValue(':telefone', $this->owner->__get('phone'));
        $stmt->execute();  
        return $this->conn->lastInsertId();
    }
    public function delete(){ 
        $query = "DELETE FROM `cliente` WHERE `id_cliente` = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->owner->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT c.id_cliente, c.nome, c.telefone
        FROM cliente AS c ORDER BY c.id_cliente';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
    }
    public function update(){
		if ($this->owner->__get('name')) {
			$query  =  "UPDATE `cliente` SET `nome` = :nome WHERE `id_cliente` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':nome', $this->owner->__get('name'));
			$stmt->bindValue(':id', $this->owner->__get('id'));
			$stmt->execute(); 
			//echo "debug service";
		}
		if ($this->owner->__get('vehicle')) {
			$query  =  "UPDATE `cliente` SET `telefone` = :telefone WHERE `id_cliente` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':telefone', $this->owner->__get('phone'));
			$stmt->bindValue(':id', $this->owner->__get('id'));
			$stmt->execute();   
			//echo "debug price";
		}
    }
}

?>