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
		credits: {
		  enabled: false
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

// slide 
$(function () {

    // Get the CSV and create the chart
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (csv) {

        $('#slide').highcharts({

            data: {
                csv: csv
            },

            title: {
                text: 'Daily visits at www.highcharts.com'
            },

            subtitle: {
                text: 'Source: Google Analytics'
            },

            xAxis: {
                tickInterval: 7 * 24 * 3600 * 1000, // one week
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    y: -3
                }
            },

            yAxis: [{ // left y axis
                title: {
                    text: null
                },
                labels: {
                    align: 'left',
                    x: 3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }, { // right y axis
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {
                    text: null
                },
                labels: {
                    align: 'right',
                    x: -3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],

            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: true,
                borderWidth: 0
            },

            tooltip: {
                shared: true,
                crosshairs: true
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                hs.htmlExpand(null, {
                                    pageOrigin: {
                                        x: e.pageX || e.clientX,
                                        y: e.pageY || e.clientY
                                    },
                                    headingText: this.series.name,
                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + ' visits',
                                    width: 200
                                });
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },

            series: [{
                name: 'All visits',
                lineWidth: 4,
                marker: {
                    radius: 4
                }
            }, {
                name: 'New visitors'
            }]
        });
    });

});


