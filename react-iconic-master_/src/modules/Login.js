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
  this.state={results:'',res:'',token:'',resu:'', admin:''};


}



handleSearch(e){
  var status ;
  var dupJson;
  fetch('http://localhost:9000/admins/validate/'+username.value+"?pwd="+password.value)
  .then(response => {
      if(200 == response.status){
        response.json().then((data) => {
              this.setState({admin:data});
              //console.log(this.state.admin[0].token);
              var c=document.getElementById("content1");
              ReactDOM.render(<Home admin={this.state.admin}/>,c);
              console.log("Success");
              window.sessionStorage.setItem('token', this.state.admin[0].token);
              window.sessionStorage.setItem('email', this.state.admin[0].email);
              console.log(window.sessionStorage.getItem('token')+"//////"+window.sessionStorage.getItem('email'));

          });
        }
        else {
          window.alert("Invalid Username or Password ");
          document.getElementById("password").value = '';
        }

    })

      .catch(error => console.log(error));


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
