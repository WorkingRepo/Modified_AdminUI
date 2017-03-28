import React, { Component } from 'react';
import {Router, Route, hashHistory,Link} from 'react-router';
import './PreviewImg.css';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.


class Exam extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.state = {
    imgSrc:'',
    image_data:[],
    imgStatus:''
  };
    this.handleUpload = this.handleUpload.bind(this);
    this.onChange= this.onChange.bind(this);

  }
    componentWillReceiveProps(nextProps){
      this.state.imgSrc=nextProps.pic;

    }

    handleUpload(){

        var formData = new FormData();
        var that=this;
        var photo=document.getElementById('FileUpload').files[0];
        console.log(photo);
        formData.set('image',photo);
        fetch('http://localhost:9000/images', {
          method:'POST',
           body: formData
        }).then((response) => response.json())
        .then((responseJson) => {
          that.setState({
            image_data:responseJson
          });
        })
        .then(function(e){
          that.props.Img(that.state.image_data);

          document.getElementById('icon').style.display="block";
          that.setState({
            imgStatus:'Image uploaded'
          });
        });

    }

    onChange(){
     // Assuming only image
    document.getElementById('spinner').style.display="block";
     var file = document.getElementById('FileUpload').files[0];
     var reader = new FileReader();
     var url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
             imgSrc:[reader.result]
           })

       }.bind(this);
       document.getElementById('spinner').style.display="none";
         this.handleUpload();
   }


  // `render` is called whenever the component's props OR state are updated.
  render() {


    console.log(this.state.image_data);

    // console.log('The App component was rendered')
     if(this.state.image_data=='')
      this.props.Img(this.state.image_data);
 	 	return(
  <div>
      <div className="form-group row">
          <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
          <div className="col-6">
             <input type="file" id="FileUpload" name="image" aria-describedby="fileHelp" onChange={this.onChange}/>
             <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>

          </div>
      </div>


      <img id="image" src={this.state.imgSrc} /><br /><br />
      <div className="loader" id="spinner" style={{display: 'none'}}></div>
      <p><i className="fa fa-check" id="icon" style={{display: 'none'}}></i>{this.state.imgStatus}</p>
  </div>
    );
    }
  }
export default Exam;
