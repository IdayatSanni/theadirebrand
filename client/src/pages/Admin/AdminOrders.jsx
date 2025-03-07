import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import LayoutTheme from "../../components/Layout/LayoutTheme";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/auth/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders.");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      getOrders(); 
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status.");
    }
  };

  return (
    <LayoutTheme>
      <div className='row dashboard'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className='border shadow' key={o._id}>
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
                      <td>
                        <Select
                          variant='outlined' 
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}>
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>
                        {o?.buyer?.name || o?.guestName}{" "}
                       
                      </td>
                      <td>{moment(o?.createdAt).fromNow()}</td>{" "}
                      
                      <td>
                        {o?.payment === "payment_on_delivery"
                          ? "Pending"
                          : "Paid"}
                      </td>{" "}
                    
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='container'>
                  {o?.products?.map((p) => (
                    <div
                      className='row mb-2 p-3 card flex-row'
                      key={p.productId._id}>
                      <div className='col-md-8'>
                        <p>{p.productId.name}</p>
                        <p>Price: {p.productId.price}</p>
                        <p>Quantity: {p.quantity}</p>{" "}
                       
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutTheme>
  );
};

export default AdminOrders;
