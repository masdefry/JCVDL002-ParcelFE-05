import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { loginUser } from '../../redux/actions/user';
import { connect } from 'react-redux'

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    }
    
    inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({ [name]: value })
    }

    render() {
        if (this.props.userGlobal.id) {
            return <Redirect to="/" />
        }
        
        return (
            <div class="container">
                <div class="card card-login mx-auto mt-5">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <p className="lead text-center">
                        Log in now and start shopping in the most affordable ecommerce platform</p>
                        <form>
                        <div class="form-group">
                            <div class="form-label-group">
                            <input onChange={this.inputHandler} name="username" type="text" id="inputUsername" className="form-control" placeholder="Username"/>
                            <label htmlFor="inputUsername">Username</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-label-group">
                            <input onChange={this.inputHandler} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
                            <label htmlFor="inputPassword">Password</label>
                            </div>
                        </div>
                        <div class="form-group">
                            {
                                this.props.userGlobal.errMsg ? 
                                <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div>
                                : null
                            }
                        </div>
                        <button onClick={() => this.props.loginUser(this.state)} className="btn btn-primary btn-block">
                            Login
                        </button>
                        </form>
                        <div class="text-center">
                            <Link class="d-block small mt-3" to="/register">Register an Account</Link>
                            <Link class="d-block small" to="/forgotpassword">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
}

const mapDispatchToProps = {
    loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);