import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutTheme from "../../components/Layout/LayoutTheme";
import { Modal } from "antd";
import GeneralForm from "../../components/Form/GeneralForm";

const CreateLength = () => {
  const [lengths, setLengths] = useState([]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSize, setUpdatedSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !size) {
      toast.error("Name and Size are required");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/length/create-length`,
        { name, size }
      );
      if (data?.success) {
        toast.success(`${name} Length is created`);
        getAllLengths();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllLengths = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/length/get-length`
      );
      
      if (data.success && Array.isArray(data.lengths)) {
        setLengths(data.lengths); 
      } else {
        toast.error("Failed to fetch lengths");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting lengths");
    }
  };

  useEffect(() => {
    getAllLengths();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName || !updatedSize) {
      toast.error("Name and Size are required");
      return;
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/length/update-length/${
          selected._id
        }`,
        { name: updatedName, size: updatedSize }
      );
      if (data.success) {
        toast.success(`${updatedName} Length is updated`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedSize("");
        setVisible(false);
        getAllLengths();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (lengthId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/length/delete-length/${lengthId}`
      );
      if (data.success) {
        toast.success(`Length is deleted`);
        getAllLengths();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <LayoutTheme title='Dashboard - Create Length'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 mb-4'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Length</h1>
            <div className='p-3 w-50'>
              <GeneralForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                size={size}
                setSize={setSize}
                placeholder='Enter new Length'
                sizePlaceholder='Enter Length Size'
              />
            </div>
            <div className='w-75'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Size</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lengths && lengths.length > 0 ? (
                    lengths.map((length) => (
                      <tr key={length._id}>
                        <td>{length.name}</td>
                        <td>{length.size}</td>
                        <td>
                          <button
                            className='btn btn-primary ms-2'
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(length.name);
                              setUpdatedSize(length.size);
                              setSelected(length);
                            }}>
                            Edit
                          </button>
                          <button
                            className='btn btn-danger ms-2'
                            onClick={() => handleDelete(length._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='3'>No lengths found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}>
              <GeneralForm
                value={updatedName}
                setValue={setUpdatedName}
                size={updatedSize}
                setSize={setUpdatedSize}
                handleSubmit={handleUpdate}
                placeholder='Update Length Name'
                sizePlaceholder='Update Length Size'
              />
            </Modal>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CreateLength;
