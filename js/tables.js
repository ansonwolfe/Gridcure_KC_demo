 $("#table1").tablesorter( 
     { sortList: [[0,1]] } 
 ); 

  $("#table2").tablesorter( 
     { sortList: [[3,1]] } 
 ); 

 
 // drilldown chart
  $(function () {

    // Create the chart
    $('#drilldown-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Load Peaks (kVA)'
        },
        xAxis: {
            type: 'category'
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },

        series: [{
            name: 'Capacity (kVA)',
            colorByPoint: true,
            data: [{
                name: 'Winter peak',
                y: 70049,
                drilldown: 'winter'
            }, {
                name: 'Summer peak',
                y: 67714,
                drilldown: 'summer'
            }, {
                name: 'Normal load',
                y: 25000,
                drilldown: 'normal'
            }]
        }],


        drilldown: {
            series: [{
                id: 'winter',
                data: [
                    ['XFR061642', 16860],
                    ['XFR030232', 20680],
                    ['XFR079968', 20460],
                    ['XFR074548', 12049]
                    
                ]
            }, {
                id: 'summer',
                data: [
                    ['XFR061642', 19370],
                    ['XFR030232', 14140],
                    ['XFR079968', 17980],
                    ['XFR074548', 16224]

                ]
            }, {
                id: 'Normal',
                data: [
                    ['XFR061642', 25000],
                    ['XFR030232', 25000],
                    ['XFR079968', 25000],
                    ['XFR074548', 25000]
                ]
            }]
        }
    });
});

