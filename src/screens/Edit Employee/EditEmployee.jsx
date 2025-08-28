import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const employeeFields = [
    { label: "Employee Name", name: "name" },
    { label: "Address", name: "address" },
    { label: "Phone Number", name: "number" },
    { label: "Email", name: "email", type: "email" },

  ];

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const docRef = doc(db, "Employees", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);
  const handleEmployeeSubmit = (data) => {
    console.log("Employees Data:", data);
    updateDoc(doc(db, "Employees", id), data);

    setTimeout(() => {
      navigate("/view-employee");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Employee"
          fields={employeeFields}
        //   radioOptions={{
        //     label: "Classes",
        //     name: "allocatedClass",
        //     options: [
        //       { label: "Class 9", value: "Class 9" },
        //       { label: "Class 10", value: "Class 10" },
        //       { label: "Class 11", value: "Class 11" },
        //       { label: "Class 12", value: "Class 12" },
        //     ],
        //   }}
          onSubmit={handleEmployeeSubmit}
          initialValues={initialData}
          toastValue="Branch Updated"
        />
      )}
    </>
  )
}

export default EditEmployee