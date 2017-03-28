import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import './css/animate.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router'
import Home from './Home';

class Update extends Component {

  constructor()
  {
      super();
      this.state={
                  image : '',file: '',imagePreviewUrl: '', oimage:''
                  };

      this.handleSearch=this.handleSearch.bind(this);


  }

  handleCancel(){
    var c=document.getElementById("content1");
    ReactDOM.render(<Home />,c);
  }

  _handleImageChange(e) {
      this.setState({oimage:null});
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
                      $("#prev_image").remove();
                     console.log(this.state.image);
                     });
                   }
               })
               .catch(error => console.log(error));

         }
  }


  handlePut(id)
  {

    var image_post = this.state.image ;
    var auth = window.sessionStorage.getItem('token');
    var email1 = window.sessionStorage.getItem('email');

      fetch('http://localhost:9000/rests/update/'+id,
      {
        headers :{
            "Content-Type" : "application/json",
            "Accept" :"application/json",
            "Authentication" : auth,
            "id" : email1
      },
      method: "PUT",
      body: JSON.stringify({
         "longitude": longitude.value,
         "latitude": latitude.value,
         "otime": otimings.value,
         "ctime": ctimings.value,
         "image" : image_post,
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
     .then(function (data) {
       console.log('Request success: ', data);
         var c=document.getElementById("content2");
         ReactDOM.render(<Home />,c);

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
    this.setState({image:this.props.rests.image});
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
                           <input name="email" type="email" id="email" size="30" defaultValue= {this.props.rests.email}/>
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
                           <label forName="cost">Price per head</label><br />
                           <input name="cost" type="text" id="cost" size="30" defaultValue= {this.props.rests.cost}/>
                           <br />


                       </fieldset>
                   </div>
                   <div className="col-md-6">
                       <fieldset>
                            <label forName="highlights">Highlights</label><br />
                            <textarea name="highlights" cols="30" rows="10" id="highlights" placeholder="Highlights" defaultValue= {this.props.rests.highlights}></textarea>
                            <br />
                            <label forName="description">Description</label><br />
                            <textarea name="description" cols="30" rows="5" id="description" placeholder="Description" defaultValue= {this.props.rests.description}></textarea>
                            <br />
                            <label forName="cuisines">Cuisines</label><br />
                            <textarea name="cuisines" cols="30" rows="5" id="cuisines" placeholder="Cuisines" defaultValue= {this.props.rests.cuisines}></textarea>
                            <br />
                            <label forName="imagePreview">Image upload</label><br />
                            <div className="previewComponent">
                              <form onSubmit={(e)=>this._handleSubmit(e)}>
                                <input className="fileInput"
                                  type="file" id = "fileInput" name = "image"
                                  onChange={(e)=>this._handleImageChange(e)} />

                              </form>
                              <div className="imgPreview1">
                              <img src={this.props.rests.image} id="prev_image"/>
                              {$imagePreview}
                              </div>
                              <br />
                            </div>

                       </fieldset>
                   </div>
                   <div className="col-md-12">
                   <div className="col-md-6">

                           <button type="submit" className="btn btn-lg" onClick={()=>this.handlePut(this.props.rests.id)} id="submit"> Update </button>

                   </div>
                   <div className="col-md-6">

                           <button type="submit" className="btn btn-lg" onClick={()=>this.handleCancel()} id="cancel"> Cancel </button>

                   </div>
                  </div>
               </form>
           </div>
       </div>
   </section>
    );
  }
}

export default Update;
