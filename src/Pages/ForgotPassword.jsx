import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { loginUser } from '../redux/actions/user';
import { connect } from 'react-redux';

class ForgotPassword extends React.Component {
    state = {
        username: "",
        password: "",
    }
    
    inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({ [name]: value })
    }

    render(){        
        return (
            <div class="container">
                <div class="card card-login mx-auto mt-5">
                    <div class="card-header">Reset Password</div>
                    <div class="card-body">
                        <div className="lead text-center">
                        <h4>Forgot your password?</h4>
                        <p>Enter your username and we will send you instructions on how to reset your password.</p>
                        </div>
                        <form>
                        <div class="form-group">
                            <div class="form-label-group">
                            <input onChange={this.inputHandler} name="username" type="text" id="inputUsername" className="form-control" placeholder="Username"/>
                            <label htmlFor="inputUsername">Username</label>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block">
                            Reset Password
                        </button>
                        </form>
                        <div class="text-center">
                            <Link class="d-block small mt-3" to="/register">Register an Account</Link>
                            <Link class="d-block small" to="/login">Login Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;