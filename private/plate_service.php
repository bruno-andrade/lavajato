<?php


//CRUD
class PlateService {

	private $conn;
    private $plate;

    public function __construct(Plate $plate, Connection $conn){
        $this->plate = $plate;
        $this->conn = $conn->conn();
    }


    public function insert(){ 
        $query = "INSERT INTO placa (placa, veiculo, cor) VALUES (:placa,:veiculo,:cor)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':placa', $this->plate->__get('plate'));
        $stmt->bindValue(':veiculo', $this->plate->__get('vehicle'));
        $stmt->bindValue(':cor', $this->plate->__get('color'));
        $stmt->execute();  
        return $this->conn->lastInsertId();
    }
    /*  FUNÇÃO DESABILITADA 
        public function delete(){ 
            $query = "DELETE FROM `placa` WHERE `id_placa` = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $this->plate->__get('id'));
            $stmt->execute();
        }
    */
    public function select(){
        $query = 'SELECT * FROM placa 		
        INNER JOIN cliente_has_placa ON id_placa = placa_id_placa
        INNER JOIN cliente ON cliente_id_cliente = id_cliente
        ORDER BY nome ASC';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
    }
    public function search(){
        $query = "SELECT * FROM placa 		
        INNER JOIN cliente_has_placa ON id_placa = placa_id_placa
        INNER JOIN cliente ON cliente_id_cliente = id_cliente
        WHERE placa LIKE :placa 
        ORDER BY placa ASC";
        $placaSearch = "%".$this->plate->__get('plate')."%";
        $stmt  = $this->conn->prepare($query);
        $stmt->bindValue(':placa', $placaSearch);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
    }
    public function update(){
		if ($this->plate->__get('plate')) {
			$query  =  "UPDATE `placa` SET `placa` = :placa WHERE `id_placa` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':placa', $this->plate->__get('plate'));
			$stmt->bindValue(':id', $this->plate->__get('id'));
			$stmt->execute(); 
			//echo "debug service";
		}
		if ($this->plate->__get('vehicle')) {
			$query  =  "UPDATE `placa` SET `veiculo` = :veiculo WHERE `id_placa` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':veiculo', $this->plate->__get('vehicle'));
			$stmt->bindValue(':id', $this->plate->__get('id'));
			$stmt->execute();   
			//echo "debug price";
		}
		if ($this->plate->__get('color')) {
			$query  =  "UPDATE `placa` SET `cor` = :cor WHERE `id_placa` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':cor', $this->plate->__get('color'));
			$stmt->bindValue(':id', $this->plate->__get('id'));
			$stmt->execute();   
			//echo "debug payment";
		}  
    }
}

?>