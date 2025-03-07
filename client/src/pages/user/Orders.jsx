import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import LayoutTheme from "../../components/Layout/LayoutTheme";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log("Fetched Orders:", data);
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <LayoutTheme title={"Your Orders"}>
      <div className='container-flui p-3 m-3 dashboard'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Orders</h1>
            {orders?.map((order, i) => (
              <div className='border shadow' key={order._id || i}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Buyer</th>
                      <th scope='col'>Date</th>
                      <th scope='col'>Payment</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className='container'>
                  {order?.products && order.products.length > 0 ? (
                    order.products.map((product, index) => (
                      <div
                        className='row mb-2 p-3 card flex-row'
                        key={product._id || product.slug || product.name}>
                        <div className='col-md-8'>
                          <p>{product.productId.name}</p>

                          <p>Price: {product.productId.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products found in this order.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default Orders;
