import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from 'google-maps-react'
import './css/animate.css';
import './css/style.css';
import Home from './Home';
import { Link, Router, Route, hashHistory} from 'react-router';
import 'font-awesome/css/font-awesome.css';


class Sample extends Component {
constructor()
{
    super();
    this.state={
                lati:'17.410777',longi:'78.398778',image : '',file: '',imagePreviewUrl: ''
                };

    this.handleAddRes=this.handleAddRes.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
}


handleAddRes(e)
{
  var post_image = this.state.image;
  console.log(this.state.image);
  var auth = window.sessionStorage.getItem('token');
  var email = window.sessionStorage.getItem('email');

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
     "description":description.value

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



componentDidMount(){
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



  render() {


        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }


    return (
      <section className="up" id="up">
       <div className="containerup">
           <div className="row">
               <div className="col-md-12">
                   <h2>Update Restaurant</h2>
               </div>
           </div>
           <div id="myMap"></div>
           <br />

           <div className="row update">
               <form name="upform" id="upform">
                   <div className="col-md-6">
                       <fieldset>

                           <label forName="Rname">Restaurant Name  </label><br />
                           <input name="name" type="text" id="Rname" size="30" defaultValue={this.props.rests.restName}/>
                           <br />
                           <label forName="latitute" required>latitute </label><br />
                           <input name="latitude" type="text" id="latitude" size="30" defaultValue= {this.props.rests.latitude}/>
                           <br />
                           <label forName="longitude">longitude</label><br />
                           <input name="longitude" type="text" id="longitude" size="30" defaultValue= {this.props.rests.longitude}/>
                           <br />
                           <label forName="Streetname">Street Name</label><br />
                           <input name="streetName" type="text" id="Streetname" size="30" defaultValue= {this.props.rests.streetName}/>
                           <br />
                           <label forName="address">Address</label><br />
                           <textarea name="address" cols="30" rows="3" id="address" defaultValue= {this.props.rests.address}></textarea>
                           <br />
                           <label forName="phone">Phone</label><br />
                           <input name="phone" type="text" id="phone" size="30" defaultValue= {this.props.rests.phone}/>
                           <br />
                           <label forName="email">Email ID</label><br />
                           <input name="email" type="text" id="email" size="30" defaultValue= {this.props.rests.email}/>
                           <br />
                           <label forName="homeurl">HomePage URL</label><br />
                           <input name="homeurl" type="text" id="homeurl" size="30" defaultValue= {this.props.rests.homePage}/>
                           <br />
                           <label forName="facebookurl">Facebook URL</label><br />
                           <input name="facebookurl" type="text" id="facebookurl" size="30" defaultValue= {this.props.rests.faceBook}/>
                           <br />
                           <label forName="otimings">Open Time</label><br />
                           <input name="otimings" type="text" id="otimings" size="30" defaultValue= {this.props.rests.otime}/>
                           <br />
                           <label forName="ctimings">Close Time</label><br />
                           <input name="ctimings" type="text" id="ctimings" size="30" defaultValue= {this.props.rests.ctime}/>
                           <br />
                           <label forName="popular">Popular</label><br />
                           <input name="popular" type="text" id="popular" size="30" defaultValue= {this.props.rests.popular}/>
                           <br />

                       </fieldset>
                   </div>
                   <div className="col-md-6">
                       <fieldset>
                            <label forName="highlights">Highlights</label><br />
                            <textarea name="highlights" cols="30" rows="10" id="highlights" placeholder="Highlights" defaultValue= {this.props.rests.highlights}></textarea>
                            <br />
                            <label forName="description">Description</label><br />
                            <textarea name="description" cols="30" rows="3" id="description" placeholder="Description" defaultValue= {this.props.rests.description}></textarea>
                            <br />
                            <label forName="cuisines">Cuisines</label><br />
                            <textarea name="cuisines" cols="30" rows="3" id="cuisines" placeholder="Cuisines" defaultValue= {this.props.rests.cuisines}></textarea>
                            <br />
                            <label forName="imagePreview">Image upload</label><br />
                            <div className="previewComponent">
                              <form onSubmit={(e)=>this._handleSubmit(e)}>
                                <input className="fileInput"
                                  type="file" id = "fileInput" name = "image"
                                  onChange={(e)=>this._handleImageChange(e)} />

                              </form>
                              <div className="imgPreview1">
                              {$imagePreview}
                              </div>
                              <br />
                            </div>

                       </fieldset>
                   </div>
                   <div className="col-md-12">
                       <fieldset>
                       <br />
                           <button type="submit" className="btn btn-lg" onClick={() => this.handlePut(this.props.rests.id)} id="submit"> Update </button>
                       </fieldset>
                       <br />
                   </div>
               </form>
           </div>
       </div>
   </section>
    );
  }
}

export default Sample;
