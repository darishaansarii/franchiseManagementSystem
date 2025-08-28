import React, { useEffect, useState } from "react";
import styles from "../../components/Base Container/BaseContainer.module.css";
import { Box, Typography } from "@mui/material";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import BaseProductCard from "../../components/Base Card/BaseProductCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Orders"), (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Orders", id));
      console.log("Order deleted:", id);
    } catch (err) {
      console.error("Error deleting order:", err);
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
        My Orders
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {orders.map((order) => (
          <BaseProductCard
          key={order.id}
          product={{
            ...order.productDetails,
            id: order.id,
          }}
          isOrderCard
          onDelete={handleDelete}
        />
        
        ))}
      </Box>
    </Box>
  );
};

export default MyOrders;
