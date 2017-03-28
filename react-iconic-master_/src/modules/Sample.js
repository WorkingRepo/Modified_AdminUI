import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from 'google-maps-react'
import './css/animate.css';
import './css/style.css';
import Home from './Home'
import { Link } from 'react-router'
import 'font-awesome/css/font-awesome.css'
class Sample extends Component {
constructor()
{
    super();

}


getMap(){
  var map;
  var marker;
  var myLatlng = new google.maps.LatLng(20.268455824834792,85.84099235520011);
  var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow();

  var mapOptions = {
      zoom: 18,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

  marker = new google.maps.Marker({
                                  map: map,
                                  position: myLatlng,
                                  draggable: true
                                  });
  geocoder.geocode({'latLng': myLatlng }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          document.getElementById("latitude").value =  marker.getPosition().lat();
          document.getElementById("longitude").value =  marker.getPosition().lng();
          document.getElementById("address").value =  results[0].formatted_address;

          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        }
      }
    });

    google.maps.event.addListener(marker, 'dragend', function() {

      geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            document.getElementById("latitude").value =  marker.getPosition().lat();
            document.getElementById("longitude").value =  marker.getPosition().lng();
            document.getElementById("address").value =  results[0].formatted_address;

            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          }
        }
      });
    });
}





  render() {
    return (
      <div className="container">
      <div id="myMap"></div>
        <input id="address" type="text" /><br/>
        <input type="text" id="latitude" placeholder="Latitude" />
        <input type="text" id="longitude" placeholder="Longitude" />
        <button onClick={()=> this.getMap()}>Select On Map </button>
          <div id="dvmap"></div>

    	</div>
    );
  }
}

export default Sample;
