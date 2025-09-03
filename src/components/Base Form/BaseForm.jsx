import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "../Base Container/BaseContainer.module.css";

const BaseForm = ({
  title,
  fields,
  onSubmit,
  initialValues = {},
  disableSuccessToast = false,
  userData,
  toastValue,
  radioOptions,
  disableSubmit = false,
}) => {
  const [formData, setFormData] = React.useState({});
  const inputRefs = useRef([]);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    let initial = { ...initialValues };
    setFormData(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < fields.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[fields.length]?.click();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let hasError = false;

    fields.forEach((field) => {
      if (!formData[field.name] || String(formData[field.name]).trim() === "") {
        newErrors[field.name] = "This field is required";
        toast.error(`${field.label} is required!`);
        hasError = true;
      }
    });

    setErrors(newErrors);
    if (hasError) return;

    onSubmit(formData);

    if (!disableSuccessToast) {
      toast.success(`${toastValue} Successfully!`);
    }
  };

  return (
    <Box className={styles.baseContainer}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        mb={2}
        color="#780606"
      >
        {title}
      </Typography>

      {userData && (
        <Box mb={3} sx={{ border: "none", textAlign: "left" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon sx={{ fontSize: 32, color: "#780606" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#333", border: "none" }}
            >
              {userData.name}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              mt: -1.5,
              border: "none",
              textAlign: "left",
              ml: 1,
            }}
          >
            {userData.email}
          </Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) =>
          field.type === "select" ? (
            <TextField
              key={index}
              select
              value={formData[field.name] || ""}
              onChange={handleChange}
              label={field.label}
              name={field.name}
              fullWidth
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                native: true, 
              }}
              sx={{
                pb: "10px",
                width: "100%",
                "& label.Mui-focused": {
                  color: "#780606",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "#780606",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#780606",
                  },
                },
              }}
            >
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options?.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          ) : (
            <TextField
              key={index}
              value={formData[field.name] || ""}
              fullWidth
              multiline={field.type === "textarea"}
              minRows={field.type === "textarea" ? 4 : 1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                pb: "10px",
                width: "100%",
                "& label.Mui-focused": {
                  color: "#780606",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "#780606",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#780606",
                  },
                },
              }}
            />
          )
        )}

        <Button
          ref={(el) => (inputRefs.current[fields.length] = el)}
          variant="contained"
          type="submit"
          disabled={disableSubmit}
          fullWidth
          sx={{ bgcolor: "#780606" }}
        >
          {title}
        </Button>
      </form>
    </Box>
  );
};

export default BaseForm;
