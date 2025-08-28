import React, { useEffect, useState } from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddStock = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const prodSnapshot = await getDocs(collection(db, "Inventory"));
      const prodList = prodSnapshot.docs.map((doc) => ({
        label: doc.data().productName,
        value: doc.data().productName,
      }));
      setProducts(prodList);
    };

    fetchProducts();
  }, []);

  const stockFields = [
    { label: "Product Name", name: "productName", type: "select", options: products },
    { label: "Quantity to Add", name: "quantity", type: "number" },
    { label: "Supplier Name", name: "supplierName" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const productRef = doc(db, "Inventory", formData.productName.toLowerCase().replace(/\s+/g, "_"));
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const oldData = productSnap.data();
        await updateDoc(productRef, {
          quantity: Number(oldData.quantity) + Number(formData.quantity),
          updatedAt: new Date(),
        });
      } else {
        await setDoc(productRef, {
          ...formData,
          quantity: Number(formData.quantity),
          inventoryId: uuidv4(),
          createdAt: new Date(),
        });
      }

      setTimeout(() => {
        navigate("/view-global-inventory");
      }, 1500);
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <BaseForm
      title="Add Stock"
      toastValue="Stock Updated"
      fields={stockFields}
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
};

export default AddStock;
