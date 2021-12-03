import React from "react";
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux';
import { getCartData } from '../redux/actions/cart'

class ProductDetail extends React.Component {
    state = {
        productData: {},
        productNotFound: false,
        quantity: 1,
    }

    fetchProductData = () => {
        // alert(this.props.match.params.productId)
        Axios.get(`${API_URL}/products`, {
        params: {
            id: this.props.match.params.productId
        }
        })
        .then((result) => {
        if (result.data.length) {
            this.setState({ productData: result.data[0] })
        } else {
            this.setState({ productNotFound: true })
        }
        })
        .catch(() => {
        alert("Terjadi kesalahan di server")
        })
    }

    componentDidMount() {
        this.fetchProductData()
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                    </div>
                    <div class="col-lg-9">
                        <div class="card mt-4">
                            <img class="card-img-top img-fluid" style={{ height:400 }} src={this.state.productData.productImage} alt="{this.props.productData.productName}"/>
                            <div class="card-body">
                                <h3 class="card-title">{this.state.productData.productName}</h3>
                                <h4>Rp. {this.state.productData.price}</h4>
                                <p class="card-text">{this.state.productData.description}</p>
                                <hr/>
                                <div className="d-flex flex-row align-items-center">
                                    <button onClick={() => this.qtyBtnHandler("decrement")} className="btn btn-primary mr-4">
                                    -</button>
                                    {this.state.quantity}
                                    <button onClick={() => this.qtyBtnHandler("increment")} className="btn btn-primary mx-4">
                                    +</button>
                                </div>
                                <button onClick={this.addToCartHandler} className="btn btn-success mt-3">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                        <div class="card card-outline-secondary my-4">
                            <div class="card-header">
                                Product Reviews
                            </div>
                            <div class="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small class="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small class="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small class="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
                                <a href="#" class="btn btn-success">Leave a Review</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default (ProductDetail);