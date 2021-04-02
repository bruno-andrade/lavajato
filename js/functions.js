$(document).ready(function(){
    // FUNÇÕES DO MENU
    $("#menu-clients").click(function(){
        $(function(){
            $("#main").load("contacts.html"); 
        });
    });
    $("#menu-list").click(function(){
        $(function(){
            $("#main").load("list.html"); 
        });
    });
    $("#menu-dashboard").click(function(){
        $(function(){
            $("#main").load("dashboard.html"); 
        });
    });
    $("#menu-car-plates").click(function(){
        $(function(){
            $("#main").load("carplates.html"); 
        });
    });

    //INICIA A LISTA DE OS's
    select();

    // CRIA O MODAL DE NOVA OS
    var osModal = new bootstrap.Modal(document.getElementById('osModal'));
    $(document).on('click','#osModalButton', function(){
        datetime();
        osModal.show();
    });

    //EDIÇÃO DA OS
    $(document).on('click','.layer', function(){
            //INICIANDO MODAL, DATA E HORA
            datetime();

            //PEGA O ID DO ELEMENTO CLICADO
            var elmId = $(this).attr('id');

            var editModal = new bootstrap.Modal(document.getElementById('osModal'));
            editModal.show();                         
    
            //GUARDA OS VALORES QUE VÃO SER EDITADOS
            let placa     = document.getElementById('plate'+elmId).innerHTML; 
            let nome      = document.getElementById('name'+elmId).innerHTML; 
            let veiculo   = document.getElementById('vehicle'+elmId).innerHTML; 
            let servico   = document.getElementById('service'+elmId).innerHTML; 
            let telefone  = document.getElementById('phone'+elmId).innerHTML; 
            let valor     = document.getElementById('price'+elmId).innerHTML; 
            let pagamento = document.getElementById('paymentMethod'+elmId).innerHTML; 
    
            //MANIPULANDO STRINGS
                //SEPARANDO O VEICULO DA COR
            veiculo   = veiculo.replace(' - ', '/');
            let index = veiculo.indexOf('/');
            let cor   = veiculo.slice(index + 1);
            veiculo   = veiculo.slice(0 ,index);
                //SEPARANDO O DDD DO NÚMERO
            let ddd   = telefone.slice(0, 2);
            telefone  = telefone.slice(2);
                //AJUSTANDO ID
            servico   = servico.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            pagamento = pagamento.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            
            
            //COLOCA OS VALORES DENTRO DOS CAMPOS DO MODAL PARA EDIÇÃO
            document.getElementById('placa').value = placa;
            document.getElementById('nome').value = nome;
            document.getElementById('veiculo').value = veiculo;
            document.getElementById('cor').value = cor;
            document.getElementById(servico).checked = true;
            document.getElementById('telefone').value = telefone; 
            document.getElementById('ddd').value = ddd; 
            document.getElementById('valor').value = valor;              
            document.getElementById(pagamento).checked = true; 
            
            $('#cancelar').click( function(){
                document.getElementById(servico).checked = false;
            });
        });   
    
});

    

//LOADING SCREEN
$(window).on('load', function() {
    $('#loading-screen').remove();        
});

//FUNÇÕES 'CRUD' ASSINCRONAS
// NOTE TO SELF: CRIAR 3 INSERTS DIFERENTES QUE RETORNAM O ID DOS DADOS INSERIDOS POR MEIO DO XHTTP.RESPONSETEXT
function insert() {
    let x = document.querySelectorAll('[name=serviceOption]:checked');
    let servico;
    x.forEach(element => {
        servico += $(element).attr('id') + ",";
    });
    
    let z = document.querySelectorAll('[name=paymentOption]:checked'); 

    let plate = document.getElementById('placa').value;
    let name = document.getElementById('nome').value;
    let vehicle = document.getElementById('veiculo').value;
    let color = document.getElementById('cor').value;
    let telefone = document.getElementById('telefone').value; 
    let ddd = document.getElementById('ddd').value; 
    let price = document.getElementById('valor').value;
    let paymentMethod = $(z[0]).attr('id');
    service = servico.slice(0, -1);
    let phone = `${ddd}${telefone}`;          
    
    url = "os_controller.php?opt=insert&plate="+plate+"&name="+name+"&vehicle="+vehicle+"&color="+color+"&phone="+phone+"&price="+price+"&paymentMethod="+paymentMethod+"&service="+service;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('dado cadastrado');    
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}

function select() {
    let xhttp = new XMLHttpRequest();
    url = "os_controller.php?opt=select";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;       
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}

function deletar(id) {
    let xhttp = new XMLHttpRequest();
    url = "os_controller.php?opt=delete&id="+id;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            select();         
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}



//FUNÇÃO PRA OBTER HORA E DATA
function datetime() {
    var dt = new Date();
    var months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date = dt.getDay() + " de " + months[dt.getMonth()] + " de " + dt.getFullYear();
    var time;
    if (dt.getHours() < 10) {
        time = "0" + dt.getHours();   
    }else{
        time = dt.getHours();
    }
    if (dt.getMinutes() < 10) {
        time += ":0" + dt.getMinutes();
    }else{
        time += ":" + dt.getMinutes(); 
    }
    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;
}