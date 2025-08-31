import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";

const ViewUserReview = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Reviews"), (snapshot) => {
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
      await deleteDoc(doc(db, "Reviews", id));
      console.log("Review deleted:", id);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  return (
    <>
      <BaseTable
  headers={["Name", "Email", "Review"]}
  keys={["name", "email", "review"]}
  currentUserId={auth.currentUser?.uid}
  rows={dataArr}
  onDelete={handleDelete}
  editPath="/edit-review"
  btnText="Review"
  btnNavigatePath="/review"
  disableAdd={dataArr.some((item) => item.uid === auth.currentUser?.uid)}
/>

    </>
  );
};

export default ViewUserReview;
