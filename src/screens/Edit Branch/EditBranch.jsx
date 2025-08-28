import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditBranch = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const branchFields = [
    { label: "Branch Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Address", name: "address" },
    { label: "Owner Name", name: "ownerName" },

  ];

  React.useEffect(() => {
    const fetchBranch = async () => {
      try {
        const docRef = doc(db, "Branches", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching branch:", error);
      }
    };
    fetchBranch();
  }, [id]);
  const handleBranchSubmit = (data) => {
    console.log("Branches Data:", data);
    updateDoc(doc(db, "Branches", id), data);

    setTimeout(() => {
      navigate("/view-branch");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Branch"
          fields={branchFields}
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
          onSubmit={handleBranchSubmit}
          initialValues={initialData}
          toastValue="Branch Updated"
        />
      )}
    </>
  )
}

export default EditBranch