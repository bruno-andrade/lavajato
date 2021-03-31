<?php

	require "os_model.php";
	require "os_service.php";
	require "connection.php";


	isset($_GET['opt'])           ? $opt            = $_GET['opt']          : null;
    isset($_GET['id'])            ? $id             = $_GET['id']           : null;
    isset($_GET['service'])       ? $service        = $_GET['service']      : null;
    isset($_GET['price'])         ? $price          = $_GET['price']        : null;
    isset($_GET['paymentMethod']) ? $paymentMethod  = $_GET['paymentMethod']: null;

switch ($opt) {
    case 'insert':
        $os = new Os();        
        isset($service)         ? $os->__set('service', $service)             :null;
        isset($price)           ? $os->__set('price', $price)                 :null;
        isset($paymentMethod)   ? $os->__set('paymentMethod', $paymentMethod) :null;
        $conn = new Connection();
        $os_service = new OsService($os, $conn);
        $os_service->insert();
        break;
    case 'select':
        $os = new Os();
		$conn = new Connection();
        $os_service = new OsService($os, $conn);
        $retorno = $os_service->select();
        //echo "<pre>";
        //print_r($retorno);
        //echo "</pre>";
        $print ="<section id='list'>
                    <div class='container-fluid'>";

        foreach (array_reverse($retorno) as $value) {
            $print .= "                        
            <div id='".$value['id_os']."' class='pill lists'>
                <div class='pill-header'>
                    <div class='car-plate'><span id='placa".$value['id_os']."' class='car-plate-span'>".$value['placa']."</span></div>
                </div>
                <div class='pill-content'>
                    <h2 id='nome".$value['id_os']."'>".$value['nome']."</h2>
                    <div class='desc'>
                        <p id='veiculo".$value['id_os']."'>".$value['veiculo']." - ".$value['cor']."</p>
                        <p id='servico".$value['id_os']."'>".$value['servico']."</p>
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
            </div>";
        }
        $print .= "</div>
        </section>";
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