// Initialize your app
var myApp = new Framework7({
	statusbarOverlay:false,
	animateNavBackIcon: true
	});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
	domCache: true
});

// Calendar Date Picker             


myApp.onPageInit('index', function (page) {
	initializeMaps();
	map.fitBounds(bounds);
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('report', function (page) {
    // run createContentPage func after link was clicked
    $(function () {
	
	$(document).ready(function () {
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
			////
	    
	 $('#bar-container').highcharts({
        chart: {
            type: 'bar',
			style: {
            		fontFamily: 'Roboto'
        		}
        },
        title: {
            text: 'Transformer Utilization over Years'
        },
        xAxis: {
            categories: ['15B5', '61B5', '78B1', '24B3', '61B3'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'in kWh',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' kWh'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 2013',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 2014',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2015',
            data: [973, 914, 1200, 732, 34]
        }]
    });
	
	});
	
	});
});



myApp.onPageInit('realtime', function (page) {
    //run maps
	// run createContentPage func after link was clicked
$(function () {
	
	$(document).ready(function () {
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
   
		$('#realtime-container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                backgroundColor: '#fafafa',
				marginRight: 0,
                style: {
            		fontFamily: 'Roboto'
        		},
				events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
			credits: {
				enabled: false
			  },
            title: {
                text: 'REAL-TIME TRANSFORMER DATA',
				style: {
					color: '#666666',
					fontSize: '12px'
        		}
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'in kWh'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Voltage Data (in kWh)',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
			////
			
		});
	});
});



///


var perf_5 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 7,
		strokeColor: '#ff0000',
		strokeOpacity: 0.7,
		strokeWeight: 10
};
	
var perf_4 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 7,
		strokeColor: '#ef4000',
		strokeOpacity: 0.7,
		strokeWeight: 10
};

var perf_3 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 7,
		strokeColor: '#ff8100',
		strokeOpacity: 0.7,
		strokeWeight: 10
};

	
var perf_2 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 7,
		strokeColor: '#247902',
		strokeOpacity: 0.7,
		strokeWeight: 10
};

	
var perf_1 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 7,
		strokeColor: '#66ce3d',
		strokeOpacity: 0.7,
		strokeWeight: 10
};

/*var markers = [
    ["E 15th St, Austin, TX", "30.2754630", "-97.7340640", blue_1, "112233", "87.6"],
    ["Guadalupe St, Austin, TX", "30.3122980", "-97.7319890", blue_2, "445566", "92.5"],
    ["E 9th St, Austin, TX", "30.2665610", "-97.7277940", blue_1, "778899", "91.2"],
    ["Lavaca St, Austin, TX", "30.2726830", "-97.7437320", blue_2, "101010", "90.1"],
    ["W Dean Keaton St, Austin, TX", "30.2896650", "-97.7395720", blue_1, "123456", "89.1"]
];*/


///parser

var markers = []; 

function doStuff(data) {
    //Data is usable here
    //console.log(data);
	markers = data;
	initializeMaps();
	//console.log(markers);
}

function parseData(url, callBack) {
    Papa.parse(url, {
        delimeter: "",
		newline: "",
		header: false,
		download: true,
        dynamicTyping: false,
        complete: function(results) {
            callBack(results.data);
        }
    });
}
//jQuery.support.cors = true;
parseData("csv/KC_data.csv", doStuff);
//parseData("http://www.ourgreenhome.ca/sample.csv", doStuff);
//initializeMaps();

function initializeMaps() {
	var myOptions = {
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
		mapTypeControl: false
	};
	var map = new google.maps.Map(document.getElementById("gridcure_map"),myOptions);
	var infowindow = new google.maps.InfoWindow();
	var marker, i;
	var bounds = new google.maps.LatLngBounds();
	
	for (i = 0; i < markers.length; i++) {
		var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
		bounds.extend(pos);
		marker = new google.maps.Marker({
			icon: window[markers[i][3]],
			position: pos,
			map: map,
		});
		
		
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			
			var contentString = 
			'<div id="notification">'+
			'<h5>TRANSFORMER ID: <span class="lightBlue">' + markers[i][4] + '</span></h5>' +
			'<hr> ' +
			'<h5>TRANSFORMER TYPE: <span class="lightBlue">' + markers[i][6] + '</span></h5>' +
			'<hr> ' +
			'<h5>LOCATION: <span class="lightBlue" style="text-transform: uppercase">'+ markers[i][0] + '</span></h5>' +
			'<hr>' +
			'<h5>STATUS: <span class="lightBlue">' + markers[i][5] + '</span></h5>' +
			'<hr>' +
			'<h5>PERFORMANCE SCORE: <div class="lightBlue">' + markers[i][7] + '</div></h5>' +
			'<hr>' +
			'<a href="#realtime" class="btn btn-default">INVESTIGATE</a></div>';
			
			return function() {
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
				startReal();
			}
			
			function startReal() {
				document.getElementById("deviceMap").innerHTML = markers[i][4];
				document.getElementById("locationMap").innerHTML = markers[i][0];
			}
			
	
			
		})(marker, i));
		
		
		
					
		
		var infowindow = new google.maps.InfoWindow({
			maxWidth: 200
		});
		
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.fitBounds(bounds);
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		});
		
	}
	
	map.fitBounds(bounds);
	
		
} 

