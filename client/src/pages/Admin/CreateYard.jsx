import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutTheme from "../../components/Layout/LayoutTheme";
import { Modal } from "antd";
import GeneralForm from "../../components/Form/GeneralForm";

const CreateYard = () => {
  const [yards, setYards] = useState([]);
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
        `${import.meta.env.VITE_API}/api/v1/yard/create-yard`,
        { name, size }
      );
      if (data?.success) {
        toast.success(`${name} Yard is created`);
        getAllYards();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllYards = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/yard/get-yard`
      );
      
      if (data.success && Array.isArray(data.yards)) {
        setYards(data.yards);
      } else {
        toast.error("Failed to fetch yards");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting yards");
    }
  };

  useEffect(() => {
    getAllYards();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName || !updatedSize) {
      toast.error("Name and Size are required");
      return;
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/yard/update-yard/${selected._id}`,
        { name: updatedName, size: updatedSize }
      );
      if (data.success) {
        toast.success(`${updatedName} Yard is updated`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedSize("");
        setVisible(false);
        getAllYards();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (yardId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/yard/delete-yard/${yardId}`
      );
      if (data.success) {
        toast.success(`Yard is deleted`);
        getAllYards();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <LayoutTheme title='Dashboard - Create Yard'>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Yard</h1>
            <div className='p-3 w-50'>
              <GeneralForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                size={size}
                setSize={setSize}
                placeholder='Enter new Yard'
                sizePlaceholder='Enter Yard Size'
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
                  {yards.length > 0 ? (
                    yards.map((yard) => (
                      <tr key={yard._id}>
                        <td>{yard.name}</td>
                        <td>{yard.size}</td>
                        <td>
                          <button
                            className='btn btn-primary ms-2'
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(yard.name);
                              setUpdatedSize(yard.size);
                              setSelected(yard);
                            }}>
                            Edit
                          </button>
                          <button
                            className='btn btn-danger ms-2'
                            onClick={() => handleDelete(yard._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='3'>No yards found.</td>
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
                placeholder='Update Yard Name'
                sizePlaceholder='Update Yard Size'
              />
            </Modal>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default CreateYard;
