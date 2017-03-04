import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/animate.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.css'
import { Link } from 'react-router'
import Home from './Home'

class Update extends Component {

  handlePut(id)
  {
    console.log(id);
      fetch('http://localhost:9000/rests/update/'+id,
      {
        headers :{
          "Content-Type" : "application/json"
      },
      method: "PUT",
      body: JSON.stringify({
         "longitude": longitude.value,
         "latitude": latitude.value,
         "otime": otimings.value,
         "ctime": ctimings.value,
         "address": address.value,
         "homePage": homeurl.value,
         "restName": Rname.value,
         "streetName": Streetname.value,
         "phone": phone.value,
         "faceBook": facebookurl.value,
         "email": email.value
        })
     })
     .then(function (data) {
       console.log('Request success: ', data);
     })
     .catch(function (error) {
       console.log('Request failure: ', error);
  });

    var c=document.getElementById("content1");

    ReactDOM.render(<Home />,c);


  }
  handleMap(){
    var map;
    var marker;
    var myLatlng = new google.maps.LatLng(this.props.rests.latitude,this.props.rests.longitude);
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
            //document.getElementById("Streetname").value =  results[0].address_components[0].street_address;

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
              //document.getElementById("Streetname").value =  results[0].address_components[0].types[0];

              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            }
          }
        });
      });
  }

  render() {
    return (

      <div className="container" id="content1">
        <a name="add"></a>


      	<div className="top">
    			<h1 id="title"><span id="logo">Update Restaurant</span></h1>
    		</div>
    		<div className="login-box1">
    			<div className="box-header">
    				<center><h2 >Update Restaurant</h2></center>
    			</div>
          <form action="">
                        <br/>

                         <div className="col-sm-6" >  <label forName="Rname">Restaurant Name  </label></div>
                         <div className="col-sm-6" >	<input type="text" id="Rname" defaultValue={this.props.rests.restName}/> </div><br/>


                         <div className="col-sm-6" >  <label forName="latitute" required>latitute </label></div>
                         <div className="col-sm-6" >	<input type="text" id="latitude" defaultValue= {this.props.rests.latitude} /> </div><br/>



                         <div className="col-sm-6" > <label forName="longitude">longitude</label></div>
                         <div className="col-sm-6">	<input type="text" id="longitude" defaultValue= {this.props.rests.longitude} /></div><br/>



                         <div className="col-sm-6" ><label forName="Streetname">Street Name</label></div>
                         <div className="col-sm-6">	<input type="text" id="Streetname" defaultValue= {this.props.rests.streetName} /></div><br/>



                         <div className="col-sm-6" ><label forName="address">Address</label></div>
                         <div className="col-sm-6"> <input type="textarea" id="address" defaultValue= {this.props.rests.address} /></div><br/>



                         <div className="col-sm-6" ><label forName="phone">Phone</label></div>
                         <div className="col-sm-6"> <input type="text" id="phone" defaultValue= {this.props.rests.phone} /></div><br/>



                         <div className="col-sm-6" > <label forName="email">Email ID</label></div>
                         <div className="col-sm-6"> <input type="email" id="email" defaultValue= {this.props.rests.email} /></div><br/>



                         <div className="col-sm-6" ><label forName="homeurl">HomePage URL</label></div>
                         <div className="col-sm-6"> <input type="text" id="homeurl" defaultValue= {this.props.rests.homePage}/></div><br/>



                         <div className="col-sm-6" ><label forName="facebookurl">Facebook URL</label></div>
                         <div className="col-sm-6"> <input type="text" id="facebookurl" defaultValue= {this.props.rests.faceBook} /></div><br/>

                        <div><label forName="timings">&nbsp;&nbsp;Timings:</label></div>

                        <div className="col-sm-6" ><label forName="otimings">Open</label></div>
                        <div className="col-sm-6"> <input type="text" id="otimings" defaultValue= {this.props.rests.otime}/></div><br/>


                        <div className="col-sm-6" > <label forName="ctimings">Close</label></div>
                        <div className="col-sm-6"> <input type="text" id="ctimings" defaultValue= {this.props.rests.ctime} /></div><br/>

    			              <center>  <button type="submit" onClick={() => this.handlePut(this.props.rests.id)}>Update</button>   </center>
                        <center>  <button type="submit"  onClick={() => this.handleMap()}>Select On Map </button>   </center>

                  <br/>
         </form>

    		</div>

          <div id="myMap"></div>
    	</div>
    );
  }
}

export default Update;
