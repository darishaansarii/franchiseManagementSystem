import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditReview = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const review = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "number" },
    { label: "Write a review", name: "review" },
  ];

  React.useEffect(() => {
    const fetchReview = async () => {
      try {
        const docRef = doc(db, "Reviews", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [id]);
  const handleReviewSubmit = (data) => {
    console.log("Reviews Data:", data);
    updateDoc(doc(db, "Reviews", id), data);

    setTimeout(() => {
      navigate("/view-user-review");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Review"
          fields={review}
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
          onSubmit={handleReviewSubmit}
          initialValues={initialData}
          toastValue="Review Updated"
        />
      )}
    </>
  )
}

export default EditReview