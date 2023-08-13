import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <Navbar>
      <AdminOrders />
    </Navbar>
  );
};

export default AdminOrdersPage;
