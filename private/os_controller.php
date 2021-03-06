<?php

	require "os_model.php";
	require "os_service.php";
	require "connection.php";

	isset($_GET['opt'])     ? $opt          = $_GET['opt']    : null;
    isset($_GET['id'])      ? $id           = $_GET['id']     : null;
    isset($_GET['param1'])  ? $service      = $_GET['param1'] : null;
    isset($_GET['param2'])  ? $price        = $_GET['param2'] : null;
    isset($_GET['param3'])  ? $paymentMethod= $_GET['param3'] : null;
    isset($_GET['param4'])  ? $ownerID      = $_GET['param4'] : null;
    isset($_GET['param5'])  ? $plateID      = $_GET['param5'] : null;

switch ($opt) {
    case 'insert':
        $os = new Os();        
        isset($service)        ? $os->__set('service', $service)             :null;
        isset($price)          ? $os->__set('price', $price)                 :null;
        isset($paymentMethod)  ? $os->__set('paymentMethod', $paymentMethod) :null;
        isset($ownerID)        ? $os->__set('ownerID', $ownerID)             :null;
        isset($plateID)        ? $os->__set('plateID', $plateID)             :null;

        //$array = [$service, $price, $paymentMethod, $ownerID, $plateID];
        //print_r($array);
        $conn = new Connection();
        $os_service = new OsService($os, $conn);
        $os_service->relationshipInsert();
        $os_service->insert();
        break;
    case 'select':
        $os = new Os();
		$conn = new Connection();
        $os_service = new OsService($os, $conn);
        $retorno = $os_service->select();
        $print ="<div class='container-fluid'>";

        foreach ($retorno as $value) {
            $print .= "    
            <div onclick='editarOS(".$value['id_os'].")' class='layer'>                   
            <div class='pill lists'>            
                <div class='pill-header'>
                    <div class='car-plate'><span id='plate".$value['id_os']."' class='car-plate-span'>".$value['placa']."</span></div>
                </div>
                <div class='pill-content'>
                    <div id='idOs".$value['id_os']."' class='d-none'>".$value['id_os']."</div>
                    <div id='idCliente".$value['id_os']."' class='d-none'>".$value['cliente_id_cliente']."</div>
                    <div id='idPlaca".$value['id_os']."' class='d-none'>".$value['placa_id_placa']."</div>
                    <div id='phone".$value['id_os']."' class='d-none'>".$value['telefone']."</div>
                    <div id='price".$value['id_os']."' class='d-none'>".$value['valor']."</div>
                    <div id='paymentMethod".$value['id_os']."' class='d-none'>".$value['pagamento']."</div>
                    <h2 id='name".$value['id_os']."'>".$value['nome']."</h2>
                    <div class='desc'>
                        <p id='vehicle".$value['id_os']."'>".$value['veiculo']." - ".$value['cor']."</p>
                        <p id='service".$value['id_os']."'>".$value['servico']."</p>
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
                </div>
            </div></div>";
        }
        $print .= "</div>";
        echo $print;


        break;
    case 'delete':
        $os = new Os();
        $os->__set('id', $id);
		$conn = new Connection();
        $os_service = new OsService($os, $conn);        
        $os_service->delete(); 
        break;
    case 'update':
        $os = new Os();
        isset($service)         ? $os->__set('service', $service)             :null;
        isset($price)           ? $os->__set('price', $price)                 :null;
        isset($paymentMethod)   ? $os->__set('paymentMethod', $paymentMethod) :null;
        isset($ownerID)         ? $os->__set('ownerID', $ownerID)             :null;
        isset($plateID)         ? $os->__set('plateID', $plateID)             :null;
        isset($id)              ? $os->__set('id', $id)                       :null;
        $conn = new Connection();
        $os_service = new OsService($os, $conn);
        $retorno = $os_service->update();
        break;
    default:
        # code...
        break;
}



?>