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
        <section id='clients'>
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col'>
                        <div class='articles card'>
                            <div class='card-body'>";

        foreach ($retorno as $value) {

            $print .= "<div id='".$value['id_cliente']."' class='item'>
                <div class='image'>
                    <img src='images/favicon-144x144.png' alt='imagem de perfil' class='img-fluid rounded-circle'>
                </div>
                <div class='text'>
                    <h3>".$value['nome']."</h3>
                </div>
            </div>";            
        }

        $print .= "</div></div></div></div></div></section>";

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