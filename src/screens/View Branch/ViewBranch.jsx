import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ViewBranch = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Branches"), (snapshot) => {
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
      await deleteDoc(doc(db, "Branches", id));
      console.log("Branch deleted:", id);
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name", "Email", "Address", "Owner Name"]}
        keys={["name", "email", "address", "ownerName"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/edit-branch"
        btnText="Branch"
        btnNavigatePath="/add-branch"
      />
    </>
  );
};

export default ViewBranch;
