import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BaseProductCard = ({
  product,
  onEdit,
  onDelete,
  onOrder,
  isAdmin,
  hideActions,
  isOrderCard,
  isOfferCard,
  isMyOfferCard,
}) => {
  const isAnyOfferCard = isOfferCard || isMyOfferCard;

  return (
    <Card
      sx={{
        width: isAnyOfferCard ? 260 : 300,
        height: isAnyOfferCard ? 250 : 480,
        margin: 2,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isAdmin
            ? "0 8px 20px rgba(231, 193, 55, 0.5)"
            : "0 8px 20px rgba(231, 50, 50, 0.5)",
        },
      }}
    >
      {/* 👇 Image only for product cards (not offers) */}
      {!isAnyOfferCard && product.image && (
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
      )}

      {/* Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          padding: "12px !important",
          overflowY: "auto",
        }}
      >
        {isAnyOfferCard ? (
          <>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1, border: "none" }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#666", border: "none", mb: 1 }}
            >
              {product.description}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "red", fontWeight: 600, border: "none" }}
            >
              Expiry: {product.endDate}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1, border: "none" }}
            >
              {product.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontStyle: "italic",
                color: "#555",
                border: "none",
              }}
            >
              Category: {product.category}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#333", border: "none" }}
            >
              Price: ${product.price}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#666", border: "none" }}
            >
              {product.description}
            </Typography>
          </>
        )}
      </CardContent>

      {/* Buttons */}
      {!hideActions && (
        <CardActions
          sx={{ justifyContent: "space-between", padding: "8px 12px" }}
        >
          {isAnyOfferCard ? (
            <Button
              size="small"
              variant="contained"
              fullWidth
              onClick={() =>
                isMyOfferCard ? onDelete(product.id) : onOrder(product)
              }
              sx={{
                backgroundColor: isMyOfferCard ? "#780606" : "#e73232",
                "&:hover": {
                  backgroundColor: isMyOfferCard ? "#5c0404" : "#b02121",
                },
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {isMyOfferCard ? "Delete Offer" : "Get Offer"}
            </Button>
          ) : isAdmin ? (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onEdit(product)}
                sx={{
                  backgroundColor: "#e7c137",
                  color: "#000",
                  "&:hover": { backgroundColor: "#d1aa2e" },
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onDelete(product.id)}
                sx={{
                  backgroundColor: "#780606",
                  "&:hover": { backgroundColor: "#5c0404" },
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Delete
              </Button>
            </>
          ) : isOrderCard ? (
            <Button
              size="small"
              variant="contained"
              fullWidth
              onClick={() => onDelete(product.id)}
              sx={{
                backgroundColor: "#780606",
                "&:hover": { backgroundColor: "#5c0404" },
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              fullWidth
              onClick={() => onOrder(product)}
              sx={{
                backgroundColor: "#e73232",
                "&:hover": { backgroundColor: "#b02121" },
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Order Now
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default BaseProductCard;
