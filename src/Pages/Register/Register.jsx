import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import { registerUser } from '../../redux/actions/user'
import { connect } from 'react-redux'

class Register extends React.Component {
  state = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  }

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
  }

  registerHandler = () => {
    const { fullName, username, email, password } = this.state;
    Axios.post(`${API_URL}/users`, {
      fullName,
      username,
      email,
      password,
      role: "user",
    })
    .then(() => {
      alert("Registration successful.")
    })
    .catch(() => {
      alert("Registration failed, please try again.")
    })
  }

  render() {
    return (
        <div class="container">
            <div class="card card-register mx-auto mt-5">
                <div class="card-header">Register an Account</div>
                <div class="card-body">
                    <p className="lead text-center">
                        Register now and start shopping in the most affordable ecommerce platform</p>
                    <div class="form-group">
                        <div class="form-row">
                        <div class="col-md-6">
                            <div class="form-label-group">
                            <input onChange={this.inputHandler} type="text" id="fullName" name="fullName" className="form-control" placeholder="Full Name"/>
                            <label htmlFor="fullName">Full Name</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-label-group">
                            <input onChange={this.inputHandler} type="text" id="userName" name="username" className="form-control" placeholder="Username" />
                            <label htmlFor="userName">Username</label>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-label-group">
                        <input onChange={this.inputHandler} type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" />
                        <label htmlFor="inputEmail">Email address</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-label-group">
                        <input onChange={this.inputHandler} type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" />
                        <label htmlFor="inputPassword">Password</label>
                        </div>
                    </div>
                    <button onClick={() => this.props.registerUser(this.state)} className="btn btn-primary btn-block">
                        Register
                    </button>
                    <div class="text-center">
                        <Link class="d-block small mt-3" to="/login">Login Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);