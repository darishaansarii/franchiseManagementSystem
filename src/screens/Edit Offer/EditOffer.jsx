import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditOffer = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const offerFields = [
    { label: "Offer Title", name: "title" },
    { label: "Description", name: "description" },
    { label: "Discount Type", name: "type" },
    { label: "Start Date", name: "startDate", type: "date" },
    { label: "End Date", name: "endDate", type: "date" },
  ];

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        const docRef = doc(db, "Offers", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, [id]);
  const handleOfferSubmit = (data) => {
    console.log("Offers Data:", data);
    updateDoc(doc(db, "Offers", id), data);

    setTimeout(() => {
      navigate("/view-offers");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Offer"
          fields={offerFields}
          onSubmit={handleOfferSubmit}
          initialValues={initialData}
          toastValue="Offer Updated"
        />
      )}
    </>
  )
}

export default EditOffer