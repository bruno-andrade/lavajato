$(document).ready(function(){
    //INICIA A LISTA DE OS's
    select('os');

    // FUNÇÕES DO MENU
    $("#menu-clients").click(function(){
        select('owner');
    });
    $("#menu-list").click(function(){
        select('os');
    });
    $("#menu-car-plates").click(function(){
        select('plate');
    });
    $("#menu-dashboard").click(function(){
        $("#main").load("dashboard.html"); 
    });    

    // CRIA O MODAL DE NOVA OS    
    $(document).on('click','#osModalButton', function(){
        let osModal = new bootstrap.Modal(document.getElementById('osModal'));
        datetime();
        osModal.show();
        $('.close').click( function(){
            $('input[name="serviceOption"]').each( function () {
                this.checked = false;
            });
            $('input[name="paymentOption"]').each( function () {
                this.checked = false;
            });
            limparCampos();
            osModal.hide();
        }); 
    });

    //EDIÇÃO DA OS
    $(document).on('click','.layer', function(){
        //INICIANDO MODAL, DATA E HORA
        datetime();

        //PEGA O ID DO ELEMENTO CLICADO
        var elmId = $(this).attr('id');

        let osModal = new bootstrap.Modal(document.getElementById('osModal'));
        osModal.show();                         

        //GUARDA OS VALORES QUE VÃO SER EDITADOS
        let placa     = document.getElementById('plate'+elmId).innerHTML; 
        let nome      = document.getElementById('name'+elmId).innerHTML; 
        let veiculo   = document.getElementById('vehicle'+elmId).innerHTML; 
        let servico   = document.getElementById('service'+elmId).innerHTML; 
        let telefone  = document.getElementById('phone'+elmId).innerHTML; 
        let valor     = document.getElementById('price'+elmId).innerHTML; 
        let pagamento = document.getElementById('paymentMethod'+elmId).innerHTML;
        
        //AJUSTANDO ID
        servico   = servico.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        pagamento = pagamento.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

        //MANIPULANDO STRINGS
            //SEPARANDO O VEICULO DA COR
        veiculo   = veiculo.replace(' - ', '/');
        let index = veiculo.indexOf('/');
        let cor   = veiculo.slice(index + 1);
        veiculo   = veiculo.slice(0, index);
            //SEPARANDO OS SERVICOS EM UM ARRAY
        let arrayServico = servico.split(",");   

            //SEPARANDO O DDD DO NÚMERO
        let ddd   = telefone.slice(0, 2);
        telefone  = telefone.slice(2);            
        
        //COLOCA OS VALORES DENTRO DOS CAMPOS DO MODAL PARA EDIÇÃO
        document.getElementById('placa').value      = placa;
        document.getElementById('nome').value       = nome;
        document.getElementById('veiculo').value    = veiculo;
        document.getElementById('cor').value        = cor;
        document.getElementById('telefone').value   = telefone; 
        document.getElementById('ddd').value        = ddd; 
        document.getElementById('valor').value      = valor;              
        document.getElementById(pagamento).checked  = true;
        arrayServico.forEach(element => {
            document.getElementById(element).checked= true; 
        });
        $('.close').click( function(){
            limparCampos(arrayServico, pagamento);
            osModal.hide();
        }); 
    });
});

//LOADING SCREEN
$(window).on('load', function() {
    $('#loading-screen').remove();        
});

function limparCampos(arrayServico, pagamento) {
    if (arrayServico) {
        arrayServico.forEach(element => {
            document.getElementById(element).checked = false; 
        });
    }
    if (pagamento) {
        document.getElementById(pagamento).checked  = false;
    }
    document.getElementById('placa').value      = "";
    document.getElementById('nome').value       = "";
    document.getElementById('veiculo').value    = "";
    document.getElementById('cor').value        = "";
    document.getElementById('telefone').value   = ""; 
    document.getElementById('ddd').value        = 82; 
    document.getElementById('valor').value      = "";
}

