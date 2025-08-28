import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ReviewScreen = () => {
 const navigate=useNavigate();
  const review = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "number" },
    { label: "Write a review", name: "review" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const productId = uuidv4();

      await setDoc(doc(db, "Reviews", productId), {
        ...formData,
        productId,
        createdAt: new Date(),
      });

      console.log(" Review added:", formData);
      setTimeout(()=> navigate("/view-user-review"), 1500);

    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  return (
    <>
      <BaseForm
        title="Add a Review"
        toastValue="Review Added"
        fields={review}
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ReviewScreen;
