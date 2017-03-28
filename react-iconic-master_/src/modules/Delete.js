import React, { Component } from 'react';
import './css/animate.css';
import './css/style.css';

import { Link } from 'react-router'

class Delete extends Component {

  render() {
    return (
      <div className="container">

      	<div className="top">
    			<h1 id="title" className="animated fadeInDown"><span id="logo">Delete Restaurant</span></h1>
    		</div>
    		<div className="login-box animated fadeInUp">
    			<div className="box-header">
    				<h2 >Delete</h2>
    			</div>
           <br/>
           <form action="">
          <label forName="Rname">Restaurant Name</label><br/>
          <input type="text" id="Rname" required/>
          <br/>
          <label forName="latitute">latitute</label><br/>
          <input type="text" id="latitute" required/>
          <br/>
          <label forName="longitude">longitude</label><br/>
          <input type="text" id="longitude" required/>
          <br/>
          <label forName="Streetname">Street Name</label><br/>
          <input type="text" id="Streetname" required/>
          <br/>
          <button type="submit">Delete</button>
    	    <br/>
          </form>
    		</div>
    	</div>
    );
  }
}

export default Delete;
