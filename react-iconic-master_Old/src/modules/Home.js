import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import './css/animate.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.css'
import Add from './Add';
import Update from './Update'
import Sample from './Sample'

var Carousel = require('nuka-carousel');

class Home extends Component {

  constructor(){
      super();
      this.state={
                  res:[],load:false,rests:''
                  };
    }
   componentWillMount(){
        fetch('http://localhost:9000/rests').then(response => response.json())
            .then(( json ) => this.setState({res:json}))
            .catch(error => console.log(error));
    }

    componentWillUpdate(){
         fetch('http://localhost:9000/rests').then(response => response.json())
             .then(( json ) => this.setState({res:json}))
             .catch(error => console.log(error));
     }

    handleDelete(id){

      var r = confirm("Are you sure to Delete ??");
      if (r == true) {
        fetch('http://localhost:9000/rests/delid/'+id,
        {
          headers :{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
            },
          method: 'DELETE'
        })
        .then(function (data) {
          console.log('Request success: ', data);
          this.setState(load:true);
        })
        .catch(function (error) {
          console.log('Request failure: ', error);
        });
      }
    }

    handleGo(id)
    {
      var c=document.getElementById("content1");

      this.setState({rests : this.state.res[id]});

      ReactDOM.render(<Update rests = {this.state.res[id]}/>,c);
    }
    handleAdd()
    {
      var c=document.getElementById("content1");
      ReactDOM.render(<Add />,c);
    }
    handleSample()
    {
      var c=document.getElementById("content1");
      ReactDOM.render(<Sample />,c);
    }

    render() {
      return (
      <div className="container" id="content1">

          <button onClick={() => this.handleAdd()}>Add Restaurant</button>
            <button onClick={() => this.handleSample()}>Sample Restaurant</button>
         <h1>Restaurants List</h1>
          {

            this.state.res.map((ele,i)=> {

              return <div className="card">

                <div key={i} className="container1" >

                     <h3>Restaurant Name: {ele.restName}</h3>
                     <h4>
                        <b>Address:</b>
                      </h4>
                        {ele.address}<br/>



                      <br/>

                      <button onClick={() => this.handleGo(i)}>Update</button>
                      <button onClick={() => this.handleDelete(ele.id)}>Delete</button>
                </div>
                 <div className="img-section-space"></div>
        </div>
      } )}

      </div>

    );
  }
}

export default Home;
