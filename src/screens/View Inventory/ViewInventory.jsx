import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ViewInventory = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Inventory"), (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataArr(arr);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Inventory", id));
      console.log("Inventory deleted:", id);
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name", "Quantity", "Selling Price", "Cost Price", "Expiry Date"]}
        keys={["productName", "quantity", "sellingPrice", "costPrice", "expiryDate"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/edit-inventory"
        btnText="Inventory"
        btnNavigatePath="/add-inventory"
      />
    </>
  );
};

export default ViewInventory;
