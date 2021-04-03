<?php

	require "os_model.php";
	require "os_service.php";
	require "connection.php";

	isset($_GET['opt'])     ? $opt          = $_GET['opt']    : null;
    isset($_GET['id'])      ? $id           = $_GET['id']     : null;
    isset($_GET['param1'])  ? $service      = $_GET['param1'] : null;
    isset($_GET['param2'])  ? $price        = $_GET['param2'] : null;
    isset($_GET['param3'])  ? $paymentMethod= $_GET['param3'] : null;

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
        $print ="<section id='list'>
                    <div class='container-fluid'>";

        foreach (array_reverse($retorno) as $value) {
            $print .= "    
            <span id='".$value['id_os']."' class='layer'>                   
            <div class='pill lists'>            
                <div class='pill-header'>
                    <div class='car-plate'><span id='plate".$value['id_os']."' class='car-plate-span'>".$value['placa']."</span></div>
                </div>
                <div class='pill-content'>
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
            </div></span>";
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