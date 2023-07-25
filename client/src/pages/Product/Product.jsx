import React, { useEffect, useContext, useState } from "react";
import "./product.css";
import useFetch from "../../hooks/useFetch";
import { ProductContext } from "../../contexts/ProductContext";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import ProductSort from "./ProductSort";
import ProductList from "./ProductList";

const Product = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { setProductDetails } = useContext(ProductContext);
  const productsPerPage = 12;
  const [selectedPrice, setSelectedPrice] = useState("");
  const { performFetch, cancelFetch } = useFetch(
    category !== "shop"
      ? `/products?category=${category}&sort=${selectedPrice}&page=${currentPage}`
      : `/products?sort=${selectedPrice}&page=${currentPage}`,
    (response) => {
      setProducts(response.result);
      setTotalProducts(response.total);
    }
  );

  const categoryEncoded = decodeURIComponent(category);

  useEffect(() => {
    setSelectedPrice("lowest");
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    setProducts([]);
    performFetch();
    return cancelFetch;
  }, [category, currentPage, selectedPrice]);

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    setCurrentPage(1);
  };

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <>
      <ProductSort
        selectedPrice={selectedPrice}
        handlePriceChange={handlePriceChange}
        productCount={products.length}
      />
      <div className="product-title">
        <h1>{category !== "shop" ? categoryEncoded : "All Products"}</h1>
      </div>
      <ProductList products={products} setProductDetails={setProductDetails} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={handlePaginate}
      />
    </>
  );
};

export default Product;
