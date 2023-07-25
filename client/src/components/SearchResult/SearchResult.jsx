import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductList from "../../pages/Product/ProductList";
import { ProductContext } from "../../contexts/ProductContext";
import "./SearchResult.css";
import ProductSort from "../../pages/Product/ProductSort";
import Pagination from "../../pages/Product/Pagination";

export const SearchResult = () => {
  const location = useLocation();
  const searchQuery = location.pathname.split("/")[2];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const { setProductDetails } = useContext(ProductContext);
  const productsPerPage = 12;
  const [selectedPrice, setSelectedPrice] = useState("");

  const { performFetch, cancelFetch } = useFetch(
    `/products?sort=${selectedPrice}&page=${currentPage}&search=${searchQuery}`,
    (response) => {
      setProducts(response.result);
      setTotalProducts(response.total);
    }
  );

  useEffect(() => {
    setSelectedPrice("lowest");
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setProducts([]);
    performFetch();
    return cancelFetch;
  }, [searchQuery, currentPage, selectedPrice]);

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    setCurrentPage(1);
  };

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const renderSearchListContent = () => {
    if (products.length > 0) {
      return (
        <>
          <ProductSort
            selectedPrice={selectedPrice}
            handlePriceChange={handlePriceChange}
            productCount={products.length}
          />
          <ProductList
            products={products}
            setProductDetails={setProductDetails}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePaginate}
          />
        </>
      );
    } else {
      return <h2>Sorry! We cannot reach at the moment what you want.</h2>;
    }
  };

  return <div className="search-list">{renderSearchListContent()}</div>;
};
