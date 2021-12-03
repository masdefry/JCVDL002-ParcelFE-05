import React from 'react';
import ProductCard from "../components/ProductCard";
import Axios from 'axios';
import { API_URL } from '../constants/API';

class Home extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 6,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  }

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
    .then((result) => {
      this.setState({ productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage), filteredProductList: result.data })
    })
    .catch(() => {
      alert("Terjadi kesalahan di server")
    })
  }

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage
    let rawData = [ ...this.state.filteredProductList ]

    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }

      if (a.productName > b.productName) {
        return 1;
      }

      return 0;
    }

    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break
      case "az":
        rawData.sort(compareString);
        break
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break
      default:
        rawData = [ ...this.state.filteredProductList ];
        break;
    }

    const currentData = rawData.slice(beginningIndex, beginningIndex + this.state.itemPerPage)

    return currentData.map((val) => {
      return <ProductCard productData={val} />
    })
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 })
    }
  }

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
    }
  }

  inputHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  searchBtnHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase());
    })

    this.setState({ filteredProductList, maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage), page: 1 })
  }

  componentDidMount() {
    this.fetchProducts();
  }

    render(){
        return (
          <div class="container">
            <div class="row">
              <div class="col-lg-3">
                <h2 class="my-4">Filter Products</h2>
                <div class="card my-4">
                  <h5 class="card-header">Product Name</h5>
                  <div class="card-body">
                    <div class="input-group">
                      <input onChange={this.inputHandler} name="searchProductName" type="text" class="form-control" placeholder="Search for..."/>
                      <span class="input-group-btn">
                        <button onClick={this.searchBtnHandler} class="btn btn-info" type="button">Go!</button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="card my-4">
                  <h5 class="card-header">Product Category</h5>
                  <div class="card-body">
                    <select onChange={this.inputHandler} name="searchCategory" className="form-control">
                      <option value="">All Items</option>
                      <option value="bahanpokok">Bahan pokok</option>
                      <option value="ikan">Ikan</option>
                      <option value="seafood">Seafood</option>
                      <option value="buah">Buah-buahan</option>
                      <option value="sayur">Sayuran</option>
                    </select>
                  <div class="card-footer">
                    <button onClick={this.searchBtnHandler} className="btn btn-primary mt-3">
                    Search</button>
                  </div>
                  </div>
                </div>
                <div class="card my-4">
                  <h5 class="card-header">Sort by</h5>
                  <div class="card-body">
                    <select onChange={this.inputHandler} name="sortBy" className="form-control">
                      <option value="">Default</option>
                      <option value="lowPrice">Lowest Price</option>
                      <option value="highPrice">Highest Price</option>
                      <option value="az">A-Z</option>
                      <option value="za">Z-A</option>
                    </select>
                  </div>
                </div>
                <div class="card my-4">
                  <div class="card-body">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <button disabled={this.state.page === 1} onClick={this.prevPageHandler} className="btn btn-outline-primary">
                        {"<"}
                      </button>
                      <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                      <button disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler} className="btn btn-outline-primary">
                        {">"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-9">
                <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
                  <div class="carousel-inner" role="listbox">
                    <div class="carousel-item">
                      <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  {/* Render products here */}
                  {this.renderProducts()}
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Home;