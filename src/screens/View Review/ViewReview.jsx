import React from "react";
import { BaseTable } from "../../components/Base Table/BaseTable";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const BranchReview = () => {
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

  return (
    <>
      <BaseTable
        headers={[
          "Name",
          "Email",
          "Review"
        ]}
        keys={[
          "name",
          "email",
          "review"
        ]}
        rows={dataArr}
        btnText="Review"
        hideActions={true}
      />
    </>
  );
};

export default BranchReview;