//FUNÇÕES 'CRUD' ASSINCRONAS
// NOTE TO SELF: CRIAR 3 INSERTS DIFERENTES QUE RETORNAM O ID DOS DADOS INSERIDOS POR MEIO DO XHTTP.RESPONSETEXT
function dados() {
    //PEGA TODOS OS SERVIÇOS SELECIONADOS E ARMAZENA NUM ARRAY
    let x = document.querySelectorAll('[name=serviceOption]:checked');
    let servico = "";
    //JUNTA OS SERVIÇOS NUMA VARIÁVEL SÓ
    x.forEach(element => {
        servico += $(element).attr('value') + ",";
    });
    
    //GUARDA TODOS OS DADOS PREENCHIDOS NO FORMULÁRIO DE NOVA OS
    let z               = document.querySelectorAll('[name=paymentOption]:checked'); 

    let plate           = document.getElementById('placa').value;
    let name            = document.getElementById('nome').value;
    let vehicle         = document.getElementById('veiculo').value;
    let color           = document.getElementById('cor').value;
    let telefone        = document.getElementById('telefone').value; 
    let ddd             = document.getElementById('ddd').value; 
    let price           = document.getElementById('valor').value;
    let paymentMethod   = $(z[0]).attr('id');
    service             = servico.slice(0, -1);
    let phone           = `${ddd}${telefone}`;         
    
    //let arrayIds = [plate, name, vehicle, color, phone, service, price, paymentMethod];
    //console.log(arrayIds);
}


function select(params) {
    let xhttp = new XMLHttpRequest();
    url = params+"_controller.php?opt=select";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = xhttp.responseText;       
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}

function update(page,id, param1, param2, param3) {
    let xhttp = new XMLHttpRequest();
    url = page+"_controller.php?opt=update&param1="+param1+"&param2="+param2+"param3="+param3;    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            select(page);     
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}

function insert(page, param1, param2, x) {
    let xhttp = new XMLHttpRequest();
    url = page+"_controller.php?opt=insert&param1="+param1+"&param2="+param2;    
    xhttp.onreadystatechange = function() {        
        if (this.readyState == 4 && this.status == 200) {
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
            select('os');         
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}



function novaOS() {

    //PEGA TODOS OS SERVIÇOS SELECIONADOS E ARMAZENA NUM ARRAY
    let x = document.querySelectorAll('[name=serviceOption]:checked');
    let servico = "";
    //JUNTA OS SERVIÇOS NUMA VARIÁVEL SÓ
    x.forEach(element => {
        servico += $(element).attr('value') + ",";
    });
    
    //GUARDA TODOS OS DADOS PREENCHIDOS NO FORMULÁRIO DE NOVA OS
    let z               = document.querySelectorAll('[name=paymentOption]:checked'); 

    let plate           = document.getElementById('placa').value;
    let name            = document.getElementById('nome').value;
    let vehicle         = document.getElementById('veiculo').value;
    let color           = document.getElementById('cor').value;
    let telefone        = document.getElementById('telefone').value; 
    let ddd             = document.getElementById('ddd').value; 
    let price           = document.getElementById('valor').value;
    let paymentMethod   = $(z[0]).attr('id');
    service             = servico.slice(0, -1);
    let phone           = `${ddd}${telefone}`;   
    
    let url1 = "owner_controller.php?opt=insert";
    let url2 = "plate_controller.php?opt=insert";
    let url3 = "os_controller.php?opt=insert";
    let url4 = "nm_controller.php?opt=insert";

    
    $.get( url1, { param1: name, param2: phone } ).done(function (response1) {
        $.get( url2, { param1: plate, param2: vehicle, param3: color } ).done(function (response2) {
            $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: response1, param5: response2} );
            //$.get( url4, { param1: response1, param2: response2 } );
        });
    });
    
}


//FUNÇÃO PRA OBTER HORA E DATA
function datetime() {
    var dt      = new Date();
    var months  = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date    = dt.getDay() + " de " + months[dt.getMonth()] + " de " + dt.getFullYear();
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