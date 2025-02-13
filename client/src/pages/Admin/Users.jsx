import React from "react";

import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutTheme from "../../components/Layout/LayoutTheme";

const Users = () => {
  return (
    <LayoutTheme title={"Dashboard - All Users"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </LayoutTheme>
  );
};

export default Users;
