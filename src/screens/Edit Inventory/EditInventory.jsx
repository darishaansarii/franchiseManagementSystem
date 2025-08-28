import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditInventory = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const inventoryFields = [
    { label: "Product Name", name: "productName" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Selling Price (per unit)", name: "sellingPrice", type: "number" },
    { label: "Cost Price (per unit)", name: "costPrice", type: "number" },
    { label: "Expiry Date", name: "expiryDate", type: "date" },
  ];

  React.useEffect(() => {
    const fetchInventory = async () => {
      try {
        const docRef = doc(db, "Inventory", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, [id]);
  const handleInventorySubmit = (data) => {
    console.log("Inventories Data:", data);
    updateDoc(doc(db, "Inventory", id), data);

    setTimeout(() => {
      navigate("/view-inventory");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Inventory"
          fields={inventoryFields}
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
          onSubmit={handleInventorySubmit}
          initialValues={initialData}
          toastValue="Inventory Updated"
        />
      )}
    </>
  )
}

export default EditInventory