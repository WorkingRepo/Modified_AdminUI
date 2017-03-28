import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/animate.css';
import './css/style.css';
import Home from './Home';
import { Link } from 'react-router';
import { Router, Route, hashHistory } from 'react-router'
import 'font-awesome/css/font-awesome.css'
class Add extends Component {
constructor()
{
    super();
    this.state={
                lati:'17.410777',longi:'78.398778',image : '',file: '',imagePreviewUrl: ''
                };

    this.handleAddRes=this.handleAddRes.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
}


_handleImageChange(e) {

  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }

  reader.readAsDataURL(file);

    var x = document.getElementById("fileInput");
    var form = new FormData();
    console.log("hiiiiiiii");
    for (var i = 0; i < x.files.length; i++) {
         file = x.files[i];
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

  handleAddRes(e)
  {
    var post_image = this.state.image;
    console.log(this.state.image);
    var auth = window.sessionStorage.getItem('token');
    var email1 = window.sessionStorage.getItem('email');

    fetch('http://localhost:9000/restsadd',
    {
      headers :{
        "Content-Type" : "application/json",
        "Accept" :"application/json",
        "Authentication" : auth,
        "id" : email1
      },
      method: "POST",
      body: JSON.stringify({
       "longitude": longitude.value,
       "latitude": latitude.value,
       "otime": otimings.value,
       "ctime": ctimings.value,
       "image" : post_image,
       "address": address.value,
       "homePage": homeurl.value,
       "restName": Rname.value,
       "streetName": Streetname.value,
       "popular":popular.value,
       "phone": phone.value,
       "faceBook": facebookurl.value,
       "email": email.value,
       "highlights":highlights.value,
       "cuisines":cuisines.value,
       "description":description.value,
       "cost":cost.value

        })
   })
  /* .then(function (data) {
     console.log('Request success: ', data);
     var c=document.getElementById("content2");
     ReactDOM.render(<Home />,c);

   })
   .catch(function (error) {
     console.log('Request failure: ', error);
     var c=document.getElementById("content2");
     ReactDOM.render(<Home />,c);
   });
   */
   window.location.reload();
   hashHistory.push('/Home/');
 }

handleCancel(){
  var c=document.getElementById("content1");
  ReactDOM.render(<Home />,c);
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


       let {imagePreviewUrl} = this.state;
       let $imagePreview = null;
       if (imagePreviewUrl) {
         $imagePreview = (<img src={imagePreviewUrl} />);
       } else {
         $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
       }


   return (

     <div className="container" id="content1">

     <section className="add" id="add">
      <div className="container">
          <div className="row">
              <div className="col-md-12">
                  <h2>Add Restaurant</h2>
              </div>
          </div>
          <div id="myMap"></div>
          <br />

          <div className="row">
              <form name="addform" id="addform">
                  <div className="col-md-6">
                      <fieldset>


                          <input name="name" type="text" id="Rname" size="30" placeholder="Restaurant Name"/>
                          <br />
                          <input name="latitude" type="text" id="latitude" size="30" placeholder="latitude" />
                          <br />
                          <input name="longitude" type="text" id="longitude" size="30" placeholder="longitude" />
                          <br />
                          <input name="streetName" type="text" id="Streetname" size="30" placeholder="Street Name" />
                          <br />
                          <textarea name="address" cols="30" rows="3" id="address" placeholder="Address"></textarea>
                          <br />
                          <input name="phone" type="text" id="phone" size="30" placeholder="Phone Number" />
                          <br />
                          <input name="email" type="email" id="email" size="30" placeholder="Email Id" />
                          <br />
                          <input name="homeurl" type="text" id="homeurl" size="30" placeholder="Homepage Url" />
                          <br />
                          <input name="facebookurl" type="text" id="facebookurl" size="30" placeholder="Facebook Url" />
                          <br />
                          <input name="otimings" type="text" id="otimings" size="30" placeholder="Open Time" />
                          <br />
                          <input name="ctimings" type="text" id="ctimings" size="30" placeholder="Close Time" />
                          <br />
                          <input name="popular" type="text" id="popular" size="30" placeholder="Popular" />
                          <br />
                          <input name="cost" type="text" id="cost" size="30" placeholder="Price per head" />
                          <br />

                      </fieldset>
                  </div>
                  <div className="col-md-6">
                      <fieldset>
                           <textarea name="highlights" cols="30" rows="10" id="highlights" placeholder="Highlights"></textarea>
                           <br />
                           <textarea name="description" cols="30" rows="3" id="description" placeholder="Description"></textarea>
                           <br />
                           <textarea name="cuisines" cols="30" rows="3" id="cuisines" placeholder="Cuisines"></textarea>
                           <br />

                           <div className="previewComponent">
                             <form onSubmit={(e)=>this._handleSubmit(e)}>
                               <input className="fileInput"
                                 type="file" id = "fileInput" name = "image"
                                 onChange={(e)=>this._handleImageChange(e)} />

                             </form>
                             <div className="imgPreview">
                             {$imagePreview}
                             </div>
                             <br/>
                           </div>

                      </fieldset>
                  </div>
                  <div className="col-md-12">
                  <div className="col-md-6">

                          <button type="submit" className="btn btn-lg" onClick={()=>this.handleAddRes()} id="submit"> Add </button>

                  </div>
                  <div className="col-md-6">

                          <button type="submit" className="btn btn-lg" onClick={()=>this.handleCancel()} id="cancel"> Cancel </button>

                  </div>
                 </div>
              </form>
          </div>
      </div>
  </section>

     </div>
   );
 }
 }



export default Add;
