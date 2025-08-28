import React from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import BaseProductCard from "../../components/Base Card/BaseProductCard";
import styles from "../../components/Base Container/BaseContainer.module.css";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewUserProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const handleOrder = (product) => {
    navigate("/place-order", { state: { product } });
  };

  return (
    <>
    <Box className={styles.baseContainer}>
    <Typography
        variant="h4"
        sx={{
          color: "#780606",
          fontWeight: "bolder",
          marginBottom: "20px",
        }}
      >
        View Products
      </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => (
        <BaseProductCard
          key={product.id}
          product={product}
          isAdmin={false}
          onOrder={handleOrder}
        />
      ))}
    </Box>
    </Box>
    </>
  );
};

export default ViewUserProducts;
