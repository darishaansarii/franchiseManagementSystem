import React from 'react'
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ViewEmployee = () => {
  const [dataArr, setDataArr] = React.useState([]);
  
    React.useEffect(() => {
      const unsub = onSnapshot(collection(db, "Employees"), (snapshot) => {
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
        await deleteDoc(doc(db, "Employees", id));
        console.log("Employee deleted:", id);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };
  return (
    <>
    <BaseTable
            headers={["Name", "Address", "Phone Number", "Email"]}
            keys={["name", "address", "number", "email"]}
            rows={dataArr}
            onDelete={handleDelete}
            editPath="/edit-employee"
            btnText="Employee"
            btnNavigatePath="/add-employee"
          />
    </>
  )
}

export default ViewEmployee