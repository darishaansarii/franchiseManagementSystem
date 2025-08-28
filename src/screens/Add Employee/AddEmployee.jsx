import React from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

const AddEmployee = () => {
  const navigate = useNavigate();

  const employeeFields = [
    { label: "Employee Name", name: "name" },
    { label: "Address", name: "address" },
    { label: "Phone Number", name: "number" },
    { label: "Email", name: "email", type: "email" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const employeeId = uuidv4();

      await setDoc(doc(db, "Employees", employeeId), {
        ...formData,
        employeeId, 
        createdAt: new Date(),
      });

      console.log(" Employee added:", formData);

      setTimeout(() => {
        navigate("/view-employee");
      }, 1500);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <BaseForm
      title="Add Employee"
      toastValue="Employee Added"
      fields={employeeFields}
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
};

export default AddEmployee;
