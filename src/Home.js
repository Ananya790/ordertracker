import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from 'react-select';

function Home() {
  const [orderNumber, setOrderNumber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    Cookies.remove("cookieconstant");
    setRedirect(true);
  };

  useEffect(() => {
    setUser(true);
    if (user) {
      const url = 'https://ananya790.github.io/vehicle.json';
      axios.get(url).then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching customer data:', error));
    }
  }, [user]);

  const handleCustomerChange = (selectedOption) => {
    const customerID = selectedOption.value;
    setOrderNumber(customerID);
    const customer = customers.find(cust => cust.customerID === customerID);
    setSelectedCustomer(customer);
    setSelectedOrders(customer ? customer.orders : []);
    setSelectedOrder(null); // Reset selected order
  };

  const handleOrderChange = (selectedOption) => {
    const orderId = selectedOption.value;
    const order = selectedOrders.find(order => order.orderId === orderId);
    setSelectedOrder(order);
  };

  const handleSubmit = () => {
    if (selectedOrder) {
      navigate('/vehiclelist', { state: { order: selectedOrder } });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const customerOptions = customers.map(customer => ({
    value: customer.customerID,
    label: customer.customerName
  }));

  const orderOptions = selectedOrders.map(order => ({
    value: order.orderId,
    label: (
      <div className="item-details">
        <div className="detail-row">
          <div className="label">Order ID:</div>
          <div className="value">{order.orderId}</div>
        </div>
        <div className="detail-row">
          <div className="label">Order Date:</div>
          <div className="value">{order.orderDate}</div>
        </div>
        <div className="detail-row">
          <div className="label">Delivery Date:</div>
          <div className="value">{order.plannedDeliveryDate}</div>
        </div>
      </div>
    )
  }));

  return (
    <div className="order-tracker">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p className='title'>Order Tracker</p>
          <Outlet context={{ user, setUser, logoutUser }} />
          <div className='mt-10'>
            <button onClick={logoutUser} className='btn'>Logout</button>
          </div>
        </div>
      </nav>
       <div className="search-bar">
        <div className="customer-select">
          <p>Customer:</p>
          <Select
            options={customerOptions}
            onChange={handleCustomerChange}
            placeholder="Select Customer"
          />
        </div> 

        {/* <div className="search-bar">
        <div className="customer-select">
          <p>Customer:</p>
          <select value={orderNumber} onChange={handleCustomerChange}>
            <option value="" disabled>Select Customer</option>
            {customers.map((customer, index) => (
              <option key={index} value={customer.customerID}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div> */}

        {selectedCustomer && (
          <div className="order-select">
            <p>Order:</p>
            <Select
              options={orderOptions}
              onChange={handleOrderChange}
              placeholder="Select Order"
              formatOptionLabel={option => option.label}
            />
          </div>
        )}

        <button onClick={handleSubmit}>Click to Search</button>
      </div>
    </div>
  );
}

export default Home;
