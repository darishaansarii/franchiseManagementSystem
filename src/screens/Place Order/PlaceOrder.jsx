import React, { useEffect } from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  if (!product) return null;

  const orderFields = [
    { label: "Product Name", name: "name", disabled: true },
    { label: "Price", name: "price", disabled: true },
    { label: "Address", name: "address" },
    { label: "Email", name: "email", type: "email" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const orderId = uuidv4();

      await setDoc(doc(db, "Orders", orderId), {
        ...formData,
        orderId,
        createdAt: new Date(),
        productDetails: {
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
        },
      });

      console.log("✅ Order placed:", formData);
      navigate("/my-orders");
    } catch (error) {
      console.error("❌ Error placing order:", error);
    }
  };

  return (
    <BaseForm
      title="Place Order"
      toastValue="Order Placed"
      fields={orderFields}
      initialValues={{
        name: product.name || "",
        price: product.price || "",
        address: "",
        email: "",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default PlaceOrder;
