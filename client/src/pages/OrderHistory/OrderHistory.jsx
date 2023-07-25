import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import "./orderHistory.css";

const OrderHistory = () => {
  const { userToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const port = process.env.BASE_SERVER_URL;
        const response = await axios.get(`${port}/api/order/history`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const { data } = response;
        setOrders(data);
      } catch (error) {
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchOrderHistory();
  }, [userToken]);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <h3>Loading...</h3>; // Show loading state
  }

  if (orders.length === 0) {
    return <h3>No order history available.</h3>;
  }

  const reversedOrders = orders.slice().reverse();

  return (
    <div className="order-history-container">
      <h2 className="order-history-heading">Order History</h2>
      {reversedOrders.map((order) => {
        const total = (
          order.cartItems.reduce(
            (accumulator, item) => accumulator + item.price * item.quantity,
            0
          ) + order.shippingFee
        ).toFixed(2);

        return (
          <div className="order-history-item" key={order._id}>
            <div className="order-header">
              <p className="order-id">Order ID: {order._id}</p>
            </div>
            <div className="order-details">
              <div className="personal-info">
                <h3 className="section-heading">Personal Info:</h3>
                <ul>
                  <li>
                    <span className="info-label">First Name:</span>{" "}
                    {order.personalInfo.name}
                  </li>
                  <li>
                    <span className="info-label">Last Name:</span>{" "}
                    {order.personalInfo.lastName}
                  </li>
                  <li>
                    <span className="info-label">Address:</span>{" "}
                    {order.personalInfo.address}
                  </li>
                  <li>
                    <span className="info-label">House Number:</span>{" "}
                    {order.personalInfo.houseNumber}
                  </li>
                  <li>
                    <span className="info-label">Postal Code:</span>{" "}
                    {order.personalInfo.zipcode}
                  </li>
                  <li>
                    <span className="info-label">City:</span>{" "}
                    {order.personalInfo.city}
                  </li>
                  <li>
                    <span className="info-label">Country:</span>{" "}
                    {order.personalInfo.country}
                  </li>
                </ul>
              </div>
              <div className="order-summary">
                <h3 className="section-heading">Order Summary:</h3>
                <ul>
                  <li>
                    <span className="info-label">Payment Method:</span>{" "}
                    {order.paymentMethod}
                  </li>
                  <li>
                    <span className="info-label">Shipping Method:</span>{" "}
                    {order.shippingMethod}
                  </li>
                  <li>
                    <span className="info-label">Shipping Fee:</span>{" "}
                    {order.shippingFee}
                  </li>
                  <li>
                    <span className="info-label">Total Paid Amount:</span>{" "}
                    {total}
                  </li>
                </ul>
              </div>
              <div className="cart-items">
                <h3 className="section-heading">Purchased Items:</h3>
                <ul>
                  {order.cartItems.map((item) => (
                    <li className="cart-item" key={item._id}>
                      <div className="item-details">
                        <img
                          className="product-image"
                          src={item.images[0]}
                          alt="Product image"
                        />
                        <div>
                          <p>
                            <span className="info-label">Item:</span>{" "}
                            {item.productName}
                          </p>
                          <p>
                            <span className="info-label">Category:</span>{" "}
                            {item.category}
                          </p>
                          <p>
                            <span className="info-label">Quantity:</span>{" "}
                            {item.quantity}
                          </p>
                          <p>
                            <span className="info-label">Price:</span>{" "}
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
