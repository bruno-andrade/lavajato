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
        $query = "INSERT INTO tarefas(titulo) VALUES (:tarefa)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':tarefa', $this->tarefa->__get('titulo'));
        $stmt->execute();

    }
    public function delete(){ 
        $query  =  "UPDATE `tarefas` SET `delete` = 0 WHERE `id_tarefas` = :id";
        $stmt  = $this->conn->prepare($query);
        $stmt->bindValue(':id', $this->tarefa->__get('id'));
        $stmt->execute();
    }
    public function select(){
        $query = 'SELECT * FROM tarefas';
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function update($parametro){
        if ($parametro == 'titulo') {
            $query  =  "UPDATE `tarefas` SET `titulo` = :titulo WHERE `id_tarefas` = :id";
            $stmt  = $this->conn->prepare($query);
            $stmt->bindValue(':titulo', $this->tarefa->__get('titulo'));
            $stmt->bindValue(':id', $this->tarefa->__get('id'));        
        }else{
            $query  =  "UPDATE `tarefas` SET `status` = :status WHERE `id_tarefas` = :id";
            $stmt  = $this->conn->prepare($query);
            $stmt->bindValue(':status', $this->tarefa->__get('status'));
            $stmt->bindValue(':id', $this->tarefa->__get('id'));
            
        }
        $stmt->execute();
        
    }
}

?>