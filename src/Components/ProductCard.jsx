import React from "react";
import "../assets/styles/product_card.css";
import { Link } from 'react-router-dom'

class ProductCard extends React.Component {
    render() {
        return (
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img class="card-img-top" src={this.props.productData.productImage} alt="{this.props.productData.productName}"/>
                    <div class="card-body">
                        {/* localhost:3000/product-detail/{id barang} */}
                        <Link to={`/product-detail/${this.props.productData.id}`}>
                        <h4 class="card-title">{this.props.productData.productName}</h4>
                        </Link>
                        <h5>Rp. {this.props.productData.price}</h5>
                        <p class="card-text">{this.props.productData.description}</p>
                    </div>
                    <div class="card-footer">
                        <button className="btn btn-primary">Detail</button>&nbsp;&nbsp;
                        <button className="btn btn-success">+ keranjang</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;