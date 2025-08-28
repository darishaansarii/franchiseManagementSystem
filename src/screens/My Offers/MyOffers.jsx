import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../components/Base Container/BaseContainer.module.css";
import BaseProductCard from "../../components/Base Card/BaseProductCard";

const MyOffers = () => {
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "MyOffers"), (snapshot) => {
      setMyOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleDeleteOffer = async (id) => {
    try {
      await deleteDoc(doc(db, "MyOffers", id));
      console.log("Offer deleted:", id);
    } catch (error) {
      console.error("Error deleting offer:", error);
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
        My Offers
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {myOffers.length > 0 ? (
          myOffers.map((offer) => (
            <BaseProductCard
              key={offer.id}
              product={offer}
              isMyOfferCard
              onDelete={handleDeleteOffer}
            />
          ))
        ) : (
          <Typography>No Offers Found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyOffers;
