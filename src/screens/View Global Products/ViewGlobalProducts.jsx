import React from "react";
import BaseProductCard from "../../components/Base Card/BaseProductCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../components/Base Container/BaseContainer.module.css";
import { Box, Typography } from "@mui/material";

const ViewGlobalProducts = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Products"), (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataArr(arr);
    });

    return () => unsub();
  }, []);

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
        View Products
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {dataArr.map((product) => (
        <BaseProductCard key={product.id} product={product} hideActions />
      ))}
      </Box>
    </Box>
  );
};

export default ViewGlobalProducts;
