<?php

	require "plate_model.php";
	require "plate_service.php";
	require "connection.php";


	isset($_GET['opt'])     ? $opt     = $_GET['opt']    : null;
    isset($_GET['id'])      ? $id      = $_GET['id']     : null;
    isset($_GET['param1'])  ? $plate   = $_GET['param1'] : null;
    isset($_GET['param2'])  ? $vehicle = $_GET['param2'] : null;
    isset($_GET['param3'])  ? $color   = $_GET['param3'] : null;
    

switch ($opt) {
    case 'insert':
        $plateObj = new Plate();        
        isset($plate)     ? $plateObj->__set('plate', $plate)     :null;
        isset($vehicle)   ? $plateObj->__set('vehicle', $vehicle) :null;
        isset($color)     ? $plateObj->__set('color', $color)     :null;
        $conn = new Connection();
        $plate_service = new PlateService($plateObj, $conn);
        $plateID = $plate_service->insert();
        echo $plateID;
        break;
    case 'select':
        $plateObj = new Plate();
		$conn = new Connection();
        if ($plate) {
            $plateObj->__set('plate', $plate);
            $plate_service = new PlateService($plateObj, $conn);
            $retorno = $plate_service->search();
            $print = "";
            foreach ($retorno as $value) {
                $print .= "<option value='".$value['placa']."'>"; 
                //$print .= $value['placa']; 
            }
            echo $print;
        }else{
            $plate_service = new PlateService($plateObj, $conn);
            $retorno = $plate_service->select();   

            $print = "<section id='car-plates'>
                        <div class='container-fluid'>";
    
            foreach ($retorno as $value) {
    
                $print .= "
                <div class='pill plates'>
                    <div class='pill-header'>
                        <div class='car-plate'><span class='car-plate-span'>".$value['veiculo']." - ".$value['cor']."</span></div>
                    </div>
                    <div class='pill-content'>
                        <h2>".$value['placa']."</h2>
                        <p>".$value['nome']."</p>                              
                    </div>
                </div>";            
            }
            $print .= "</div></section>";
            echo $print;
        }

        

        break;
    case 'delete':
        $plateObj = new Plate();
        $plateObj->__set('id', $id);
		$conn = new Connection();
        $plate_service = new PlateService($plateObj, $conn);        
        $plate_service->delete(); 
        break;
    case 'update':
        $plateObj = new Plate();
        isset($plate)   ? $plateObj->__set('plate', $plate)    :null;
        isset($color)   ? $plateObj->__set('color', $color)    :null;
        isset($vehicle) ? $plateObj->__set('vehicle', $vehicle):null;
        isset($id)      ? $plateObj->__set('id', $id)          :null;
        $conn = new Connection();
        $plate_service = new PlateService($plateObj, $conn);
        echo $plate_service->update();
        break;
    default:
        # code...
        break;
}



?>