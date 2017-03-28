import React, { Component } from 'react';
import './css/animate.css';
import './css/style.css';
import Home from './Home'
import { Link } from 'react-router'
import 'font-awesome/css/font-awesome.css'
class Add extends Component {
constructor()
{
    super();
    this.state={
                lati:'17.410777',longi:'78.398778',image : ''
                };
    this.handleAddRes=this.handleAddRes.bind(this);
    this.handleSearch=this.handleSearch.bind(this);


}


  handleAddRes(e)
  {

    var auth = window.sessionStorage.getItem('token');
    var email = window.sessionStorage.getItem('email');
   console.log(auth+"//////");
   console.log(email+"/////");
    fetch('http://localhost:9000/restsadd',
    {
      headers :{
        "Content-Type" : "application/json",
        "Accept" :"application/json",
        "Authentication" : auth,
        "id" : email

      },
      method: "POST",
      body: JSON.stringify({
       "longitude": longitude.value,
       "latitude": latitude.value,
       "otime": otimings.value,
       "ctime": ctimings.value,
       "image" : this.state.image,
       "address": address.value,
       "homePage": homeurl.value,
       "restName": Rname.value,
       "streetName": Streetname.value,
       "popular":popular.value,
       "phone": phone.value,
       "faceBook": facebookurl.value,
       "email": email.value

        })
   })

   .then(function (data) {
     console.log('Request success: ', data);
     return <Home/>

   })
   .catch(function (error) {
     console.log('Request failure: ', error);
   });
 }


 handleSearch(){
   var x = document.getElementById("myFile");
   var form = new FormData();

   for (var i = 0; i < x.files.length; i++) {
        var file = x.files[i];
        form.set('image',file);
        console.log(file);
        fetch('http://localhost:9000/images', {
                  method: 'POST',
                  body: form
          })
          .then(response => {
              if(200 == response.status){
                response.json().then((data) => {
                  this.setState({image:data});
                  console.log(this.state.image);
                  });
                }
            })
            .catch(error => console.log(error));

      }
  }




 componentDidMount(){
    if(document.getElementById("latitude").value != '' && document.getElementById("longitude").value != '')
    {
      console.log('hiiiiiiii');
      this.setState({lati :   document.getElementById("latitude").value });
      this.setState({longi :   document.getElementById("longitude").value });
    }

   var map;
   var marker;
   var myLatlng = new google.maps.LatLng(this.state.lati,this.state.longi);
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
      <div className="container" id="con">


      <div className="top">
        <h1 id="title"><span id="logo">Add Restaurant</span></h1>
      </div>
      <div className="login-box1">
        <div className="box-header">
          <center><h2 >Add Restaurant</h2></center>
        </div>
          <form action="">
          <br />
          <div className="col-sm-6" >  <label forName="Rname">Restaurant Name  </label></div>
          <div className="col-sm-6" >	<input type="text" id="Rname"/> </div><br/>


          <div className="col-sm-6" >  <label forName="latitute" required>latitute </label></div>
          <div className="col-sm-6" >	<input type="text" id="latitude" /> </div><br/>



          <div className="col-sm-6" > <label forName="longitude">longitude</label></div>
          <div className="col-sm-6">	<input type="text" id="longitude" /></div><br/>



          <div className="col-sm-6" ><label forName="Streetname">Street Name</label></div>
          <div className="col-sm-6">	<input type="text" id="Streetname"/></div><br/>



          <div className="col-sm-6" ><label forName="address">Address</label></div>
          <div className="col-sm-6"> <input type="textarea" id="address"/></div><br/>



          <div className="col-sm-6" ><label forName="phone">Phone</label></div>
          <div className="col-sm-6"> <input type="text" id="phone"/></div><br/>



          <div className="col-sm-6" > <label forName="email">Email ID</label></div>
          <div className="col-sm-6"> <input type="email" id="email"/></div><br/>



          <div className="col-sm-6" ><label forName="homeurl">HomePage URL</label></div>
          <div className="col-sm-6"> <input type="text" id="homeurl"/></div><br/>



          <div className="col-sm-6" ><label forName="facebookurl">Facebook URL</label></div>
          <div className="col-sm-6"> <input type="text" id="facebookurl" /></div><br/>

         <div><label forName="timings">&nbsp;&nbsp;Timings:</label></div>

         <div className="col-sm-6" ><label forName="otimings">Open</label></div>
         <div className="col-sm-6"> <input type="text" id="otimings" /></div><br/>


         <div className="col-sm-6" > <label forName="ctimings">Close</label></div>
         <div className="col-sm-6"> <input type="text" id="ctimings"/></div><br/>

         <div className="col-sm-6" > <label forName="popular">Popular</label></div>
         <div className="col-sm-6"> <input type="text" id="popular"/></div><br/>

         <div className="col-sm-6" > <label forName="image">Image</label></div>
         <input type="file" id="myFile" name="image" multiple="multiple" accept=".png" onChange={this.handleSearch}/>
                                               <br/><br/>


    			 <center>  <button type="submit"  onClick={()=>this.handleAddRes()}>Add</button>   </center>

    			<br/>
                    <div id="myMap"></div>
         </form>


          </div>
    	</div>
    );
  }
}

export default Add;
