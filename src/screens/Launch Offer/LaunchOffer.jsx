import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

const LaunchOffer = () => {
  const navigate = useNavigate();

  const offerFields = [
    { label: "Offer Title", name: "title" },
    { label: "Description", name: "description" },
    { label: "Discount Type", name: "type" },
    { label: "Start Date", name: "startDate", type: "date" },
    { label: "End Date", name: "endDate", type: "date" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const offerId = uuidv4();

      await setDoc(doc(db, "Offers", offerId), {
        ...formData,
        offerId, 
        createdAt: new Date(),
      });

      console.log(" Offer launched:", formData);
      setTimeout(()=>navigate("/view-offers"), 1500);
    } catch (error) {
      console.error("Error launching offer:", error);
    }
  };

  return (
    <BaseForm
      title="Launch Offer"
      toastValue="Offer Launched"
      fields={offerFields}
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
};

export default LaunchOffer;
