import React, { Component } from 'react';
import './css/animate.css';
import './css/style.css';
import { Link } from 'react-router'

class Register extends Component {
  constructor()
  {
    super();
    this.state={results:[]};
    this.handlePost=this.handlePost.bind(this);

  }
  handlePost()
  {
    this.setState({ searching: true });
      fetch('http://localhost:9000/admins',
      {
        headers :{
          "Content-Type" : "application/json"
        },
      method: "POST",
       body: JSON.stringify({
                              "name": username.value,
                              "password": password.value,
                              "email": email.value
                            })
     })
     .then(function (data) {
  console.log('Request success: ', data);
  })
  .catch(function (error) {
  console.log('Request failure: ', error);
  });

  }
  render() {
    return (
      <div className="container">
      <nav className="navbar navbar-default">
     <div className="container-fluid">

          <ul className="nav navbar-nav">
         <li><Link to="/login">Login</Link></li>
         <li><Link to="/register">Register</Link></li>
          </ul>
            {this.props.children}
            </div>
    </nav>
    		<div className="top">
    			<h1 id="title" className="animated fadeInDown"><span id="logo">Admin <span>Register</span></span></h1>
    		</div>
    		<div className="login-box animated fadeInUp">
    			<div className="box-header">
    				<h3 >Sign Up</h3>
    			</div>
          <br />
          <form action="">
    			<label forName="username">Username</label>
    			<br/>
    			<input type="text" id="username" required/>
    			<br/>
          <label forName="email">Email</label>
    			<br/>
    			<input type="email" id="email" required/><br/>
    			<label forName="password">Password</label>
    			<br/>
    			<input type="password" id="password" required/>
    			<br/>
          <label forName="confirmpassword">Confirm Password</label>
    			<br/>
    			<input type="password" id="password1"  required/>
    			<br/>
    			<button type="submit" onClick={this.handlePost}>Sign Up</button>
    			<br/>
          </form>
    		</div>
    	</div>
    );
  }
}


export default Register;
