import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../components/Base Container/BaseContainer.module.css";
import BaseProductCard from "../../components/Base Card/BaseProductCard";
import { useNavigate } from "react-router-dom";

const ViewUserOffers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Offers"), (snapshot) => {
      setOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleGetOffer = async (offer) => {
    try {
      // MyOffers collection me add karo
      await setDoc(doc(db, "MyOffers", offer.id), {
        ...offer,
        createdAt: new Date(),
      });

      console.log("Offer added to MyOffers:", offer);

      // navigate to MyOffers page
      navigate("/my-offers");
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  return (
    <Box className={styles.baseContainer}>
      <Typography
        variant="h4"
        sx={{
          color: "#780606",
          fontWeight: "bolder",
          marginBottom: "20px",
        }}
      >
        Available Offers
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {offers.map((offer) => (
          <BaseProductCard
            key={offer.id}
            product={offer}
            isOfferCard
            onOrder={handleGetOffer}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ViewUserOffers;
