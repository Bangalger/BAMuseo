//javascript Document
//________lee xml y carga mapa con marcadadores (edificios)_______
//iconos no funcan
var customIcons = {
      museo: {
        //icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
      },
      museo: {
        //icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
        // icon: 'ubicacion.png'
      }
    };

    function load() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-34.582521, -58.399312),
                    //-34.582521 -58.399312
        zoom: 17,
        mapTypeId: 'roadmap'
      });
      var infoWindow = new google.maps.InfoWindow;

      downloadUrl("http://crd-label.com.ar/app-php/generarxml.php", function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < markers.length; i++) {
          var name = markers[i].getAttribute("name");
          var direccion = markers[i].getAttribute("direccion");
          var type = markers[i].getAttribute("type");
          var point = new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng")));
          var html = "<b>" + name + "</b> <br/>" + direccion;
          var icon = customIcons[type] || {};
          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
          });
          bindInfoWindow(marker, map, infoWindow, html);
        }
      });
    }

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing() {}
//________geoloc_______

// Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        //alert("device ready papa");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        //alert("onSuccess papa");
        var element = document.getElementById('geolocation');
        element.innerHTML = 
        'Ubicación Actual'+ '<br />' +
        'Latitud: '           + position.coords.latitude              + '<br />' +
        'Longitud: '          + position.coords.longitude             + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('codigo de error: '    + error.code    + '\n' +
              'mensaje: ' + error.message + '\n');
    }
