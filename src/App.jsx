import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../src/assets/styles/sb-admin.css";
import "../src/assets/styles/sb-admin.min.css";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProductDetail from './pages/ProductDetail';
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";

import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './redux/actions/user';
import { getCartData } from './redux/actions/cart';

class App extends React.Component {

  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataFinalProject")

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar />
            <Switch>
              <Route component={Login} path="/login" />
              <Route component={Register} path="/register"/>
              <Route component={ForgotPassword} path="/forgotpassword"/>
              <Route component={Admin} path="/admin" />
              <Route component={History} path="/history" />
              <Route component={ProductDetail} path="/product-detail/:productId" />
              <Route component={Home} path="/" />
            </Switch>
          <Footer />
        </BrowserRouter>
      )
    }

    return (
      <div>
        Loading...
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
