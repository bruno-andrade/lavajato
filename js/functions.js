$(document).ready(() => {
    //INICIA TODAS AS TELAS
    select('os');
    select('owner');
    select('plate');    

    //NAV HEIGHT
    $('.selected').css('height', $('nav').height());

    $(document).on('click', 'option', () =>{
        console.log('teste');
    });

    // FUNÇÕES DO MENU
    $("#menu-clients").click(() => {
        document.getElementById('clients').style.display    = 'inherit';       
        document.getElementById('list').style.display       = 'none';       
        document.getElementById('car-plates').style.display = 'none'; 
        $('.selected').css('left', '60%');
        $("a").removeClass( "active");
        $("#menu-clients").addClass( "active");      
    });
    $("#menu-list").click(() => {
        document.getElementById('clients').style.display    = 'none';       
        document.getElementById('list').style.display       = 'inherit';       
        document.getElementById('car-plates').style.display = 'none'; 
        $('.selected').css('left', '20%');
        $("a").removeClass( "active");
        $("#menu-list").addClass( "active");
    });
    $("#menu-car-plates").click(() => {
        document.getElementById('clients').style.display    = 'none';       
        document.getElementById('list').style.display       = 'none';       
        document.getElementById('car-plates').style.display = 'inherit';
        $('.selected').css('left', '80%'); 
        $("a").removeClass( "active");
        $("#menu-car-plates").addClass( "active");
    });
    $("#menu-dashboard").click(() => {
        //$("#main").load("dashboard.html"); 
        $('.selected').css('left', '0%');
        $("a").removeClass( "active");
        $("#menu-dashboard").addClass( "active");
    });    

    // CRIA O MODAL DE NOVA OS    
    $(document).on('click','#osModalButton', () => {
        let osModal = new bootstrap.Modal(document.getElementById('osModal'));
        datetime();
        osModal.show();
        $('.close').click( () => {
            $('input[name="serviceOption"]').each( function () {
                this.checked = false;
            });
            $('input[name="paymentOption"]').each( function () {
                this.checked = false;
            });
            limparCampos();
            osModal.hide();
        }); 
        
        $('.salvar').click( () => {
            novaOS();
            limparCampos();
            osModal.hide();
        }); 
    });          
});

//FUNÇÃO DE EDIÇÃO DA OS
function editarOS(params) {
    
    //DEFINE DATA E HORA
    datetime();

    //PEGA O ID DO ELEMENTO CLICADO
    var elmId = params;

    //CRIA E INICIA O MODAL
    let osModal = new bootstrap.Modal(document.getElementById('osModal'));
    osModal.show();                         

    //GUARDA OS VALORES QUE VÃO SER EDITADOS
    let idOs      = document.getElementById('idOs'+elmId).innerHTML; 
    let idCliente = document.getElementById('idCliente'+elmId).innerHTML; 
    let idPlaca   = document.getElementById('idPlaca'+elmId).innerHTML; 
    let placa     = document.getElementById('plate'+elmId).innerHTML; 
    let nome      = document.getElementById('name'+elmId).innerHTML; 
    let veiculo   = document.getElementById('vehicle'+elmId).innerHTML; 
    let servico   = document.getElementById('service'+elmId).innerHTML; 
    let telefone  = document.getElementById('phone'+elmId).innerHTML; 
    let valor     = document.getElementById('price'+elmId).innerHTML; 
    let pagamento = document.getElementById('paymentMethod'+elmId).innerHTML;
    
    //AJUSTA O ID (removendo acentos e letras maiusculas)
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
    //BOTÃO DE FECHAR MODAL
    $('.close').click( () => {
        limparCampos();
        osModal.hide();
    }); 
    //BOTÃO DE SALVAR OS EDITADA
    $('.salvar').click( () => {
        update(idOs, idCliente, idPlaca);
        limparCampos();
        osModal.hide();
    });
}

//LOADING SCREEN
$(window).on('load', () =>  {
    $('#loading-screen').remove();        
});

//FUNÇÃO PRA LIMPAR OS CAMPOS DO MODAL
function limparCampos() {
    $("[type|='checkbox']").prop('checked', false);
    $(":input").prop('value', ''); 
    $("#idPlaca").prop('innerHTML', '');    
    $("#idCliente").prop('innerHTML', '');    
}

//FUNÇÕES 'CRUD' ASSINCRONAS
function select(page) {
    url = page+"_controller.php?opt=select";
    $.get( url ).done(function (response) {
        if (page == 'owner') {
            //RETORNO
            document.getElementById("clients").innerHTML = response;
            //AJUSTE NA IMAGEM DOS CLIENTES       
            //let width = $('.image').css('width');
            //$('.image').css('height',width);
        }else if (page == 'os'){
            //RETORNO
            document.getElementById("list").innerHTML = response;
        }else{
            //RETORNO
            document.getElementById("car-plates").innerHTML = response;
        }
    });
}

function deletar(id, page) {
    url = page+"_controller.php?opt=delete&id="+id;
    $.get( url );
}

