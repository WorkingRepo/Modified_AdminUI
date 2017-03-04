import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/animate.css';
import './css/style.css';
import { Link } from 'react-router'
import Register from './Register'
import Add from './Add'
import Home from './Home';

class Login extends Component {

  constructor()
{
  super();
  this.state={results:[]};


}
  handleSearch() {
  //const url = encodeURI(`${BASE_URL}`);


  console.log("Entered values")
  // QUIZ: what happens if you use a normal function
  // instead of an arrow function?
  fetch('http://localhost:9000/admins/'+username.value).then(response => response.json())
    .then(( json  => this.setState({results:json})))
    .catch(error => console.log(error));

    console.log(this.state.results);
    if(this.state.results.email == username.value && this.state.results.password == password.value)
    {
      console.log("Success");
      var c=document.getElementById("content1");

      ReactDOM.render(<Home />,c);

    }
}
  render() {
    return (
      <div className="container" id ="content1">
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
    			<h1 id="title" className="animated fadeInDown"><span id="logo">Admin <span>Login</span></span></h1>
    		</div>
    		<div className="login-box animated fadeInUp">
    			<div className="box-header">
    				<h3 >Log in</h3>
    			</div>
          <br />
          <form action="">
    			<label forName="username">Username</label>
    			<br/>
    			<input type="email" id="username" required/>
    			<br/>
    			<label forName="password">Password</label>
    			<br/>
    			<input type="password" id="password" required/>
    			<br/>
    			<button type="submit" onClick={this.handleSearch.bind(this)}>Sign In</button>
    			<br/>
    			<a href="#Register"><p className="small">Forgot your password?</p></a>
          </form>
    		</div>

    	</div>
    );
  }
}


export default Login;
