// navLinksConfig.js
export const adminLinks = [
  {
    text: "Dashboard",
    children: [
      { label: "Go to Dashboard", path: "/admin-dashboard" },
    ],
  },
    {
      text: "Branches",
      children: [
        { label: "Add Branch", path: "/add-branch" },
        { label: "View Branches", path: "/view-branch" },
      ],
    },
    {
      text: "Products",
      children: [
        { label: "Add Product", path: "/add-product" },
        { label: "View Products", path: "/view-product" },
      ],
    },
    {
      text: "Inventory",
      children: [
        { label: "View Inventory", path: "/view-global-inventory" },
        { label: "Add Stock", path: "/add-stock" },
      ],
    },
    {
      text: "Offers",
      children: [{ label: "Launch Offer", path: "/launch-offer" }, 
        { label: "View Offers", path: "/view-offers" }
      ],
    },
  ];
  
  export const branchManagerLinks = [
    {
      text: "Dashboard",
      children: [
        { label: "Go to Dashboard", path: "/branch-dashboard" },
      ],
    },
    {
      text: "Global Products",
      children: [
        { label: "View Global Products", path: "/view-global-products" },
      ],
    },
    {
      text: "Inventory",
      children: [
        { label: "Add Inventory", path: "/add-inventory" },
        { label: "View Inventory", path: "/view-inventory" },
      ],
    },
    {
      text: "Employees",
      children: [
        { label: "Add Employee", path: "/add-employee" },
        { label: "View Employees", path: "/view-employee" },
      ],
    },
    {
      text: "Reviews",
      children: [{ label: "Customer Reviews", path: "/branch-reviews" }],
    },
  ];
  
  export const userLinks = [
    {
      text: "Dashboard",
      children: [
        { label: "Go to Dashboard", path: "/user-dashboard" },
      ],
    },
    {
      text: "Products",
      children: [{ label: "Browse Products", path: "/products" }],
    },
    {
      text: "Orders",
      children: [{ label: "My Orders", path: "/my-orders" }
      ],
    },
    {
      text: "Offers",
      children: [
        { label: "View Offers", path: "/view-user-offers" },
        { label: "My Offers", path: "/my-offers" },
      ],
    },
    {
      text: "Reviews",
      children: [{ label: "Submit Review", path: "/review" },
        { label: "View Review", path: "/view-user-review" }
      ],
    },
  ];
  