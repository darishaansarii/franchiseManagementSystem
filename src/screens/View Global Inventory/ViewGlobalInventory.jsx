import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ViewGlobalInventory = () => {
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

  
  return (
    <>
      <BaseTable
       headers={["Name", "Quantity", "Selling Price", "Cost Price", "Expiry Date"]}
       keys={["productName", "quantity", "sellingPrice", "costPrice", "expiryDate"]}
        rows={dataArr}
        btnText="Inventory"
        hideActions={true}
      />
    </>
  );
};

export default ViewGlobalInventory;
