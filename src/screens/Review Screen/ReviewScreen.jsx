import React, { useEffect, useState } from "react";
import BaseForm from "../../components/Base Form/BaseForm";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ReviewScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        const snap = await getDoc(doc(db, "Users", u.uid));

        if (snap.exists()) {
          const userData = snap.data();
          setUser({
            uid: u.uid,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          });
        } else {
          setUser({
            uid: u.uid,
            name: "Unknown User",
            email: u.email,
          });
        }

        const reviewSnap = await getDoc(doc(db, "Reviews", u.uid));
        if (reviewSnap.exists()) {
          setHasReview(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const reviewFields = [
    { label: "Write a review", name: "review", type: "textarea" },
  ];

  const handleSubmit = async (formData) => {
    if (!user) return;

    try {
      await setDoc(doc(db, "Reviews", user.uid), {
        uid: user.uid,
        name: user.name,
        email: user.email,
        review: formData.review,
        reviewId: uuidv4(),
        createdAt: new Date(),
      });

      console.log("Review added:", formData);
      setTimeout(() => navigate("/view-user-review"), 1500);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <>
      {user && (
        <BaseForm
          title="Add a Review"
          toastValue="Review Added"
          fields={reviewFields}
          initialValues={{ review: "" }}
          onSubmit={handleSubmit}
          userData={user}
          disableSubmit={hasReview}  
        />
      )}
    </>
  );
};

export default ReviewScreen;
