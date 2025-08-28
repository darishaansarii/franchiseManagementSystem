import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { Button, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import { useMediaQuery } from "@mui/material";
import styles from "../../components/Base Container/BaseContainer.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:430px)");
  const [stats, setStats] = useState({
    Products: 0,
    Inventory: 0,
    Offers: 0,
    Branches: 0,
  });
  const [name, setName] = useState("");

  const cards = [
    { title: "Products", path: "/view-product", icon: "📦" },
    { title: "Inventory", path: "/view-global-inventory", icon: "📊" },
    { title: "Offers", path: "/view-offers", icon: "🛒" },
    { title: "Branches", path: "/view-branch", icon: "🏢" },
  ];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchUserName = async () => {
        try {
          const q = query(
            collection(db, "Users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setName(userData.name || user.email);
          } else {
            setName(user.email);
          }
        } catch (err) {
          console.error("Error fetching user name:", err);
          setName(user.email);
        }
      };
      fetchUserName();
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const newStats = {};
        for (const col of ["Products", "Inventory", "Offers", "Branches"]) {
          const colSnap = await getDocs(collection(db, col));
          newStats[col] = colSnap.size;
        }
        setStats(newStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box className={styles.baseContainer}>
      {/* Welcome Section */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          sx={{ color: "#780606", fontWeight: "bold" }}
        >
          Welcome, {name}!
        </Typography>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          sx={{ color: "#e7c137", fontWeight: "bold" }}
        >
          As Admin
        </Typography>
      </Box>

      {/* Modern Stats Cards */}
      <Grid container spacing={3} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index}>
            <Paper
              elevation={6}
              onClick={() => navigate(card.path)}
              sx={{
                width: 180,
                height: 140,
                cursor: "pointer",
                bgcolor: "#fff",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 10px 25px rgba(0,0,0,0.3)`,
                  bgcolor: "#e7c137",
                  color: "#780606",
                },
              }}
            >
              <Typography variant="h3">{card.icon}</Typography>
              <Typography variant="h5" fontWeight={700} mt={1}>
                {stats[card.title]}
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Action Buttons */}
      <Box mt={10}>
        <Typography
          textAlign="center"
          variant={isSmallScreen ? "h5" : "h4"}
          
          mb={2}
          // ml={2}
          sx={{ fontWeight: 600, color: "#780606" }}
        >
          Quick Actions
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          // spacing={30}
          justifyContent="center"
          flexWrap="wrap"
          gap="5px"
        >
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={() => navigate("/add-product")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            Add Product
          </Button>

          <Button
            variant="contained"
            startIcon={<Inventory2Icon />}
            onClick={() => navigate("/add-stock")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            Add Stock
          </Button>

          <Button
            variant="contained"
            startIcon={<StorefrontIcon />}
            onClick={() => navigate("/view-global-inventory")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            View Inventory
          </Button>

          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={() => navigate("/launch-offer")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            Launch Offer
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
