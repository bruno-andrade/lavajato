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

    //PEGA A HORA E DATA ATUAL E INSERE NO MODAL
    $("#osModalButton").click(function() {
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
    });


    //EDIÇÃO DA OS
    $(document).on('click','.pill', function(){
        console.log('editar os')    
    });
    
});

//LOADING SCREEN
$(window).on('load', function() {
    $('#loading-screen').remove();        
});

//FUNÇÕES 'CRUD' ASSINCRONAS
function insert() {
    let id = document.getElementById('novaTarefa').value;
    url = "os_controller.php?id="+id+"&opt=insert";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('novaTarefa').value = "";    
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