function getReal1() {
				document.getElementById("deviceMap").innerHTML = markers[18][4];
				document.getElementById("locationMap").innerHTML = markers[18][0];
}

function getReal2() {
				document.getElementById("deviceMap").innerHTML = markers[9][4];
				document.getElementById("locationMap").innerHTML = markers[9][0];
}

function getReal3() {
				document.getElementById("deviceMap").innerHTML = markers[16][4];
				document.getElementById("locationMap").innerHTML = markers[16][0];
}

function getReal4() {
				document.getElementById("deviceMap").innerHTML = markers[37][4];
				document.getElementById("locationMap").innerHTML = markers[37][0];
}

function getReal5() {
				document.getElementById("deviceMap").innerHTML = markers[19][4];
				document.getElementById("locationMap").innerHTML = markers[19][0];
}

function getReal6() {
				document.getElementById("deviceMap").innerHTML = markers[2][4];
				document.getElementById("locationMap").innerHTML = markers[2][0];
}
//highcharts
		


///gauge



/*  var delay = 100;
  var infowindow = new google.maps.InfoWindow();
  var latlng = new google.maps.LatLng(30.2883448,-97.725206);
  var mapOptions = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
  }
    var blue_1 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 10,
		strokeColor: '#448ccb',
		strokeOpacity: 0.5,
		strokeWeight: 14
	};
	
	var blue_2 = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#ffffff',
		fillOpacity: 0.5,
		scale: 10,
		strokeColor: '#ff0000',
		strokeOpacity: 0.5,
		strokeWeight: 14
	};
  var geocoder = new google.maps.Geocoder(); 
  var map = new google.maps.Map(document.getElementById("gridcure_map"), mapOptions);
  var bounds = new google.maps.LatLngBounds();

  function geocodeAddress(address, next) {
    geocoder.geocode({address:address}, function (results,status)
      { 
         if (status == google.maps.GeocoderStatus.OK) {
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          createMarker(address,lat,lng);
        }
        else {
           if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
                        }   
        }
        next();
      }
    );
  }
 function createMarker(add,lat,lng) {
   var contentString = 
   	'<div id="notification">'+
      '<h5>METER NUMBER: <span class="lightBlue">12341234</span></h5> ' +
	  '<hr> ' +
      '<h5 style="text-transform: uppercase">'+ add+
      '</h5> '+
	  '<hr> ' +
      '<h5>TOTAL SUSPECTED LOSS: <span class="lightBlue">87.6 kWh</span></h5> '+
	  '<hr> ' +
      '<h5>SUSPECTED PARTIAL BYPASS THEFT</h5>'+
      '</div>';

   var marker = new google.maps.Marker({
     icon: blue_1,
	 position: new google.maps.LatLng(lat,lng),
     map: map,
   });
   
   var marker2 = new google.maps.Marker({
     icon: blue_2,
	 position: new google.maps.LatLng(30.2883448,-97.725206),
     map: map,
   });
		   

  google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(contentString); 
     infowindow.open(map,marker);
   });
      
   
   var infowindow = new google.maps.InfoWindow({
	  maxWidth: 200
  });

   bounds.extend(marker.position);

 }
  var locations = [
           'E 15th St, Austin, TX',
           'Guadalupe St, Austin, TX',
           'E 9th St, Austin, TX',
           'Lavaca St, Austin, TX'
  ];
  
  var nextAddress = 0;
  
  function theNext() {
    if (nextAddress < locations.length) {
      setTimeout('geocodeAddress("'+locations[nextAddress]+'",theNext)', delay);
      nextAddress++;
    } else {
      map.fitBounds(bounds);
    }
  }
  theNext();*/