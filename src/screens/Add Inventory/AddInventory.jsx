import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
  const navigate = useNavigate();

  const inventoryFields = [
    { label: "Product Name", name: "productName" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Selling Price (per unit)", name: "sellingPrice", type: "number" },
    { label: "Cost Price (per unit)", name: "costPrice", type: "number" },
    { label: "Expiry Date", name: "expiryDate", type: "date" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const productId = formData.productName.toLowerCase().replace(/\s+/g, "_"); 
      const productRef = doc(db, "Inventory", productId);
  
      await setDoc(productRef, {
        ...formData,
        productId,
        createdAt: new Date(),
      }, { merge: true });
  
      console.log("Inventory updated/added:", formData);
  
      setTimeout(() => {
        navigate("/view-inventory");
      }, 1500);
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };
  
  return (
    <BaseForm
      title="Add Inventory"
      toastValue="Inventory Added"
      fields={inventoryFields}
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
};

export default AddInventory;
