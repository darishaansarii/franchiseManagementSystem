import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const navigate = useNavigate();

  const productFields = [
    { label: "Product Name", name: "name" },
    { label: "Category", name: "category" },
    { label: "Price", name: "price" },
    { label: "Description", name: "description" },
    { label: "Image URL", name: "image", type:'url' },
  ];

  const handleSubmit = async (formData) => {
    try {
      const productId = uuidv4();

      await setDoc(doc(db, "Products", productId), {
        ...formData,
        productId,
        createdAt: new Date(),
      });

      console.log(" Product added:", formData);

      setTimeout(() => {
        navigate("/view-product");
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <>
      <BaseForm
        title="Add Product"
        toastValue="Product Added"
        fields={productFields}
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddProduct;
