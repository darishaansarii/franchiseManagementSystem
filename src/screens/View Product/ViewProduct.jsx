import React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import BaseProductCard from "../../components/Base Card/BaseProductCard";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styles from "../../components/Base Container/BaseContainer.module.css"

const ViewProduct = () => {
  const [dataArr, setDataArr] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Products"), (snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataArr(arr);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Products", id));
      console.log("Product deleted:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit-product/${product.id}`, { state: product });
  };

  return (
    <Box className={styles.baseContainer}>
      <Typography
        variant="h4"
        sx={{
          color: "#780606",
          fontWeight: "bolder",
          // marginTop: "120px !important",
          marginBottom: "20px",
        }}
      >
        View Products
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {dataArr.map((product) => (
        <BaseProductCard product={product} onEdit={handleEdit} onDelete={handleDelete} isAdmin />

      ))}
    </Box>
    <Button
    sx={{
      marginTop: "10px !important",
      borderColor: "#780606",
      color: "#780606",
      transition: "all 0.3s ease",
      // marginBottom: "50px",
      "&:hover": {
        backgroundColor: "#780606",
        color: "#fff",
        borderColor: "#780606",
      },
    }}
    variant="outlined"
    fullWidth
    onClick={() => navigate("/add-product")}
  >
    Add Product
  </Button>
    </Box>
  );
};

export default ViewProduct;
