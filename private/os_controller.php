<?php

	require "os_model.php";
	require "os_service.php";
	require "connection.php";


	isset($_GET['opt'])     ? $opt      = $_GET['opt']      : $opt = 'select';
    isset($_GET['id'])      ? $id       = $_GET['id']       : null;
    isset($_GET['titulo'])  ? $titulo   = $_GET['titulo']   : null;
    isset($_GET['status'])  ? $status   = $_GET['status']   : null;
    isset($_GET['display']) ? $display  = $_GET['display']  : $display = null;

switch ($opt) {
    case 'insert':
        $tarefa = new Tarefa();
        $tarefa->__set('titulo', $titulo);
        $conn = new Connection();
        $tarefaService = new TarefaService($tarefa, $conn);
        $tarefaService->insert();
        break;
    case 'select':
        $tarefa = new Tarefa();
		$conn = new Connection();
        $tarefaService = new TarefaService($tarefa, $conn);        
        $retorno = $tarefaService->select();
        break;
    case 'delete':
        $tarefa = new Tarefa();
        $tarefa->__set('id', $id);
		$conn = new Connection();
        $tarefaService = new TarefaService($tarefa, $conn);        
        $tarefaService->delete(); 
        break;
    case 'update':
        $tarefa = new Tarefa();
        $tarefa->__set('id', $id);
        $tarefa->__set('titulo', $titulo);
        $conn = new Connection();
        $tarefaService = new TarefaService($tarefa, $conn);
        $tarefaService->update('titulo');
        break;
    default:
        # code...
        break;
}



?>