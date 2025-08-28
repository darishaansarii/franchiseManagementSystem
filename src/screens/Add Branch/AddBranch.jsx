import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

const AddBranch = () => {
  const navigate = useNavigate();

  const branchFields = [
    { label: "Branch Name", name: "name" },
    { label: "Address", name: "address" },
    { label: "Owner", name: "ownerName" },
    { label: "Email", name: "email", type: "email" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const branchId = uuidv4();

      await setDoc(doc(db, "Branches", branchId), {
        ...formData,
        branchId, 
        createdAt: new Date(),
      });

      console.log(" Branch added:", formData);

      setTimeout(() => {
        navigate("/view-branch");
      }, 1500);
    } catch (error) {
      console.error("❌ Error adding branch:", error);
    }
  };

  return (
    <BaseForm
      title="Add Branch"
      toastValue="Branch Added"
      fields={branchFields}
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBranch;
