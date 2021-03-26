// GRÁFICO 1 - QTD VENDAS POR MÊS    
    var ctx = document.getElementsByClassName("qtd-month-chart");

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Quantidade de Vendas por Mês',
                backgroundColor: '#263C88',
                data: [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 2, 20]
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                fontStyle: 'bold',
                fontColor: '#263C88',
                fontSize: '16',

            }
        }
    });

// GRÁFICO 2 - VALOR VENDAS POR MÊS    
var ctx = document.getElementsByClassName("vl-month-chart");

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Valor de Vendas por Mês',
            backgroundColor: '#263C88',
            data: [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 2, 20]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            fontStyle: 'bold',
            fontColor: '#263C88',
            fontSize: '16',

        }
    }
});

// GRÁFICO 3 - QTD VENDAS POR ANO    
var ctx = document.getElementsByClassName("qtd-year-chart");

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['2020', '2021'],
        datasets: [{
            label: 'Quantidade de Vendas por Ano',
            backgroundColor: '#263C88',
            data: [30000, 50000]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            fontStyle: 'bold',
            fontColor: '#263C88',
            fontSize: '16',

        }
    }
});

// GRÁFICO 4 - VALOR VENDAS POR ANO    
var ctx = document.getElementsByClassName("vl-year-chart");

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['2020', '2021'],
        datasets: [{
            label: 'Valor de Vendas por Ano',
            backgroundColor: '#263C88',
            data: [30000, 50000]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            fontStyle: 'bold',
            fontColor: '#263C88',
            fontSize: '16',

        }
    }
});

// GRÁFICO 5 - QTD VENDAS POR DIA    
var ctx = document.getElementsByClassName("qtd-day-chart");

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
        datasets: [{
            label: 'Quantidade de Vendas por Dia',
            backgroundColor: '#263C88',
            data: [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 0, 10, 5, 2, 20, 30, 45, 0, 10, 5]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            fontStyle: 'bold',
            fontColor: '#263C88',
            fontSize: '16',

        }
    }
});

// GRÁFICO 6 - VALOR VENDAS POR DIA    
var ctx = document.getElementsByClassName("vl-day-chart");

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
        datasets: [{
            label: 'Valor de Vendas por Dia',
            backgroundColor: '#263C88',
            data: [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 0, 10, 5, 2, 20, 30, 45, 0, 10, 5]
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            fontStyle: 'bold',
            fontColor: '#263C88',
            fontSize: '16',

        }
    }
});