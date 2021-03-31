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
        $query = "INSERT INTO os (servico, valor, pagamento, cliente_id_cliente) VALUES (:servico,:valor,:pagamento,:cliente)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':servico', $this->os->__get('service'));
        $stmt->bindValue(':valor', $this->os->__get('price'));
        $stmt->bindValue(':pagamento', $this->os->__get('paymentMethod'));
        $stmt->bindValue(':cliente', 1);
        $stmt->execute();
    }
    public function delete(){ 
        $query = "DELETE FROM `os` WHERE `id_os` = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->os->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT  o.id_os, o.data, o.hora, o.servico, o.valor, o.pagamento, c.nome, c.telefone, p.placa, p.veiculo, p.cor  FROM os AS o INNER JOIN cliente AS c ON o.cliente_id_cliente = c.id_cliente
        INNER JOIN placa_has_cliente AS h ON c.id_cliente = h.cliente_id_cliente
        INNER JOIN placa AS p ON h.placa_id_placa = p.id_placa';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
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