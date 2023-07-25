import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/NavBar/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Product from "./pages/Product/Product";
import { WishListProvider } from "./contexts/WishListContext";
import WishList from "./pages/WishList/WishList";
import { Footer } from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ProductProvider } from "./contexts/ProductContext";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./contexts/CartContext";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentConfirmationPage from "./pages/Checkout/PaymentConfirmationPage";
import PaymentPage from "./pages/Checkout/PaymentPage";
import { SearchResult } from "./components/SearchResult/SearchResult";
import LoginPage from "./pages/Login/LoginPage";
import StripeContainer from "./pages/Checkout/StripeContainer";
import { UserProvider } from "./contexts/UserContext";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProfilePage from "./pages/UserProfilePage/ProfilePage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";

const App = () => {
  return (
    <>
      <UserProvider>
        <WishListProvider>
          <CartProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserList />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/transaction" element={<StripeContainer />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrderHistory />} />

              <Route
                path="/PaymentConfirmationPage"
                element={<PaymentConfirmationPage />}
              />
              <Route
                path="/PaymentConfirmationPage"
                element={<PaymentConfirmationPage />}
              />

              <Route
                path="/products/:category"
                element={
                  <ProductProvider>
                    <Product />
                  </ProductProvider>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductProvider>
                    <ProductDetails />
                  </ProductProvider>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/wishlist"
                element={
                  <ProductProvider>
                    <WishList />
                  </ProductProvider>
                }
              />
              <Route
                path="/search/:value"
                element={
                  <ProductProvider>
                    <SearchResult />
                  </ProductProvider>
                }
              />
            </Routes>
            <Footer />
          </CartProvider>
        </WishListProvider>
      </UserProvider>
    </>
  );
};

export default App;
