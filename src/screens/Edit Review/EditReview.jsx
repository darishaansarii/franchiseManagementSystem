import React, { useState, useEffect } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  const review = [
    { label: "Write a review", name: "review", type: 'textarea' },
  ];

  useEffect(() => {
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

  const handleReviewSubmit = async (data) => {
    try {
      await updateDoc(doc(db, "Reviews", id), data);
      setTimeout(() => {
        navigate("/view-user-review");
      }, 1500);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Review"
          fields={review}
          onSubmit={handleReviewSubmit}
          initialValues={initialData}
          toastValue="Review Updated"
          userData={initialData}   
        />
      )}
    </>
  )
}

export default EditReview;
