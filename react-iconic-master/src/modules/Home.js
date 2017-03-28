import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import { Router, Route, hashHistory } from 'react-router'
import './css/animate.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.css'
import Add from './Add';
import Update from './Update'
import Sample from './Sample'


var Carousel = require('nuka-carousel');
var searching=false;

class Home extends Component {


  constructor(){
      super();
      this.state={
                  res:[],load:false,rests:[],sug:false,
                  };

    }


   componentWillMount(){

        fetch('http://localhost:9000/rests/recent').then(response => response.json())
            .then(( json ) => this.setState({res:json}))
            .catch(error => console.log(error));

    }

    handleGo()
    {
    var c=document.getElementById("app");
    ReactDOM.render(<Home />,c);
    }

    propagateToParentRest(e){
            var outputDiv1 = document.getElementById('output1');
              this.setState({sug:false});
            searching=true;
            fetch('http://localhost:9000/rests/getbyname/'+search1.value).then(response => response.json())
              .then(( json ) => this.setState({res:json}))
              .catch(error => console.log(error));
              outputDiv1.innerHTML = '<h1>Restaurants List</h1>';
      }
      propagateToParentAllRest(e){
              var outputDiv1 = document.getElementById('output1');
              searching=true;
              this.setState({sug:false});
              fetch('http://localhost:9000/rests').then(response => response.json())
                .then(( json ) => this.setState({res:json}))
                .catch(error => console.log(error));
          outputDiv1.innerHTML = '<h1>Restaurants List</h1>';

        }
      propagateToParentStreet(e){
            var outputDiv1 = document.getElementById('output1');
              searching=true;
              this.setState({sug:false});
              console.log("hiii");
              fetch('http://localhost:9000/rests/getbystname/'+ search1.value).then(response => response.json())
                .then(( json ) => this.setState({res:json}))
                .catch(error => console.log(error));
                outputDiv1.innerHTML = '<h1>Restaurants List</h1>';

        }



    propagateToParentRecent(e){
      var outputDiv1 = document.getElementById('output1');
      this.setState({sug:false});
       fetch('http://localhost:9000/rests/recent').then(response => response.json())
           .then(( json ) => this.setState({res:json}))
           .catch(error => console.log(error));
        outputDiv1.innerHTML = '<h1><marquee>Recent Updates</marquee></h1>';

     }

     propagateToUserSuggestion(e){
       var outputDiv1 = document.getElementById('output1');
       this.setState({sug:true});
        fetch('http://localhost:9000/suggest').then(response => response.json())
            .then(( json ) => this.setState({res:json}))
            .catch(error => console.log(error));
         outputDiv1.innerHTML = '<h1>User Suggestions</h1>';

      }



    handleDelete(id){
    var auth = window.sessionStorage.getItem('token');
    var email = window.sessionStorage.getItem('email');

    console.log(email);
      var r = confirm("Are you sure to Delete ?");
      console.log(auth);
      if (r == true) {
        fetch('http://localhost:9000/rests/delid/'+id,
        {
          headers :{
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authentication" : auth,
            "id" : email

            },
          method: 'DELETE'
        })
        .then(response => response.json())
          .then(( json ) => this.setState({res:json}))
          .catch(error => console.log(error));

      }
    }

    handleDeleteSuggestions(id)
    {
      var r = confirm("Are you sure to Delete ?");
       this.setState({sug:true});
      if (r == true) {
      fetch('http://localhost:9000/suggestdel/'+id,
      {
        headers :{
          "Content-Type" : "application/json",
          "Accept" : "application/json",
          },
        method: 'DELETE'
      })
      .then(response => response.json())
          .then(( json ) => this.setState({res:json}))
          .catch(error => console.log(error));

    }

  }



    handleGo(id)
    {
      var c=document.getElementById("content2");

      this.setState({rests : this.state.res[id]});

      ReactDOM.render(<Update rests = {this.state.res[id]} />,c);
    }
    handleAdd()
    {
      var c=document.getElementById("content2");

      ReactDOM.render(<Add />,c);
    }
    render() {
      var sectionStyle = { backgroundSize : 'cover' };

      return (
      <div className="container" id="content2">
        <a name="home"></a>


        <header className="header" id="header" style={ sectionStyle }>
        <center>

        <div className="input-group col-md-4">
                      <input className="button_search" placeholder="Search..." id="search1" />
                       <span className="input-group-btn">

                            <div className="dropdown">
                               <button  className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"  data-hover="dropdown">
                               <span className=" glyphicon glyphicon-search"></span>  <span className="caret"></span> </button>
                               <ul className="dropdown-menu">

                                     <li><a  href="#home" onClick={this.propagateToParentRest.bind(this)}>Restaurant Name</a></li>
                                     <li><a  href="#home" onClick={this.propagateToParentStreet.bind(this)}>Street Name</a></li>
                                     <li><a  href="#home" onClick={this.propagateToParentAllRest.bind(this)}>All Restaurants</a></li>
                                     <li><a  href="#home" onClick={this.propagateToParentRecent.bind(this)}>Recent Updates</a></li>
                                     <li><a  href="#home" onClick={this.propagateToUserSuggestion.bind(this)}>User Suggestions</a></li>

                               </ul>

                             </div>

                       </span>
        </div><br />
        </center>
        </header>

            <br /><br /><br/><br /><br />



        <button type="submit" className="link" onClick={() => this.handleAdd()}>Add Restaurant</button>

         <div id = "output1"> <h1><marquee behavior="scroll" direction="left" scrollamount="50" >Recent Updates</marquee></h1> </div>


          <div className="block">

          {

            this.state.res.map((ele,i)=> {

          if(false == this.state.sug){
              return <div className="card">

                <div key={i} className="container1" >
                    <div className="grid">
                      <figure className="effect-chico">
                        <img className="img-responsive" src={ele.image} />
                        <figcaption>
                          <h2><b> {ele.restName} {ele[3]}</b></h2>
                          <br/>
                        <p>  <a className="fa fa-home fa-3x"  href={ele.homePage} target="_blank">  </a><br /></p>
                        </figcaption>
                      </figure>
                    </div>

                    <i className="fa fa-times fa-2x" onClick={() => this.handleDelete(ele.id)}></i>
                     <h3>{ele.restName}</h3>
                     <h4>
                        <b>Address:</b>
                      </h4>
                        {ele.address}<br/>



                      <br/>

                      <button onClick={() => this.handleGo(i)}>Update</button>
                      
                </div>
                 <div className="img-section-space"></div>

        </div>
      }
      else {
        return <div className="cardsug">

          <div key={i} className="container1" >
              <i className="fa fa-times fa-2x" onClick={() => this.handleDeleteSuggestions(ele.id)}></i>
               <h3>{ele.rname}</h3>
                <h5>
                  <b>Address:</b>  {ele.address}<br/>
                </h5>


                <br/>

          </div>


  </div>
      }

      } )}


      </div>

      </div>

    );
  }
}

export default Home;
