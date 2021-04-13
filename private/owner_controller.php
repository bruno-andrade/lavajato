<?php

	require "owner_model.php";
	require "owner_service.php";
	require "connection.php";


	isset($_GET['opt'])     ? $opt     = $_GET['opt']    : null;
    isset($_GET['id'])      ? $id      = $_GET['id']     : null;
    isset($_GET['param1'])  ? $name    = $_GET['param1'] : null;
    isset($_GET['param2'])  ? $phone   = $_GET['param2'] : null;

switch ($opt) {
    case 'insert':
        $owner = new Owner();        
        isset($name)      ? $owner->__set('name', $name)     :null;
        isset($phone)     ? $owner->__set('phone', $phone)     :null;
        $conn = new Connection();
        $owner_service = new OwnerService($owner, $conn);
        $ownerID = $owner_service->insert();
        echo $ownerID;
        break;
    case 'select':
        $owner = new Owner();
		$conn = new Connection();
        $owner_service = new OwnerService($owner, $conn);
        $retorno = $owner_service->select();
        $print = "
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col'>
                        <div class='articles card'>
                            <div class='card-body'>";

        foreach ($retorno as $value) {
            //SCRIPT PARA PEGAR AS INICIAIS DO NOME
            $nome = str_word_count($value['nome'],1);
            $index = count($nome) - 1;            
            $inicial = substr($nome[0],0 , (strlen($nome[0])-1)*(-1));
            if ($index > 0) {
                $inicial .= substr($nome[$index],0 , (strlen($nome[$index])-1)*(-1));
            }          

            $print .= "<div id='".$value['id_cliente']."' class='item'>
                <div id='image' class='image'>
                    <p>".$inicial."</p>
                </div>
                <div class='text'>
                    <h3>".$value['nome']."</h3>
                </div>
                <div class='actions'>
                    <a class='m' href='#'>
                        <svg class='feather'>
                            <use xlink:href='images/feather/feather-sprite.svg#message-circle'/>
                        </svg>
                    </a>
                    <a href='#'>
                        <svg class='feather'>
                            <use xlink:href='images/feather/feather-sprite.svg#phone'/>
                        </svg>
                    </a>
                </div>
            </div>";            
        }

        $print .= "</div></div></div></div></div>";

        echo $print;
        break;
    case 'delete':
        $owner = new Owner();
        $owner->__set('id', $id);
		$conn = new Connection();
        $owner_service = new OwnerService($owner, $conn);        
        $owner_service->delete(); 
        break;
    case 'update':
        $owner = new Owner();
        isset($name)   ? $owner->__set('name', $name)    :null;
        isset($phone)   ? $owner->__set('phone', $phone)    :null;
        isset($id)      ? $owner->__set('id', $id)          :null;
        $conn = new Connection();
        $owner_service = new OwnerService($owner, $conn);
        echo $owner_service->update();
        break;
    default:
        # code...
        break;
}



?>