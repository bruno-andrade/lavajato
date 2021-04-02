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
        $query = "INSERT INTO os (servico, valor, pagamento, cliente_id_cliente, placa_id_placa) VALUES (:servico,:valor,:pagamento,:cliente, :placa)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':servico', $this->os->__get('service'));
        $stmt->bindValue(':valor', $this->os->__get('price'));
        $stmt->bindValue(':pagamento', $this->os->__get('paymentMethod'));
        $stmt->bindValue(':cliente', 1);
        $stmt->bindValue(':placa', 1);
        $stmt->execute();
    }
    public function delete(){ 
        $query = "DELETE FROM `os` WHERE `id_os` = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->os->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT o.id_os, p.placa, c.nome, c.telefone, p.veiculo, p.cor, o.servico, o.valor, o.pagamento  
        FROM os AS o, cliente AS c, placa AS p
        WHERE o.cliente_id_cliente = c.id_cliente AND
        o.placa_id_placa = p.id_placa
        ORDER BY id_os';
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