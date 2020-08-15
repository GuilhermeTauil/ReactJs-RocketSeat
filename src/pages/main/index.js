import React, { Component } from 'react';
import Api from '../../services/Api'
import './style.css';
import { Link } from 'react-router-dom';


export default class Main extends Component {
    state = {
        products: [],
        productsInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await Api.get(`/products?page=${page}`);

        const { docs, ...productsInfo } = response.data;

        this.setState({ products: docs, productsInfo, page });
    };

    prevpage = async () => {
        const { page, productsInfo } = this.state;

        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };

    nextpage = async () => {
        const { page, productsInfo } = this.state;

        if (page === productsInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }



    render() {
        const { products } = this.state;

        return (
            <div className="product-list">
                {products.map(products => (
                    <article key="product._id">
                        <strong>{products.title}</strong>
                        <p>{products.description}</p>

                        <Link to={`/products/${products._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button onClick={this.prevpage}>Anterior</button>
                    <button onClick={this.nextpage}>Proximo</button>

                </div>
            </div>
        )
    }
}