function novaOS() {

    //PEGA TODOS OS SERVIÇOS SELECIONADOS E ARMAZENA NUM ARRAY
    let x = document.querySelectorAll('[name=serviceOption]:checked');
    console.log(x);
    let servico = "";
    //JUNTA OS SERVIÇOS NUMA VARIÁVEL SÓ
    x.forEach(element => {
        servico += $(element).attr('value') + ",";
    });
    console.log(servico);
    
    //CAMPOS DO FORMULÁRIO DE NOVA OS 
    let idPlaca         = document.getElementById('idPlaca').innerHTML;
    let idCliente       = document.getElementById('idCliente').innerHTML;

    let payment         = document.querySelectorAll('[name=paymentOption]:checked');
    let price           = document.getElementById('valor').value;
    let paymentMethod   = $(payment[0]).attr('id');
    let service         = servico.slice(0, -1);

    let plate           = document.getElementById('placa').value;
    let vehicle         = document.getElementById('veiculo').value;
    let color           = document.getElementById('cor').value;

    let ddd             = document.getElementById('ddd').value; 
    let telefone        = document.getElementById('telefone').value;
    let phone           = `${ddd}${telefone}`;
    let name            = document.getElementById('nome').value; 

    //URL NO SERVIDOR EM QUE OS DADOS SERÃO ENVIADOS/RECEBIDOS
    let url1 = "owner_controller.php?opt=insert"; 
    let url2 = "plate_controller.php?opt=insert";
    let url3 = "os_controller.php?opt=insert";
    let url4 = "nm_controller.php?opt=insert";
    console.log(service, price, paymentMethod, idCliente, idPlaca);
    //JQUERY AJAX METODO GET
    if (idCliente && idPlaca) {
        $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: idCliente, param5: idPlaca} ).done(() => {
            select('os');
        });
    }else if(idCliente){
        $.get( url2, { param1: plate, param2: vehicle, param3: color } ).done((response2) => {
            $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: idCliente, param5: response2} ).done(() => {
                select('os');
            });
            //$.get( url4, { param1: idCliente, param2: response2 } );
        });    
    }else if(idPlaca){
        $.get( url1, { param1: name, param2: phone } ).done((response1) => {
            $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: response1, param5: idPlaca} ).done(() => {
                select('os');
            });
            //$.get( url4, { param1: response1, param2: response2 } );
        });
    }else{
        $.get( url1, { param1: name, param2: phone } ).done((response1) => {
            $.get( url2, { param1: plate, param2: vehicle, param3: color } ).done((response2) => {
                $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: response1, param5: response2} ).done(() => {
                    select('os');
                });
                //$.get( url4, { param1: response1, param2: response2 } );
            });
        });
    } 

}

function update(idOs, idCliente, idPlaca) {

    console.log(idOs);
    console.log(idCliente);
    console.log(idPlaca);

    //PEGA TODOS OS SERVIÇOS SELECIONADOS E ARMAZENA NUM ARRAY
    let x = document.querySelectorAll('[name=serviceOption]:checked');
    let servico = "";
    //JUNTA OS SERVIÇOS NUMA VARIÁVEL SÓ
    x.forEach(element => {
        servico += $(element).attr('value') + ",";
    });
    
    //GUARDA TODOS OS DADOS PREENCHIDOS NO FORMULÁRIO DE NOVA OS EM VARIÁVEIS
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
    
    let url1 = "owner_controller.php?opt=update"; 
    let url2 = "plate_controller.php?opt=update";
    let url3 = "os_controller.php?opt=update";
    let url4 = "nm_controller.php?opt=update";

    if (idCliente && idPlaca) {
        $.get( url3, {id:idOs, param1: service, param2: price, param3: paymentMethod, param4: idCliente, param5: idPlaca} ).done(() => {
            select('os');
        });
    }else if(idCliente){
        $.get( url2, {id:idOs, param1: plate, param2: vehicle, param3: color } ).done((response2) => {
            $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: idCliente, param5: response2} ).done(() => {
                select('os');
            });
            //$.get( url4, { param1: idCliente, param2: response2 } );
        });    
    }else if(idPlaca){
        $.get( url1, { param1: name, param2: phone } ).done((response1) => {
            $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: response1, param5: idPlaca} ).done(() => {
                select('os');
            });
            //$.get( url4, { param1: response1, param2: response2 } );
        });
    }else{
        $.get( url1, { param1: name, param2: phone } ).done((response1) => {
            $.get( url2, { param1: plate, param2: vehicle, param3: color } ).done((response2) => {
                $.get( url3, { param1: service, param2: price, param3: paymentMethod, param4: response1, param5: response2} ).done(() => {
                    select('os');
                });
                //$.get( url4, { param1: response1, param2: response2 } );
            });
        });
    }    
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

//POVOAR A LISTA DE PLACAS NO DATALIST
$('#placa').keyup(() => {
    let search = document.getElementById('placa').value;
    if (search) {
        url = "plate_controller.php?opt=select";
        $.get( url, {param1: search} ).done((response) => {
            console.log(response);
            let retorno = '';
            if (response !== '{}') {
                retorno = jQuery.parseJSON(response);
                document.getElementById("placas").innerHTML = "";        
                Object.keys(retorno).forEach((key) => {
                    document.getElementById("placas").innerHTML += "<option id='option' value='"+retorno[key].placa+"'>";
                });                    
            }else{
                console.log('Não há placas com essa letra');
            }         
        });
    }
});
//POVOAR O MODAL
$('#placa').blur(() => {      
    let search = document.getElementById('placa').value;
    if (search) {
        url = "plate_controller.php?opt=select";
        $.get( url, {param1: search} ).done((response) => {
            let retorno = '';
            if (response !== '{}') {
                retorno = jQuery.parseJSON(response);
                console.log('entrou no if');       
                document.getElementById('idPlaca')  .innerHTML  = retorno[0].id_placa;
                document.getElementById('veiculo')  .value      = retorno[0].veiculo;
                document.getElementById('cor')      .value      = retorno[0].cor;
                document.getElementById('idCliente').innerHTML  = retorno[0].id_cliente;
                document.getElementById('nome')     .value      = retorno[0].nome;
                document.getElementById('telefone') .value      = retorno[0].telefone;
                document.getElementById('placa')    .blur();                   
            }else{
                limparCampos();
                document.getElementById('placa').value = search;
            }          
        });
    }                 
});

  