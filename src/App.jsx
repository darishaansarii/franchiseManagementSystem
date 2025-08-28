import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./screens/Login/Login.jsx";
import Signup from "./screens/Signup/Signup.jsx";
import AuthRoute from "./routes/authRoute";
import ProtectedRoutes from "./routes/protectedRoutes";
import Dashboard from "./screens/Dashboard";
import { ToastContainer } from "react-toastify";
// import { Navbar } from "./components/Navbar/Navbar.jsx";
import AdminDashboard from "./screens/Admin Dashboard/AdminDashboard.jsx";
import BranchDashboard from "./screens/Branch Dashboard/BranchDashboard.jsx";
import UserDashboard from "./screens/User Dashboard/UserDashboard.jsx";
import RoleProtectedRoute from "./routes/RoleProtectedRoute.jsx";
import RedirectToRoleDashboard from "./components/RedirectToRoleDashboard.jsx";
import AddBranch from "./screens/Add Branch/AddBranch.jsx";
import ViewBranch from "./screens/View Branch/ViewBranch.jsx";
import AddProduct from "./screens/Add Product/AddProduct.jsx";
import ViewProduct from "./screens/View Product/ViewProduct.jsx";
import AddStock from "./screens/Add Stock/AddStock.jsx";
import ViewInventory from "./screens/View Inventory/ViewInventory.jsx";
import LaunchOffer from "./screens/Launch Offer/LaunchOffer.jsx";
import Layout from "./screens/Layout/Layout.jsx";
import EditBranch from "./screens/Edit Branch/EditBranch.jsx";
import EditProduct from "./screens/Edit Product/EditProduct.jsx";
import ViewGlobalProducts from "./screens/View Global Products/ViewGlobalProducts.jsx";
import EditInventory from "./screens/Edit Inventory/EditInventory.jsx";
import AddInventory from "./screens/Add Inventory/AddInventory.jsx";
import AddEmployee from "./screens/Add Employee/AddEmployee.jsx";
import ViewEmployee from "./screens/View Employee/ViewEmployee.jsx";
import ViewReview from "./screens/View Review/ViewReview.jsx";
import EditEmployee from "./screens/Edit Employee/EditEmployee.jsx";
import ViewGlobalInventory from "./screens/View Global Inventory/ViewGlobalInventory.jsx";
import PlaceOrder from "./screens/Place Order/PlaceOrder.jsx";
import ReviewScreen from "./screens/Review Screen/ReviewScreen.jsx";
import ViewOffers from "./screens/View Offers/ViewOffers.jsx";
import EditOffer from "./screens/Edit Offer/EditOffer.jsx";
import ViewUserProducts from "./screens/View UserProducts/ViewUserProducts.jsx";
import MyOrders from "./screens/My Orders/MyOrders.jsx";
import ViewUserReview from "./screens/View User Review/ViewUserReview.jsx";
import EditReview from "./screens/Edit Review/EditReview.jsx";
import ViewUserOffers from "./screens/View User Offers/ViewUserOffers.jsx";
import MyOffers from "./screens/My Offers/MyOffers.jsx";

function App() {
  // const location = useLocation();

  // const hideNavbarRoutes = ["/", "/signup"];

  // const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* {!shouldHideNavbar && <Navbar />} */}
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<RedirectToRoleDashboard />} />

        <Route element={<Layout />}>
          {/* Admin Only */}
          <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/add-branch" element={<AddBranch />} />
            <Route path="/view-branch" element={<ViewBranch />} />
            <Route path="/edit-branch/:id" element={<EditBranch />} />

            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />

            <Route path="/add-stock" element={<AddStock />} />
            <Route path="/view-global-inventory" element={<ViewGlobalInventory />} />

            <Route path="/launch-offer" element={<LaunchOffer />} />
            <Route path="/edit-offer/:id" element={<EditOffer />} />
            <Route path="/view-offers" element={<ViewOffers />} />
          </Route>

          {/* Branch Manager Only */}
          <Route
            element={<RoleProtectedRoute allowedRoles={["branchManager"]} />}
          >
            <Route path="/branch-dashboard" element={<BranchDashboard />} />

            <Route path="/view-global-products" element={<ViewGlobalProducts />} />

            <Route path="/add-inventory" element={<AddInventory />} />
            <Route path="/view-inventory" element={<ViewInventory />} />
            <Route path="/edit-inventory/:id" element={<EditInventory />} />

            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/view-employee" element={<ViewEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />

            <Route path="/branch-reviews" element={<ViewReview />} />

          </Route>

          {/* Customer Only */}
          <Route element={<RoleProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/products" element={<ViewUserProducts />} />

            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/my-orders" element={<MyOrders />} />

            <Route path="/edit-review/:id" element={<EditReview />} />
            <Route path="/review" element={<ReviewScreen />} />
            <Route path="/view-user-review" element={<ViewUserReview />} />
            <Route path="/view-user-offers" element={<ViewUserOffers />} />
            <Route path="/my-offers" element={<MyOffers />} />

          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
