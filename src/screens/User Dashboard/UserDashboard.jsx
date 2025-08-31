import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { Button, Stack } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import PreviewIcon from '@mui/icons-material/Preview';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import { useMediaQuery } from "@mui/material";
import styles from "../../components/Base Container/BaseContainer.module.css";

const UserDashboard = () => {
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
    { title: "Products", path: "/products", icon: "📦" },   
{ title: "Orders", path: "/my-orders", icon: "🧾" },  
{ title: "Reviews", path: "/view-user-review", icon: "⭐" },
{ title: "Offers", path: "/view-user-offers", icon: "🏷️" },
  ];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchUserName = async () => {
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
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
        for (const col of ["Products", "Orders", "Reviews", "Offers"]) {
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
          sx={{ fontWeight: 600, color: "#780606" }}
        >
          Quick Actions
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          flexWrap="wrap"
          gap="5px"
        >
          <Button
            variant="contained"
            startIcon={<PreviewIcon />}
            onClick={() => navigate("/products")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            View Products
          </Button>

          <Button
            variant="contained"
            startIcon={<Inventory2Icon />}
            onClick={() => navigate("/products")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            Place Order
          </Button>

          <Button
            variant="contained"
            startIcon={<StarIcon />}
            onClick={() => navigate("/view-user-review")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            View Reviews
          </Button>

          <Button
            variant="contained"
            startIcon={<ElectricBoltIcon />}
            onClick={() => navigate("/view-user-offers")}
            sx={{
              bgcolor: "#e7c137",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#780606", color: "#fff" },
              minWidth: 180,
            }}
          >
            View Offers
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserDashboard;
