// FUNÇÕES DO MENU
$(document).ready(function(){
    $("#menu-clients").click(function(){
        $(function(){
            $("#main").load("contacts.html"); 
        });
    })
    /*$("#menu-list").click(function(){
        $(function(){
            $("#main").load("list.html"); 
        });
    })*/
    $("#menu-dashboard").click(function(){
        $(function(){
            $("#main").load("dashboard.html"); 
        });
    })
    $("#menu-car-plates").click(function(){
        $(function(){
            $("#main").load("carplates.html"); 
        });
    })
    select();
});

//LOADING SCREEN
$(window).on('load', function() {
    $('#loading-screen').remove();        
});

//"Function" para abrir o "Modal" da tela "List" para edição da OS
function editModal() {
    //let pill = document.getElementById(id);
}

function insert() {
    let os = document.getElementById('novaTarefa').value;
    url = "tarefa_controller.php?titulo="+os+"&opt=insert";
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
            console.log(xhttp.responseText);         
        }                    
    };                
    xhttp.open("GET", url, true);
    xhttp.send();
}