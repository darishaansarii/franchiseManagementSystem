import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ViewOffers = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Offers"), (snapshot) => {
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
      await deleteDoc(doc(db, "Offers", id));
      console.log("Offer deleted:", id);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Title", "Description", "Type", "Start Date", "End Date"]}
        keys={["title", "description", "type", "startDate", "endDate"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/edit-offer"
        btnText="Offer"
        btnNavigatePath="/launch-offer"
      />
    </>
  );
};

export default ViewOffers;
