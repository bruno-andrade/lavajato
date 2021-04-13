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
        $stmt->bindValue(':cliente', $this->os->__get('ownerID'));
        $stmt->bindValue(':placa', $this->os->__get('plateID'));    
        $stmt->execute();
        echo $query;
    }
    public function delete(){ 
        $query = "DELETE FROM `os` WHERE `id_os` = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->os->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT o.id_os, p.placa, c.nome, c.telefone, p.veiculo, p.cor, o.servico, o.valor, o.pagamento, o.cliente_id_cliente, o.placa_id_placa  
        FROM os AS o, cliente AS c, placa AS p
        WHERE o.cliente_id_cliente = c.id_cliente AND
        o.placa_id_placa = p.id_placa
        ORDER BY id_os DESC';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);        
    }
    public function update(){
        function updateResponsivo($coluna, $variavel){
            $query  =  "UPDATE `os` SET $coluna = :valor WHERE `id_os` = :id";
			$stmt  = $this->conn->prepare($query);
			$stmt->bindValue(':valor', $this->os->__get($variavel));
			$stmt->bindValue(':id', $this->os->__get('id'));
			$stmt->execute();  
        }
		if ($this->os->__get('service')) {
            updateResponsivo('servico', 'service');
		}
		if ($this->os->__get('price')) {
			updateResponsivo('valor', 'price');
		}
		if ($this->os->__get('paymentMethod')) {
            updateResponsivo('pagamento', 'paymentMethod');
		}
        if ($this->os->__get('ownerID')) {
            updateResponsivo('cliente_id_cliente', 'ownerID');
		}  
        if ($this->os->__get('plateID')) {
            updateResponsivo('placa_id_placa', 'plateID');
		}    
    }
}

?>